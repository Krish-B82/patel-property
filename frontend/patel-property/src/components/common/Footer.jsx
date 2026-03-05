const Footer = () => {
  return (
    <footer className="bg-primary py-12 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Logo & Info */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div>
              <h2 className="text-2xl font-bold text-black">PATELPROPERTY.com</h2>
              <p className="text-sm text-gray-800">Vadodara, Gujarat</p>
            </div>
          </div>
          
          {/* Social Icons */}
          <div className="flex gap-3 mt-6">
            {['X', 'IG', 'YT', 'LI'].map((social) => (
              <button key={social} className="w-10 h-10 bg-yellow-600 hover:bg-yellow-700 rounded-full flex items-center justify-center text-white font-bold transition">
                {social}
              </button>
            ))}
          </div>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-xl font-bold text-black mb-4">Contact Us</h3>
          <div className="space-y-2 text-gray-800">
            <p>@patel_property_vadodara</p>
            <p>+91 XXXXXX214</p>
          </div>
        </div>

        {/* Pages */}
        <div>
          <h3 className="text-xl font-bold text-black mb-4">Pages</h3>
          <div className="space-y-2">
            <a href="#" className="block text-gray-800 hover:text-black underline">Latest Property</a>
            <a href="#" className="block text-gray-800 hover:text-black underline">About Us</a>
            <a href="#" className="block text-gray-800 hover:text-black underline">Contact Us</a>
            <a href="#" className="block text-gray-800 hover:text-black underline">Privacy Policy</a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-yellow-600 text-center text-gray-800">
        © 2026 Property Vadodara. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;