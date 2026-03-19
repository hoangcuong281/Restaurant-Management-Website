import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

function OurTeam(){
    return(
        <section className="w-full bg-[var(--Kuro)] py-12 md:py-20 flex flex-col items-center">
            <h2 className="text-3xl md:text-[2rem] font-extrabold text-[var(--Shiro)] mb-8 font-(family-name:--font-primary)">Đội ngũ</h2>

            <div className="w-[90%] max-w-6xl gap-8 items-start">
                <Swiper
                    modules={[Pagination]}
                    pagination={{ clickable: true }}
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        640: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    className="
                        w-[90%]
                        pb-12
                        [&_.swiper-pagination]:!relative
                        [&_.swiper-pagination]:!mt-8

                        [&_.swiper-pagination-bullet]:!bg-white
                        [&_.swiper-pagination-bullet]:w-2
                        [&_.swiper-pagination-bullet]:h-2
                        [&_.swiper-pagination-bullet]:!transition-all

                        [&_.swiper-pagination-bullet-active]:!opacity-100
                        [&_.swiper-pagination-bullet-active]:!scale-125
                        "
                >
                    <SwiperSlide>
                        <div className="flex flex-col items-center text-center">
                            <img src="https://res.cloudinary.com/dqxeupx0u/image/upload/v1741682686/Narisawa_mzejuv.jpg" alt="Yoshihiro Narisawa" className="w-full max-w-xs h-90 md:h-90 object-cover rounded-lg" />
                            <div className="mt-4 text-lg font-bold text-[var(--Shiro)]" style={{fontFamily: 'var(--font-display)'}}>Yoshihiro Narisawa</div>
                            <div className="text-sm text-[var(--Shiro)] opacity-80">Đầu bếp</div>
                            <div className="mt-2 text-sm italic text-[var(--Shiro)] opacity-90">“Most of the vegetables and fruit in Japan contain pesticides. It's the role of the chef to support (organic) producers.”</div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="flex flex-col items-center text-center">
                            <img src="https://res.cloudinary.com/dqxeupx0u/image/upload/v1741682689/Hiroyasu_Kawate_jea7hm.jpg" alt="Hiroyasu Kawate" className="w-full max-w-xs h-90 md:h-90 object-cover rounded-lg" />
                            <div className="mt-4 text-lg font-bold text-[var(--Shiro)]" style={{fontFamily: 'var(--font-display)'}}>Hiroyasu Kawate</div>
                            <div className="text-sm text-[var(--Shiro)] opacity-80">Đầu bếp</div>
                            <div className="mt-2 text-sm italic text-[var(--Shiro)] opacity-90">“It is important to focus on balanced and plant-based meals, centred around vegetables, to leave something for future generations.”</div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="flex flex-col items-center text-center">
                            <img src="https://res.cloudinary.com/dqxeupx0u/image/upload/v1741682688/Shinsuke_Ishii_p6gshr.jpg" alt="Shinsuke Ishii" className="w-full max-w-xs h-90 md:h-90 object-cover rounded-lg" />
                            <div className="mt-4 text-lg font-bold text-[var(--Shiro)]" style={{fontFamily: 'var(--font-display)'}}>Shinsuke Ishii</div>
                            <div className="text-sm text-[var(--Shiro)] opacity-80">Đầu bếp</div>
                            <div className="mt-2 text-sm italic text-[var(--Shiro)] opacity-90">“I asked myself what I could do as a chef, and I decided to inform as many people as possible through my work.”</div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>
    )
}

export default OurTeam;
