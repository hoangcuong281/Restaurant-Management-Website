import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

function MenuContent({ selectedCategory, onCategoryChange }) {
    const [meals, setMeals] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchActive, setSearchActive] = useState(false);

    const fetchMeals = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/meal/menu");
            const data = await response.json();
            setMeals(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchMeals();
    }, []);

    const handleCategoryClick = (category) => {
        onCategoryChange(category);
    };

    const handleSearch = () => {
        if (searchTerm.trim() !== '') {
            setSearchActive(true);
            if (selectedCategory !== 'all' && onCategoryChange) {
                onCategoryChange('all');
            }
        } else {
            setSearchActive(false);
        }
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value === '') setSearchActive(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    
    const filteredMeals = meals.filter(meal => {
        const isDrinkCategory = selectedCategory === 'drinks'
            ? meal.category === 'softdrinks' || meal.category === 'alcohol'
            : meal.category === selectedCategory;

        if (searchActive) {
            return (
                (selectedCategory === 'all' || isDrinkCategory) &&
                meal.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return selectedCategory === 'all' || isDrinkCategory;
    });

    return (
        <div className="flex flex-col items-start w-full">
            <div className="flex p-2 gap-2 z-20 w-full">
                <input
                    className="flex-1 px-3 py-2 rounded border border-gray-300 text-[var(--Shiro)] "
                    type="text"
                    placeholder="Tìm kiếm món ăn..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleSearch} className="px-4 py-2 rounded bg-[var(--Kuro)] text-[var(--Shiro)] hidden md:block cursor-pointer transition-all hover:bg-[var(--Aka)]">
                    Tìm kiếm
                </button>
            </div>
            <div className="w-full flex items-center justify-start gap-4 p-2 xl:hidden">
                <Swiper
                    spaceBetween={20}
                    breakpoints={{
                        0: {
                            slidesPerView: 2, // mobile
                        },
                        340: {
                            slidesPerView: 3, // mobile
                        },
                        450: {
                            slidesPerView: 4, // mobile
                        },
                        640: {
                            slidesPerView: 5, // small tablet
                        },
                    }}
                    className='flex items-center justify-center'
                >
                    {['all','appetizers','maki','sushi','sashimi','ramen','rice','dessert','drinks'].map(cat => (
                        <SwiperSlide key={cat}>
                            <div
                                onClick={() => handleCategoryClick(cat)}
                                className={`px-4 py-2 text-[var(--Shiro)] font-bold text-center rounded-2xl border border-[var(--Shiro)] cursor-pointer transition-all ${selectedCategory===cat ? 'bg-[var(--Aka)] text-[var(--Shiro)]' : 'hover:bg-[var(--Kuro)] hover:text-[var(--Shiro)]'}`}
                            >
                                {cat === 'all' ? 'Tất cả' : cat === 'appetizers' ? 'Khai vị' : cat === 'rice' ? 'Cơm' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="flex flex-wrap justify-center text-[var(--Shiro)] ">
                {filteredMeals.length > 0 ? (
                    filteredMeals.map((meal) => (
                        <div>
                            <div 
                                key={meal.meal_id} 
                                className="group w-50 md:w-72 h-60 rounded-lg flex items-center justify-center xl:overflow-hidden bg-cover bg-center m-2" 
                                style={{ backgroundImage: `url(${meal.img})` }}
                                >
                            </div>
                            <div className="text-center">
                                <p className="">
                                    {meal.name}
                                </p>
                                <p className="text-center italic text-sm">
                                    {meal.description}
                                </p>
                                <p className="mt-autotext-base font-bold text-center py-2">
                                    {Number(meal.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="p-4">Không tìm thấy món ăn</p>
                )}
            </div>
        </div>
    );
}

export default MenuContent;