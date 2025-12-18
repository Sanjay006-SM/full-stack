import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecharge } from '../context/RechargeContext';
import { useAuth } from '../auth/AuthContext';
import Button from '../components/Button';
import '../styles/Auth.css';

const AddPlan = () => {
    const navigate = useNavigate();
    const { addPlan } = useRecharge();
    const { currentUser } = useAuth();

    const [formData, setFormData] = useState({
        operator: 'Jio',
        price: '',
        validity: '',
        data: '',
        calls: 'Unlimited',
        sms: '100',
        benefits: ''
    });

    // Protected Route Logic
    useEffect(() => {
        if (!currentUser || currentUser.role !== 'admin') {
            navigate('/login');
        }
    }, [currentUser, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPlan = {
            ...formData,
            benefits: formData.benefits.split(',').map(b => b.trim()).filter(b => b)
        };

        try {
            await addPlan(newPlan);
            alert('Plan created successfully!');
            navigate('/admin');
        } catch (error) {
            alert('Failed to create plan');
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container" style={{ maxWidth: '600px' }}>
                <div className="auth-card">
                    <h1>Add New Plan</h1>
                    <p>Create a new recharge plan</p>

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
                                placeholder="e.g. ₹299"
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
                                placeholder="e.g. 28 Days"
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
                                placeholder="e.g. 1.5GB/day"
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
                                placeholder="e.g. Disney+, 5G Included"
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                            <Button type="submit" className="btn-block">
                                Create Plan
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

export default AddPlan;
