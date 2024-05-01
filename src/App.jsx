import { Outlet } from 'react-router-dom'
import { UserProvider } from './Context/useAuth.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
      
    return(
        <>
            <UserProvider>
            <Outlet/>
            <ToastContainer/>
            </UserProvider>
    </>
    );
}

export default App;