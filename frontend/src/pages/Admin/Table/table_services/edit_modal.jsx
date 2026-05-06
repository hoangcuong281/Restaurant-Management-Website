import React, { useEffect, useState } from 'react';

function EditModal({ isOpen, onClose, table, getAuthHeaders, onEditSuccess }) {
    const [local, setLocal] = useState(null);

    useEffect(() => {
        if (table) {
            setLocal({
                name: table.name || '',
                quantity: table.quantity || '',
                time: table.time || '',
                date: table.date || '',
                phone: table.phone || '',
                email: table.email || '',
                occasion: table.occasion || '',
                specialRequest: table.specialRequest || '',
                depositStatus: table.depositStatus || '',
                bill: table.bill || '',
                status: table.status || '',
                _id: table._id
            });
        } else {
            setLocal(null);
        }
    }, [table]);

    if (!isOpen || !local) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocal(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const { _id, __v, ...tableData } = local;
            const response = await fetch(`http://localhost:3000/api/table/update/${local._id}`, {
                method: 'PUT',
                headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
                body: JSON.stringify(tableData)
            });
            if (response.ok) {
                const updated = await response.json();
                if (onEditSuccess) onEditSuccess(updated);
                onClose();
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[85vh] overflow-auto" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4 border-b pb-2">
                    <h2 className="text-lg font-semibold">Sửa đơn đặt bàn</h2>
                    <button className="text-gray-500 hover:bg-gray-100 rounded-full w-9 h-9 flex items-center justify-center" onClick={onClose}>×</button>
                </div>
                <div className="space-y-3">
                    <div>
                        <label className="block font-medium mb-1">Tên:</label>
                        <input className="w-full px-3 py-2 border rounded" type="text" name="name" value={local.name} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Số lượng:</label>
                        <input className="w-full px-3 py-2 border rounded" type="number" name="quantity" value={local.quantity} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Giờ:</label>
                        <input className="w-full px-3 py-2 border rounded" type="time" name="time" value={local.time} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Ngày:</label>
                        <input className="w-full px-3 py-2 border rounded" type="date" name="date" value={local.date} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Số điện thoại:</label>
                        <input className="w-full px-3 py-2 border rounded" type="tel" name="phone" value={local.phone} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Email:</label>
                        <input className="w-full px-3 py-2 border rounded" type="email" name="email" value={local.email} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Dịp đặc biệt:</label>
                        <input className="w-full px-3 py-2 border rounded" type="text" name="occasion" value={local.occasion} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Yêu cầu đặc biệt:</label>
                        <textarea className="w-full px-3 py-2 border rounded" name="specialRequest" value={local.specialRequest} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Loại bàn:</label>
                        <input className="w-full px-3 py-2 border rounded" type="text" name="tableType" value={local.tableType} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Trạng thái cọc:</label>
                        <div className="flex gap-4 items-center">
                            <label className="flex items-center gap-2"><input type="radio" name="depositStatus" value="paid" checked={local.depositStatus === 'paid'} onChange={handleChange} /> Đã thanh toán</label>
                            <label className="flex items-center gap-2"><input type="radio" name="depositStatus" value="unpaid" checked={local.depositStatus === 'unpaid'} onChange={handleChange} /> Chưa thanh toán</label>
                        </div>
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Tổng hoá đơn:</label>
                        <input className="w-full px-3 py-2 border rounded" type="text" name="bill" value={local.bill} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Trạng thái:</label>
                        <select className="w-full px-3 py-2 border rounded" name="status" value={local.status} onChange={handleChange}>
                            <option value="pending">Pending</option>
                            <option value="using">In Use</option>
                            <option value="used">Used</option>
                            <option value="canceled">Canceled</option>
                        </select>
                    </div>
                </div>
                <div className="mt-4 flex justify-end">
                    <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={handleSave}>Lưu</button>
                </div>
            </div>
        </div>
    );
}

export default EditModal;
