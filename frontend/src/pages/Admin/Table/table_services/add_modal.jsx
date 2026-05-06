import React, { useEffect, useState } from 'react';

function AddModal({ isOpen, onClose, onAddSuccess }) {
    const [cusTypeSelected, setCusTypeSelected] = useState(0);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [newTable, setNewTable] = useState({
        booking_id: 'admin',
        name: '',
        quantity: '',
        booking_time: '',
        end_time: '',
        phone: '',
        email: '',
        special_request: '',
        bill: 0,
        status: 'pending'
    });
    const [addValidation, setAddValidation] = useState({});

    const handleCusTypeChange = (e) => {
        const value = Number(e.target.value);
        setCusTypeSelected(value);
    };

    const handleAddChange = (e) => {
        const { name, value } = e.target;
        setNewTable(prev => ({
            ...prev,
            [name]: value
        }));
        setAddValidation(prev => {
            const newErrors = { ...prev };
            if (value && value.toString().trim() !== '') {
                delete newErrors[name];
            }
            return newErrors;
        });
        if (name === "customerName") {
            if (!value.trim()) {
                setSuggestions([]);
                setShowSuggestions(false);
            } else {
                // server-side search will populate suggestions via effect
                setShowSuggestions(true);
            }
        }
    };
    const handleSelectUser = (user) => {
        setNewTable(prev => ({
            ...prev,
            customerName: user.name,
            customerPhone: user.phone,
            customerEmail: user.email
        }));

        setShowSuggestions(false);
    };
    const handleAddSave = async () => {
        const requiredFields = [
            { key: 'quantity', label: 'Number of People' },
            { key: 'booking_time', label: 'Booking Time' },
        ];
        let errors = {};
        requiredFields.forEach(field => {
            if (!newTable[field.key] || newTable[field.key].toString().trim() === '') {
                errors[field.key] = `Please enter ${field.label}.`;
            }
        });
        setAddValidation(errors);
        if (Object.keys(errors).length > 0) return;

        try {
            const token = localStorage.getItem('token') || localStorage.getItem('accessToken');
            const headers = {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            };
            const response = await fetch('http://localhost:3000/api/booking/create/', {
                method: 'POST',
                headers,
                body: JSON.stringify(newTable)
            });
            if (response.ok) {
                const addedTable = await response.json();
                if (onAddSuccess) onAddSuccess(addedTable);
                // reset local state
                setNewTable({
                    booking_id: 'admin',
                    name: '',
                    quantity: '',
                    booking_time: '',
                    end_time: '',
                    phone: '',
                    email: '',
                    special_request: '',
                    bill: 0,
                    status: 'pending'
                });
                setAddValidation({});
                setCusTypeSelected(0);
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (cusTypeSelected !== 1) return;

        const name = newTable.customerName || '';
        if (!name || name.trim().length === 0) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        const controller = new AbortController();
        const timer = setTimeout(async () => {
            try {
                const token = localStorage.getItem('token') || localStorage.getItem('accessToken');
                const headers = {
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                };
                const q = encodeURIComponent(name.trim());
                const resp = await fetch(`http://localhost:3000/api/users?q=${q}`, { headers, signal: controller.signal });
                if (resp.ok) {
                    const data = await resp.json();
                    setSuggestions(data || []);
                    setShowSuggestions((data || []).length > 0);
                }
            } catch (err) {
                if (err.name !== 'AbortError') console.error('Error searching users:', err);
            }
        }, 300);

        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [newTable.customerName, cusTypeSelected]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" 
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}

        >
            <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[85vh] overflow-auto" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4 border-b pb-2">
                    <h2 className="text-lg font-semibold">Thêm đơn đặt bàn</h2>
                    <button className="text-gray-500 hover:bg-gray-100 rounded-full w-9 h-9 flex items-center justify-center" onClick={onClose}>×</button>
                </div>
                <div className="space-y-3">
                    <div>
                        <label className="block font-medium mb-1">Customer Type:</label>
                        <select className="w-full px-3 py-2 border rounded" name="cusType" onChange={handleCusTypeChange} value={cusTypeSelected}>
                            <option value={0}>Public</option>
                            <option value={1}>Registed</option>
                        </select>
                    </div>
                    <div className={`transition-all duration-300 ${cusTypeSelected === 0 ? 'opacity-100' : 'opacity-0 hidden'}`}>
                        <div>
                            <label className="block font-medium mb-1">Name:</label>
                            <input className="w-full px-3 py-2 border rounded" type="text" name="name" value={newTable.name} onChange={handleAddChange} />
                            {addValidation.name && <span className="text-red-600 text-sm">{addValidation.name}</span>}
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Phone:</label>
                            <input className="w-full px-3 py-2 border rounded" type="tel" name="phone" value={newTable.phone} onChange={handleAddChange} />
                            {addValidation.phone && <span className="text-red-600 text-sm">{addValidation.phone}</span>}
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Email:</label>
                            <input className="w-full px-3 py-2 border rounded" type="email" name="email" value={newTable.email} onChange={handleAddChange} />
                            {addValidation.email && <span className="text-red-600 text-sm">{addValidation.email}</span>}
                        </div>
                    </div>
                    <div className={`transition-all duration-300 ${cusTypeSelected === 1 ? 'opacity-100' : 'opacity-0 hidden'}`}>
                        <div>
                            <label className="block font-medium mb-1">Customer Name:</label>
                            <div className="relative">
                                <input
                                    className="w-full px-3 py-2 border rounded"
                                    type="text"
                                    name="customerName"
                                    value={newTable.customerName || ''}
                                    onChange={handleAddChange}
                                    onFocus={() => {
                                        if (suggestions.length > 0) setShowSuggestions(true);
                                    }}
                                />

                                {showSuggestions && suggestions.length > 0 && (
                                    <div className="absolute z-10 w-full bg-white border rounded shadow max-h-40 overflow-y-auto">
                                        {suggestions.map(user => (
                                            <div
                                                key={user._id}
                                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                                onClick={() => handleSelectUser(user)}
                                            >
                                                {user.name} - {user.phone}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Customer Phone:</label>
                            <input className="w-full px-3 py-2 border rounded" type="tel" name="customerPhone" value={newTable.customerPhone} onChange={handleAddChange} />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Customer Email:</label>
                            <input className="w-full px-3 py-2 border rounded" type="email" name="customerEmail" value={newTable.customerEmail} onChange={handleAddChange} />
                        </div>
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Quantity:</label>
                        <input className="w-full px-3 py-2 border rounded" type="number" name="quantity" value={newTable.quantity} onChange={handleAddChange} />
                        {addValidation.quantity && <span className="text-red-600 text-sm">{addValidation.quantity}</span>}
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Booking Time:</label>
                        <input className="w-full px-3 py-2 border rounded" type="time" name="booking_time" value={newTable.booking_time} onChange={handleAddChange} />
                        {addValidation.booking_time && <span className="text-red-600 text-sm">{addValidation.booking_time}</span>}
                    </div>
                    <div>
                        <label className="block font-medium mb-1">End Time:</label>
                        <input className="w-full px-3 py-2 border rounded" type="time" name="end_time" value={newTable.end_time} onChange={handleAddChange} />
                        {addValidation.end_time && <span className="text-red-600 text-sm">{addValidation.end_time}</span>}
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Special Request:</label>
                        <textarea className="w-full px-3 py-2 border rounded" name="special_request" value={newTable.special_request} onChange={handleAddChange} />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Total Bill:</label>
                        <input className="w-full px-3 py-2 border rounded" type="text" name="bill" value={newTable.bill} onChange={handleAddChange} />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Status:</label>
                        <select className="w-full px-3 py-2 border rounded" name="status" value={newTable.status} onChange={handleAddChange}>
                            <option value="pending">Pending</option>
                            <option value="using">In Use</option>
                            <option value="used">Used</option>
                            <option value="canceled">Canceled</option>
                        </select>
                    </div>
                </div>
                <div className="mt-4 flex justify-end gap-3">
                    <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={handleAddSave}>Lưu</button>
                </div>
            </div>
        </div>
    );
}

export default AddModal;
