import { Link, useLocation } from 'react-router-dom';

const BtnNav = ({ to, imgSrc, altText, className = "icon" }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
      <Link to={to}>
        <img 
          className={`${className} ${isActive ? 'active' : ''}`}
          src={imgSrc} 
          alt={altText} 
        />
      </Link>
    );
  };
  
  export default BtnNav;