import React, { useState, useEffect } from 'react';
import { useAuth } from "../../Context/useAuth";
import { getNewReports } from "../../Service/MOHService";

function Reports(){

    const [reports, setReports] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await getNewReports(user.userId);
                if (response) {
                    setReports(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchReports();
    }, []);

    return(
        <>
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
                            Date of Collection
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Issued Date
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            MOH Area
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            PHI Area
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report, index) => (
                        <tr key={index}>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">{report.dateOfCollection}</p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">{report.issuedDate}</p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">{report.mohArea_name}</p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">{report.phiAreaName}</p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <button onClick={() => previewSample(sample.sampleId)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Preview</button>
                                <button onClick={() => downloadSample(sample.sampleId)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2">Download</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
</div>

        </>
    );
}

export default Reports