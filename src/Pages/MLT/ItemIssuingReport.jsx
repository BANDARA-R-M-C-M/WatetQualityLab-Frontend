import React, { useState, useEffect, useRef } from 'react';
import { getItemsIssuingDetails, getItemIssuingReport } from "../../Service/SurgicalInventoryService";
import { useAuth } from "../../Context/useAuth";
import { useDebounce } from '../../Util/useDebounce';
import { Button, Dropdown, Modal, Pagination, Table } from 'flowbite-react';
import { MdClose } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";

function ItemIssuingReport() {

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const [itemsIssuingDetails, setItemsIssuingDetails] = useState([]);
    const [reportUrl, setReportUrl] = useState('');
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [placeholderText, setPlaceholderText] = useState('Item Name...');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchParameter, setSearchParameter] = useState('ItemName');
    const [searchParameterType, setSearchParameterType] = useState('string');
    const [sortBy, setSortBy] = useState('ItemName');
    const [isAscending, setIsAscending] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [previewModalOpen, setPreviewModalOpen] = useState(false);

    const { user, token } = useAuth();
    const debouncedSearch = useDebounce(searchTerm);

    const monthNames = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December"
    };

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await getItemsIssuingDetails(user.userId, debouncedSearch, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending, selectedYear, selectedMonth, token)
                if (response) {
                    setItemsIssuingDetails(response.data.items);
                    setTotalPages(response.data.totalPages);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDetails();
    }, [debouncedSearch, pageNumber, sortBy, isAscending, debouncedSearch, selectedYear, selectedMonth]);

    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    const handlePreview = async (year, month) => {
        const response = await getItemIssuingReport(user.userId, year, month, token);
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setReportUrl(pdfUrl);
    };

    return (
        <>
            <div>
                <h1 className="text-center text-4xl font-bold mb-7">Surgical Inventory Items Issuing Report</h1>
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="flex items-center justify-between">
                        <div className="flex bg-gray-200 items-center p-1 rounded-md">
                            <FaSearch className="mx-2 h-6 w-6 text-gray-400" />
                            <input
                                className="bg-gray-200 border-none ml-1 block focus:ring focus:ring-gray-200"
                                type="text"
                                placeholder={placeholderText}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {searchTerm && (
                                <MdClose
                                    className="ml-2 h-6 w-6 text-gray-400 cursor-pointer"
                                    onClick={() => setSearchTerm('')}
                                />
                            )}
                        </div>
                        <div className="flex items-center p-2 rounded-md">
                            <Dropdown label="Sort">
                                <Dropdown.Item
                                    onClick={() => {
                                        setSearchParameter('ItemName');
                                        setPlaceholderText('Item Name...');
                                    }}
                                >
                                    Item Name
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => {
                                        setSearchParameter('SurgicalCategory');
                                        setPlaceholderText('Surgical Category Name...');
                                    }}
                                >
                                    Surgical Category Name
                                </Dropdown.Item>
                            </Dropdown>
                        </div>
                        <div className="flex items-center rounded-md">
                            <Button onClick={() => { setIsAscending(!isAscending) }} size="xs">
                                {isAscending ? <AiOutlineSortAscending size={28} />
                                    : <AiOutlineSortDescending size={28} />}
                            </Button>
                        </div>
                    </div>
                    <div className='flex items-center justify-between'>
                        <div className='pr-2'>
                            <Dropdown label="Year">
                                {years.map((year) => (
                                    <Dropdown.Item key={year} onClick={() => setSelectedYear(year)}>
                                        {year}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown>
                        </div>
                        <div className='pr-2'>
                            <Dropdown label="Month" disabled={!selectedYear}>
                                {months.map((month) => (
                                    <Dropdown.Item key={month} onClick={() => setSelectedMonth(month)}>
                                        {monthNames[month]}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown>
                        </div>
                        <Button
                            className='mr-2'
                            onClick={() => {
                                setPreviewModalOpen(true);
                                handlePreview(selectedYear, selectedMonth);
                            }}>
                            <TbReportAnalytics className="mr-2 h-5 w-5" />
                            View
                        </Button>
                        <Button color="failure"
                            onClick={() => {
                                setSelectedYear(currentYear);
                                setSelectedMonth(currentMonth);
                                setSearchTerm('');
                            }}>
                            Reset
                        </Button>
                    </div>
                </div>
                <div className="overflow-x-auto mt-6">
                    <Table>
                        <Table.Head className="text-center">
                            <Table.HeadCell>Surgical Category</Table.HeadCell>
                            <Table.HeadCell>Item Name</Table.HeadCell>
                            <Table.HeadCell>Initial Quantity</Table.HeadCell>
                            <Table.HeadCell>Issued Quantity</Table.HeadCell>
                            <Table.HeadCell>Added Quantity</Table.HeadCell>
                            <Table.HeadCell>Remaining Quantity</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {itemsIssuingDetails.map((item, index) => (
                                <Table.Row key={index} className="text-center">
                                    <Table.Cell>{item.surgicalCategory}</Table.Cell>
                                    <Table.Cell>{item.itemName}</Table.Cell>
                                    <Table.Cell>{item.initialQuantity}</Table.Cell>
                                    <Table.Cell>{item.issuedInMonth}</Table.Cell>
                                    <Table.Cell>{item.addedInMonth}</Table.Cell>
                                    <Table.Cell>{item.remainingQuantity}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
                {itemsIssuingDetails.length > 0 && (
                    <div className="flex overflow-x-auto sm:justify-center">
                        <Pagination currentPage={pageNumber} totalPages={totalPages} onPageChange={(page) => { setPageNumber(page) }} showIcons />
                    </div>
                )}
            </div>

            <Modal show={previewModalOpen} onClose={() => setPreviewModalOpen(false)}>
                <Modal.Header>Preview</Modal.Header>
                <Modal.Body>
                    <iframe src={reportUrl} type="application/pdf" width="100%" height="870px" />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ItemIssuingReport;