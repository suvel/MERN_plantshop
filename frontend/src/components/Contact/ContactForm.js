// ContactForm.js
import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const socialLinks = [
  { Icon: Facebook, href: '#' },
  { Icon: Twitter, href: '#' },
  { Icon: Instagram, href: '#' },
  { Icon: Youtube, href: '#' },
];

export function ContactForm() {
  return (
    <div className="bg-green-800 py-16"> {/* Set background to dark green */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-emerald-500 font-semibold">Send Us A Message</h2>
            <h3 className="text-2xl text-white font-bold">Get in touch</h3>
            <p className="text-gray-300">
              We are here to help. Please complete the short form below and we'll respond as soon as possible.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  className="w-10 h-10 bg-navy-800 rounded-full flex items-center justify-center text-white hover:bg-emerald-500 transition-colors duration-300"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="bg-navy-800 text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="bg-navy-800 text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="tel"
                placeholder="Phone No."
                className="bg-navy-800 text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <input
                type="text"
                placeholder="Subject"
                className="bg-navy-800 text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <textarea
              placeholder="Message"
              rows={4}
              className="w-full bg-navy-800 text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            ></textarea>
            <button
              type="submit"
              className="bg-emerald-500 text-white px-8 py-3 rounded-md hover:bg-emerald-600 transition-colors duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
