"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [paymentStep, setPaymentStep] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const totalSteps = 5;

  // Banks data
  const banks = [
    { id: 'barclays', name: 'Barclays', color: '#00AEEF' },
    { id: 'natwest', name: 'NatWest', color: '#4E2A84' },
    { id: 'lloyds', name: 'Lloyds', color: '#006A4D' },
    { id: 'hsbc', name: 'HSBC', color: '#DB0011' },
  ];

  // Add auto-cycling through payment steps
  useEffect(() => {
    const interval = setInterval(() => {
      setPaymentStep((prev) => {
        const nextStep = (prev + 1) % totalSteps;
        // Reset selected bank when returning to first step
        if (nextStep === 0 && prev === totalSteps - 1) {
          setSelectedBank(null);
        }
        // Randomly select a bank when reaching bank selection step
        if (nextStep === 1) {
          const randomBank = banks[Math.floor(Math.random() * banks.length)];
          setSelectedBank(randomBank.id);
        }
        return nextStep;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Add smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href');
        if (targetId) {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    document.addEventListener('click', handleAnchorClick);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleDropdown = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // When opening mobile menu, close any open dropdowns
    if (!mobileMenuOpen) {
      setActiveDropdown(null);
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* News Banner */}
      <div className="bg-indigo-100 py-2 px-4">
        <div className="container mx-auto flex items-center justify-center text-center">
          <span className="text-primary mr-2">📢 News:</span>
          <span className="mr-2 text-sm md:text-base">Syntropi launches account-to-account payments</span>
          <a href="#features" className="text-primary font-medium flex items-center text-sm md:text-base">
            Learn more
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>

      {/* Header/Navigation */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled || mobileMenuOpen ? 'bg-white shadow-sm' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center z-10">
            <h1 style={{ 
              background: 'linear-gradient(90deg, #6366F1, #8B5CF6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '1.5rem',
              fontWeight: 'bold' 
            }}>
              Syntropi
            </h1>
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            {/* Products Dropdown */}
            <div className="relative group">
              <button 
                onClick={() => toggleDropdown('products')}
                className="px-4 py-2 text-gray-600 hover:text-primary hover:bg-primary/5 rounded-md transition-all duration-200 hover:scale-105 flex items-center"
              >
                Products
                <svg className={`w-4 h-4 ml-1 transform transition-transform ${activeDropdown === 'products' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {activeDropdown === 'products' && (
                <div className="absolute left-0 mt-1 w-64 bg-white shadow-lg rounded-md p-4 z-10">
                  <div className="grid gap-3">
                    <a href="#features" className="flex items-start p-2 rounded-md hover:bg-gray-50" onClick={() => setActiveDropdown(null)}>
                      <div className="bg-blue-100 p-2 rounded-md text-blue-600 mr-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Pay ins</p>
                        <p className="text-sm text-gray-500">Collect payments easily</p>
                      </div>
                    </a>
                    <a href="#features" className="flex items-start p-2 rounded-md hover:bg-gray-50" onClick={() => setActiveDropdown(null)}>
                      <div className="bg-purple-100 p-2 rounded-md text-purple-600 mr-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Pay outs</p>
                        <p className="text-sm text-gray-500">Send payments instantly</p>
                      </div>
                    </a>
                    <a href="#data-products" className="flex items-start p-2 rounded-md hover:bg-gray-50" onClick={() => setActiveDropdown(null)}>
                      <div className="bg-green-100 p-2 rounded-md text-green-600 mr-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Data Products</p>
                        <p className="text-sm text-gray-500">Analytics & insights</p>
                      </div>
                    </a>
                  </div>
                </div>
              )}
            </div>
            
            {/* Pricing Link */}
            <a 
              href="#pricing" 
              className="px-4 py-2 text-gray-600 hover:text-primary hover:bg-primary/5 rounded-md transition-all duration-200 hover:scale-105"
            >
              Pricing
            </a>
            
            {/* Developer Link */}
            <a 
              href="https://developer.syntropi.co.uk" 
            target="_blank"
            rel="noopener noreferrer"
              className="px-4 py-2 text-gray-600 hover:text-primary hover:bg-primary/5 rounded-md transition-all duration-200 hover:scale-105"
            >
              Developer
            </a>
            
            {/* Resources Dropdown */}
            <div className="relative group">
              <button 
                onClick={() => toggleDropdown('resources')}
                className="px-4 py-2 text-gray-600 hover:text-primary hover:bg-primary/5 rounded-md transition-all duration-200 hover:scale-105 flex items-center"
              >
                Resources
                <svg className={`w-4 h-4 ml-1 transform transition-transform ${activeDropdown === 'resources' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {activeDropdown === 'resources' && (
                <div className="absolute right-0 mt-1 w-64 bg-white shadow-lg rounded-md p-4 z-10">
                  <div className="grid gap-3">
                    <a href="https://developer.syntropi.co.uk" className="flex items-start p-2 rounded-md hover:bg-gray-50" onClick={() => setActiveDropdown(null)}>
                      <div className="bg-amber-100 p-2 rounded-md text-amber-600 mr-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Documentation</p>
                        <p className="text-sm text-gray-500">Guides & API reference</p>
                      </div>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <a href="#contact" className="hidden md:block px-4 py-2 border border-gray-300 rounded-full hover:border-indigo-400 hover:bg-indigo-50/5 hover:scale-105 transition-all duration-200">
              Contact us
            </a>
            <a
              href="https://www.dashboard.syntropi.co.uk/" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-white rounded-full hover:shadow-lg hover:shadow-indigo-300/30 hover:scale-105 transition-all duration-200 flex items-center"
              style={{ 
                display: 'flex', 
                background: 'linear-gradient(90deg, #6366F1, #8B5CF6)'
              }}
            >
              Sign in
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden z-10">
            <button 
              className="text-gray-600 focus:outline-none p-2 hover:bg-gray-100 rounded-md"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } md:hidden flex flex-col`}
          style={{ top: '60px', height: 'calc(100% - 60px)' }}
        >
          <div className="overflow-y-auto py-4 px-6 flex-1">
            <div className="border-b border-gray-200 pb-4 mb-4">
              <div className="flex flex-col space-y-1">
                <div className="py-3">
                  <button 
                    onClick={() => toggleDropdown('mobile-products')}
                    className="flex justify-between items-center w-full text-left px-2 py-2 rounded-md hover:bg-primary/5"
                  >
                    <span className="text-lg font-medium">Products</span>
                    <svg 
                      className={`w-5 h-5 transform transition-transform ${activeDropdown === 'mobile-products' ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  
                  {activeDropdown === 'mobile-products' && (
                    <div className="mt-2 ml-4 space-y-2">
                      <a href="#features" className="block p-2 rounded-md hover:bg-gray-50" onClick={closeMobileMenu}>
                        <div className="flex items-center">
                          <div className="bg-blue-100 p-2 rounded-md text-blue-600 mr-3">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium">Pay ins</p>
                            <p className="text-sm text-gray-500">Collect payments easily</p>
                          </div>
                        </div>
                      </a>
                      
                      <a href="#features" className="block p-2 rounded-md hover:bg-gray-50" onClick={closeMobileMenu}>
                        <div className="flex items-center">
                          <div className="bg-purple-100 p-2 rounded-md text-purple-600 mr-3">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium">Pay outs</p>
                            <p className="text-sm text-gray-500">Send payments instantly</p>
                          </div>
                        </div>
                      </a>
                      
                      <a href="#data-products" className="block p-2 rounded-md hover:bg-gray-50" onClick={closeMobileMenu}>
                        <div className="flex items-center">
                          <div className="bg-green-100 p-2 rounded-md text-green-600 mr-3">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium">Data Products</p>
                            <p className="text-sm text-gray-500">Analytics & insights</p>
                          </div>
                        </div>
                      </a>
                    </div>
                  )}
                </div>
                
                <div className="py-3">
                  <a 
                    href="#pricing" 
                    className="block px-2 py-2 text-lg font-medium rounded-md hover:bg-primary/5"
                    onClick={closeMobileMenu}
                  >
                    Pricing
                  </a>
                </div>
                
                <div className="py-3">
                  <a 
                    href="https://developer.syntropi.co.uk" 
                    className="block px-2 py-2 text-lg font-medium rounded-md hover:bg-primary/5"
                    onClick={closeMobileMenu}
                  >
                    Developer
                  </a>
                </div>
                
                <div className="py-3">
                  <button 
                    onClick={() => toggleDropdown('mobile-resources')}
                    className="flex justify-between items-center w-full text-left px-2 py-2 rounded-md hover:bg-primary/5"
                  >
                    <span className="text-lg font-medium">Resources</span>
                    <svg 
                      className={`w-5 h-5 transform transition-transform ${activeDropdown === 'mobile-resources' ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  
                  {activeDropdown === 'mobile-resources' && (
                    <div className="mt-2 ml-4 space-y-2">
                      <a href="https://developer.syntropi.co.uk" className="block p-2 rounded-md hover:bg-gray-50" onClick={closeMobileMenu}>
                        <div className="flex items-center">
                          <div className="bg-amber-100 p-2 rounded-md text-amber-600 mr-3">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium">Documentation</p>
                            <p className="text-sm text-gray-500">Guides & API reference</p>
                          </div>
                        </div>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col space-y-4">
              <a 
                href="#contact" 
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-full hover:border-indigo-400 hover:bg-indigo-50/5 transition-colors"
                onClick={closeMobileMenu}
              >
                Contact us
              </a>
              <a
                href="https://www.dashboard.syntropi.co.uk/" 
                className="flex items-center justify-center px-4 py-3 text-white rounded-full hover:shadow-lg transition-colors"
                style={{ 
                  display: 'flex', 
                  background: 'linear-gradient(90deg, #6366F1, #8B5CF6)'
                }}
                onClick={closeMobileMenu}
              >
                Sign in
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with animated background */}
      <section className="py-12 md:py-20 px-4 relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-r from-indigo-50/40 to-blue-50/40"></div>

        {/* Hero content - now comes first */}
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeIn">
              <span style={{ 
                background: 'linear-gradient(90deg, #6366F1, #8B5CF6)', 
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}>
                Real-Time Payment Network
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Unlocking the future of payments
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <a 
                href="#contact" 
                className="px-6 py-3 text-white rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 w-full sm:w-auto text-center"
                style={{ background: 'linear-gradient(90deg, #6366F1, #8B5CF6)' }}
              >
                Contact Sales
              </a>
              <a
                href="#features" 
                className="px-6 py-3 border border-gray-300 rounded-full hover:border-primary hover:bg-primary/5 hover:scale-105 transition-all duration-300 w-full sm:w-auto text-center"
              >
                Learn More
              </a>
            </div>
          </div>
          
          {/* Bank network visualization - moved below the text */}
          <div className="relative h-[300px] md:h-[400px] max-w-4xl mx-auto mt-8">
            {/* Banking network - now in a perfect circle */}
            <div className="absolute inset-0">
              {/* Central Syntropi node */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full shadow-xl flex items-center justify-center"
                  style={{ 
                    background: 'linear-gradient(90deg, #6366F1, #8B5CF6)',
                    animation: 'pulse 2s infinite'
                  }}>
                  <span className="text-white font-bold text-lg md:text-xl tracking-wide">Syntropi</span>
                </div>
              </div>
              
              {/* Bank nodes in a perfect circle around Syntropi */}
              
              {/* Barclays - North position */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center bg-white p-1 shadow-lg">
                    <Image 
                      src="/banks/barclays.svg" 
                      alt="Barclays" 
                      width={50} 
                      height={50}
                      onError={(e) => {
                        const target = e.target as HTMLElement;
                        if (target.parentElement) {
                          target.parentElement.style.backgroundColor = '#00AEEF';
                          target.parentElement.innerHTML = '<span class="text-white font-bold text-lg">B</span>';
                        }
                      }}
                    />
                  </div>
                  <span className="text-xs mt-1 font-medium text-gray-600">Barclays</span>
                </div>
              </div>
              
              {/* NatWest - West position */}
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center bg-white p-1 shadow-lg">
                    <Image 
                      src="/banks/natwest.svg" 
                      alt="NatWest" 
                      width={50} 
                      height={50}
                      onError={(e) => {
                        const target = e.target as HTMLElement;
                        if (target.parentElement) {
                          target.parentElement.style.backgroundColor = '#4E2A84';
                          target.parentElement.innerHTML = '<span class="text-white font-bold text-lg">N</span>';
                        }
                      }}
                    />
                  </div>
                  <span className="text-xs mt-1 font-medium text-gray-600">NatWest</span>
                </div>
              </div>
              
              {/* Lloyds - East position */}
              <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center bg-white p-1 shadow-lg">
                    <Image 
                      src="/banks/lloyds.svg" 
                      alt="Lloyds" 
                      width={50} 
                      height={50}
                      onError={(e) => {
                        const target = e.target as HTMLElement;
                        if (target.parentElement) {
                          target.parentElement.style.backgroundColor = '#006A4D';
                          target.parentElement.innerHTML = '<span class="text-white font-bold text-lg">L</span>';
                        }
                      }}
                    />
                  </div>
                  <span className="text-xs mt-1 font-medium text-gray-600">Lloyds</span>
                </div>
              </div>
              
              {/* HSBC - South position */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center bg-white p-1 shadow-lg">
                    <Image 
                      src="/banks/hsbc.svg" 
                      alt="HSBC" 
                      width={50} 
                      height={50}
                      onError={(e) => {
                        const target = e.target as HTMLElement;
                        if (target.parentElement) {
                          target.parentElement.style.backgroundColor = '#DB0011';
                          target.parentElement.innerHTML = '<span class="text-white font-bold text-lg">H</span>';
                        }
                      }}
                    />
                  </div>
                  <span className="text-xs mt-1 font-medium text-gray-600">HSBC</span>
                </div>
              </div>

              {/* Connection lines - clean straight lines to center */}
              <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.4 }}>
                {/* Vertical and horizontal lines to Syntropi (clean, perpendicular) */}
                <line 
                  x1="50%" y1="0%" 
                  x2="50%" y2="50%" 
                  stroke="url(#gradient-line)" 
                  strokeWidth="1.5"
                  strokeDasharray="5,5"
                  className="animate-pulse"
                />
                
                <line 
                  x1="0%" y1="50%" 
                  x2="50%" y2="50%" 
                  stroke="url(#gradient-line)" 
                  strokeWidth="1.5"
                  strokeDasharray="5,5"
                  className="animate-pulse"
                />
                
                <line 
                  x1="100%" y1="50%" 
                  x2="50%" y2="50%" 
                  stroke="url(#gradient-line)" 
                  strokeWidth="1.5"
                  strokeDasharray="5,5"
                  className="animate-pulse"
                />
                
                <line 
                  x1="50%" y1="100%" 
                  x2="50%" y2="50%" 
                  stroke="url(#gradient-line)" 
                  strokeWidth="1.5"
                  strokeDasharray="5,5"
                  className="animate-pulse"
                />
                
                {/* Circular connecting lines between banks (follows circle perimeter) */}
                <path
                  d="M 50,0 A 50,50 0 0,1 100,50"
                  stroke="url(#gradient-line)" 
                  strokeWidth="1.5"
                  strokeDasharray="5,5"
                  fill="none"
                  className="animate-pulse"
                  transform="scale(1)"
                />
                
                <path
                  d="M 100,50 A 50,50 0 0,1 50,100"
                  stroke="url(#gradient-line)" 
                  strokeWidth="1.5"
                  strokeDasharray="5,5"
                  fill="none"
                  className="animate-pulse"
                  transform="scale(1)"
                />
                
                <path
                  d="M 50,100 A 50,50 0 0,1 0,50"
                  stroke="url(#gradient-line)" 
                  strokeWidth="1.5"
                  strokeDasharray="5,5"
                  fill="none"
                  className="animate-pulse"
                  transform="scale(1)"
                />
                
                <path
                  d="M 0,50 A 50,50 0 0,1 50,0"
                  stroke="url(#gradient-line)" 
                  strokeWidth="1.5"
                  strokeDasharray="5,5"
                  fill="none"
                  className="animate-pulse"
                  transform="scale(1)"
                />
                
                {/* Gradients */}
                <defs>
                  <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Animated money particles */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-green-400 opacity-70 z-20 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.2s' }}></div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-400 opacity-70 z-20 animate-ping" style={{ animationDuration: '4s', animationDelay: '1.5s' }}></div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-indigo-400 opacity-70 z-20 animate-ping" style={{ animationDuration: '3.5s', animationDelay: '0.7s' }}></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-purple-400 opacity-70 z-20 animate-ping" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>

              {/* Small data bits floating around */}
              <div className="hidden md:block">
                {[...Array(15)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute w-1 h-1 bg-indigo-500 rounded-full opacity-30"
                    style={{ 
                      top: `${Math.random() * 100}%`, 
                      left: `${Math.random() * 100}%`,
                      animation: `float ${3 + Math.random() * 7}s linear infinite`,
                      animationDelay: `${Math.random() * 5}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Connected status indicator */}
        <div className="absolute bottom-6 right-6 sm:right-12 flex items-center bg-white shadow-md rounded-full py-2 px-4 animate-fadeIn">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          <span className="text-blue-600 font-medium">Connected</span>
        </div>
      </section>
      
      {/* Payment Demo Section - Now as its own section */}
      <section className="py-12 md:py-16 px-4 relative bg-gradient-to-b from-white to-indigo-50/20">
        <div className="container mx-auto">
          <div className="max-w-sm mx-auto">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-500">
              <div className="p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Payment Progress</h3>
                  <div className="flex">
                    {[...Array(totalSteps)].map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full mx-1 ${
                          index <= paymentStep ? 'bg-indigo-500' : 'bg-gray-200'
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
                
                <div className="min-h-[180px]">
                  {/* Step 0: Initiating payment */}
                  {paymentStep === 0 && (
                    <>
                      <p className="text-sm font-medium mb-2">Initiating payment</p>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full animate-pulse" style={{ width: '20%' }}></div>
                      </div>
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between mb-3">
                          <span className="text-sm text-gray-500">Amount</span>
                          <span className="text-sm font-medium">£49.99</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Merchant</span>
                          <span className="text-sm font-medium">Example Store</span>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {/* Step 1: Bank Selection */}
                  {paymentStep === 1 && (
                    <>
                      <p className="text-sm font-medium mb-3">Select your bank</p>
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        {banks.map((bank) => (
                          <div 
                            key={bank.id}
                            className={`p-3 border rounded-lg flex items-center cursor-pointer ${
                              selectedBank === bank.id 
                                ? 'border-indigo-500 bg-indigo-50' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div 
                              className="w-8 h-8 rounded flex items-center justify-center text-white font-bold text-xs mr-2"
                              style={{ backgroundColor: bank.color }}
                            >
                              {bank.name.charAt(0)}
                            </div>
                            <span className="text-sm">{bank.name}</span>
                          </div>
                        ))}
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                    </>
                  )}
                  
                  {/* Step 2: Authentication with FaceID */}
                  {paymentStep === 2 && (
                    <>
                      <p className="text-sm font-medium mb-2">Authenticate with your bank</p>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                      
                      <div className="flex flex-col items-center justify-center p-4">
                        <div className="w-16 h-16 border-2 border-gray-300 rounded-2xl mb-3 flex items-center justify-center">
                          <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3"></path>
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-700 mb-1">Face ID</span>
                        <span className="text-xs text-gray-500">Look at your device</span>
                        <div className="mt-3 h-4 w-32 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 animate-pulse" style={{width: '70%'}}></div>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {/* Step 3: Processing payment */}
                  {paymentStep === 3 && (
                    <>
                      <p className="text-sm font-medium mb-2">Processing payment</p>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
                        <div className="h-full bg-indigo-500 rounded-full animate-pulse" style={{ width: '80%' }}></div>
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between mb-3">
                          <span className="text-sm text-gray-500">Status</span>
                          <span className="text-sm font-medium flex items-center">
                            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></span>
                            Processing
                          </span>
                        </div>
                        <div className="flex justify-between mb-3">
                          <span className="text-sm text-gray-500">Amount</span>
                          <span className="text-sm font-medium">£49.99</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Bank</span>
                          <span className="text-sm font-medium flex items-center">
                            {selectedBank && (
                              <div 
                                className="w-4 h-4 rounded-full mr-1"
                                style={{ backgroundColor: banks.find(b => b.id === selectedBank)?.color || '#000' }}
                              ></div>
                            )}
                            {selectedBank ? banks.find(b => b.id === selectedBank)?.name : 'Selected Bank'}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {/* Step 4: Payment complete */}
                  {paymentStep === 4 && (
                    <>
                      <p className="text-sm font-medium mb-2">Payment complete</p>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                      
                      <div className="flex flex-col items-center justify-center p-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <span className="text-lg font-medium text-gray-900 mb-1">Success!</span>
                        <span className="text-sm text-gray-500 mb-3">Payment of £49.99 complete</span>
                        
                        <div className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex justify-between mb-2">
                            <span className="text-xs text-gray-500">Reference</span>
                            <span className="text-xs font-medium">SYN-{Math.floor(Math.random() * 1000000)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-500">Time</span>
                            <span className="text-xs font-medium">Just now</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section id="features" className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Products</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Build, innovate and scale with our comprehensive suite of payment solutions
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Pay Ins Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-primary hover:shadow-md transition-all">
              <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Pay ins</h3>
              <p className="text-gray-600 mb-4">
                Accept payments directly into your account with real-time settlement
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Real-time settlement</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Lower transaction fees</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Secure bank-level encryption</span>
                </li>
              </ul>
              <a href="#contact" className="text-primary font-medium hover:text-primary-dark flex items-center">
                Learn more
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>

            {/* Pay Outs Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-primary hover:shadow-md transition-all">
              <div className="bg-purple-100 p-3 rounded-lg w-fit mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Pay outs</h3>
              <p className="text-gray-600 mb-4">
                Send payments to customers, vendors or suppliers instantly
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Instant transfers</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Bulk payment options</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Programmatic API access</span>
                </li>
              </ul>
              <a href="#contact" className="text-primary font-medium hover:text-primary-dark flex items-center">
                Learn more
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>

            {/* Data Products Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-primary hover:shadow-md transition-all">
              <div className="bg-green-100 p-3 rounded-lg w-fit mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Data Products</h3>
              <p className="text-gray-600 mb-4">
                Gain insights into your payment flows with advanced analytics
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Custom dashboards</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Transaction analytics</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Real-time reporting</span>
                </li>
              </ul>
              <a href="#data-products" className="text-primary font-medium hover:text-primary-dark flex items-center">
                Learn more
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="card p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-1">Merchants</h3>
            <p className="text-3xl font-semibold text-gray-800">250+</p>
            <p className="text-sm text-green-500 flex items-center mt-1">
              <span>+28.2%</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
            </p>
          </div>
          <div className="card p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-1">Transactions</h3>
            <p className="text-3xl font-semibold text-gray-800">1.2M</p>
            <p className="text-sm text-green-500 flex items-center mt-1">
              <span>+42.5%</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
            </p>
          </div>
          <div className="card p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-1">Processing</h3>
            <p className="text-3xl font-semibold text-gray-800">£120M</p>
            <p className="text-sm text-green-500 flex items-center mt-1">
              <span>+35.8%</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
            </p>
          </div>
          <div className="card p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-1">Settlement</h3>
            <p className="text-3xl font-semibold text-gray-800">T+0</p>
            <p className="text-sm text-green-500 flex items-center mt-1">
              <span>Real-time</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-gray-50 py-20 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Pricing Plans</h2>
          <p className="text-xl text-center mb-12 text-gray-600 max-w-3xl mx-auto">
            Choose the right plan for your business needs
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="card p-6 bg-white rounded-xl border border-gray-200 hover:border-primary hover:shadow-md transition-all">
              <div className="p-2 bg-blue-50 rounded-lg w-fit mb-4">
                <h3 className="text-xl font-semibold text-primary">Starter</h3>
              </div>
              <p className="text-gray-600 mb-6">Perfect for small businesses just getting started with real-time payments</p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Up to 500 transactions/month</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Pay ins & Pay outs</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Basic reporting</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Email support</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <svg className="w-5 h-5 text-gray-300 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  <span>Advanced analytics</span>
                </li>
              </ul>
              
              <a href="#contact" className="block text-center py-2 px-4 rounded-full bg-white border border-primary text-primary hover:bg-primary/5 transition-colors">
                Contact Sales
              </a>
            </div>
            
            {/* Growth Plan */}
            <div className="card p-6 bg-white rounded-xl border-2 border-primary shadow-lg relative">
              <div className="absolute top-0 right-0 bg-primary text-white py-1 px-3 text-xs rounded-bl-lg">Popular</div>
              <div className="p-2 bg-primary/10 rounded-lg w-fit mb-4">
                <h3 className="text-xl font-semibold text-primary">Growth</h3>
              </div>
              <p className="text-gray-600 mb-6">Ideal for growing businesses with increasing payment volumes</p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Up to 10,000 transactions/month</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Pay ins, Pay outs & Refunds</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Advanced reporting</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Priority email & chat support</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Basic analytics dashboard</span>
                </li>
              </ul>
              
              <a href="#contact" className="block text-center py-2 px-4 text-white rounded-full hover:shadow-lg transition-colors" style={{ display: 'block', background: 'linear-gradient(90deg, #6366F1, #8B5CF6)' }}>
                Contact Sales
              </a>
            </div>
            
            {/* Enterprise Plan */}
            <div className="card p-6 bg-white rounded-xl border border-gray-200 hover:border-primary hover:shadow-md transition-all">
              <div className="p-2 bg-indigo-50 rounded-lg w-fit mb-4">
                <h3 className="text-xl font-semibold text-indigo-600">Enterprise</h3>
              </div>
              <p className="text-gray-600 mb-6">For large organizations requiring custom solutions and high volumes</p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Unlimited transactions</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>All payment features</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Custom reporting &amp; data exports</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Dedicated account manager</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Advanced analytics &amp; insights</span>
                </li>
              </ul>
              
              <a href="#contact" className="block text-center py-2 px-4 bg-white border border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-50 transition-colors">
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your payment infrastructure?</h2>
            <p className="text-xl text-gray-600 mb-8">Join the future of real-time account-to-account payments today</p>
            <a 
              href="#contact" 
              className="inline-block px-8 py-4 text-white rounded-full text-lg font-medium hover:shadow-lg transition-colors"
              style={{ display: 'inline-block', background: 'linear-gradient(90deg, #6366F1, #8B5CF6)' }}
            >
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-4 py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-primary/10 rounded-full blur-3xl"></div>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center relative z-10">Contact Us</h2>
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="card p-8 bg-white rounded-xl shadow-md">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    placeholder="your.email@company.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input 
                  type="text" 
                  id="company" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  placeholder="Your company name"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full px-6 py-3 text-white rounded-full hover:shadow-lg transition-colors font-medium"
                style={{ background: 'linear-gradient(90deg, #6366F1, #8B5CF6)' }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Logo and tagline */}
            <div className="md:col-span-3">
              <Link 
                href="/"
                className="inline-block"
              >
                <h1 style={{ 
                  background: 'linear-gradient(90deg, #6366F1, #8B5CF6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: '1.5rem',
                  fontWeight: 'bold' 
                }}>
                  Syntropi
                </h1>
              </Link>
              <p className="text-gray-500 mt-2">Real-Time Payment Network</p>
            </div>

            {/* Navigation links */}
            <div className="md:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div>
                  <p className="font-medium text-gray-800 mb-3">Solutions</p>
                  <div className="space-y-2">
                    <a href="#features" className="block text-gray-500 hover:text-primary transition-colors text-sm">Pay ins</a>
                    <a href="#features" className="block text-gray-500 hover:text-primary transition-colors text-sm">Pay outs</a>
                    <a href="#features" className="block text-gray-500 hover:text-primary transition-colors text-sm">Refunds</a>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-gray-800 mb-3">Company</p>
                  <div className="space-y-2">
                    <a href="#" className="block text-gray-500 hover:text-primary transition-colors text-sm">About</a>
                    <a href="#contact" className="block text-gray-500 hover:text-primary transition-colors text-sm">Contact</a>
                    <a href="#" className="block text-gray-500 hover:text-primary transition-colors text-sm">Careers</a>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-gray-800 mb-3">Resources</p>
                  <div className="space-y-2">
                    <a href="https://developer.syntropi.co.uk" className="block text-gray-500 hover:text-primary transition-colors text-sm">Documentation</a>
                    <a href="https://www.dashboard.syntropi.co.uk/" className="block text-gray-500 hover:text-primary transition-colors text-sm">Dashboard</a>
                    <a href="#" className="block text-gray-500 hover:text-primary transition-colors text-sm">Blog</a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social links */}
            <div className="md:col-span-2">
              <p className="font-medium text-gray-800 mb-3">Connect</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 8.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V22c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.8-3.7 4 .3.3.6.8.6 1.5v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Copyright and policies */}
          <div className="border-t border-gray-100 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© 2024 Syntropi. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-primary transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors text-sm">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
