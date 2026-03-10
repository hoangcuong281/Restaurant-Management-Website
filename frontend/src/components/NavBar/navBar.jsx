import { useState } from "react";

function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className="w-full bg-[var(--Kuro)]">
            <section className="flex justify-center w-full">
                <nav className="fixed top-2 z-50 w-[95%] flex items-center justify-between rounded-[20px] px-6 md:px-12 py-4 bg-[var(--Kuro)]">

                    {/* Left Menu (Desktop) */}
                    <div className="hidden xl:flex items-center gap-5">
                        <a href="/menu" className="font-bold text-[var(--Shiro)] hover:text-[var(--Aka)]">
                            THỰC ĐƠN
                        </a>
                        <a href="/team" className="font-bold text-[var(--Shiro)] hover:text-[var(--Aka)]">
                            ĐỘI NGŨ
                        </a>
                        <a href="/event" className="font-bold text-[var(--Shiro)] hover:text-[var(--Aka)]">
                            SỰ KIỆN
                        </a>
                        <a href="/contact" className="font-bold text-[var(--Shiro)] hover:text-[var(--Aka)]">
                            LIÊN HỆ
                        </a>
                    </div>

                    {/* Logo */}
                    <div className="absolute left-1/2 -translate-x-1/2">
                        <a
                            href="/home"
                            className="uppercase text-xl md:text-[2.5rem] font-extrabold text-[var(--Aka)]"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            TOKYO BITES
                        </a>
                    </div>
                    {/* Right Menu (Desktop) */}
                    <div className="hidden xl:flex items-center gap-2">
                        <a href="/login" className="font-bold text-[var(--Shiro)] hover:text-[var(--Aka)] gap-0">
                            ĐĂNG NHẬP
                        </a>
                        <p className='font-bold text-[var(--Shiro)] hover:text-[var(--Aka)] gap-0'>/</p>
                        <a href="/register" className="font-bold text-[var(--Shiro)] hover:text-[var(--Aka)] gap-0">
                            ĐĂNG KÝ
                        </a>
                    </div>

                    {/* Mobile Button */}
                    <button
                        className="xl:hidden text-[var(--Shiro)] text-2xl"
                        onClick={() => setOpen(!open)}
                    >
                        ☰
                    </button>

                </nav>
            </section>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden fixed top-20 left-0 w-full bg-[var(--Kuro)] flex flex-col items-center gap-6 py-6 z-40">
                    <a href="/menu" className="font-bold text-[var(--Shiro)] hover:text-[var(--Aka)]">
                        THỰC ĐƠN
                    </a>
                    <a href="/team" className="font-bold text-[var(--Shiro)] hover:text-[var(--Aka)]">
                        ĐỘI NGŨ
                    </a>
                    <a href="/tablebooking" className="bg-[var(--Aka)] text-[var(--Shiro)] px-4 py-2 rounded-xl font-bold">
                        ĐẶT BÀN
                    </a>
                    <a href="/event" className="font-bold text-[var(--Shiro)] hover:text-[var(--Aka)]">
                        SỰ KIỆN
                    </a>
                    <a href="/contact" className="font-bold text-[var(--Shiro)] hover:text-[var(--Aka)]">
                        LIÊN HỆ
                    </a>
                </div>
            )}
        </header>
    );
}

export default Header;