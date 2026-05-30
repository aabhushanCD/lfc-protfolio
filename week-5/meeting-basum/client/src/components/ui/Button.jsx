import "../../styles/button.css";

const Button = ({ variant = "blue", className = "", children, ...props }) => {
  return (
    <button className={`btn btn-${variant} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
