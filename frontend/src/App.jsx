import Home from '@/pages/Home/Home'
import Menu from '@/pages/Menu/Menu'
import Admin from '@/pages/Admin/Admin'
import Rating from '@/pages/Rating/rating'
import Team from '@/pages/Team/team'
import Event from '@/pages/Event/event' 
import Contact from '@/pages/Contact/contact'
import TableBooking from '@/pages/TableBooking/tablebooking'
import Login from '@/pages/auth/Login/Login'
import Register from '@/pages/auth/Register/Register'
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useEffect } from 'react'
import { checkToken } from './services/authService'
function App() {
    const navigate = useNavigate();
    useEffect(() => {
        if (["/login", "/register", "/home", "/menu", "/team", "/event", "/contact", "/"].includes(location.pathname)) return;

        const verify = async () => {
            const isValid = await checkToken();

            if (!isValid) {
                localStorage.removeItem("token");
                navigate("/login");
            }
        };
        verify();
    }, [location.pathname]);
        return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path="/home" element={<Home/>}/>
            <Route path="/menu" element={<Menu/>}/>
            <Route path="/tablebooking" element={<TableBooking/>}/>
            <Route path="/admin" element={<Admin/>}/>
            <Route path="/rating" element={<Rating/>}/>
            <Route path="/team" element={<Team/>}/>
            <Route path="/event" element={<Event/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="*" element={<Home/>}/>
        </Routes>
    );
}

export default App
