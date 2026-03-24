import { useState } from 'react';
import Menu from './Menu/menu'
import Table from './Table/table'
import Statistic from './Statistic/statistic';
import CusService from './CustomerService/cusService';
import EventManagement from './Event/event';
import Review from './Review/review';


function Admin(){
    const [activeView, setActiveView] = useState('menu');
    const [showMenu, setShowMenu] = useState(false);

    const tabClass = (key) => `px-4 py-2 rounded-md font-bold transition ${activeView === key ? 'bg-[var(--Kuro)] text-white' : 'bg-white text-[var(--Kuro)] border border-gray-200'}`;

    return(
        <div className="min-h-screen bg-[var(--Midori)] p-6">
            <div className="mx-auto max-w-7xl w-full">
                <div className="flex items-center justify-center">
                    <div className="md:hidden flex self-start">
                        <button
                            onClick={() => setShowMenu(prev => !prev)}
                            className="p-2 rounded-md text-white flex items-center"
                            aria-expanded={showMenu}
                            aria-controls="admin-menu"
                            aria-label="Open menu"
                        >
                            <span className="sr-only">Open menu</span>
                            <div className="flex flex-col gap-1">
                                <span className="block w-6 h-0.5 bg-white"></span>
                                <span className="block w-6 h-0.5 bg-white"></span>
                                <span className="block w-6 h-0.5 bg-white"></span>
                            </div>
                        </button>
                        {showMenu && (
                            <ul id="admin-menu" className="absolute top-0 left-0 w-1/2 transform bg-white rounded-lg shadow-lg z-50">
                                <li><button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => { setActiveView('menu'); setShowMenu(false); }}>THỰC ĐƠN</button></li>
                                <li><button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => { setActiveView('table'); setShowMenu(false); }}>ĐẶT BÀN</button></li>
                                <li><button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => { setActiveView('statistic'); setShowMenu(false); }}>THỐNG KÊ</button></li>
                                <li><button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => { setActiveView('customerService'); setShowMenu(false); }}>DỊCH VỤ KHÁCH HÀNG</button></li>
                                <li><button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => { setActiveView('eventManagement'); setShowMenu(false); }}>SỰ KIỆN</button></li>
                                <li><button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => { setActiveView('review'); setShowMenu(false); }}>ĐÁNH GIÁ</button></li>
                            </ul>
                        )}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-[var(--Kuro)] text-center mb-6">QUẢN LÝ NHÀ HÀNG</h1>
                </div>

                <div className="flex gap-2 flex-wrap justify-center mb-6 py-2">
                    {/* Desktop tabs */}
                    <div className="hidden md:flex gap-2">
                        <button className={tabClass('menu')} onClick={() => setActiveView('menu')}>THỰC ĐƠN</button>
                        <button className={tabClass('table')} onClick={() => setActiveView('table')}>ĐẶT BÀN</button>
                        <button className={tabClass('statistic')} onClick={() => setActiveView('statistic')}>THỐNG KÊ</button>
                        <button className={tabClass('customerService')} onClick={() => setActiveView('customerService')}>DỊCH VỤ KHÁCH HÀNG</button>
                        <button className={tabClass('eventManagement')} onClick={() => setActiveView('eventManagement')}>SỰ KIỆN</button>
                        <button className={tabClass('review')} onClick={() => setActiveView('review')}>ĐÁNH GIÁ</button>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-md">
                    <div className="flex flex-col">
                        {activeView === 'menu' && <Menu/>}
                        {activeView === 'table' && <Table/>}
                        {activeView === 'statistic' && <Statistic/>}
                        {activeView === 'customerService' && <CusService/>}
                        {activeView === 'eventManagement' && <EventManagement/>}
                        {activeView === 'review' && <Review/>}
                    </div>
                </div>
            </div>
        </div>
    )
}   

export default Admin;
