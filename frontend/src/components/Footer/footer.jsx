import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'

function Footer(){
    const [successMesg, setSuccessMesg] = useState('');
    const [errorMesg, setErrorMesg] = useState('');
    const [emailInput, setEmailInput] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = emailInput.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setErrorMesg("Vui lòng nhập email");
            setSuccessMesg('');
            return;
        }
        if (!emailRegex.test(email)) {
            setErrorMesg("Email không hợp lệ");
            setSuccessMesg('');
            return;
        }
        setErrorMesg('');
        const response = await fetch('http://localhost:3000/api/email/add_email/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        if (response.ok){
            setSuccessMesg("Đăng ký nhận thông báo các chương trình ưu đãi thành công!!!");
            setEmailInput('');
        }
    };
    
    return(
        <footer className="w-full bg-[var(--Aka)] text-[var(--Shiro)] px-6 py-8 md:py-12">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-stretch justify-between gap-8">

                <div className="w-full md:w-1/3 flex flex-col gap-4 items-center">
                    <div className="text-xl font-extrabold">ABOUT US</div>
                    <nav className="flex flex-col gap-2 font-bold">
                        <a href="/team" className="text-[var(--Shiro)] hover:text-[var(--Kuro)]">ĐỘI NGŨ</a>
                        <a href="/event" className="text-[var(--Shiro)] hover:text-[var(--Kuro)]">SỰ KIỆN</a>
                        <a href="/contact" className="text-[var(--Shiro)] hover:text-[var(--Kuro)]">LIÊN HỆ</a>
                    </nav>
                </div>

                <div className="w-full md:w-1/3 flex flex-col items-center text-center gap-4">
                    <a href="/home" className="text-2xl md:text-3xl" style={{fontFamily: 'Gasoek One, sans-serif'}}>TOKYO BITES</a>
                    <div className="flex gap-4 text-xl text-[var(--Shiro)]">
                        <FontAwesomeIcon icon={faFacebook} />
                        <FontAwesomeIcon icon={faInstagram} />
                        <FontAwesomeIcon icon={faTwitter} />
                        <FontAwesomeIcon icon={faYoutube} />
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 mt-2">
                        <a href="/privacy" className="hover:text-[var(--Kuro)]">Chính sách bảo mật</a>
                        <a href="/terms-conditions" className="hover:text-[var(--Kuro)]">Điều khoản sử dụng</a>
                    </div>
                </div>

            </div>
        </footer>
    );
}

export default Footer;