import React from "react";

function Footer() {
  return (
    <>
      {/* Footer */}
      <footer className=" bg-blue-600 bg-cover bg-center bg-opacity-50 backdrop-blur-sm shadow-md py-6">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <h4 className="font-bold mb-3">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white hover:text-blue-600">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-blue-600">
                  Shipping
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-blue-600">
                  Returns
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">About Us</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white hover:text-blue-600">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-blue-600">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-blue-600">
                  Press
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">My Account</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white hover:text-blue-600">
                  Login
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-blue-600">
                  Register
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-blue-600">
                  Order Status
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white hover:text-blue-600">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-blue-600">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-blue-600">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
