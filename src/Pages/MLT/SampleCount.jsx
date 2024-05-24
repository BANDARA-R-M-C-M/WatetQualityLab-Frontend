import React, { useState, useEffect } from 'react';
import { getSampleCount } from '../../Service/MLTService';
import { useAuth } from "../../Context/useAuth";
import { useDebounce } from '../../Util/useDebounce';
import { Button, Pagination, Dropdown } from 'flowbite-react';
import { MdClose } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";

function SampleCount() {
    const [sampleCount, setSampleCount] = useState([]);
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [placeholderText, setPlaceholderText] = useState('Year...');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchParameter, setSearchParameter] = useState('year');
    const [searchParameterType, setSearchParameterType] = useState('int');
    const [sortBy, setSortBy] = useState('year');
    const [isAscending, setIsAscending] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    const { user } = useAuth();
    const debouncedSearch = useDebounce(searchTerm, 750);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await getSampleCount(user.userId, searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending);
                if (response) {
                    setSampleCount(response.data.groupedSamples);
                    setTotalPages(response.data.totalPages);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchReports();
    }, [pageNumber, sortBy, isAscending, debouncedSearch, user.userId]);

    const years = sampleCount.map((yearData) => yearData.year);
    const months = selectedYear
        ? sampleCount.find((yearData) => yearData.year === selectedYear)?.months.map((monthData) => monthData.month)
        : [];

    const handleYearChange = (year) => {
        setSelectedYear(year);
        setSelectedMonth(null); // Reset month when year changes
    };

    const handleMonthChange = (month) => {
        setSelectedMonth(month);
    };

    return (
        <>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="flex items-center justify-between">
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
                                        setSortBy('year');
                                        setSearchParameter('year');
                                        setPlaceholderText('Year...');
                                    }}
                                >
                                    Year
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => {
                                        setSortBy('month');
                                        setSearchParameter('month');
                                        setPlaceholderText('Month...');
                                    }}
                                >
                                    Month
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => {
                                        setSortBy('MOHAreaName');
                                        setSearchParameter('MOHAreaName');
                                        setSearchParameterType('string');
                                        setPlaceholderText('MOHAreaName...');
                                    }}
                                >
                                    MOH Area Name
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
                                    <Dropdown.Item key={year} onClick={() => handleYearChange(year)}>
                                        {year}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown>
                        </div>
                        <div className='pr-2'>
                            <Dropdown label="Month" disabled={!selectedYear}>
                                {months.map((month) => (
                                    <Dropdown.Item key={month} onClick={() => handleMonthChange(month)}>
                                        {month}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown>
                        </div>
                        <Button color="failure"
                            onClick={() => {
                                setSelectedYear(null);
                                setSelectedMonth(null);
                            }}>
                            Reset
                        </Button>
                    </div>
                </div>

                <div className="mt-4">
                    {sampleCount.map((yearData) => (
                        (!selectedYear || selectedYear === yearData.year) && (
                            <div key={yearData.year}>
                                <h2 className="text-xl font-semibold mt-4">{yearData.year}</h2>
                                {yearData.months.map((monthData) => (
                                    (!selectedMonth || selectedMonth === monthData.month) && (
                                        <div key={monthData.month} className="mt-2">
                                            <h3 className="text-lg font-semibold mt-2">{monthData.month}</h3>
                                            <table className="min-w-full divide-y divide-gray-200 mt-2">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            MOH Area Name
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Sample Count
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {monthData.mohSampleCounts.map((mohData) => (
                                                        <tr key={mohData.mohAreaName}>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                {mohData.mohAreaName}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                {mohData.sampleCount}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )
                                ))}
                            </div>
                        )
                    ))}
                </div>
                {sampleCount.length > 0 && (
                    <div className="flex overflow-x-auto sm:justify-center">
                        <Pagination currentPage={pageNumber} totalPages={totalPages} onPageChange={(page) => { setPageNumber(page) }} showIcons />
                    </div>
                )}
            </div >
        </>
    );
}

export default SampleCount;
