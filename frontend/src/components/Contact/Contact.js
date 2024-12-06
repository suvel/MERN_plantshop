import React from 'react';
import { ContactInfo } from './ContactInfo'; // Import as named export
import { ContactForm } from './ContactForm'; // Import as named export

const Contact = () => {
  return (
    <div>
      <ContactInfo />
      <ContactForm />
    </div>
  );
};

export default Contact;
