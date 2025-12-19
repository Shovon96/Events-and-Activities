import Link from "next/link";
import CommonLogo from "./CommonLogo";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Heart,
  ArrowRight,
} from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <CommonLogo />
            <p className="text-sm text-gray-400 leading-relaxed">
              Eventora is your trusted platform for discovering and booking amazing events.
              Connect with hosts and create unforgettable experiences.
            </p>
            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-linear-to-r hover:from-purple-600 hover:to-pink-600 flex items-center justify-center transition-all duration-300 group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-linear-to-r hover:from-purple-600 hover:to-pink-600 flex items-center justify-center transition-all duration-300 group"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-linear-to-r hover:from-purple-600 hover:to-pink-600 flex items-center justify-center transition-all duration-300 group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-linear-to-r hover:from-purple-600 hover:to-pink-600 flex items-center justify-center transition-all duration-300 group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-linear-to-r from-purple-600 to-pink-600"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-sm hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                >
                  Explore Events
                </Link>
              </li>
              <li>
                <Link
                  href="/become-host"
                  className="text-sm hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                >
                  Become a Host
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 relative inline-block">
              Support
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-linear-to-r from-purple-600 to-pink-600"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/contact"
                  className="text-sm hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 relative inline-block">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-linear-to-r from-purple-600 to-pink-600"></span>
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                <span className="text-sm">
                  123 Event Street, City Center
                  <br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-purple-500 shrink-0" />
                <p
                  className="text-sm hover:text-white transition-colors"
                >
                  +1 (123) 456-7890
                </p>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-purple-500 shrink-0" />
                <p
                  className="text-sm hover:text-white transition-colors"
                >
                  support@eventora.com
                </p>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-sm text-gray-400 mb-3">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-purple-500 transition-colors"
                />
                <button className="px-3 py-1 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap">
                  <ArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400 text-center md:text-left">
              &copy; {currentYear} Eventora. All rights reserved.
            </p>
            <p className="text-sm text-gray-400 flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by Eventora
              Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
