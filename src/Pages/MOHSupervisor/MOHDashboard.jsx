import React, { useState, useEffect, useRef } from 'react';
import { getContaminationDetails } from '../../Service/MOHService';
import { useAuth } from "../../Context/useAuth";
import { Pie, Bar, getElementAtEvent } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import MapComponent from '../../Components/MapComponentMOH';

function MOHDashboard(){
    return(
        <div>
            <MapComponent />
        </div>
    );
}

export default MOHDashboard