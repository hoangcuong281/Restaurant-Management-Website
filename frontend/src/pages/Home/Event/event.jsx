import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

function Event() {
  const items = [
    { title: 'Private Dining', img: 'https://res.cloudinary.com/dqxeupx0u/image/upload/v1741682687/Event1_ean6xr.jpg' },
    { title: 'Corporate Events', img: 'https://res.cloudinary.com/dqxeupx0u/image/upload/v1741682687/Event1_ean6xr.jpg' },
    { title: 'Social Gatherings', img: 'https://res.cloudinary.com/dqxeupx0u/image/upload/v1741682687/Event1_ean6xr.jpg' },
    { title: 'Special Occasions', img: 'https://res.cloudinary.com/dqxeupx0u/image/upload/v1741682687/Event1_ean6xr.jpg' },
  ]

  return (
    <section className="w-full flex items-center justify-center py-8">
      <div className="w-[90%] max-w-6xl flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--Kuro)] mb-6" style={{fontFamily: 'var(--font-display)'}}>Events</h2>

        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {items.map((it, idx) => (
            <div key={idx} className="group relative w-full h-64 md:h-96 overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-center bg-cover" style={{backgroundImage: `url(${it.img})`}} />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/60 transition" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-[var(--Shiro)] px-6 py-3 text-2xl md:text-3xl font-bold opacity-0 group-hover:opacity-100 transition-opacity">{it.title}</div>
              </div>
            </div>
          ))}
        </div>
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          className="
            w-full mt-8
            [&_.swiper-pagination]:!relative
            [&_.swiper-pagination]:!mt-8

            [&_.swiper-pagination-bullet]:!bg-black
            [&_.swiper-pagination-bullet]:w-2
            [&_.swiper-pagination-bullet]:h-2
            [&_.swiper-pagination-bullet]:!transition-all

            [&_.swiper-pagination-bullet-active]:!opacity-100
            [&_.swiper-pagination-bullet-active]:!scale-125
            md:!hidden
          "
        >
          {items.map((it, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-lg md:hidden">
                <div className="absolute inset-0 bg-center bg-cover" style={{backgroundImage: `url(${it.img})`}} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Event;