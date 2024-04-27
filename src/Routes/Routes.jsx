import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Adminsidebar from "../Components/Adminsidebar.jsx"
import Phisidebar from "../Components/Phisidebar.jsx";
import Mltsidebar from '../Components/Mltsidebar.jsx';
import AdminDashboard from "../Pages/Admin/AdminDashboard"
import MLT from "../Pages/Admin/MLT"
import PHI from "../Pages/Admin/PHI";
import Login from '../View/Login.jsx';
import MOHSupervisor from '../Pages/Admin/MOHSupervisor.jsx';
import Laboratories from '../Pages/Admin/Laboratories.jsx';
import PHIAreas from '../Pages/Admin/PHIAreas.jsx';
import MOHAreas from '../Pages/Admin/MOHAreas.jsx';
import MLTDashboard from '../Pages/MLT/MLTDashboard.jsx';
import Samples from '../Pages/MLT/Samples.jsx';
import Reports from '../Pages/MLT/Reports.jsx';
import GeneralInventory from '../Pages/MLT/GeneralInventory.jsx';
import SurgicalInventory from '../Pages/MLT/SurgicalInventory.jsx';
import InstrumentalQuality from '../Pages/MLT/InstrumentalQuality.jsx';
import MediaQuality from '../Pages/MLT/MediaQuality.jsx';
import ProtectedRoute from '../Routes/ProtectedRoutes.jsx';
import PHIDashboard from '../Pages/PHI/PHIDashboard.jsx';
import SamplesP from '../Pages/PHI/Samples.jsx';
import HistoryP from '../Pages/PHI/History.jsx';
import MOHDashboard from '../Pages/MOHSupervisor/MOHDashboard.jsx';
import ReportM from '../Pages/MOHSupervisor/Reports.jsx';
import SamplesM from '../Pages/MOHSupervisor/Samples.jsx';
import HistoryM from '../Pages/MOHSupervisor/History.jsx';
import Mohsidebar from "../Components/Mohsidebar.jsx";
import ReportForm from "../Pages/MLT/ReportForm.jsx";

export const router = createBrowserRouter([
      {
      path: '/',
      element: <App />,
      children: [
        {path: "/", element: <Login/>},
        {path: "admin", 
          element: <ProtectedRoute children={<Adminsidebar />}/>,
            children: [
              {path: "dashboard", element: <AdminDashboard/>},
              {path: "mlts", element: <MLT/>},
              {path: "phis", element: <PHI/>},
              {path: "moh-supervisors", element: <MOHSupervisor/>},
              {path: "laboratories", element: <Laboratories/>},
              {path: "phi-areas", element: <PHIAreas/>},
              {path: "moh-areas", element: <MOHAreas/>}
            ]
        },
        {path: "mlt",
            element: <ProtectedRoute children={<Mltsidebar />}/>,
              children: [
                {path: "dashboard", element: <MLTDashboard/>},
                {path: "samples", element: <Samples/>},
                {path: "report-form", element: <ReportForm/>},
                {path: "inventory-general", element: <GeneralInventory/>},
                {path: "inventory-surgical", element: <SurgicalInventory/>},
                {path: "quality-instrumental", element: <InstrumentalQuality/>},
                {path: "quality-media", element: <MediaQuality/>},
                {path: "reports", element: <Reports/>}
              ]
        },
        {path: "phi",
            element: <ProtectedRoute children={<Phisidebar />}/>,
              children: [
                {path: "dashboard", element: <PHIDashboard/>},
                {path: "samples", element: <SamplesP/>},
                {path: "history", element: <HistoryP/>}
              ]
        },
        {path: "moh-supervisor",
            element: <ProtectedRoute children={<Mohsidebar />}/>,
              children: [
                {path: "dashboard", element: <MOHDashboard/>},
                {path: "reports", element: <ReportM/>},
                {path: "samples", element: <SamplesM/>},
                {path: "history", element: <HistoryM/>}
              ]
        }
      ],
    },
]);