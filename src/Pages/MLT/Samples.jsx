import React, { useState, useEffect } from 'react';
import { useAuth } from "../../Context/useAuth";
import { getNewSamples, submitReport } from "../../Service/MLTService";
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function Samples() {

    const [samples, setSamples] = useState([]);
    const [reportRefId, setReportRefId] = useState('');
    const [presumptiveColiformCount, setPresumptiveColiformCount] = useState('');
    const [issuedDate, setIssuedDate] = useState('');
    const [ecoliCount, setEcoliCount] = useState('');
    const [appearanceOfSample, setAppearanceOfSample] = useState('');
    const [pcresults, setPCResults] = useState('');
    const [ecresults, setECResults] = useState('');
    const [remarks, setRemarks] = useState('');
    const [sampleId, setSampleId] = useState('');
    const [labId, setLabId] = useState('');
    const [showForm, setShowForm] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        const fetchSamples = async () => {
            try {
                const response = await getNewSamples(user.userId);
                if (response) {
                    const pendingSamples = response.data.filter(sample => sample.acceptance === 'Accepted');
                    setSamples(pendingSamples);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchSamples();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (await submitReport(reportRefId, presumptiveColiformCount, issuedDate, ecoliCount, appearanceOfSample, pcresults, ecresults, remarks, sampleId, labId)) {
            alert('Report created successfully');
        } else {
            alert('Failed to create report');
        }

        setReportRefId('');
        setPresumptiveColiformCount('');
        setIssuedDate('');
        setEcoliCount('');
        setAppearanceOfSample('');
        setPCResults('');
        setECResults('');
        setRemarks('');
    };

    return (
        <div className="bg-white rounded-md w-full">
            <div className="flex items-center justify-between pb-6">
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
                                    Date of Collection
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Phi_Area
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Catagory of Source
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Collecting Source
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    State of Chlorination
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Acceptance
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {samples.map((sample, index) => (
                                <tr key={index}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <div className="flex items-center">
                                            <div className="ml-3">
                                                <p className="text-gray-900 whitespace-no-wrap">{sample.sampleId}</p>
                                            </div>
                                        </div>
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
                                    <td className="pl-7 py-5 border-b border-gray-200 bg-white text-sm ">
                                        <button
                                            onClick={() => { setShowForm(true), setSampleId(sample.sampleId), setLabId(sample.labID) }}
                                            className="relative inline-block px-3 py-1 font-semibold text-white bg-black rounded-full"
                                        >
                                            Report
                                        </button>

                                        {showForm && (
                                            <div className="fixed inset-0 flex items-center justify-center z-50">
                                                <div className="bg-white rounded-lg p-6 w-96 max-w-full shadow-lg">
                                                    <div className="flex justify-between items-center border-b-2 border-gray-200 pb-4">
                                                        <h2 className="text-2xl font-semibold">Report</h2>
                                                        <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <form onSubmit={handleSubmit} >

                                                        <div className="mb-4">
                                                            <label htmlFor="reportRefId" className="block text-gray-700 text-sm font-bold mb-2">
                                                                Report Ref ID
                                                            </label>
                                                            <input
                                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                                name="reportRefId" id="reportRefId" type="text" placeholder="Report Ref ID"
                                                                value={reportRefId} onChange={(e) => setReportRefId(e.target.value)} required />
                                                        </div>

                                                        <div className="mb-4">
                                                            <label htmlFor="presumptiveColiformCount" className="block text-gray-700 text-sm font-bold mb-2">
                                                                Presumptive Coliform Count
                                                            </label>
                                                            <input
                                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                                name="presumptiveColiformCount" id="presumptiveColiformCount" type="text" placeholder="Presumptive Coliform Count"
                                                                value={presumptiveColiformCount} onChange={(e) => setPresumptiveColiformCount(e.target.value)} required />
                                                        </div>

                                                        <div className="mb-4">
                                                            <label htmlFor="issuedDate" className="block text-gray-700 text-sm font-bold mb-2">
                                                                Issued Date
                                                            </label>
                                                            <input
                                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                                name="issuedDate" id="issuedDate" type="date"
                                                                value={issuedDate} onChange={(e) => setIssuedDate(e.target.value)} required />
                                                        </div>

                                                        <div className="mb-4">
                                                            <label htmlFor="ecoliCount" className="block text-gray-700 text-sm font-bold mb-2">
                                                                Ecoli Count
                                                            </label>
                                                            <input
                                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                                name="ecoliCount" id="ecoliCount" type="text" placeholder="Ecoli Count"
                                                                value={ecoliCount} onChange={(e) => setEcoliCount(e.target.value)} required />
                                                        </div>

                                                        <div className="mb-4">
                                                            <label htmlFor="appearanceOfSample" className="block text-gray-700 text-sm font-bold mb-2">
                                                                Appearance Of Sample
                                                            </label>
                                                            <input
                                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                                name="appearanceOfSample" id="appearanceOfSample" type="text" placeholder="Appearance Of Sample"
                                                                value={appearanceOfSample} onChange={(e) => setAppearanceOfSample(e.target.value)} required />
                                                        </div>

                                                        <div className="mb-4">
                                                            <label htmlFor="results" className="block text-gray-700 text-sm font-bold mb-2">
                                                                Presumptive Coliform Count
                                                            </label>
                                                            <input
                                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                                name="results" id="results" type="text" placeholder="Results"
                                                                value={pcresults} onChange={(e) => setPCResults(e.target.value)} required />
                                                        </div>

                                                        <div className="mb-4">
                                                            <label htmlFor="results" className="block text-gray-700 text-sm font-bold mb-2">
                                                                E coli Count
                                                            </label>
                                                            <input
                                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                                name="results" id="results" type="text" placeholder="Results"
                                                                value={ecresults} onChange={(e) => setECResults(e.target.value)} required />
                                                        </div>

                                                        <div className="mb-4">
                                                            <label htmlFor="remarks" className="block text-gray-700 text-sm font-bold mb-2">
                                                                Remarks
                                                            </label>
                                                            <input
                                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                                name="remarks" id="remarks" type="text" placeholder="Remarks"
                                                                value={remarks} onChange={(e) => setRemarks(e.target.value)} required />
                                                        </div>

                                                        <div className="flex ">
                                                            <button type="submit"
                                                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                                                                Submit
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        )}
                                        {/* </div> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Samples