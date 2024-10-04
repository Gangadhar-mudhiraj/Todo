import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <div className="bg-gray-800 p-4">
            <nav className="flex justify-between items-center">
                <div>
                    <Link to="/Home" className="text-white hover:text-gray-400 mr-4">
                        Home
                    </Link>
                </div>
                <div className="flex space-x-4">
                    <Link to="/Login" className="text-white hover:text-gray-400">
                        Login
                    </Link>
                    <Link to="/" className="text-white hover:text-gray-400">
                        Sign in
                    </Link>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
