import {Link, Outlet, useLocation} from 'react-router-dom';
import {Fragment, useState} from 'react'
import {Dialog, Menu, Transition} from '@headlessui/react'
import {
  PlusIcon,
  Bars3Icon,
  BellIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import {ChevronDownIcon} from '@heroicons/react/20/solid'
import { useAuth } from "../Context/useAuth";

function Adminsidebar() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const{ logout, user } = useAuth();

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
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li className='flex flex-1 flex-col gap-y-1 rounded-lg p-2 text-sm leading-7 font-semibold text-gray-400'>
                          <Link to='/admin/dashboard' className={location.pathname === '/admin/dashboard' ? 'bg-gray-800 text-white rounded-md p-2' : 'text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-2'}>Dashboard</Link>
                          <Link to='/admin/mlts' className={location.pathname === '/admin/mlts' ? 'bg-gray-800 text-white rounded-md p-2' : 'text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-2'}>MLT</Link>
                          <Link to='/admin/phis' className={location.pathname === '/admin/phis' ? 'bg-gray-800 text-white rounded-md p-2' : 'text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-2'}>PHI</Link>
                          <Link to='/admin/moh-supervisors' className={location.pathname === '/admin/moh-supervisors' ? 'bg-gray-800 text-white rounded-md p-2' : 'text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-2'}>MOH Supervisor</Link>
                          <Link to='/admin/laboratories' className={location.pathname === '/admin/laboratories' ? 'bg-gray-800 text-white rounded-md p-2' : 'text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-2'}>Laboratories</Link>
                          <Link to='/admin/phi-areas' className={location.pathname === '/admin/phi-areas' ? 'bg-gray-800 text-white rounded-md p-2' : 'text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-2'}>PHI Areas</Link>
                          <Link to='/admin/moh-areas' className={location.pathname === '/admin/moh-areas' ? 'bg-gray-800 text-white rounded-md p-2' : 'text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-2'}>MOH Areas</Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li className='flex flex-1 flex-col gap-y-1 rounded-lg p-2 text-sm leading-7 font-semibold text-gray-400'>
                  <Link to='/admin/dashboard' className={location.pathname === '/admin/dashboard' ? 'bg-gray-800 text-white rounded-md p-2' : 'text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-2'}>Dashboard</Link>
                  <Link to='/admin/mlts' className={location.pathname === '/admin/mlts' ? 'bg-gray-800 text-white rounded-md p-2' : 'text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-2'}>MLT</Link>
                  <Link to='/admin/phis' className={location.pathname === '/admin/phis' ? 'bg-gray-800 text-white rounded-md p-2' : 'text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-2'}>PHI</Link>
                  <Link to='/admin/moh-supervisors' className={location.pathname === '/admin/moh-supervisors' ? 'bg-gray-800 text-white rounded-md p-2' : 'text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-2'}>MOH Supervisor</Link>
                  <Link to='/admin/laboratories' className={location.pathname === '/admin/laboratories' ? 'bg-gray-800 text-white rounded-md p-2' : 'text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-2'}>Laboratories</Link>
                  <Link to='/admin/phi-areas' className={location.pathname === '/admin/phi-areas' ? 'bg-gray-800 text-white rounded-md p-2' : 'text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-2'}>PHI Areas</Link>
                  <Link to='/admin/moh-areas' className={location.pathname === '/admin/moh-areas' ? 'bg-gray-800 text-white rounded-md p-2' : 'text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-2'}>MOH Areas</Link>
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

            {/* Separator */}
            <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">

              <div className="relative flex flex-1 items-center">Welcome! {userName}</div>

              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <button
                    type="button"
                    className="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                    <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                    Add New
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Separator */}
                <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" />

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full bg-gray-50"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <span className="hidden lg:flex lg:items-center">
                      <span className="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
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
              <Outlet/>
            </div>
          </main>
        </div>
      </div>
);
}

export default Adminsidebar