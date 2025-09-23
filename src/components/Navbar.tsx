import { Link } from 'react-router-dom';
import Links from './Links';
import Showcase from '../pages/Showcase';
import { useState } from 'react';
import { useAuth } from '../context/authContext';

export default function Navbar() {
  const [showLinksModal, setShowLinksModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logOut } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="w-full flex justify-end items-center bg-white shadow-md">
      <div className="w-full h-[100px] p-[24px] flex flex-row justify-between items-center text-violet-600">
        <div>
          <img src="/images/Group 252.svg" width={146} height={32} alt="logo" />
        </div>

        {/* Hamburger Icon for Mobile */}
        <button
          className="md:hidden flex items-center focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <svg
            className="w-6 h-6 text-violet-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex gap-4">
          <Link
            to="#"
            onClick={(e) => {
              e.preventDefault();
              setShowLinksModal(true);
            }}
          >
            <button className="flex items-center gap-3 px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-lg transition-colors duration-200 cursor-pointer border-0">
              <img
                src="/images/ph_link-bold.png"
                width={20}
                height={20}
                alt="link icon"
                className="filter brightness-0 invert opacity-90 hover:bg-neutral-600"
              />
              <span className="text-[15px]">Add Links</span>
            </button>
          </Link>

          <Link
            to="#"
            onClick={(e) => {
              e.preventDefault();
              setShowPreviewModal(true);
            }}
          >
            <button className="px-5 py-2 rounded-lg cursor-pointer border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors shadow-sm text-gray-700 font-medium">
              <span className="text-[16px]">Preview</span>
            </button>
          </Link>

          <button
            className="px-5 py-2 rounded-lg cursor-pointer bg-red-400 hover:bg-red-300 transition-colors shadow-sm text-black font-normal"
            onClick={logOut}
          >
            <span className="text-[16px]">Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-[100px] left-0 w-full bg-white shadow-md z-40">
          <div className="flex flex-col items-center gap-4 p-4">
            <Link
              to="#"
              onClick={(e) => {
                e.preventDefault();
                setShowLinksModal(true);
                setIsMobileMenuOpen(false);
              }}
            >
              <button className="flex items-center justify-center gap-3 px-5 py-2.5 w-full bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-lg transition-colors duration-200 cursor-pointer border-0">
                <img
                  src="/images/ph_link-bold.png"
                  width={20}
                  height={20}
                  alt="link icon"
                  className="filter brightness-0 invert opacity-90"
                />
                <span className="text-[15px]">Add Links</span>
              </button>
            </Link>

            <Link
              to="#"
              onClick={(e) => {
                e.preventDefault();
                setShowPreviewModal(true);
                setIsMobileMenuOpen(false);
              }}
            >
              <button className="px-5 py-2  rounded-lg cursor-pointer border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors shadow-sm text-gray-700 font-medium">
                <span className="text-[16px]">Preview</span>
              </button>
            </Link>

            <button
              className="px-5 py-2  rounded-lg cursor-pointer bg-red-400 hover:bg-red-300 transition-colors shadow-sm text-black font-normal"
              onClick={() => {
                logOut();
                setIsMobileMenuOpen(false);
              }}
            >
              <span className="text-[16px]">Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* Links Modal Overlay */}
      {showLinksModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full m-4">
            <Links onClose={() => setShowLinksModal(false)} />
          </div>
        </div>
      )}

      {/* Preview Modal Overlay */}
      {showPreviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full m-4">
            <Showcase onClose={() => setShowPreviewModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
}