import Footer from '@/components/Footer/footer'
import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

function TableBooking() {
    const [validationErrors, setValidationErrors] = useState({});
    const [quantityNote, setQuantityNote] = useState("");
    const [user, setUser] = useState(null);
    const [avaiTable, setAvaiTable] = useState([]);

    const [tables, setTables] = useState({
        quantity: '',
        time: '',
        date: '',
        name: '',
        phone: '',
        email: '',
        special_request: '',
        tableID: ''
    });

    const getAvaiTable = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/booking/check-available/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const data = await res.json();
            const normalizedData = Array.isArray(data) ? data : [];
            setAvaiTable(normalizedData);
            return normalizedData;
        } catch (error) {
            console.error("Lỗi lấy bàn khả dụng:", error);
            setAvaiTable([]);
            return [];
        }
    };

    const getSuggestedTable = (quantity, tableList) => {
        const tableCount = tableList.length;

        if (!quantity || isNaN(quantity) || quantity <= 0) {
            return { tableID: '', error: 'At least 1 person', note: '' };
        }

        if (quantity > 12) {
            return {
                tableID: '',
                error: 'Please contact the hotline for booking over 12 people. Hotline 19001900',
                note: ''
            };
        }

        if (tableCount === 0) {
            return { tableID: '', error: 'The restaurant is fully booked', note: '' };
        }

        if (Math.ceil(quantity / 6) > tableCount) {
            return { tableID: '', error: 'Not enough tables', note: '' };
        }

        if (quantity <= 6) {
            return { tableID: tableList[0].table_number, error: '', note: '' };
        }

        for (let i = 0; i < tableCount - 1; i++) {
            const current = tableList[i].table_number;
            const next = tableList[i + 1].table_number;

            if (
                current[0] === next[0] &&
                Number(current.slice(1)) + 1 === Number(next.slice(1))
            ) {
                return {
                    tableID: `${current} ${next}`,
                    error: '',
                    note: ''
                };
            }
        }

        if (tableCount >= 2) {
            return {
                tableID: `${tableList[0].table_number} ${tableList[1].table_number}`,
                error: '',
                note: 'There are no tables next to each other.'
            };
        }

        return { tableID: '', error: 'Not enough tables', note: '' };
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    };

    const isValidPhone = (phone) => {
        const phoneRegex = /^(0[0-9]{9})$/;
        return phoneRegex.test(phone);
    };

    const isWithinBusinessHours = (time) => {
        if (!time) return false;

        const [hours, minutes] = time.split(':').map(Number);
        const timeInMinutes = hours * 60 + minutes;

        const lunch_start = 9 * 60;
        const lunch_end = 14 * 60;
        const dinner_start = 18 * 60;
        const dinner_end = 23 * 60;

        return (timeInMinutes >= lunch_start && timeInMinutes <= lunch_end) ||
               (timeInMinutes >= dinner_start && timeInMinutes <= dinner_end);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'phone') {
            const numbersOnly = value.replace(/[^\d]/g, '');

            setTables(prev => ({
                ...prev,
                phone: numbersOnly
            }));

            setValidationErrors(prev => ({
                ...prev,
                phone:
                    numbersOnly.length > 0 && !isValidPhone(numbersOnly)
                        ? 'Please enter a valid phone number'
                        : ''
            }));
            return;
        }

        if (name === 'time') {
            const selectedTime = value;
            const today = new Date();
            const selectedDate = new Date(tables.date);

            if (
                tables.date &&
                selectedDate.toDateString() === today.toDateString() &&
                selectedTime < today.toTimeString().slice(0, 5)
            ) {
                setValidationErrors(prev => ({
                    ...prev,
                    time: 'Invalid time'
                }));
                setTables(prev => ({
                    ...prev,
                    time: value
                }));
                return;
            }

            if (!isWithinBusinessHours(selectedTime)) {
                setValidationErrors(prev => ({
                    ...prev,
                    time: 'Please choose the validable time'
                }));
                setTables(prev => ({
                    ...prev,
                    time: value
                }));
                return;
            }

            setValidationErrors(prev => ({
                ...prev,
                time: ''
            }));

            setTables(prev => ({
                ...prev,
                time: value
            }));
            return;
        }

        if (name === 'date') {
            const today = new Date().toISOString().split('T')[0];

            setValidationErrors(prev => ({
                ...prev,
                date: value < today ? 'Không thể chọn ngày trong quá khứ' : ''
            }));

            setTables(prev => ({
                ...prev,
                date: value
            }));
            return;
        }

        if (name === 'quantity') {
            const quantity = parseInt(value);
            const result = getSuggestedTable(quantity, avaiTable);

            setQuantityNote(result.note);

            setValidationErrors(prev => ({
                ...prev,
                quantity: result.error
            }));

            setTables(prev => ({
                ...prev,
                quantity: value,
                tableID: result.tableID
            }));
            return;
        }

        setTables(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === 'email') {
            setValidationErrors(prev => ({
                ...prev,
                email:
                    value.trim() !== '' && !isValidEmail(value)
                        ? 'Please enter a valid email address'
                        : ''
            }));
            return;
        }

        if (validationErrors[name]) {
            setValidationErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = {};

        if (!tables.name.trim()) errors.name = 'Name is required';

        if (!tables.phone.trim()) {
            errors.phone = 'Phone number is required';
        } else if (!isValidPhone(tables.phone)) {
            errors.phone = 'Please enter valid phone number';
        }

        if (!tables.email.trim()) {
            errors.email = 'Email is required';
        } else if (!isValidEmail(tables.email)) {
            errors.email = 'Please enter a valid email address';
        }

        if (!tables.date.trim()) errors.date = 'Date is required';

        if (!tables.time.trim()) {
            errors.time = 'Time is required';
        } else if (!isWithinBusinessHours(tables.time)) {
            errors.time = 'Please choose a valid time between 9:00 AM - 2:00 PM hoặc 6:00 PM - 11:00 PM';
        }

        if (!tables.quantity.trim()) {
            errors.quantity = 'Quantity is required';
        }

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }

        const latestTables = await getAvaiTable();
        const result = getSuggestedTable(parseInt(tables.quantity), latestTables);

        if (result.error) {
            setValidationErrors(prev => ({
                ...prev,
                quantity: result.error
            }));
            setQuantityNote(result.note);
            return;
        }

        setQuantityNote(result.note);

        const booking = {
            quantity: tables.quantity,
            name: tables.name,
            email: tables.email,
            booking_time: tables.date + ' ' + tables.time,
            booking_end: null,
            table_id: result.tableID,
            user_id: user?.user_id
        };

        const token = localStorage.getItem("token");
        const response = await fetch('http://localhost:3000/api/booking/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(booking)
        });
        const data = await response.json();
        console.log(data);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            const decoded = jwtDecode(token);
            setUser(decoded);

            setTables(prev => ({
                ...prev,
                name: decoded.name || '',
                email: decoded.email || ''
            }));
        }

        getAvaiTable();
    }, []);

    return (
        <>
            <div className="flex flex-col items-center w-full py-4 bg-[var(--Midori)]">
                <a href='/home' className="no-underline text-center text-5xl font-thin mb-10 md:mb-20 text-[var(--Aka)]" style={{ fontFamily: 'Gasoek One, sans-serif' }}>TOKYO BITES</a>
                <div className="flex flex-col items-center md:border-[20px] border-[var(--Kuro)] md:rounded-[40px] md:w-1/2 w-full p-8 bg-[rgb(237,234,236)]">
                    <p className="text-2xl font-thin mb-6" style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--Aka)' }}>Are you ready for a dinner at Tokyo Bites?</p>
                    <div className="w-full md:w-4/5">
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-row gap-4 mb-3 w-full flex-wrap justify-between">
                                <label className="block mb-1 font-bold">Quantity</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={tables.quantity}
                                    onChange={handleInputChange}
                                    min="1"
                                    max="40"
                                    placeholder="10 people / table"
                                    className={`text-[var(--Kuro)] border rounded-lg h-10 w-full px-2 transition-colors bg-[var(--Shiro)] ${validationErrors.quantity ? 'border-red-500' : 'border-[var(--Kuro)]'}`}
                                />
                                {validationErrors.quantity &&
                                    <span className="text-red-500 text-sm font-bold mt-1 block">{validationErrors.quantity}</span>
                                }
                                {quantityNote &&
                                    <span className="text-red-500 text-sm font-bold mt-1 block">{quantityNote}</span>
                                }
                            </div>

                            <div className="flex flex-row gap-4 mb-3 w-full flex-wrap justify-between">
                                <div className="w-full xl:w-2/5">
                                    <label className="block mb-1 font-bold">Time</label>
                                    <input
                                        type="time"
                                        name="time"
                                        value={tables.time}
                                        onChange={handleInputChange}
                                        min="09:00"
                                        max="23:00"
                                        className={`${validationErrors.time ? 'border-red-500' : 'border-[var(--Kuro)]'} w-full rounded-lg h-10 px-2 border bg-[var(--Shiro)]`}
                                    />
                                    {validationErrors.time &&
                                        <span className="text-red-500 text-sm font-bold mt-1 block">{validationErrors.time}</span>
                                    }
                                    <span className="text-gray-600 text-sm mt-1 block">Open time: 9:00 AM - 2:00 PM, 6:00 PM - 11:00 PM</span>
                                </div>

                                <div className="w-full xl:w-2/5">
                                    <label className="block mb-1 font-bold">Date</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={tables.date}
                                        onChange={handleInputChange}
                                        min={new Date().toISOString().split('T')[0]}
                                        className={`${validationErrors.date ? 'border-red-500' : 'border-[var(--Kuro)]'} w-full rounded-lg h-10 px-2 border bg-[var(--Shiro)]`}
                                    />
                                    {validationErrors.date && <span className="text-red-500 text-sm font-bold mt-1 block">{validationErrors.date}</span>}
                                </div>
                            </div>

                            <div className="flex flex-row gap-4 mb-3 w-full flex-wrap">
                                <div className="w-full mb-4">
                                    <label className="block mb-1 font-bold">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={tables.name}
                                        onChange={handleInputChange}
                                        className={`${validationErrors.name ? 'border-red-500' : 'border-[var(--Kuro)]'} w-full rounded-lg h-10 px-2 border bg-[var(--Shiro)]`}
                                    />
                                    {validationErrors.name && <span className="text-red-500 text-sm font-bold mt-1 block">{validationErrors.name}</span>}
                                </div>
                            </div>

                            <div className="flex flex-row gap-4 mb-3 w-full flex-wrap">
                                <label className="block mb-1 font-bold">Phone number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={tables.phone}
                                    onChange={handleInputChange}
                                    maxLength="10"
                                    className={`text-[var(--Kuro)] border rounded-lg h-10 w-full px-2 transition-colors bg-[var(--Shiro)] ${validationErrors.phone ? 'border-red-500' : 'border-[var(--Kuro)]'}`}
                                    pattern="[0-9]*"
                                />
                                {validationErrors.phone && (
                                    <span className="text-red-500 text-sm font-bold mt-1 block">{validationErrors.phone}</span>
                                )}
                            </div>

                            <div className="flex flex-row gap-4 mb-3 w-full flex-wrap">
                                <label className="block mb-1 font-bold">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={tables.email}
                                    onChange={handleInputChange}
                                    className={`text-[var(--Kuro)] border rounded-lg h-10 w-full px-2 transition-colors bg-[var(--Shiro)] ${validationErrors.email ? 'border-red-500' : 'border-[var(--Kuro)]'}`}
                                />
                                {validationErrors.email && (
                                    <span className="text-red-500 text-sm font-bold mt-1 block">{validationErrors.email}</span>
                                )}
                            </div>

                            <div className="flex flex-row gap-4 mb-3 w-full flex-wrap">
                                <div className="w-full mb-4">
                                    <label className="block mb-1 font-bold">Special Request (Optional)</label>
                                    <input
                                        type="text"
                                        name="special_request"
                                        value={tables.special_request}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg h-10 px-2 border border-[var(--Kuro)] bg-[var(--Shiro)]"
                                    />
                                </div>
                            </div>

                            <button type="submit" className="bg-[var(--Aka)] text-white px-4 py-2 rounded-lg text-lg font-['Oswald'] hover:bg-red-600">Book</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default TableBooking;