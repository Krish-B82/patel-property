const Footer = () => {
    return (
        <footer className="bg-primary py-10 sm:py-12 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12">
                {/* Logo & Info */}
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full flex-shrink-0"></div>
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-black leading-tight">PATELPROPERTY.com</h2>
                            <p className="text-xs sm:text-sm text-gray-800 mt-0.5">Vadodara, Gujarat</p>
                        </div>
                    </div>

                    {/* Social Icons */}
                    <div className="flex gap-2.5 sm:gap-3 mt-6">
                        {['X', 'IG', 'YT', 'LI'].map((social) => (
                            <button key={social} className="w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-base bg-yellow-600 hover:bg-yellow-700 rounded-full flex items-center justify-center text-white font-bold transition">
                                {social}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Contact Us */}
                <div>
                    <h3 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4">Contact Us</h3>
                    <div className="space-y-2 text-gray-800">
                        <p>@patel_property_vadodara</p>
                        <p>+91 XXXXXX214</p>
                    </div>
                </div>

                {/* Pages */}
                <div>
                    <h3 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4">Pages</h3>
                    <div className="space-y-2">
                        <a href="#" className="block text-gray-800 hover:text-black underline">Latest Property</a>
                        <a href="#" className="block text-gray-800 hover:text-black underline">About Us</a>
                        <a href="#" className="block text-gray-800 hover:text-black underline">Contact Us</a>
                        <a href="#" className="block text-gray-800 hover:text-black underline">Privacy Policy</a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="max-w-7xl mx-auto mt-8 pt-6 sm:pt-8 border-t border-yellow-600 text-center text-gray-800 text-sm sm:text-base">
                © 2026 Property Vadodara. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;