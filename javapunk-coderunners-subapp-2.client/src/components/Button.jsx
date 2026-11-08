//Generell knappe-komponent som kan brukes til flere ulike knapper
import "./Button.css";

function Button({ onClick, children, className = "" }) {
    return (
        <button onClick={onClick} className={`btn ${className}`}>
            {children}
        </button>
    );
}

export default Button;