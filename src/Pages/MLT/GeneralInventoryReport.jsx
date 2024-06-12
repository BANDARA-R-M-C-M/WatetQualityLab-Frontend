import React, { useState, useEffect, useRef } from 'react';
import { getInventoryDurationDetails, getInventoryDurationReport } from "../../Service/GeneralInventoryService";
import { useAuth } from "../../Context/useAuth";
import { useDebounce } from '../../Util/useDebounce';
import { Button, Dropdown, Modal, Pagination, Table } from 'flowbite-react';
import { MdClose } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";

function GeneralInventoryReport() {

    const currentYear = new Date().getFullYear();

    const [generalInventoryDetails, setGeneralInventoryDetails] = useState([]);
    const [reportUrl, setReportUrl] = useState('');
    const [selectedYear, setSelectedYear] = useState(currentYear);
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

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await getInventoryDurationDetails(user.userId, debouncedSearch, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending, selectedYear, token)
                if (response) {
                    setGeneralInventoryDetails(response.data.items);
                    setTotalPages(response.data.totalPages);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDetails();
    }, [debouncedSearch, pageNumber, sortBy, isAscending, debouncedSearch, selectedYear]);

    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

    const handlePreview = async (year) => {
        const response = await getInventoryDurationReport(user.userId, year, token);
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setReportUrl(pdfUrl);
    };

    return (
        <>
            <div>
                <h1 className="text-center text-4xl font-bold mb-7">General Inventory Items Duration Report</h1>
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
                                <Dropdown.Item
                                    onClick={() => {
                                        setSearchParameter('IssuedDate');
                                        setSearchParameterType('DateOnly')
                                        setPlaceholderText('Issued Date...');
                                    }}
                                >
                                    Issued Date
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => {
                                        setSearchParameter('IssuedBy');
                                        setPlaceholderText('Issued By...');
                                    }}
                                >
                                    Issued By
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => {
                                        setSearchParameter('Remarks');
                                        setPlaceholderText('Remarks...');
                                    }}
                                >
                                    Remarks
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
                        <Button
                            className='mr-2'
                            onClick={() => {
                                setPreviewModalOpen(true);
                                handlePreview(selectedYear);
                            }}>
                            <TbReportAnalytics className="mr-2 h-5 w-5" />
                            View
                        </Button>
                        <Button color="failure"
                            onClick={() => {
                                setSelectedYear(currentYear);
                                setSearchTerm('');
                            }}>
                            Reset
                        </Button>
                    </div>
                </div>
                <div className="overflow-x-auto mt-6">
                    <Table>
                        <Table.Head className="text-center">
                            <Table.HeadCell>General Category</Table.HeadCell>
                            <Table.HeadCell>Item Name</Table.HeadCell>
                            <Table.HeadCell>Issued Date</Table.HeadCell>
                            <Table.HeadCell>Duration in Inventory</Table.HeadCell>
                            <Table.HeadCell>Issued By</Table.HeadCell>
                            <Table.HeadCell>Remarks</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {generalInventoryDetails.map((item, index) => (
                                <Table.Row key={index} className="text-center">
                                    <Table.Cell>{item.generalCategoryName}</Table.Cell>
                                    <Table.Cell>{item.itemName}</Table.Cell>
                                    <Table.Cell>{item.issuedDate}</Table.Cell>
                                    <Table.Cell>{item.duration}</Table.Cell>
                                    <Table.Cell>{item.issuedBy}</Table.Cell>
                                    <Table.Cell>{item.remarks}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
                {generalInventoryDetails.length > 0 && (
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

export default GeneralInventoryReport;