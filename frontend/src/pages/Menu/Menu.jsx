import NavBar from "../../components/NavBar/navBar";
import Footer from "../../components/Footer/footer";
import Header from "./Header/header";
import MainMenu from "./MainMenu/mainMenu";

function Menu(){
    return(
        <div>
            <NavBar/>
            <Header/>
            <MainMenu/>
            <Footer/>
        </div>
    )
}

export default Menu;