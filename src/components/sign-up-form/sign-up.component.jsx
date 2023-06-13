import { useState } from "react";
import "./sign-up-form.styles.scss";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { useDispatch } from "react-redux";
import { signUpStart } from "../../store/user/user.action";

const defaultValues = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUpForm = () => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState(defaultValues);
  const { displayName, email, password, confirmPassword } = formValues;

  const resetFormFields = () => {
    setFormValues(defaultValues);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Password does not match!");
      return;
    }

    try {
      dispatch(signUpStart(email, password, displayName));
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email already in use");
      } else {
        console.log(error);
      }
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Dont have an account?</h2>
      <span>Sign Up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          name="displayName"
          onChange={handleChange}
          value={displayName}
          required
        />

        <FormInput
          label="Email"
          type="email"
          name="email"
          onChange={handleChange}
          value={email}
          required
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          onChange={handleChange}
          value={password}
          required
        />

        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          required
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};
export default SignUpForm;
