import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Adminsidebar from "../Components/Adminsidebar.jsx"
import Phisidebar from "../Components/Phisidebar.jsx";
import Mltsidebar from '../Components/Mltsidebar.jsx';
import GeneralItems from "../Pages/MLT/GeneralItems.jsx";
import SurgicalItems from "../Pages/MLT/SurgicaItems.jsx";
import GeneralItem from "../Pages/MLT/GeneralItem.jsx";
import SurgicalItem from "../Pages/MLT/SurgicalItem.jsx";
import SampleCount from "../Pages/MLT/SampleCount.jsx";
import AdminDashboard from "../Pages/Admin/AdminDashboard"
import MLTDashboard from '../Pages/MLT/MLTDashboard.jsx';
import PendingSamples from '../Pages/MLT/PendingSamples.jsx';
import MLT from "../Pages/Admin/MLT"
import PHI from "../Pages/Admin/PHI";
import Login from '../Pages/Login.jsx';
import MOHSupervisor from '../Pages/Admin/MOHSupervisor.jsx';
import Laboratories from '../Pages/Admin/Laboratories.jsx';
import PHIAreas from '../Pages/Admin/PHIAreas.jsx';
import MOHAreas from '../Pages/Admin/MOHAreas.jsx';
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
import Mohsidebar from "../Components/Mohsidebar.jsx";
import Profile from "../Pages/Profile.jsx";
import GeneralInventoryReport from "../Pages/MLT/GeneralInventoryReport.jsx";
import ItemIssuingReport from "../Pages/MLT/ItemIssuingReport.jsx";
import LandingPage from "../Pages/LandingPage/LandingPage.jsx";

export const router = createBrowserRouter([
      {
      path: '/',
      element: <App />,
      children: [
        {path: "/", element: <LandingPage/>},
        {path: "/login", element: <Login/>},
        {path: "/profile", element: <Profile/>},
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
                {path: "new-samples", element: <PendingSamples/>},
                {path: "samples", element: <Samples/>},
                {path: "inventory-general", element: <GeneralInventory/>},
                {path: "inventory-general/:categoryId", element: <GeneralItems/>},
                {path: "inventory-general/:categoryId/:itemId", element: <GeneralItem/>},
                {path: "inventory-surgical", element: <SurgicalInventory/>},
                {path: "inventory-surgical/:categoryId", element: <SurgicalItems/>},
                {path: "inventory-surgical/:categoryId/:itemId", element: <SurgicalItem/>},
                {path: "quality-instrumental", element: <InstrumentalQuality/>},
                {path: "quality-media", element: <MediaQuality/>},
                {path: "reports", element: <Reports/>},
                {path: "sample-count-report", element: <SampleCount/>},
                {path: "general-inventory-report", element: <GeneralInventoryReport/>},
                {path: "items-issuing-report", element: <ItemIssuingReport/>},
              ]
        },
        {path: "phi",
            element: <ProtectedRoute children={<Phisidebar />}/>,
              children: [
                {path: "home", element: <PHIDashboard/>},
                {path: "samples", element: <SamplesP/>},
                {path: "history", element: <HistoryP/>}
              ]
        },
        {path: "moh-supervisor",
            element: <ProtectedRoute children={<Mohsidebar />}/>,
              children: [
                {path: "home", element: <MOHDashboard/>},
                {path: "reports", element: <ReportM/>}
              ]
        }
      ],
    },
]);