import Logo from './LogoTMDB';
import tmdb from "../assets/picture/logo_tmdb.svg"   
 
const Source = () => {
    return (
        <div className='detail'>
        <h3>Source des données et des images</h3><br />
        <Logo src={tmdb} /><br /><br />
        <p>
            Les données et les images utilisées sur cette page sont fournies par <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer"> The Movie Database (TMDb) </a>. 
            TMDb est une base de données collaborative de films et de séries télévisées. Merci à TMDb pour fournir ces précieuses informations.
        </p><br />
        <p>
        Ce projet a été réalisé dans le cadre de la formation Becode en 2024. Le site est conçu en priorité pour les appareils mobiles.
        </p>

        </div>
    );
}

export default Source;