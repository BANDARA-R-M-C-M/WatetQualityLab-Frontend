import { useState, useEffect } from 'react';
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { getPHIDetails, submitSample, getAddedSamples, updateWCSample, deleteWCSample } from '../../Service/PHIService';
import { useAuth } from '../../Context/useAuth';

function Samples() {

    const [samples, setSamples] = useState([]);
    const [yourRefNo, setYourRefNo] = useState('');
    const [dateOfCollection, setDateOfCollection] = useState('');
    const [phiAreaId, setPhiAreaId] = useState('');
    const [phiAreaName, setPhiAreaName] = useState('');
    const [catagoryOfSource, setCatagoryOfSource] = useState('');
    const [collectingSource, setCollectingSource] = useState('');
    const [stateOfChlorination, setStateOfChlorination] = useState('');
    const [updatedId, setUpdatedId] = useState('');
    const [deletedId, setDeletedId] = useState('');
    const [openNewModal, setOpenNewModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const { user } = useAuth();

    useEffect(() => {
        const fetchAddedSamples = async () => {
            try {
                const response = await getAddedSamples(user.userId);
                if (response) {
                    const pendingSamples = response.data.filter(sample => sample.acceptance === 'Pending');
                    setSamples(pendingSamples);
                }
            } catch (error) {
                console.error('Error fetching added samples:', error);
            }
        };
        fetchAddedSamples();
    }, [openNewModal, openEditModal, openDeleteModal]);

    useEffect(() => {
        getPHIDetails(user.userId).then((response) => {
            setPhiAreaId(response.data.phiAreaId);
            setPhiAreaName(response.data.phiAreaName);
        });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (await submitSample(yourRefNo, dateOfCollection, catagoryOfSource, collectingSource, stateOfChlorination, user.userId, phiAreaId, phiAreaName)) {
            alert('Sample added successfully');
        } else {
            alert('Failed to add sample');
        }

        setYourRefNo('');
        setDateOfCollection('');
        setCatagoryOfSource('');
        setCollectingSource('');
        setStateOfChlorination('');

        setOpenNewModal(false);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();

        if (await updateWCSample(updatedId, yourRefNo, dateOfCollection, catagoryOfSource, collectingSource, stateOfChlorination)) {
            alert('Sample updated successfully');
        } else {
            alert('Failed to update sample');
        }

        setYourRefNo('');
        setDateOfCollection('');
        setCatagoryOfSource('');
        setCollectingSource('');
        setStateOfChlorination('');

        setOpenEditModal(false);
    };

    const handleDelete = async (deletedId) => {
        try {
            await deleteWCSample(deletedId);
            alert('Sample deleted successfully');
        } catch (error) {
            console.error('Error deleting sample:', error);
            alert('Failed to delete sample');
        }

        setOpenDeleteModal(false);
    };

    return (
        <>
            <div className="bg-white rounded-md w-full">
                <div>
                    <div className="flex items-center justify-between">
                        <div className="flex bg-gray-50 items-center p-2 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fillRule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clipRule="evenodd" />
                            </svg>
                            <input className="bg-gray-50 outline-none ml-1 block " type="text" name="" id="" placeholder="search..." />
                        </div>
                        <Button
                            onClick={() => {setOpenNewModal(true);
                                setYourRefNo('');
                                setDateOfCollection('');
                                setCatagoryOfSource('');
                                setCollectingSource('');
                                setStateOfChlorination('');
                            }}
                        >Add Sample
                        </Button>
                    </div>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Sample Id
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Your Ref No
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Date of Collection
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        PHI Area
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Category of Source
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Collecting Source
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        State of Chlorination
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {samples.map((sample, index) => (
                                    <tr key={index}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{sample.sampleId}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{sample.yourRefNo}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{sample.dateOfCollection}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{sample.phiAreaName}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{sample.catagoryOfSource}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{sample.collectingSource}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{sample.stateOfChlorination}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                                <span className="relative">{sample.acceptance}</span>
                                            </span>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <Button
                                                onClick={() => {
                                                    setOpenEditModal(true);
                                                    setUpdatedId(sample.sampleId);
                                                    setYourRefNo(sample.yourRefNo);
                                                    setDateOfCollection(sample.dateOfCollection);
                                                    setCatagoryOfSource(sample.catagoryOfSource);
                                                    setCollectingSource(sample.collectingSource);
                                                    setStateOfChlorination(sample.stateOfChlorination);
                                                }}
                                            >Edit
                                            </Button>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <Button
                                                onClick={() => { setOpenDeleteModal(true); setDeletedId(sample.sampleId); }}
                                            >Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal show={openNewModal} onClose={() => setOpenNewModal(false)}>
                <Modal.Header>Add Sample</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="yourRefNo" className="block text-gray-700 text-sm font-bold mb-2">
                                yourRefNo
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="yourRefNo" id="yourRefNo" type="text" placeholder="Your Ref No"
                                value={yourRefNo} onChange={(e) => setYourRefNo(e.target.value)} required />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="dateOfCollection" className="block text-gray-700 text-sm font-bold mb-2">
                                Date of Collection
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="dateOfCollection" id="dateOfCollection" type="date" placeholder="Date of Collection"
                                value={dateOfCollection} onChange={(e) => setDateOfCollection(e.target.value)} required />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="catagoryOfSource" className="block text-gray-700 text-sm font-bold mb-2">
                                Category of Source
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="catagoryOfSource" id="catagoryOfSource" type="text" placeholder="Category of Source"
                                value={catagoryOfSource} onChange={(e) => setCatagoryOfSource(e.target.value)} required />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="collectingSource" className="block text-gray-700 text-sm font-bold mb-2">
                                Collecting Source
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="collectingSource" id="collectingSource" type="text" placeholder="Collecting Source"
                                value={collectingSource} onChange={(e) => setCollectingSource(e.target.value)} required />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="stateOfChlorination" className="block text-gray-700 text-sm font-bold mb-2">
                                State of Chlorination
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="stateOfChlorination" id="stateOfChlorination" type="text" placeholder="State of Chlorination"
                                value={stateOfChlorination} onChange={(e) => setStateOfChlorination(e.target.value)} required />
                        </div>

                        <div className="flex items-center justify-center">
                            <Button type="submit" size="xl">Submit</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal show={openEditModal} onClose={() => setOpenEditModal(false)}>
                <Modal.Header>Edit Sample</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleUpdate}>
                        <div className="mb-4">
                            <label htmlFor="yourRefNo" className="block text-gray-700 text-sm font-bold mb-2">
                                yourRefNo
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="yourRefNo" id="yourRefNo" type="text" placeholder="yourRefNo"
                                value={yourRefNo} onChange={(e) => setYourRefNo(e.target.value)} required />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="dateOfCollection" className="block text-gray-700 text-sm font-bold mb-2">
                                Date of Collection
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="dateOfCollection" id="dateOfCollection" type="date" placeholder="Date of Collection"
                                value={dateOfCollection} onChange={(e) => setDateOfCollection(e.target.value)}  />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="catagoryOfSource" className="block text-gray-700 text-sm font-bold mb-2">
                                Category of Source
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="catagoryOfSource" id="catagoryOfSource" type="text" placeholder="Category of Source"
                                value={catagoryOfSource} onChange={(e) => setCatagoryOfSource(e.target.value)} required />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="collectingSource" className="block text-gray-700 text-sm font-bold mb-2">
                                Collecting Source
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="collectingSource" id="collectingSource" type="text" placeholder="Collecting Source"
                                value={collectingSource} onChange={(e) => setCollectingSource(e.target.value)} required />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="stateOfChlorination" className="block text-gray-700 text-sm font-bold mb-2">
                                State of Chlorination
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="stateOfChlorination" id="stateOfChlorination" type="text" placeholder="State of Chlorination"
                                value={stateOfChlorination} onChange={(e) => setStateOfChlorination(e.target.value)} required />
                        </div>

                        <div className="flex items-center justify-between">
                            <Button type="submit">Submit</Button>
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
                            Are you sure you want to delete this sample?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={() => handleDelete(deletedId)}>
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

export default Samples