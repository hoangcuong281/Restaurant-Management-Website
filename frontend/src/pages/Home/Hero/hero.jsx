function HeroItem() {
    return (
        <section className="relative w-full min-h-[60vh] md:min-h-[1000px] flex items-center justify-center px-4 sm:px-8 md:px-[160px] overflow-hidden py-25">
            <video
                autoPlay
                muted
                loop
                className="absolute top-0 left-0 w-full h-full object-cover z-0 pointer-events-none"
            >
                <source src="https://res.cloudinary.com/dqxeupx0u/video/upload/v1748347324/iq4qvlexewp7s3rtdx0j.webm" type="video/webm" />
            </video>

            <div className="absolute inset-0 bg-black/70 z-10"></div>

            <div className="relative z-20 w-full flex flex-col md:flex-row md:justify-between items-center md:items-start gap-6">
                <div className="text-[var(--Shiro)] w-full md:w-1/2 font-bold text-3xl sm:text-4xl md:text-[3.5rem] whitespace-pre-line text-center md:text-left">
                    HƯƠNG VỊ <span className="text-[var(--Aka)]">TOKYO</span>
                    <br />CHẠM ĐẾN TÂM HỒN BẠN
                </div>

                <div className="font-normal text-base sm:text-lg md:text-[1.2rem] text-[var(--Shiro)] w-full md:w-1/2 leading-7 text-center md:text-left px-2 md:px-0">
                    Tokyo Bites không chỉ đơn thuần là một nhà hàng, mà là hành trình khám phá văn hóa ẩm thực đường phố Tokyo — nơi tinh hoa truyền thống hòa quyện cùng hơi thở hiện đại.
                    Lấy cảm hứng từ những quán ăn tấp nập giữa lòng thủ đô Nhật Bản, chúng tôi mang đến trải nghiệm ẩm thực chân thực với đủ hương vị đặc trưng của xứ sở hoa anh đào.
                </div>
            </div>
        </section>
    )
}

export default HeroItem