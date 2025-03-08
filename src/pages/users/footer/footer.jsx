import { ChevronRight } from 'lucide-react';
import logo from '../../../assets/logobala.png';

export const Footer = () => {

  return (
    <footer className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-400 py-16 px-4 md:px-8 lg:px-12 mt-5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Logo and Description Section */}
          <div className="lg:col-span-1 space-y-6">
            <a href='/'>
            <img 
              src={logo} 
              alt="Logo" 
              className="h-16 w-auto transform transition-transform duration-300 hover:scale-105" 
              style={{ objectFit: 'contain' }} 
            />
            </a> 
            <p className="text-sm leading-relaxed text-gray-300">shoes for generations</p>
            <div className="flex gap-6">
              {['Facebook', 'Twitter', 'LinkedIn', 'Github'].map((social) => (
                <a 
                  key={social} 
                  href="#" 
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  <span className="sr-only">{social}</span>
                  <svg className="w-6 h-6 transform hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    {social === 'Facebook' && <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />}
                    {social === 'Twitter' && <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />}
                    {social === 'LinkedIn' && <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />}
                    {social === 'Github' && <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-1">
            <h3 className="text-white text-lg font-semibold mb-6">Shopping</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <a href="/signup" className="hover:text-blue-400 transition-colors duration-300">Sign up</a>
                <span className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300 rounded-full px-3 py-1">
                  <a href="/login" className="text-white text-sm hover:text-gray-200">Login</a>
                </span>
              </li>
            </ul>
          </div>


          {/* Contact Section */}
          <div className="lg:col-span-1">
            <h3 className="text-white text-lg font-semibold mb-6">Get in touch</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400">24/7 Customer Support</p>
                <p className="text-white font-medium text-lg">+256 781 686 065</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Need live support?</p>
                <a href="mailto:support@greyarmour.com" 
                   className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                  support@balacanvas.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-gray-600/90 flex flex-col md:flex-row justify-between items-center">
          <div className="flex gap-8 mb-4 md:mb-0">
            {['English', 'Privacy Policy', 'Support'].map((item) => (
              <a key={item} href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                {item}
              </a>
            ))}
          </div>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Bala Canvas. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};
