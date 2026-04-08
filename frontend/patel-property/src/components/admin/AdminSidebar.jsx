import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Plus, LogOut } from 'lucide-react';
import { logout } from '../../services/authServices';

const AdminSidebar = () => {
    const location = useLocation();

    const menuItems = [
        {
            name: 'Dashboard',
            path: '/admin/dashboard',
            icon: LayoutDashboard,
        },
        {
            name: 'Add Property',
            path: '/admin/add-property',
            icon: Plus,
        },
    ];

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            logout();
        }
    };

    return (
        <div className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b">
                <h1 className="text-2xl font-bold text-yellow-600">PATELPROPERTY</h1>
                <p className="text-sm text-gray-600 mt-1">Admin Panel</p>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive
                                ? 'bg-yellow-50 text-yellow-600 font-semibold'
                                : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 w-full transition"
                >
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;