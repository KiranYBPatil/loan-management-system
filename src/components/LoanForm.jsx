import React, { useState } from 'react';
import { Calculator, User, FileText, Calendar, DollarSign } from 'lucide-react';

const LoanForm = ({ onCalculate }) => {
    const [formData, setFormData] = useState({
        customerName: '',
        loanId: '',
        loanAmount: '',
        delayDays: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear error when user types
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.customerName.trim()) newErrors.customerName = 'Customer Name is required';
        if (!formData.loanId.trim()) newErrors.loanId = 'Loan ID is required';

        const amount = parseFloat(formData.loanAmount);
        if (!formData.loanAmount || isNaN(amount) || amount <= 0) {
            newErrors.loanAmount = 'Please enter a valid positive loan amount';
        }

        const days = parseInt(formData.delayDays);
        if (formData.delayDays === '' || isNaN(days) || days < 0) {
            newErrors.delayDays = 'Please enter a valid number of days (0 or more)';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onCalculate({
                customerName: formData.customerName,
                loanId: formData.loanId,
                loanAmount: parseFloat(formData.loanAmount),
                delayDays: parseInt(formData.delayDays)
            });
        }
    };

    const inputStyle = {
        width: '100%',
        background: 'rgba(0, 0, 0, 0.2)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '0.5rem',
        padding: '0.75rem 1rem 0.75rem 2.5rem',
        color: 'white',
        fontSize: '1rem',
        transition: 'all 0.3s ease'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '0.5rem',
        fontSize: '0.9rem',
        color: 'var(--text-muted)',
        fontWeight: 500
    };

    const errorStyle = {
        color: 'var(--error)',
        fontSize: '0.8rem',
        marginTop: '0.25rem'
    };

    const iconStyle = {
        position: 'absolute',
        left: '0.75rem',
        top: '2.35rem', // Adjusted for label height
        color: 'var(--text-muted)',
        pointerEvents: 'none'
    };

    return (
        <form onSubmit={handleSubmit} className="glass-panel p-8 w-full max-w-md animate-fade-in" style={{ padding: '2rem' }}>
            <div className="mb-8 text-center" style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
                    style={{
                        fontSize: '2rem',
                        marginBottom: '0.5rem',
                        backgroundImage: 'linear-gradient(to right, var(--primary), var(--secondary))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                    Loan Repayment
                </h1>
                <p className="text-muted" style={{ color: 'var(--text-muted)' }}>Enter details to calculate penalty</p>
            </div>

            <div className="space-y-5" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                {/* Customer Name */}
                <div style={{ position: 'relative' }}>
                    <label htmlFor="customerName" style={labelStyle}>Customer Name</label>
                    <User size={18} style={iconStyle} />
                    <input
                        type="text"
                        id="customerName"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        style={{ ...inputStyle, borderColor: errors.customerName ? 'var(--error)' : 'rgba(255,255,255,0.1)' }}
                    />
                    {errors.customerName && <p style={errorStyle}>{errors.customerName}</p>}
                </div>

                {/* Loan ID */}
                <div style={{ position: 'relative' }}>
                    <label htmlFor="loanId" style={labelStyle}>Loan ID</label>
                    <FileText size={18} style={iconStyle} />
                    <input
                        type="text"
                        id="loanId"
                        name="loanId"
                        value={formData.loanId}
                        onChange={handleChange}
                        placeholder="LN-2024-001"
                        style={{ ...inputStyle, borderColor: errors.loanId ? 'var(--error)' : 'rgba(255,255,255,0.1)' }}
                    />
                    {errors.loanId && <p style={errorStyle}>{errors.loanId}</p>}
                </div>

                {/* Loan Amount */}
                <div style={{ position: 'relative' }}>
                    <label htmlFor="loanAmount" style={labelStyle}>Loan Amount ($)</label>
                    <DollarSign size={18} style={iconStyle} />
                    <input
                        type="number"
                        id="loanAmount"
                        name="loanAmount"
                        value={formData.loanAmount}
                        onChange={handleChange}
                        placeholder="5000.00"
                        step="0.01"
                        style={{ ...inputStyle, borderColor: errors.loanAmount ? 'var(--error)' : 'rgba(255,255,255,0.1)' }}
                    />
                    {errors.loanAmount && <p style={errorStyle}>{errors.loanAmount}</p>}
                </div>

                {/* Delay Days */}
                <div style={{ position: 'relative' }}>
                    <label htmlFor="delayDays" style={labelStyle}>Delay Duration (Days)</label>
                    <Calendar size={18} style={iconStyle} />
                    <input
                        type="number"
                        id="delayDays"
                        name="delayDays"
                        value={formData.delayDays}
                        onChange={handleChange}
                        placeholder="15"
                        min="0"
                        style={{ ...inputStyle, borderColor: errors.delayDays ? 'var(--error)' : 'rgba(255,255,255,0.1)' }}
                    />
                    {errors.delayDays && <p style={errorStyle}>{errors.delayDays}</p>}
                </div>

                <button
                    type="submit"
                    style={{
                        width: '100%',
                        background: 'linear-gradient(to right, var(--primary), var(--primary-dark))',
                        color: 'white',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        fontWeight: 600,
                        fontSize: '1rem',
                        marginTop: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.2)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'; }}
                >
                    <Calculator size={20} />
                    Calculate Total Payable
                </button>

            </div>
        </form>
    );
};

export default LoanForm;
