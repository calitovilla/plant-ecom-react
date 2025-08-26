import './button.styles.scss';

export const BUTTON_TYPE_CLASSES = {
  google: "google-sign-in",
  inverted: "inverted",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode; // is the content inside the button
  buttonType?: keyof typeof BUTTON_TYPE_CLASSES;
}
// or { children: React.ReactNode, buttonType: keyof typeof BUTTON_TYPE_CLASSES } & React.ButtonHTMLAttributes<HTMLButtonElement> for the definition

const Button = ({ children, buttonType, ...otherProps }: ButtonProps) => {
    return (
        <button
            className={`button-container ${buttonType ? BUTTON_TYPE_CLASSES[buttonType] : ""}`}
            {...otherProps}
        >
            {children}
        </button>
    );
};


export default Button;
