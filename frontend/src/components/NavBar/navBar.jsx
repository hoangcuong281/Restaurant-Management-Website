import { useEffect, useState, useRef } from "react";
import { jwtDecode } from "jwt-decode";

function Header() {
    const [open, setOpen] = useState(false);
    const [userOptions, setUserOptions] = useState(false);
    const [nonUserOptions, setNonUserOptions] = useState(false);
    const [user, setUser] = useState(null);

    const mobileMenuRef = useRef(null);
    const mobileButtonRef = useRef(null);
    const userOptionsRef = useRef(null);
    const userButtonRef = useRef(null);
    const nonUserOptionsRef = useRef(null);
    const nonUserButtonRef = useRef(null);

    const logout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setUser(null);
            return;
        }
        else {
            const decoded = jwtDecode(token);
            setUser(decoded);
        }
        try {
            const decoded = jwtDecode(token);

            // check hết hạn
            if (decoded.exp * 1000 < Date.now()) {
                localStorage.removeItem("token");
                setUser(null);
            } else {
                setUser(decoded);
            }
        } catch {
            localStorage.removeItem("token");
            setUser(null);
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                open &&
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(e.target) &&
                mobileButtonRef.current &&
                !mobileButtonRef.current.contains(e.target)
            ) {
                setOpen(false);
            }

            if (
                userOptions &&
                userOptionsRef.current &&
                !userOptionsRef.current.contains(e.target) &&
                userButtonRef.current &&
                !userButtonRef.current.contains(e.target)
            ) {
                setUserOptions(false);
            }

            if (
                nonUserOptions &&
                nonUserOptionsRef.current &&
                !nonUserOptionsRef.current.contains(e.target) &&
                nonUserButtonRef.current &&
                !nonUserButtonRef.current.contains(e.target)
            ) {
                setNonUserOptions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open, userOptions, nonUserOptions]);

    return (
        <header className="w-full bg-[var(--Kuro)]">
            <section className="flex justify-center w-full">
                <nav className="fixed top-0 md:top-2 z-50 w-full md:w-[95%] flex items-center justify-between md:rounded-[20px] px-6 md:px-12 py-4 bg-[var(--Kuro)]">

                    {/* Left Menu (Desktop) */}
                    <div className="hidden xl:flex items-center gap-5">
                        <a href="/menu" className="font-bold text-[var(--Shiro)] hover:text-[var(--Aka)]">MENU</a>
                        <a href="/team" className="font-bold text-[var(--Shiro)] hover:text-[var(--Aka)]">TEAM</a>
                        <a href="/event" className="font-bold text-[var(--Shiro)] hover:text-[var(--Aka)]">EVENT</a>
                        <a href="/contact" className="font-bold text-[var(--Shiro)] hover:text-[var(--Aka)]">CONTACT</a>
                    </div>

                    {/* Logo */}
                    <div className="absolute left-1/2 -translate-x-1/2">
                        <a href="/home" className="uppercase text-xl md:text-[2.5rem] font-extrabold text-[var(--Aka)]"
                            style={{ fontFamily: "var(--font-display)" }}>
                            TOKYO BITES
                        </a>
                    </div>

                    {/* Mobile Button */}
                    <button
                        ref={mobileButtonRef}
                        className="xl:hidden text-[var(--Shiro)] text-2xl"
                        onClick={() => setOpen(!open)}
                    >
                        ☰
                    </button>

                    {/* Right Menu (Desktop) */}
                    <div className="flex items-center gap-2">
                        {user ? (
                            <a href="/tablebooking" className="hidden xl:flex bg-[var(--Aka)] text-[var(--Shiro)] px-4 py-2 rounded-xl font-bold">
                                BOOK A TABLE
                            </a>
                        ) : null}
                        {user ? (
                            <button ref={userButtonRef} onClick={() => setUserOptions(!userOptions)} className="flex items-center gap-2 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="21px" height="21px" viewBox="0 0 24 24" fill="none">
                                    <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span className="font-bold text-[var(--Shiro)] cursor-pointer hidden xl:flex">
                                    {user.name}
                                </span>
                            </button>
                        ) : (
                            <button ref={nonUserButtonRef} onClick={() => setNonUserOptions(!nonUserOptions)} className="flex items-center gap-2 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="21px" height="21px" viewBox="0 0 24 24" fill="none">
                                    <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <p className="hidden xl:flex text-[var(--Shiro)] font-bold">LOGIN</p>
                            </button>
                        )}
                    </div>
                </nav>
            </section>

            {/* Mobile Menu */}
            {open && (
                <div ref={mobileMenuRef} className="xl:hidden fixed top-19 w-full md:w-[50%] md:left-6 bg-[var(--Kuro)] flex flex-col items-center gap-6 py-6 z-40 rounded-3xl">
                    <a href="/menu" className="font-bold text-[var(--Shiro)] hover:text-[var(--Aka)]">MENU</a>
                    <a href="/team" className="font-bold text-[var(--Shiro)] hover:text-[var(--Aka)]">TEAM</a>
                    {user ? (
                        <a href="/tablebooking" className="bg-[var(--Aka)] text-[var(--Shiro)] px-4 py-2 rounded-xl font-bold">
                            BOOK A TABLE
                        </a>
                    ) : null}
                    <a href="/event" className="font-bold text-[var(--Shiro)] hover:text-[var(--Aka)]">EVENT</a>
                    <a href="/contact" className="font-bold text-[var(--Shiro)] hover:text-[var(--Aka)]">CONTACT</a>
                </div>
            )}

            {userOptions && (
                <div ref={userOptionsRef} className="fixed top-18 md:top-21 right-2 md:right-10 bg-[var(--Kuro)] rounded-lg shadow-lg p-4 z-50 flex flex-col items-start gap-4">
                    <a href="/profile" className="font-bold text-[var(--Shiro)] hover:text-[var(--Aka)] cursor-pointer">Profile</a>
                    <a href="/history" className="font-bold text-[var(--Shiro)] hover:text-[var(--Aka)] cursor-pointer">Booking History</a>
                    <button onClick={logout} className="font-bold text-[var(--Shiro)] hover:text-[var(--Aka)] cursor-pointer">Logout</button>
                </div>
            )}

            {nonUserOptions && (
                <div ref={nonUserOptionsRef} className="fixed top-18 md:top-21 right-2 md:right-10 bg-[var(--Kuro)] rounded-lg shadow-lg p-4 z-50 flex flex-col items-start gap-4">
                    <a href="/login" className="font-bold text-[var(--Shiro)] hover:text-[var(--Aka)]">LOGIN</a>
                    <a href="/register" className="font-bold text-[var(--Shiro)] hover:text-[var(--Aka)]">REGISTER</a>
                </div>
            )}
        </header>
    );
}

export default Header;