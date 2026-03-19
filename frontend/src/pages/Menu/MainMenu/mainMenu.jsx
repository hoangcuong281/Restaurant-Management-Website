import Sidebar from './Sidebar/sidebar';
import MenuContent from './MenuContent/menuContent';
import { useState } from 'react';

function MainMenu(){
    const [selectedCategory, setSelectedCategory] = useState('all');

    return(
        <div 
            className="
                pt-[30px] pb-[200px] pl-2 w-full flex justify-evenly items-start xl:flex-row flex-col gap-10
                bg-[linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url('https://res.cloudinary.com/dqxeupx0u/image/upload/v1773810816/418612095_a3d8be21-4357-478b-a02d-ba42c98ac9f3_onpuuz.jpg')] bg-cover
            "
        >
            <Sidebar
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
            />
            <MenuContent
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
            />
        </div>
    );
}

export default MainMenu;