import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import BtnNav from "../components/BtnNav";
import homeIcon from '../assets/picture/home.svg';
import searchIcon from '../assets/picture/search.svg';
import profilIcon from '../assets/picture/profil.svg';

export default function Root() {
    return (
        <>
        <header>
            <h1>Movie<span style={{ color: '#fff' }}>Browser</span></h1>
        </header>
        <main>
            <Outlet />
        </main>
        <footer>
            <BtnNav to="/" imgSrc={homeIcon} altText="Home" />
            <BtnNav to="/search" imgSrc={searchIcon} altText="search" />
            <BtnNav to="/profil" imgSrc={profilIcon} altText="profil" />
        </footer>
        </>
    );
}