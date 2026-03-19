import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function Menu(){
    const [meals, setMeals] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('maki');
    const [selectedDrinkCategory, setSelectedDrinkCategory] = useState('softdrinks');
    const categories = ['appetizers','maki','salads','sashimi','sushi','ramen','rice'];
    const swiperRef = useRef(null);
    const drinkSwiperRef = useRef(null);
    const mealSwiperRef = useRef(null);
    const fetchMeals = async () => {
        const response = await fetch('http://localhost:3000/api/meal/menu');
        const data = await response.json();
        setMeals(data);
    };
    useEffect(() => {
        fetchMeals();
        const handleResize = () => {
        if (!swiperRef.current) return;

        if (window.innerWidth < 640) {
        const index = swiperRef.current.activeIndex;
            setSelectedCategory(categories[index]);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    const handleDrinkCategoryChange = (category) => {
        setSelectedDrinkCategory(category);
    };
    
    useEffect(() => {
        drinkSwiperRef.current?.slideTo(0);
    }, [selectedDrinkCategory]);

    return (
        <section className="w-full mt-12 mb-12">
            <div className="max-w-[1200px] mx-auto flex flex-col items-center px-4">
                <p className="text-3xl md:text-4xl font-bold text-[var(--Kuro)] text-2xl md:text-3xl text-center">Món được yêu thích nhất</p>

                <div 
                    className="w-full md:w-[60%] flex justify-center items-center mt-6 flex-row"
                >
                    <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="mx-3 px-2 py-1 rounded-full cursor-pointer hover:bg-[var(--Kuro)] hover:text-white transition"
                    >
                        ←
                    </button>
                    <Swiper
                        spaceBetween={50}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        onSlideChange={(swiper) => {
                            if (window.innerWidth < 640) {
                                setSelectedCategory(categories[swiper.activeIndex]);
                            }
                        }}
                        breakpoints={{
                            0: {
                            slidesPerView: 1, // mobile
                            },
                            640: {
                            slidesPerView: 2, // small tablet
                            },
                            1024: {
                            slidesPerView: 3, // desktop
                            },
                        }}
                        className='rounded'
                    >
                    {['appetizers','maki','salads','sashimi','sushi','ramen','rice'].map(cat => (
                        <SwiperSlide key={cat}>
                            <div
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 font-bold text-center rounded-2xl border border-[var(--Kuro)] cursor-pointer transition-all ${selectedCategory===cat ? 'bg-[var(--Kuro)] text-[var(--Shiro)]' : 'hover:bg-[var(--Kuro)] hover:text-[var(--Shiro)]'}`}
                            >
                                {cat === 'appetizers' ? 'Khai vị' : cat === 'rice' ? 'Cơm' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </div>
                        </SwiperSlide>
                    ))}
                    </Swiper>
                    <button
                        onClick={() => swiperRef.current?.slideNext()}
                        className="mx-3 px-2 py-1 rounded-full cursor-pointer hover:bg-[var(--Kuro)] hover:text-white transition"
                    >
                        →
                    </button>
                </div>

                <div className="flex justify-center items-center gap-6 mt-6 w-full">
                    <Swiper
                        spaceBetween={20}
                        breakpoints={{
                            0: {
                                slidesPerView: 1, // mobile
                            },
                            640: {
                                slidesPerView: 2, // small tablet
                            },
                            1024: {
                                slidesPerView: 3, // desktop
                            },
                        }}
                        className='w-full flex items-center justify-center'
                    >
                        {meals.filter(meal => meal.category === selectedCategory && meal.highlight == true).map((meal) => (
                            <SwiperSlide key={meal.meal_id}>
                                <div className="flex flex-col items-center justify-center h-[450px] transform hover:scale-105 transition-transform duration-300">
                                    <div className="w-[240px] h-[350px] rounded-[40px] bg-center bg-cover" style={{backgroundImage: `url(${meal.img})`}}></div>
                                    <div className="flex flex-col items-center mt-3 w-[240px]">
                                        <p className="font-bold text-lg text-center">{meal.name}</p>
                                        <p className="font-bold text-base mt-auto opacity-70">{meal.price.toLocaleString('vi-VN')} đ</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="w-full lg:flex md:flex-row md:items-start justify-around mt-8 hidden">
                    <div className="md:w-1/2 flex items-center justify-center">
                        <button
                            onClick={() => drinkSwiperRef.current?.slidePrev()}
                            className="w-12 h-12 rounded-full cursor-pointer flex items-center justify-center hover:bg-[var(--Kuro)] hover:text-white transition"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                        <Swiper
                            onSwiper={(swiper) => (drinkSwiperRef.current = swiper)}
                            slidesPerView={1}
                            spaceBetween={20}
                            speed={500}
                            className='w-[50%]'
                        >
                            {meals
                                .filter(meal => meal.category === selectedDrinkCategory)
                                .map((drink) => (
                                    <SwiperSlide key={drink.meal_id}>
                                        <div className="flex flex-col items-center justify-center self-center">
                                            <div
                                                className="w-[240px] h-[350px] rounded-[40px] bg-center bg-cover"
                                                style={{ backgroundImage: `url(${drink.img})` }}
                                            ></div>

                                            <div className="flex flex-col items-center mt-3 w-[240px]">
                                                <div className="font-bold text-lg">{drink.name}</div>
                                                <div className="font-bold text-base mt-auto">
                                                    {drink.price.toLocaleString('vi-VN')} đ
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                        </Swiper>
                        <button
                            onClick={() => drinkSwiperRef.current?.slideNext()}
                            className="w-12 h-12 rounded-full cursor-pointer flex items-center justify-center hover:bg-[var(--Kuro)] hover:text-white transition"
                        >
                            <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                    </div>

                    <div className="flex flex-col self-center gap-3 text-[var(--Midori)] text-3xl">
                        <div onClick={() => handleDrinkCategoryChange('softdrinks')} className={`cursor-pointer text-center transition ${selectedDrinkCategory === 'softdrinks' ? 'text-[var(--Kuro)] font-bold' : 'font-bold'}`}>Energy Drinks</div>
                        <div onClick={() => handleDrinkCategoryChange('alcohol')} className={`cursor-pointer text-center transition ${selectedDrinkCategory === 'alcohol' ? 'text-[var(--Kuro)] font-bold' : 'font-bold'}`}>Alcohol</div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Menu;

