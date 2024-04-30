import React, { useEffect, useState } from 'react';
import { submitReport } from '../../Service/MLTService';
import { useLocation } from 'react-router-dom';

function ReportForm() {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const [reportRefId, setReportRefId] = useState('');
    const [presumptiveColiformCount, setPresumptiveColiformCount] = useState('');
    const [issuedDate, setIssuedDate] = useState('');
    const [ecoliCount, setEcoliCount] = useState('');
    const [appearanceOfSample, setAppearanceOfSample] = useState('');
    const [results, setResults] = useState('');
    const [remarks, setRemarks] = useState('');
    const [sampleId, setSampleId] = useState('');
    const [labId, setLabId] = useState('');

    useEffect(() => {
        setSampleId(searchParams.get('sampleId'));
        setLabId(searchParams.get('labId'));
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(await submitReport(reportRefId, presumptiveColiformCount, issuedDate, ecoliCount, appearanceOfSample, results, remarks, sampleId, labId)){
            alert('Report created successfully');
        } else {
            alert('Failed to create report');
        }
        
        setReportRefId('');
        setPresumptiveColiformCount('');
        setIssuedDate('');
        setEcoliCount('');
        setAppearanceOfSample('');
        setResults('');
        setRemarks('');
    };

    return (
        <>
            <div className="flex items-center justify-center">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h1 className="block text-gray-700 font-bold mb-2 text-xl text-center">Submit Report</h1>

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
                            Results
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="results" id="results" type="text" placeholder="Results"
                            value={results} onChange={(e) => setResults(e.target.value)} required />
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

                    <div className="flex items-center justify-between">
                        <button type="submit"
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default ReportForm