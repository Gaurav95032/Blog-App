import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import Logout from './Logout';

function Header() {
    const authStatus = useSelector((state) => state.auth.status);

    const navItem = [
        { name: "Home", path: "/", condition: true },
        { name: "Login", path: "/login", condition: !authStatus },
        { name: "Signup", path: "/signup", condition: !authStatus },
        { name: "All Posts", path: "/all-posts", condition: authStatus },
        { name: "Add Post", path: "/add-post", condition: authStatus },
    ];

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center p-4">
                <Link to="/" className="flex items-center gap-2">
                    <Logo />
                    <span className="text-2xl font-bold text-blue-600">MyBlog</span>
                </Link>

                <nav>
                    <ul className="flex gap-4 items-center">
                        {navItem.map((item) =>
                            item.condition ? (
                                <li key={item.name}>
                                    <Link
                                        to={item.path}
                                        className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ) : null
                        )}
                        {authStatus && (
                            <li className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300">
                                <Logout />
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
