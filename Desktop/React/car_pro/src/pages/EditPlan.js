import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecharge } from '../context/RechargeContext';
import { useAuth } from '../auth/AuthContext';
import Button from '../components/Button';
import '../styles/Auth.css'; // Using Auth styles for consistent form look

const EditPlan = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getPlanById, updatePlan } = useRecharge();
    const { currentUser } = useAuth();

    const [formData, setFormData] = useState({
        price: '',
        validity: '',
        data: '',
        calls: '',
        sms: '',
        benefits: ''
    });

    const [loading, setLoading] = useState(true);

    // Protected Route Logic
    useEffect(() => {
        if (!currentUser || currentUser.role !== 'admin') {
            navigate('/login');
        }
    }, [currentUser, navigate]);

    // Load Plan Data
    useEffect(() => {
        if (id) {
            const plan = getPlanById(id);
            if (plan) {
                setFormData({
                    ...plan,
                    benefits: plan.benefits.join(', ') // Convert array to string for editing
                });
            } else {
                // Plan not found
                alert('Plan not found!');
                navigate('/admin');
            }
            setLoading(false);
        }
    }, [id, getPlanById, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Convert benefits string back to array
        const updatedPlan = {
            ...formData,
            id: parseInt(id),
            benefits: formData.benefits.split(',').map(b => b.trim()).filter(b => b)
        };

        updatePlan(updatedPlan);
        alert('Plan updated successfully!');
        navigate('/admin');
    };

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="auth-page">
            <div className="auth-container" style={{ maxWidth: '600px' }}>
                <div className="auth-card">
                    <h1>Edit Plan {formData.price}</h1>
                    <p>Update the details for this recharge plan</p>

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label>Operator</label>
                            <select
                                name="operator"
                                value={formData.operator}
                                onChange={handleChange}
                                className="form-control"
                                required
                            >
                                <option value="Jio">Jio</option>
                                <option value="Airtel">Airtel</option>
                                <option value="Vi">Vi</option>
                                <option value="BSNL">BSNL</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Price</label>
                            <input
                                type="text"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Validity</label>
                            <input
                                type="text"
                                name="validity"
                                value={formData.validity}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Data</label>
                            <input
                                type="text"
                                name="data"
                                value={formData.data}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Calls</label>
                            <input
                                type="text"
                                name="calls"
                                value={formData.calls}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>SMS</label>
                            <input
                                type="text"
                                name="sms"
                                value={formData.sms}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Benefits (comma separated)</label>
                            <textarea
                                name="benefits"
                                value={formData.benefits}
                                onChange={handleChange}
                                rows="3"
                                className="form-control"
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                            <Button type="submit" className="btn-block">
                                Save Changes
                            </Button>
                            <Button
                                type="button"
                                color="secondary"
                                className="btn-block"
                                onClick={() => navigate('/admin')}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditPlan;
