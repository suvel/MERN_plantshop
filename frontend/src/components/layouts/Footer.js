import React from 'react';
import { Logo } from './Logo'; // Ensure the path is correct
import { SocialLinks } from './SocialLinks'; // Ensure the path is correct
import { Phone, Mail } from 'lucide-react'; // Ensure lucide-react is installed

export default function Footer() {
  return (
    <footer className="bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <Logo />
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Your one-stop solution for all your shopping needs.
          </p>
          <SocialLinks />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-gray-800">Got Questions? Connect Us</h3>
            <div className="flex items-center gap-2 text-emerald-500">
              <Phone size={20} />
              <a href="tel:+180012151214" className="hover:text-emerald-600 transition-colors">
                +1800-1215-1214
              </a>
            </div>
            <div className="flex items-center gap-2 text-emerald-500">
              <Mail size={20} />
              <a href="mailto:Example@mail.com" className="hover:text-emerald-600 transition-colors">
                Example@mail.com
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-gray-800">Useful Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-emerald-500">About Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-emerald-500">How to Shop</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-emerald-500">FAQ</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-emerald-500">Contact Us</a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-gray-800">My Account</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-emerald-500">Sign In</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-emerald-500">View Cart</a>
              </li>
              
              <li>
                <a href="#" className="text-gray-600 hover:text-emerald-500">Track My Order</a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-gray-800">Follow Us</h3>
            <SocialLinks />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200">
          <p className="text-gray-600 text-sm">
            Trees Herbs & More Flowers - 2024-2025, All Rights Reserved
          </p>
          
        </div>
      </div>
    </footer>
  );
}
