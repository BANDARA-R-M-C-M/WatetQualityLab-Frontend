import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Navbar } from "flowbite-react";

function Header() {
    return (
        <>
            <header className="bg-white shadow">
                <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                    <div className="flex items-center">
                        <img src="../../src/assets/image.png" alt="" className='w-8 h-10 mr-3'/>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Water Quality Testing Laboratory</h1>
                    </div>
                    <div className="flex items-center">
                        <nav>
                            <a href="#hero" className="mx-2 text-gray-700 hover:text-blue-500">Home</a>
                            <a href="#about" className="mx-2 text-gray-700 hover:text-blue-500">About</a>
                            <a href="#services" className="mx-2 text-gray-700 hover:text-blue-500">Services</a>
                        </nav>
                        <Link to="/login" className="mx-2 text-gray-700 hover:text-blue-500">
                            <Button color="blue">Login</Button>
                        </Link>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
