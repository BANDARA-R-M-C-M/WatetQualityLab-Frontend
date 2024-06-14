import React from 'react';

function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex flex-wrap justify-between">
          <div className="w-full sm:w-1/2 lg:w-1/5 mb-6">
            <img src="../../src/assets/footer-logo.png" alt="Ministry of Health Logo" className="w-48 mb-4" />
            <p className="text-sm">
              Ministry of Health<br />
              Suwasiripaya, No. 385, Rev. Baddegama Wimalawansa Thero Mawatha, Colombo 10, Sri Lanka.
            </p>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/5 mb-6">
            <h3 className="text-lg font-bold mb-4">Contact Information</h3>
            <p className="text-sm">📍 Suwasiripaya, No. 385,<br />Rev. Baddegama Wimalawansa Thero Mawatha, Colombo 10, Sri Lanka.</p>
            <p className="text-sm">📞 (94) 112 694033 | (94) 112 675449</p>
            <p className="text-sm">📞 (94) 112 675011 | (94) 112 693493</p>
            <p className="text-sm">✉️ info(at)health.gov.lk</p>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/5 mb-6">
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul>
              <li><a href="#" className="text-sm hover:underline">Home</a></li>
              <li><a href="#" className="text-sm hover:underline">About Us</a></li>
              <li><a href="#" className="text-sm hover:underline">Your Health and Wellbeing</a></li>
              <li><a href="#" className="text-sm hover:underline">Web Mail</a></li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/5 mb-6">
            <h3 className="text-lg font-bold mb-4">Important Links</h3>
            <ul>
              <li><a href="#" className="text-sm hover:underline">General Notices</a></li>
              <li><a href="#" className="text-sm hover:underline">Projects</a></li>
              <li><a href="#" className="text-sm hover:underline">Financial Reports</a></li>
              <li><a href="#" className="text-sm hover:underline">Health Bulletin</a></li>
              <li><a href="#" className="text-sm hover:underline">Publications</a></li>
              <li><a href="#" className="text-sm hover:underline">Tenders & Procurement</a></li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/5 mb-6">
            <h3 className="text-lg font-bold mb-4">Help</h3>
            <ul>
              <li><a href="#" className="text-sm hover:underline">Contact Info</a></li>
              <li><a href="#" className="text-sm hover:underline">Telephone Directory</a></li>
              <li><a href="#" className="text-sm hover:underline">Traveller’s Guide</a></li>
              <li><a href="#" className="text-sm hover:underline">Previous Website</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center mt-6">
          <p className="text-sm text-center">Copyright © 2024 - Ministry of Health - All Rights Reserved. Concept, Design & Development by Weblankan & Arrogance Technologies (Pvt) Ltd</p>
          <a href="#" className="text-sm hover:underline">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
