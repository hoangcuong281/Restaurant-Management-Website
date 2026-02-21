import Hero from './Hero/hero'
import Intro from './Intro/intro'
import Menu from './Menu/menu'
import OurTeam from './OurTeam/ourteam'
import Event from './Event/event'
import DetailMenu from './DetailMenu/detailmenu'
import NavBar from '../../components/NavBar/navBar'
import Footer from '../../components/Footer/footer' 

function Home(){
    return(
        <>
            <NavBar/>
            <Hero/>
            <Intro/>
            <DetailMenu/>
            <Menu/>
            <OurTeam/>
            <Event/>
            <Footer/>
        </>
    );
}

export default Home;