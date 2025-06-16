import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-10">
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Company</h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <Link to="/" className="hover:text-white transition-colors">About</Link>
                            </li>
                            <li>
                                <Link to="/" className="hover:text-white transition-colors">Careers</Link>
                            </li>
                            <li>
                                <Link to="/" className="hover:text-white transition-colors">Press</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Resources</h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <Link to="/" className="hover:text-white transition-colors">Blog</Link>
                            </li>
                            <li>
                                <Link to="/" className="hover:text-white transition-colors">Docs</Link>
                            </li>
                            <li>
                                <Link to="/" className="hover:text-white transition-colors">Support</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Legal</h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link>
                            </li>
                            <li>
                                <Link to="/" className="hover:text-white transition-colors">Terms of Service</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Follow Us</h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a>
                            </li>
                            <li>
                                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
                            </li>
                            <li>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} YourCompany. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;
