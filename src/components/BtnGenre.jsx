import { Link, useLocation } from 'react-router-dom';

const BtnGenre = ({ genre, onClick, isActive, underlineIndices = [] }) => {
    const { id, name } = genre;

    // Function to render text with underlined letters
    const renderUnderlinedText = (text, indices) => {
        return text.split('').map((char, index) => (
            <span key={index} className={indices.includes(index) ? 'underline' : ''}>
                {char}
            </span>
        ));
    };

    return (
        <button 
            key={genre.id} 
            onClick={() => onClick(genre.id)} 
            className={`genre-link ${isActive ? 'active' : ''}`}
        >
            {renderUnderlinedText(name, isActive ? underlineIndices : [])}
        </button>
    );
};
  
export default BtnGenre;