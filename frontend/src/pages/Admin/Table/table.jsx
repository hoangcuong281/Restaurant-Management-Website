import { useEffect, useState } from 'react';
import AddModal from './table_services/add_modal';
import DeleteModal from './table_services/delete_modal';
import EditModal from './table_services/edit_modal';
import CheckoutModal from './table_services/checkout_modal';

function Booking() {
    const [tables, setTables] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editTable, setEditTable] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [tableToDelete, setTableToDelete] = useState(null);
    const [showCheckOutModal, setShowCheckOutModal] = useState(false);
    const [checkOutTable, setCheckOutTable] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [billTotal, setBillTotal] = useState('');
    const [filter, setFilter] = useState({
        date: '',
        quantity: ''
    });
    const [showAddModal, setShowAddModal] = useState(false);

    const getAuthHeaders = (extra = {}) => {
        const token = localStorage.getItem('token') || localStorage.getItem('accessToken');
        return {
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            ...extra
        };
    }

    const fetchTables = async () =>{
        try{
            const response = await fetch("http://localhost:3000/api/booking/", { headers: getAuthHeaders() });
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setTables(data || []);
        } catch(error){
            console.log(error);
        }
    }

    const handleDelete = async (id) => {
        const table = tables.find(t => t._id === id);
        setTableToDelete(table);
        setShowDeleteModal(true);
    }

    const handleEditClick = (table) => {
        setEditTable(table);
        setShowEditModal(true);
    }

    const handleCheckOut = (table) => {
        setCheckOutTable(table);
        setShowCheckOutModal(true);
    };


    function formatDateTime(dateString) {
        if (!dateString) return '';

        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);

        const hours = String(date.getHours()).padStart(2, '0'); // 24h
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    const filteredTables = tables.filter(table => {
        if (filter.date && table.date !== filter.date) return false;
        if (filter.quantity && Number(table.quantity) !== Number(filter.quantity)) return false;
        if (filter.status && table.status !== filter.status) return false;
        return true;
    });

    useEffect(()=>{
        fetchTables();
    }, []);


    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-start px-4 py-6 space-y-4">
            <div className="w-full max-w-7xl flex items-center justify-between">
                <button
                    className="px-4 py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-500"
                    onClick={() => setShowAddModal(true)}
                >
                    Add
                </button>
            </div>

            <div className="w-full max-w-7xl flex flex-wrap gap-4 mb-4 items-center">
                <div className="flex items-center gap-2">
                    <label className="font-medium text-gray-700">Date:</label>
                    <input
                        className="text-gray-800 px-2 py-1 border border-gray-200 rounded"
                        type="date"
                        value={filter.date}
                        onChange={e => setFilter(f => ({ ...f, date: e.target.value }))}
                    />
                </div>

                <div className="flex items-center gap-2">
                    <label className="font-medium text-gray-700">Quantity:</label>
                    <input
                        className="text-gray-800 px-2 py-1 border border-gray-200 rounded w-20"
                        type="number"
                        min="1"
                        value={filter.quantity}
                        onChange={e => setFilter(f => ({ ...f, quantity: e.target.value }))}
                        placeholder="VD: 4"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <label className="font-medium text-gray-700">Status:</label>
                    <select
                        className="text-gray-800 px-2 py-1 border border-gray-200 rounded"
                        value={filter.status}
                        onChange={e => setFilter(f => ({ ...f, status: e.target.value }))}
                    >
                        <option value="">All</option>
                        <option value="pending">Pending</option>
                        <option value="using">In Use</option>
                        <option value="completed">Used</option>
                        <option value="canceled">Canceled</option>
                    </select>
                </div>

                <button
                    onClick={() => setFilter({ date: '', quantity: '', status: '' })}
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded hover:bg-gray-200">
                    Unfiltered
                </button>
            </div>

            <div className="w-full max-w-7xl overflow-x-auto">
                <table className="min-w-full bg-white divide-y divide-gray-200 rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-center text-sm font-semibold text-gray-700">Name</th>
                            <th className="p-3 text-center text-sm font-semibold text-gray-700">Quantity</th>
                            <th className="p-3 text-center text-sm font-semibold text-gray-700">Booking Time</th>
                            <th className="p-3 text-center text-sm font-semibold text-gray-700">End Time</th>
                            <th className="p-3 text-center text-sm font-semibold text-gray-700">Phone Number</th>
                            <th className="p-3 text-center text-sm font-semibold text-gray-700">Email</th>
                            <th className="p-3 text-center text-sm font-semibold text-gray-700">Special Request</th>
                            <th className="p-3 text-center text-sm font-semibold text-gray-700">Total Bill</th>
                            <th className="p-3 text-center text-sm font-semibold text-gray-700">Status</th>
                            <th className="p-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredTables
                            .sort((a, b) => {
                                const now = new Date();
                                const timeA = new Date(`${a.date}T${a.time}`);
                                const timeB = new Date(`${b.date}T${b.time}`);
                                const diffA = Math.abs(timeA - now);
                                const diffB = Math.abs(timeB - now);
                                return diffA - diffB;
                            })
                            .map((table) => {
                                const rowClass = table.status === 'completed' && Number(table.amount) > 0
                                    ? 'bg-green-50 hover:bg-green-100 cursor-pointer'
                                    : table.status === 'pending'
                                        ? 'bg-yellow-50 hover:bg-yellow-100 cursor-pointer'
                                        : table.status === 'canceled'
                                            ? 'bg-red-50 hover:bg-red-100 cursor-pointer'
                                            : 'bg-gray-50 hover:bg-gray-100 cursor-pointer';
                                return (
                                    <tr key={table._id} className={`${rowClass}`}>
                                        <td className="p-3 text-center text-sm">{table.name}</td>
                                        <td className="p-3 text-center text-sm">{table.quantity}</td>
                                        <td className="p-3 text-center text-sm">{formatDateTime(table.booking_time)}</td>
                                        <td className="p-3 text-center text-sm">{formatDateTime(table.end_time)}</td>
                                        <td className="p-3 text-center text-sm">{table.phone}</td>
                                        <td className="p-3 text-center text-sm">{table.email}</td>
                                        <td className="p-3 text-center text-sm">{table.special_request}</td>
                                        <td className="p-3 text-center text-sm">{(table.amount && Number(table.amount) !== 0) ? Number(table.amount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'Not Paid'}</td>
                                        <td className="p-3 text-center text-sm">
                                            {table.status === 'pending' && 'Pending'}
                                            {table.status === 'using' && 'In Use'}
                                            {table.status === 'completed' && 'Used'}
                                            {table.status === 'canceled' && 'Canceled'}
                                        </td>
                                        <td className="p-3 text-center text-sm flex flex-col items-center justify-center gap-2">
                                            <button className="w-full px-1 bg-green-600 text-white rounded hover:bg-green-500 cursor-pointer" onClick={() => handleEditClick(table)}>Edit</button>
                                            <button className="w-full px-1 bg-red-600 text-white rounded hover:bg-red-500 cursor-pointer" onClick={() => handleDelete(table._id)}>Delete</button>
                                            <button className="w-full px-1 bg-blue-600 text-white rounded hover:bg-blue-500 cursor-pointer" onClick={() => handleCheckOut(table)}>Check Out</button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>

            {/* Modals (Tailwind) */}
            <AddModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onAddSuccess={(added) => setTables(prev => [...prev, added])}
            />

            <EditModal
                isOpen={showEditModal}
                onClose={() => { setShowEditModal(false); setEditTable(null); }}
                table={editTable}
                getAuthHeaders={getAuthHeaders}
                onEditSuccess={(updated) => setTables(prev => prev.map(t => t._id === updated._id ? updated : t))}
            />

            <DeleteModal
                isOpen={showDeleteModal}
                onClose={() => { setShowDeleteModal(false); setTableToDelete(null); }}
                table={tableToDelete}
                getAuthHeaders={getAuthHeaders}
                onDeleteSuccess={(id) => setTables(prev => prev.filter(t => t._id !== id))}
            />

            <CheckoutModal
                isOpen={showCheckOutModal}
                onClose={() => { setShowCheckOutModal(false); setCheckOutTable(null); setBillTotal(''); }}
                table={checkOutTable}
                getAuthHeaders={getAuthHeaders}
                onCheckoutSuccess={(updated) => setTables(prev => prev.map(t => t._id === updated._id ? updated : t))}
            />
        </div>
    );
}

export default Booking;
