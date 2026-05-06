import React from 'react';

function DeleteModal({ isOpen, onClose, table, getAuthHeaders, onDeleteSuccess }) {
    if (!isOpen || !table) return null;

    const confirmDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/table/${table._id}`, {
                method: 'DELETE',
                headers: getAuthHeaders()
            });
            if (response.ok) {
                if (onDeleteSuccess) onDeleteSuccess(table._id);
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-white rounded-lg p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4 border-b pb-2">
                    <h2 className="text-lg font-semibold">Xác nhận xóa</h2>
                    <button className="text-gray-500 hover:bg-gray-100 rounded-full w-9 h-9 flex items-center justify-center" onClick={onClose}>×</button>
                </div>
                <p>Bạn có chắc chắn muốn xoá đơn đặt bàn của "{table?.name}"?</p>
                <div className="mt-4 flex justify-end">
                    <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={confirmDelete}>Có</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;
