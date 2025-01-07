import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const socialLinks = [
  { Icon: Facebook, href: 'https://www.facebook.com/Treesherbs/', color: 'hover:text-blue-600' },
  { Icon: Twitter, href: '#', color: 'hover:text-blue-400' },
  { Icon: Instagram, href: 'https://www.instagram.com/trees_herbsandmore_plants?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', color: 'hover:text-pink-600' },
  { Icon: Youtube, href: '#', color: 'hover:text-red-600' },
];

export function SocialLinks() {
  return (
    <div className="flex justify-center gap-4 my-6">
      {socialLinks.map(({ Icon, href, color }, index) => (
        <a
          key={index}
          href={href}
          className={`bg-emerald-50 p-2 rounded-full hover:scale-110 transition-all ${color}`}
          aria-label={`Social media link`}
        >
          <Icon size={20} className="transition-colors" />
        </a>
      ))}
    </div>
  );
}
