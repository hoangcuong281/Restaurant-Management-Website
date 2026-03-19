function Intro() {
    return (
        <section className="mt-10 w-[90%] mx-auto min-h-[400px] p-5 bg-[var(--Kuro)] rounded-[18px] flex flex-col gap-8 box-border">
            <div className="flex flex-col md:flex-row items-center md:items-stretch gap-6 w-full">
                <div className="w-full md:w-1/2 flex items-center justify-center text-center md:text-left px-4">
                    <p className="text-[1rem] sm:text-[2.5rem] md:text-[2.5rem] text-[var(--Shiro)] font-bold leading-[1.1]">
                        Một bữa ăn, cả hành trình Tokyo
                    </p>
                </div>

                <div className="w-full md:w-1/2 flex items-center justify-center px-4">
                    <img
                        src="https://res.cloudinary.com/dqxeupx0u/image/upload/v1741682689/Hero6_kh3mrq.jpg"
                        alt="Tokyo's food"
                        className="w-full h-auto rounded-[18px] object-cover"
                    />
                </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center md:items-stretch gap-6 w-full">
                <div className="w-full md:w-1/2 flex items-center justify-center px-4">
                    <img
                        src="https://res.cloudinary.com/dqxeupx0u/image/upload/v1741682687/Hero1_hu0ysl.jpg"
                        alt="Kitchen"
                        className="w-full h-auto rounded-[18px] object-cover"
                    />
                </div>

                <div className="w-full md:w-1/2 flex items-center justify-center text-center md:text-left px-4">
                    <p className="text-[1rem] sm:text-[2.5rem] md:text-[2.5rem] text-[var(--Shiro)] font-bold leading-[1.1]">
                        Gìn giữ tinh hoa, sáng tạo từng ngày
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Intro;