import { Link, Outlet, useLocation } from 'react-router-dom';
import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useAuth } from "../Context/useAuth";

function Mltsidebar() {

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const [showInventory, setShowInventory] = useState(false);
  const [showQuality, setShowQuality] = useState(false);
  const [showReports, setShowReports] = useState(false);

  const { logout, user } = useAuth();

  const userName = user.userName;

  return (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>

          <div className="fixed inset-0 flex">
            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li className='flex flex-1 flex-col gap-y-1 rounded-lg p-2 text-sm leading-7 font-semibold text-gray-400'>
                      <Link to='/mlt/dashboard' className={location.pathname === '/mlt/dashboard' ? 'bg-gray-800 text-white rounded-md p-2' : 'text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-2'}>Dashboard</Link>
                      <Link to='/mlt/new-samples' className={location.pathname === '/mlt/new-samples' ? 'bg-gray-800 text-white rounded-md p-2' : 'text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-2'}>New Samples</Link>
                      <Link to='/mlt/samples' className={location.pathname === '/mlt/samples' ? 'bg-gray-800 text-white rounded-md p-2' : 'text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-2'}>Accepted Samples</Link>

                      <div onClick={() => { setShowInventory(!showInventory) }} className={'flex items-center justify-between text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-2'}>
                        Inventory
                        <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      {showInventory && (<div className='flex flex-col gap-y-1 rounded-lg p-2 text-sm leading-7 font-semibold text-gray-400'>
                        <Link to='/mlt/inventory-general' className={location.pathname === '/mlt/inventory-general' ? 'bg-gray-800 text-white rounded-md p-2' : 'text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-2'}>General</Link>
                        <Link to='/mlt/inventory-surgical' className={location.pathname === '/mlt/inventory-surgical' ? 'bg-gray-800 text-white rounded-md p-2' : 'text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-2'}>Surgical</Link>
                      </div>)}

                      <div onClick={() => { setShowQuality(!showQuality) }} className={'flex items-center justify-between text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-2'}>
                        Quality
                        <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      {showQuality && (<div className='flex flex-col gap-y-1 rounded-lg p-2 text-sm leading-7 font-semibold text-gray-400'>
                        <Link to='/mlt/quality-instrumental' className={location.pathname === '/mlt/quality/instrumental' ? 'bg-gray-800 text-white rounded-md p-2' : 'text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-2'}>Instrumental</Link>
                        <Link to='/mlt/quality-media' className={location.pathname === '/mlt/quality/media' ? 'bg-gray-800 text-white rounded-md p-2' : 'text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-2'}>Media</Link>
                      </div>)}

                      <div onClick={() => { setShowReports(!showReports) }} className={'flex items-center justify-between text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-2'}>
                        Reports
                        <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      {showReports && (<div className='flex flex-col gap-y-1 rounded-lg p-2 text-sm leading-7 font-semibold text-gray-400'>
                        <Link to='/mlt/reports' className={location.pathname === '/mlt/reports' ? 'bg-gray-800 text-white rounded-md p-2' : 'text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-2'}>Reports</Link>
                        <Link to='/mlt/sample-count-report' className={location.pathname === '/mlt/sample-count-report' ? 'bg-gray-800 text-white rounded-md p-2' : 'text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-2'}>Sample Count</Link>
                        <Link to='/mlt/general-inventory-report' className={location.pathname === '/mlt/general-inventory-report' ? 'bg-gray-800 text-white rounded-md p-2' : 'text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-2'}>General Inventory Report</Link>
                        <Link to='/mlt/items-issuing-report' className={location.pathname === '/mlt/items-issuing-report' ? 'bg-gray-800 text-white rounded-md p-2' : 'text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-2'}>Items Issuing Report</Link>
                      </div>)}
                    </li>
                  </ul>
                </nav>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <img
              className="h-10 w-50 mr-2"
              src="../../src/assets/footer-logo.png"
              alt=""
            />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li className='flex flex-1 flex-col gap-y-1 rounded-lg p-2 text-sm leading-7 font-semibold text-gray-400'>
                <Link to='/mlt/dashboard' className={location.pathname === '/mlt/dashboard' ? 'bg-gray-800 text-white rounded-md p-2' : 'text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-2'}>Dashboard</Link>
                <Link to='/mlt/new-samples' className={location.pathname === '/mlt/new-samples' ? 'bg-gray-800 text-white rounded-md p-2' : 'text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-2'}>New Samples</Link>
                <Link to='/mlt/samples' className={location.pathname === '/mlt/samples' ? 'bg-gray-800 text-white rounded-md p-2' : 'text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-2'}>Accepted Samples</Link>

                <div onClick={() => { setShowInventory(!showInventory) }} className={'flex items-center justify-between text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-2'}>
                  Inventory
                  <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                {showInventory && (<div className='flex flex-col gap-y-1 rounded-lg p-2 text-sm leading-7 font-semibold text-gray-400'>
                  <Link to='/mlt/inventory-general' className={location.pathname === '/mlt/inventory-general' ? 'bg-gray-800 text-white rounded-md p-2' : 'text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-2'}>General</Link>
                  <Link to='/mlt/inventory-surgical' className={location.pathname === '/mlt/inventory-surgical' ? 'bg-gray-800 text-white rounded-md p-2' : 'text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-2'}>Surgical</Link>
                </div>)}

                <div onClick={() => { setShowQuality(!showQuality) }} className={'flex items-center justify-between text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-2'}>
                  Quality
                  <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                {showQuality && (<div className='flex flex-col gap-y-1 rounded-lg p-2 text-sm leading-7 font-semibold text-gray-400'>
                  <Link to='/mlt/quality-instrumental' className={location.pathname === '/mlt/quality-instrumental' ? 'bg-gray-800 text-white rounded-md p-2' : 'text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-2'}>Instrumental</Link>
                  <Link to='/mlt/quality-media' className={location.pathname === '/mlt/quality-media' ? 'bg-gray-800 text-white rounded-md p-2' : 'text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-2'}>Media</Link>
                </div>)}

                <div onClick={() => { setShowReports(!showReports) }} className={'flex items-center justify-between text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-2'}>
                  Reports
                  <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                {showReports && (<div className='flex flex-col gap-y-1 rounded-lg p-2 text-sm leading-7 font-semibold text-gray-400'>
                  <Link to='/mlt/reports' className={location.pathname === '/mlt/reports' ? 'bg-gray-800 text-white rounded-md p-2' : 'text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-2'}>Reports</Link>
                  <Link to='/mlt/sample-count-report' className={location.pathname === '/mlt/sample-count-report' ? 'bg-gray-800 text-white rounded-md p-2' : 'text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-2'}>Sample Count</Link>
                  <Link to='/mlt/general-inventory-report' className={location.pathname === '/mlt/general-inventory-report' ? 'bg-gray-800 text-white rounded-md p-2' : 'text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-2'}>General Inventory Report</Link>
                  <Link to='/mlt/items-issuing-report' className={location.pathname === '/mlt/items-issuing-report' ? 'bg-gray-800 text-white rounded-md p-2' : 'text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-2'}>Items Issuing Report</Link>
                </div>)}
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="lg:pl-72">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">

            <div className="relative flex flex-1 items-center text-3xl">Welcome! {userName}</div>

            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <Menu as="div" className="relative">
                <Menu.Button className="-m-1.5 flex items-center p-1.5">
                  <span className="sr-only">Open user menu</span>
                  <span className="hidden lg:flex lg:items-center">
                    <span className="ml-4 text-lg font-semibold leading-6 text-gray-900" aria-hidden="true">
                      {userName}
                    </span>
                    <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </Menu.Button>
                <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <Menu.Item>
                    <Link to='/profile' className='block px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-50'>Your Profile</Link>
                  </Menu.Item>
                  <Menu.Item>
                    <div onClick={logout} className='block px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-50'>Sign Out</div>
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </div>
          </div>
        </div>

        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Mltsidebar