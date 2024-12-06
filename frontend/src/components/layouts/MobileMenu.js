import React from 'react';
import { Home, ShoppingBag, ClipboardList, Heart, Info, X } from 'lucide-react'; // Import the X icon

export function MobileMenu({ isOpen, onClose }) {
  const menuItems = [
    { icon: <Home size={20} />, label: 'Home', href: '/' },
    { icon: <ShoppingBag size={20} />, label: 'Shop', href: '/shop' },
    { icon: <ClipboardList size={20} />, label: 'Orders', href: '/orders' },
    { icon: <Heart size={20} />, label: 'Wishlist', href: '/wishlist' },
    { icon: <Info size={20} />, label: 'About', href: '/about' },
  ];

  return (
    <div
      className={`fixed inset-0 bg-emerald-500 z-50 transform transition-transform duration-300 lg:hidden ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="p-4">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-white">
          <X size={24} />
        </button>
        <nav className="space-y-4 mt-8"> {/* Add margin-top to create space below the button */}
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 text-white hover:bg-[#166534] px-4 py-3 rounded-lg transition-colors"
              onClick={onClose} // Close menu on item click
            >
              {item.icon}
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
