import { ButtonSpinner } from "../spinner/spinner.styles";
import "./button.styles.scss";

export const BUTTON_TYPES = {
  inverted: "inverted",
  google: "google-sign-in",
};

const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
  return (
    <button
      className={`button-container ${BUTTON_TYPES[buttonType]}`}
      disabled={isLoading}
      {...otherProps}
    >
      {isLoading ? <ButtonSpinner /> : children}
    </button>
  );
};

export default Button;
