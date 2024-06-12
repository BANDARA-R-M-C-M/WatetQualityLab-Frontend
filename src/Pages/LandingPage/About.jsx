import React from 'react';
import Header from './Header';

function About() {
    return (
        <>
            <section id="about" className="py-20 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-8">About Us</h2>
                    <p className="text-xl text-center text-gray-700 mb-8">
                        We are a leading health laboratory committed to providing high-quality testing and reporting services under Ministry of Health. Our laboratory facilities and experienced staff ensure accurate and reliable results for all regional water quality reports.
                    </p>
                </div>
            </section>
        </>
    );
}

export default About;
