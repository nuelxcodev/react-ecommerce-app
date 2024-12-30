import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiMongodb, SiExpress } from "react-icons/si";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <div className="bg-gray-800 text-white">
      <footer className="container mx-auto p-8">
        {/* Top Section */}
        <div className="flex flex-wrap justify-between items-start gap-8">
          {/* Contact Form */}
          <div className="w-full md:w-1/3">
            <h2 className="text-lg font-bold mb-4">Contact Us</h2>
            <form className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Your Name"
                className="bg-gray-700 p-2 rounded outline-none text-white"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="bg-gray-700 p-2 rounded outline-none text-white"
              />
              <textarea
                placeholder="Your Message"
                className="bg-gray-700 p-2 rounded outline-none text-white h-24"
              />
              <button className=" bg-gradient-to-r
            from-pink-600 to-pink-800 hover:bg-pink-500 p-2 rounded font-semibold">
                Send Message
              </button>
            </form>
          </div>

          {/* Quick Links */}
          <div className="w-full md:w-1/4">
            <h2 className="text-lg font-bold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <a href="/products" className="hover:underline">
                  Shop
                </a>
              </li>
              <li>
                <a href="#about" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:underline">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="w-full md:w-1/4">
            <h2 className="text-lg font-bold mb-4">Our Tech Stack</h2>
            <div className="flex gap-4 mb-4">
              <FaReact size={32} title="ReactJS" className="text-blue-400" />
              <FaNodeJs size={32} title="NodeJS" className="text-green-400" />
              <SiMongodb size={32} title="MongoDB" className="text-green-500" />
              <SiExpress size={32} title="ExpressJS" className="text-gray-400" />
            </div>
            <p className="text-sm text-gray-400" id="about">
              Nuelmat is a modern and reliable eCommerce platform built using cutting-edge technologies to provide a seamless shopping experience for our customers.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-600 pt-4">
          <div className="flex flex-wrap justify-between items-center">
            {/* Newsletter */}
            <div className="w-full md:w-1/2">
              <h2 className="text-lg font-bold mb-2">Subscribe to our Newsletter</h2>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow bg-gray-700 p-2 rounded-l outline-none text-white"
                />
                <button className="bg-pink-600 hover:bg-pink-500 p-2 rounded-r font-semibold">
                  Subscribe
                </button>
              </form>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-pink-500">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="hover:text-pink-500">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="hover:text-pink-500">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="hover:text-pink-500">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-4 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Nuelmat. Designed by Ekine Chukwuemeka Emmanuel. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Footer;
