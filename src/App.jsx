import { Outlet } from 'react-router-dom'
import { UserProvider } from './Context/useAuth.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadScript } from '@react-google-maps/api';

function App() {

    return (
        <>
            <LoadScript
                googleMapsApiKey="AIzaSyAxV9mcy6QyakU_DYa59Ps4I-5bbHe3QBg"
                onLoad={() => console.log('Google Maps API script loaded successfully.')}
                onError={(error) => console.log('Error loading Google Maps API script:', error)}
            >
                <UserProvider>
                    <Outlet />
                    <ToastContainer />
                </UserProvider>
            </LoadScript>
        </>
    );
}

export default App;