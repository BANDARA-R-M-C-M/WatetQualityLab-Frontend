import { useState, useEffect } from 'react';
import { Button, Modal, Pagination, Dropdown } from "flowbite-react";
import { MdEdit, MdDelete, MdClose } from "react-icons/md";
import { FaPlus, FaSearch } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import { getInstrumentalQualityRecords, addInstrumentalQualityControlRecord, updateInstrumentalQualityControlRecord, deleteInstrumentalQualityControlRecord } from '../../Service/InstrumentalQCService';
import { useAuth } from '../../Context/useAuth';
import { useDebounce } from '../../Util/useDebounce';

function InstrumentalQuality() {

    const [instrumentalQualityRecords, setInstrumentalQualityRecords] = useState([]);
    const [dateTime, setDateTime] = useState('');
    const [instrumentId, setInstrumentId] = useState('');
    const [temperatureFluctuation, setTemperatureFluctuation] = useState('');
    const [pressureGradient, setPressureGradient] = useState('');
    const [timer, setTimer] = useState('');
    const [sterility, setSterility] = useState('');
    const [stability, setStability] = useState('');
    const [remarks, setRemarks] = useState('');
    const [placeholderText, setPlaceholderText] = useState('Instrument Id...');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchParameter, setSearchParameter] = useState('InstrumentId');
    const [searchParameterType, setSearchParameterType] = useState('string');
    const [sortBy, setSortBy] = useState('InstrumentId');
    const [isAscending, setIsAscending] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [labId, setLabId] = useState('');
    const [updateId, setUpdateId] = useState('');
    const [deleteId, setDeleteId] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const { user, token } = useAuth();
    const debouncedSearch = useDebounce(searchTerm);

    useEffect(() => {
        const fetchInstrumentalQualityRecords = async () => {
            try {
                const response = await getInstrumentalQualityRecords(user.userId, searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending, token);
                if (response) {
                    setInstrumentalQualityRecords(response.data.items);
                    setLabId(user.areaId);
                    setTotalPages(response.data.totalPages);
                }
            } catch (error) {
                console.error('Error fetching General Categories', error);
            }
        };
        fetchInstrumentalQualityRecords();
    }, [openModal, openEditModal, openDeleteModal, pageNumber, sortBy, isAscending, debouncedSearch]);

    const handleAddRecord = async (event) => {
        event.preventDefault();

        await addInstrumentalQualityControlRecord(dateTime, instrumentId, temperatureFluctuation, pressureGradient, timer, sterility, stability, remarks, user.userId, labId, token);

        setDateTime('');
        setInstrumentId('');
        setTemperatureFluctuation('');
        setPressureGradient('');
        setTimer('');
        setSterility('');
        setStability('');
        setRemarks('');

        setOpenModal(false);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();

        await updateInstrumentalQualityControlRecord(updateId, dateTime, instrumentId, temperatureFluctuation, pressureGradient, timer, sterility, stability, remarks, user.userId, token);

        setUpdateId('');
        setDateTime('');
        setInstrumentId('');
        setTemperatureFluctuation('');
        setPressureGradient('');
        setTimer('');
        setSterility('');
        setStability('');
        setRemarks('');

        setOpenEditModal(false);
    };

    const handleDelete = async (deleteId) => {
        await deleteInstrumentalQualityControlRecord(deleteId, token);

        setOpenDeleteModal(false);
    };

    return (
        <>
            <div className="bg-white rounded-md w-full">
                <h1 className="text-center text-4xl font-bold mb-7">Instrumental Quality Control Records</h1>
                <div>
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
                                            setSortBy('InstrumentId');
                                            setSearchParameter('InstrumentId');
                                            setPlaceholderText('Instrument Id...');
                                        }}
                                    >
                                        Instrument Id
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => {
                                            setSortBy('DateTime');
                                            setSearchParameter('DateTime');
                                            setSearchParameterType('DateTime');
                                            setPlaceholderText('Date Time...');
                                        }}
                                    >
                                        Date Time
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => {
                                            setSortBy('TemperatureFluctuation');
                                            setSearchParameter('TemperatureFluctuation');
                                            setPlaceholderText('Temperature Fluctuation...');
                                        }}
                                    >
                                        Temperature Fluctuation
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => {
                                            setSortBy('Timer');
                                            setSearchParameter('Timer');
                                            setPlaceholderText('Timer...');
                                        }}
                                    >
                                        Timer
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => {
                                            setSortBy('Sterility');
                                            setSearchParameter('Sterility');
                                            setPlaceholderText('Sterility...');
                                        }}
                                    >
                                        Sterility
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => {
                                            setSortBy('Stability');
                                            setSearchParameter('Stability');
                                            setPlaceholderText('Stability...');
                                        }}
                                    >
                                        Sterility
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
                        <Button className="mr-1"
                            onClick={() => {
                                setOpenModal(true);
                            }}
                        >
                            <FaPlus className="mr-2 h-5 w-5" />
                            Add Quality Record
                        </Button>
                    </div>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Instrument ID
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Date & Time
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Temperature Fluctuation
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Pressure Gradient
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Timer
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Sterility
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Stability
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Remarks
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {instrumentalQualityRecords.map((QualityRecord, index) => (
                                    <tr key={index}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{QualityRecord.instrumentId}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{QualityRecord.dateTime}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{QualityRecord.temperatureFluctuation}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{QualityRecord.pressureGradient}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{QualityRecord.timer}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{QualityRecord.sterility}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{QualityRecord.stability}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{QualityRecord.remarks}</p>
                                        </td>
                                        <td className="border-b border-gray-200 bg-white text-sm">
                                            <Button size="xs"
                                                onClick={() => {
                                                    setOpenEditModal(true);
                                                    setUpdateId(QualityRecord.instrumentalQualityControlID);
                                                    setInstrumentId(QualityRecord.instrumentId);
                                                    setDateTime(QualityRecord.dateTime);
                                                    setTemperatureFluctuation(QualityRecord.temperatureFluctuation);
                                                    setPressureGradient(QualityRecord.pressureGradient);
                                                    setTimer(QualityRecord.timer);
                                                    setSterility(QualityRecord.sterility);
                                                    setStability(QualityRecord.stability);
                                                    setRemarks(QualityRecord.remarks);
                                                }}
                                            >
                                                <MdEdit size={25} />
                                            </Button>
                                        </td>
                                        <td className="border-b border-gray-200 bg-white text-sm">
                                            <Button size="xs" color="failure"
                                                onClick={() => {
                                                    setOpenDeleteModal(true);
                                                    setDeleteId(QualityRecord.instrumentalQualityControlID)
                                                }}
                                            >
                                                <MdDelete size={25} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {instrumentalQualityRecords.length > 0 && (
                        <div className="flex overflow-x-auto sm:justify-center">
                            <Pagination currentPage={pageNumber} totalPages={totalPages} onPageChange={(page) => { setPageNumber(page) }} showIcons />
                        </div>
                    )}
                </div>
            </div>

            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Add Record</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleAddRecord}>
                        <div className="mb-4">
                            <label htmlFor="instrument" className="block text-sm font-medium text-gray-700">Instrument ID</label>
                            <input type="text" name="instrument" id="instrument" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={instrumentId} onChange={(e) => setInstrumentId(e.target.value)} required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="dateTime" className="block text-sm font-medium text-gray-700">Date & Time</label>
                            <input type="datetime-local" name="dateTime" id="dateTime" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={dateTime} onChange={(e) => setDateTime(e.target.value)} required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="temperatureFluctuation" className="block text-sm font-medium text-gray-700">Temperature Fluctuation</label>
                            <input type="number" name="temperatureFluctuation" id="temperatureFluctuation" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={temperatureFluctuation} onChange={(e) => setTemperatureFluctuation(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="pressureGradient" className="block text-sm font-medium text-gray-700">Pressure Gradient</label>
                            <input type="number" name="pressureGradient" id="pressureGradient" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={pressureGradient} onChange={(e) => setPressureGradient(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="timer" className="block text-sm font-medium text-gray-700">Timer</label>
                            <input type="text" name="timer" id="timer" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={timer} onChange={(e) => setTimer(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="sterility" className="block text-sm font-medium text-gray-700">Sterility</label>
                            <input type="text" name="sterility" id="sterility" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={sterility} onChange={(e) => setSterility(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="stability" className="block text-sm font-medium text-gray-700">Stability</label>
                            <input type="text" name="stability" id="stability" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={stability} onChange={(e) => setStability(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
                            <input type="text" name="remarks" id="remarks" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={remarks} onChange={(e) => setRemarks(e.target.value)} />
                        </div>
                        <div className="flex items-center justify-center">
                            <Button type="submit" size="xl">Submit</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal show={openEditModal} onClose={() => setOpenEditModal(false)}>
                <Modal.Header>Edit Record</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleUpdate}>
                        <div className="mb-4">
                            <label htmlFor="instrument" className="block text-sm font-medium text-gray-700">Instrument ID</label>
                            <input type="text" name="instrument" id="instrument" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={instrumentId} onChange={(e) => setInstrumentId(e.target.value)} required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="dateTime" className="block text-sm font-medium text-gray-700">Date & Time</label>
                            <input type="datetime-local" name="dateTime" id="dateTime" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={dateTime} onChange={(e) => setDateTime(e.target.value)} required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="temperatureFluctuation" className="block text-sm font-medium text-gray-700">Temperature Fluctuation</label>
                            <input type="number" name="temperatureFluctuation" id="temperatureFluctuation" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={temperatureFluctuation} onChange={(e) => setTemperatureFluctuation(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="pressureGradient" className="block text-sm font-medium text-gray-700">Pressure Gradient</label>
                            <input type="number" name="pressureGradient" id="pressureGradient" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={pressureGradient} onChange={(e) => setPressureGradient(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="timer" className="block text-sm font-medium text-gray-700">Timer</label>
                            <input type="text" name="timer" id="timer" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={timer} onChange={(e) => setTimer(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="sterility" className="block text-sm font-medium text-gray-700">Sterility</label>
                            <input type="text" name="sterility" id="sterility" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={sterility} onChange={(e) => setSterility(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="stability" className="block text-sm font-medium text-gray-700">Stability</label>
                            <input type="text" name="stability" id="stability" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={stability} onChange={(e) => setStability(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
                            <input type="text" name="remarks" id="remarks" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={remarks} onChange={(e) => setRemarks(e.target.value)} />
                        </div>
                        <div className="flex items-center justify-center">
                            <Button type="submit" size="xl">Submit</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal show={openDeleteModal} size="md" onClose={() => setOpenDeleteModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this category?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={() => handleDelete(deleteId)}>
                                Yes, I'm sure
                            </Button>
                            <Button color="gray" onClick={() => setOpenDeleteModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default InstrumentalQuality