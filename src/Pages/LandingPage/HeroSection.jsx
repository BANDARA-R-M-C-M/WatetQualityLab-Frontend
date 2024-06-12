import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

function HeroSection() {
    return (
        <>
            <section id="hero" className="bg-blue-600 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-5xl font-bold mb-4">Leading Health Laboratory Services</h2>
                    <p className="text-xl mb-8">Ensuring quality and reliability in health testing and diagnostics.</p>
                    <a href="#services" className="bg-white text-blue-600 py-3 px-6 rounded-full font-semibold">Our Services</a>
                </div>
            </section>
        </>
    );
}

export default HeroSection;
