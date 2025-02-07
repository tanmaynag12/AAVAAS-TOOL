import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Handshake } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Handshake className="h-6 w-6 text-teal-600" />
              <h3 className="text-lg font-semibold text-gray-900">SpeechBridge Connect</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Professional online speech therapy and audiology consultations, empowering communication together.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-teal-600">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-600">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-600">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-teal-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-teal-600">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/therapists" className="text-gray-600 hover:text-teal-600">
                  Find a Therapist
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-teal-600">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-600">
                <Mail className="h-5 w-5 mr-2" />
                <a href="mailto:support@speechbridge.com">support@speechbridge.com</a>
              </li>
              <li className="flex items-center text-gray-600">
                <Phone className="h-5 w-5 mr-2" />
                <a href="tel:+918041234567">+91 80 4123 4567</a>
              </li>
              <li className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2" />
                <span>123 Koramangala, 5th Block<br />Bangalore, Karnataka 560034</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-teal-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-teal-600">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="text-gray-600 hover:text-teal-600">
                  Accessibility
                </Link>
              </li>
              <li>
                <Link to="/hipaa" className="text-gray-600 hover:text-teal-600">
                  HIPAA Compliance
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} SpeechBridge Connect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;