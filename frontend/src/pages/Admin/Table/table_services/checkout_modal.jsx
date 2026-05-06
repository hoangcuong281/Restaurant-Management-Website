import React, { useEffect, useState } from 'react';

function CheckoutModal({ isOpen, onClose, table, getAuthHeaders, onCheckoutSuccess }) {
    const [billTotal, setBillTotal] = useState('');

    useEffect(() => {
        if (isOpen) setBillTotal('');
    }, [isOpen, table]);

    if (!isOpen || !table) return null;

    const handleConfirm = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/table/bill/${table._id}`, {
                method: 'PUT',
                headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({ bill: billTotal, status: 'used' })
            });
            if (response.ok) {
                const updated = await response.json();
                if (onCheckoutSuccess) onCheckoutSuccess(updated);
                onClose();
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-white rounded-lg p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4 border-b pb-2">
                    <h2 className="text-lg font-semibold">Trả bàn: {table?.name}</h2>
                    <button className="text-gray-500 hover:bg-gray-100 rounded-full w-9 h-9 flex items-center justify-center" onClick={onClose}>×</button>
                </div>
                <div>
                    <label className="block font-medium mb-1">Nhập tổng giá trị hoá đơn:</label>
                    <input className="w-full px-3 py-2 border rounded" type="number" value={billTotal} onChange={e => setBillTotal(e.target.value)} placeholder="Nhập số tiền (VND)" />
                    {!billTotal || Number(billTotal) < 0 ? <span className="text-red-600 text-sm">Vui lòng nhập tổng giá trị hóa đơn hợp lệ!</span> : null}
                </div>
                <div className="mt-4 flex justify-end">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleConfirm}>Xác nhận</button>
                </div>
            </div>
        </div>
    );
}

export default CheckoutModal;
