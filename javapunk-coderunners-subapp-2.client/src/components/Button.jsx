//A general button component that gets used across pages
import "./Button.css";

function Button({ 
    onClick,
    children, 
    className = "",
    type = "button",
    disabled = false,
}) {
    return (
        <button 
            type={type}
            onClick={onClick} 
            className={`btn ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default Button;