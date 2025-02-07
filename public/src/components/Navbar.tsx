import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Handshake, 
  MessageSquare, 
  Calendar, 
  LogOut, 
  Menu, 
  X, 
  FileText, 
  Activity,
  User,
  HelpCircle
} from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <>
      {/* Stats Ribbon */}
      <div className="bg-teal-600 text-white py-2 overflow-hidden">
        <div className="relative">
          <div className="animate-marquee whitespace-nowrap">
            <span className="mx-4">🏥 Over 50,000 patients helped worldwide</span>
            <span className="mx-4">👨‍⚕️ 500+ certified specialists</span>
            <span className="mx-4">💪 95% success rate in treatment</span>
            <span className="mx-4">🌟 Pioneering speech therapy since 1995</span>
            <span className="mx-4">🎯 15,000+ successful therapy sessions conducted</span>
          </div>
        </div>
      </div>
      
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex-1 flex items-center justify-between">
              <Link to="/" className="flex items-center">
                <Handshake className="h-8 w-8 text-teal-600" />
              </Link>
              
              <div className="text-center flex-1">
                <span className="text-xl font-bold text-gray-800">SpeechBridge Connect</span>
                <p className="text-sm text-gray-500 hidden md:block">Empowering Communication Together</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-4">
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
                <Link to="/messages" className="nav-link">
                  <MessageSquare className="h-5 w-5" />
                  <span>Messages</span>
                </Link>
                <Link to="/appointments" className="nav-link">
                  <Calendar className="h-5 w-5" />
                  <span>Appointments</span>
                </Link>
                <Link to="/resources" className="nav-link">
                  <FileText className="h-5 w-5" />
                  <span>Resources</span>
                </Link>
                <Link to="/activities" className="nav-link">
                  <Activity className="h-5 w-5" />
                  <span>Activities</span>
                </Link>
                
                {/* Profile Dropdown */}
                <div className="relative group">
                  <button className="flex items-center space-x-1 text-gray-700 hover:text-teal-600">
                    <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                      <span className="text-sm font-medium text-teal-600">
                        {user?.email?.[0].toUpperCase()}
                      </span>
                    </div>
                  </button>
                  <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50">
                      Profile Settings
                    </Link>
                    <Link to="/help" className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50">
                      Help & FAQ
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-teal-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-700"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-teal-600 hover:bg-teal-50"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="mobile-nav-link">
                    Dashboard
                  </Link>
                  <Link to="/messages" className="mobile-nav-link">
                    Messages
                  </Link>
                  <Link to="/appointments" className="mobile-nav-link">
                    Appointments
                  </Link>
                  <Link to="/resources" className="mobile-nav-link">
                    Resources
                  </Link>
                  <Link to="/activities" className="mobile-nav-link">
                    Activities
                  </Link>
                  <Link to="/profile" className="mobile-nav-link">
                    Profile Settings
                  </Link>
                  <Link to="/help" className="mobile-nav-link">
                    Help & FAQ
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="mobile-nav-link">
                    Login
                  </Link>
                  <Link to="/register" className="mobile-nav-link">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;