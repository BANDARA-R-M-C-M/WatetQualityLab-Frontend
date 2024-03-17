import Login from './View/Login.jsx'
import Sidebar from './Components/Sidebar.jsx'
import {
    UsersIcon,
    HomeModernIcon
  } from '@heroicons/react/24/outline'  

function App() {

    const navigationAdmin = [
        { name: 'MLTs', to: '/MLTs', icon: UsersIcon, current: false },
        { name: 'PHIs', to: '/PHIs', icon: UsersIcon, current: false },
        { name: 'MOH Supervisors', to: '/MOHSupervisors', icon: UsersIcon, current: false },
        { name: 'MOH Areas', to: '/MOHAreas', icon: HomeModernIcon, current: false },
        { name: 'PHI Areas', to: '/PHIAreas', icon: HomeModernIcon, current: false },
        { name: 'Laboratories', to: '/Laboratories', icon: HomeModernIcon, current: false },
      ]
      
    return(
    <>
        {/* <Login/> */}
        <Sidebar sidebarProps = {navigationAdmin} username = {"Admin"}/>
    </>
    );
}

export default App;