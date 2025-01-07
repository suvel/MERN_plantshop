import React, { useState, useEffect } from 'react';
import { Leaf, Search, ShoppingCart, User, Menu, X, Home, ShoppingBag, ClipboardList, Info } from 'lucide-react';
import { MobileMenu } from './MobileMenu';
import { SearchBar } from './SearchBar';
import { CartButton } from './CartButton';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Image } from 'react-bootstrap';
import { logout } from '../../actions/userActions';
import { motion } from 'framer-motion';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const { items: cartItems } = useSelector((state) => state.cartState);

  const headerRef = React.useRef(null);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSearchVisible(false);
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAboutClick = () => {
    navigate('/about');
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  const ProfileButton = ({ children }) => (
    <Dropdown.Toggle 
      variant="default" 
      id="dropdown-basic"
      className="text-white hover:text-white/80 transition-colors p-1 after:hidden"
    >
      {children}
    </Dropdown.Toggle>
  );

  const ProfileDropdownContent = () => (
    <Dropdown.Menu className="mt-2 rounded-md shadow-lg">
      {user?.role === 'admin' && (
        <Dropdown.Item
          onClick={() => navigate('/admin/dashboard')}
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Dashboard
        </Dropdown.Item>
      )}
      <Dropdown.Item
        onClick={() => navigate('/myprofile')}
        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Profile
      </Dropdown.Item>
      <Dropdown.Item
        onClick={() => navigate('/orders')}
        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Orders
      </Dropdown.Item>
      <Dropdown.Item 
        onClick={logoutHandler} 
        className="px-4 py-2 text-sm text-red-600 hover:bg-red-50"
      >
        Logout
      </Dropdown.Item>
    </Dropdown.Menu>
  );

  return (
    <>
      <header ref={headerRef} className="w-full fixed top-0 z-50">
        {/* Announcement Bar */}
        <div className="bg-white text-[#166534] text-center py-1 text-xs sm:text-sm md:py-2">
          <div className="px-4 md:px-6">
            <span className="inline-block">Free Shipping on Orders Over د.إ75</span>
            <span className="hidden sm:inline-block"> | </span>
            <span className="block sm:inline-block">Same Day Delivery Available</span>
          </div>
        </div>

        {/* Main Header */}
        <div className="bg-[#166534] text-white">
          <div className="max-w-7xl mx-auto">
            {/* Top Bar */}
            <div className="px-4 py-2 md:py-4 flex items-center justify-between">
              {/* Left Section */}
              <div className="flex items-center gap-2 lg:gap-4">
                <button
                  className="lg:hidden p-1"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
                
                <Link to="/" className="flex items-center gap-2">
                  <img 
                    src="/images/logo.png" 
                    alt="Logo" 
                    className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20" 
                  />
                  <span className="text-lg md:text-xl font-semibold hidden sm:inline">
                    Trees Herbs & more Flowers
                  </span>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-6 xl:gap-8 rounded-xl">
                <Link to="/" className="nav-link flex items-center gap-2 text-sm xl:text-base">
                  <Home size={18} />
                  <span>Home</span>
                </Link>
                <Link to="/shop" className="nav-link flex items-center gap-2 text-sm xl:text-base">
                  <ShoppingBag size={18} />
                  <span>Shop</span>
                </Link>
                <Link to="/orders" className="nav-link flex items-center gap-2 text-sm xl:text-base">
                  <ClipboardList size={18} />
                  <span>Orders</span>
                </Link>
                <button onClick={handleAboutClick} className="nav-link flex items-center gap-2 text-sm xl:text-base">
                  <Info size={18} />
                  <span>About</span>
                </button>
                <Link to="/contact" className="nav-link text-sm xl:text-base">
                  Contact
                </Link>
              </nav>

              {/* Right Section */}
              <div className="flex items-center gap-2 sm:gap-4">
                {/* Search Toggle for Mobile */}
                <button 
                  className="lg:hidden p-1"
                  onClick={() => setIsSearchVisible(!isSearchVisible)}
                >
                  <Search size={20} />
                </button>

                {/* Desktop Search */}
                <div className="hidden lg:block w-64 xl:w-72">
                  <SearchBar />
                </div>

                {/* User Profile */}
                {isAuthenticated ? (
                  <Dropdown className="relative">
                    <ProfileButton>
                      <span className="hidden sm:inline-block">{user.name}</span>
                      <User size={20} className="sm:hidden" />
                    </ProfileButton>
                    <ProfileDropdownContent />
                  </Dropdown>
                ) : (
                  <button
                    onClick={() => navigate('/login')}
                    className="p-1 hover:text-white/80 transition-colors"
                  >
                    <User size={20} />
                  </button>
                )}

                {/* Cart */}
                <Link 
                  to="/cart" 
                  className="flex items-center gap-1 p-1 hover:text-white/80 transition-colors"
                >
                  <ShoppingCart size={20} />
                  <motion.span
                    className="bg-white text-[#166534] text-xs font-bold rounded-full px-1.5 py-0.5"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 5 }}
                  >
                    {cartItems.length}
                  </motion.span>
                </Link>
              </div>
            </div>

            {/* Mobile Search Bar */}
            <div className={`lg:hidden px-4 pb-3 ${isSearchVisible ? 'block' : 'hidden'}`}>
              <SearchBar />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`
            fixed inset-0 bg-black bg-opacity-50 transition-opacity lg:hidden
            ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
          `}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div 
            className={`
              fixed top-0 left-0 bottom-0 w-64 bg-white transform transition-transform
              ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}
            onClick={e => e.stopPropagation()}
          >
            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
          </div>
        </div>
      </header>

      {/* Content Spacer */}
      <div style={{ paddingTop: `${headerHeight}px` }} />

      {/* Global Styles */}
      <style jsx global>{`
        .nav-link {
          @apply text-white hover:text-white/80 transition-colors;
        }
        
        .dropdown-toggle::after {
          display: none !important;
        }
        
        @media (max-width: 640px) {
          .announcement-text {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </>
  );
}