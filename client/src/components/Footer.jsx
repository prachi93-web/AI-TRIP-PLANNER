import React from "react";
import { Link } from "react-router-dom";
import { Plane, Mail, Phone, MapPin } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-purple-100 mt-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left */}

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full bg-purple-100 flex items-center justify-center">
                <Plane className="text-purple-700 rotate-45" size={20} />
              </div>

              <h2 className="text-2xl font-bold">
                <span className="text-purple-700">AI</span> Travel Planner
              </h2>
            </div>

            <p className="text-gray-600 text-[15px] leading-7 max-w-sm">
              AI Travel Planner helps you create personalized travel itineraries
              based on your destination, interests, duration and budget using
              Artificial Intelligence.
            </p>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="text-xl font-semibold mb-5">Quick Links</h3>

            <ul className="space-y-3 text-gray-600">
              <li>
                <Link to="/" className="hover:text-purple-700 transition">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/my-trips"
                  className="hover:text-purple-700 transition"
                >
                  My Trips
                </Link>
              </li>

              <li>
                <Link to="/login" className="hover:text-purple-700 transition">
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="hover:text-purple-700 transition"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}

          <div>
            <h3 className="text-xl font-semibold mb-5">Contact Us</h3>

            <div className="space-y-4 text-gray-600">
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-purple-700" />

                <span>+91 9876543210</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} className="text-purple-700" />

                <span>support@aitravelplanner.com</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-purple-700" />

                <span>India</span>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-purple-100 hover:bg-purple-700 hover:text-white transition flex items-center justify-center"
              >
                <FaFacebookF size={16} />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-purple-100 hover:bg-purple-700 hover:text-white transition flex items-center justify-center"
              >
                <FaInstagram size={16} />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-purple-100 hover:bg-purple-700 hover:text-white transition flex items-center justify-center"
              >
                <FaLinkedinIn size={16} />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-purple-100 hover:bg-purple-700 hover:text-white transition flex items-center justify-center"
              >
                <FaGithub size={16} />
              </a>
            </div>
          </div>
        </div>

        <hr className="my-7 border-purple-100" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-gray-500 text-center">
            © 2026 AI Travel Planner. All Rights Reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <span className="text-gray-500 hover:text-purple-700 cursor-pointer transition">
              Privacy Policy
            </span>

            <span className="text-gray-500 hover:text-purple-700 cursor-pointer transition">
              Terms & Conditions
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
