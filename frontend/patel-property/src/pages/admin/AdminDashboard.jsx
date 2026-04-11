import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getAllProperties, deleteProperty } from '../../services/api';
import { Home, Building2, MapPin, Search } from 'lucide-react';
import PropertyTable from '../../components/admin/PropertyTable';
import Pagination from '../../components/property/Pagination';

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
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;

    // Reset to page 1 whenever search term changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            setLoading(true);
            // Fetch properties with a high limit to ensure admin sees all
            const data = await getAllProperties({ limit: 1000 });
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

                {/* Compute filter & pagination */}
                {(() => {
                    const filteredProperties = properties.filter(p => 
                        p.code.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                    const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);
                    const paginatedProperties = filteredProperties.slice(
                        (currentPage - 1) * ITEMS_PER_PAGE, 
                        currentPage * ITEMS_PER_PAGE
                    );

                    return (
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                                <h2 className="text-xl font-bold">All Properties ({filteredProperties.length})</h2>
                        
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by Property Code..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                            />
                        </div>
                    </div>
                    
                    <PropertyTable 
                        properties={paginatedProperties} 
                        onDelete={handleDelete} 
                    />

                    {/* Dashboard Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-6 flex justify-center">
                            <Pagination 
                                currentPage={currentPage} 
                                totalPages={totalPages} 
                                onPageChange={setCurrentPage} 
                            />
                        </div>
                    )}
                </div>
            );
        })()}
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;