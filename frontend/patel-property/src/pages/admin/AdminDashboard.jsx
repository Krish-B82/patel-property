import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getAllProperties, deleteProperty } from '../../services/api';
import { Home, Building2, MapPin } from 'lucide-react';
import PropertyTable from '../../components/admin/PropertyTable';

const AdminDashboard = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        total: 0,
        apartment: 0,
        villa: 0,
        house: 0,
        plot: 0,
        office: 0,
    });

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            setLoading(true);
            // Fetch all properties, including sold
            const data = await getAllProperties({});
            const props = data.properties || [];
            setProperties(props);

            // Calculate stats
            setStats({
                total: props.length,
                apartment: props.filter(p => p.property_type === 'apartment').length,
                villa: props.filter(p => p.property_type === 'villa').length,
                house: props.filter(p => p.property_type === 'house').length,
                plot: props.filter(p => p.property_type === 'plot').length,
                office: props.filter(p => p.property_type === 'office').length,
            });
        } catch (error) {
            console.error('Error fetching properties:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteProperty(id);
            // Remove from UI immediately to avoid waiting for refetch
            setProperties(prev => prev.filter(p => p.id !== id));

            // Update stats
            setStats(prev => ({
                ...prev,
                total: prev.total - 1
            }));
        } catch (error) {
            alert('Failed to delete property: ' + (error.message || 'Unknown error'));
            console.error('Delete error:', error);
        }
    };

    return (
        <AdminLayout>
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <Home className="w-6 h-6 text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm">Total Properties</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <Home className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm">Apartments</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.apartment}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Home className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm">Villas / Houses</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.villa + stats.house}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                <MapPin className="w-6 h-6 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm">Plots & Offices</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.plot + stats.office}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Property List */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4">All Properties</h2>
                    <PropertyTable properties={properties} onDelete={handleDelete} />
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;