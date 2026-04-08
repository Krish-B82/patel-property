import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import PropertyForm from '../../components/admin/PropertyForm';
import { getPropertyById } from '../../services/api';
import { ArrowLeft } from 'lucide-react';

const AddProperty = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [initialData, setInitialData] = useState(null);
    const [loading, setLoading] = useState(isEditing);

    useEffect(() => {
        if (isEditing) {
            fetchProperty();
        }
    }, [id]);

    const fetchProperty = async () => {
        try {
            const data = await getPropertyById(id);
            setInitialData(data.property);
        } catch (error) {
            console.error('Error fetching property:', error);
            alert('Property not found');
            navigate('/admin/dashboard');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate('/admin/dashboard')}
                        className="p-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition text-gray-600"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {isEditing ? 'Edit Property' : 'Add New Property'}
                        </h1>
                        <p className="text-gray-600 mt-1">
                            {isEditing ? `Editing ID: ${id}` : 'Fill in the details to list a new property'}
                        </p>
                    </div>
                </div>

                {/* Form Container */}
                {loading ? (
                    <div className="bg-white rounded-xl shadow-md p-12 text-center">
                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600 font-semibold">Loading property details...</p>
                    </div>
                ) : (
                    <PropertyForm initialData={initialData} isEditing={isEditing} />
                )}
            </div>
        </AdminLayout>
    );
};

export default AddProperty;
