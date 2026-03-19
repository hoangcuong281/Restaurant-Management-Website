import { Swiper, SwiperSlide } from "swiper/react";

function Sidebar({ selectedCategory, onCategoryChange }){
    const handleCategoryClick = (category) => {
        onCategoryChange(category);
    };
    return(
        <div className="hidden xl:flex justify-center items-center bg-[var(--Kuro)] p-8 border-2 border-[var(--Kuro)] rounded-2xl mt-2">
            <ul className="flex flex-col list-none font-[var(--font-heading)] font-bold text-[var(--Midori)] gap-6 text-2xl">
                <li className={`${selectedCategory === 'all' ? 'text-[var(--Shiro)]' : 'text-[var(--Midori)]'} cursor-pointer`} onClick={() => handleCategoryClick('all')} data-category="all" id="all">All</li>
                <li className={`${selectedCategory === 'appetizers' ? 'text-[var(--Shiro)]' : 'text-[var(--Midori)]'} cursor-pointer`} onClick={() => handleCategoryClick('appetizers')} data-category="appetizers" id="appetizers">Appetizers</li>
                <li className={`${selectedCategory === 'maki' ? 'text-[var(--Shiro)]' : 'text-[var(--Midori)]'} cursor-pointer`} onClick={() => handleCategoryClick('maki')} data-category="maki" id="maki">Maki</li>
                <li className={`${selectedCategory === 'sushi' ? 'text-[var(--Shiro)]' : 'text-[var(--Midori)]'} cursor-pointer`} onClick={() => handleCategoryClick('sushi')} data-category="sushi" id="sushi">Sushi</li>
                <li className={`${selectedCategory === 'sashimi' ? 'text-[var(--Shiro)]' : 'text-[var(--Midori)]'} cursor-pointer`} onClick={() => handleCategoryClick('sashimi')} data-category="sashimi" id="sashimi">Sashimi</li>
                <li className={`${selectedCategory === 'ramen' ? 'text-[var(--Shiro)]' : 'text-[var(--Midori)]'} cursor-pointer`} onClick={() => handleCategoryClick('ramen')} data-category="ramen" id="ramen">Ramen</li>
                <li className={`${selectedCategory === 'rice' ? 'text-[var(--Shiro)]' : 'text-[var(--Midori)]'} cursor-pointer`} onClick={() => handleCategoryClick('rice')} data-category="rice" id="rice">Rice</li>
                <li className={`${selectedCategory === 'dessert' ? 'text-[var(--Shiro)]' : 'text-[var(--Midori)]'} cursor-pointer`} onClick={() => handleCategoryClick('dessert')} data-category="dessert" id="dessert">Dessert</li>
                <li className={`${selectedCategory === 'drinks' ? 'text-[var(--Shiro)]' : 'text-[var(--Midori)]'} cursor-pointer`} onClick={() => handleCategoryClick('drinks')} data-category="drinks" id="drinks">Drinks</li>
            </ul>
        </div>

    );
}

export default Sidebar;