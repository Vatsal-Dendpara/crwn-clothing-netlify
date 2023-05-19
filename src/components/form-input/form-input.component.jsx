import "./form-input.styles.scss";

const FormInput = ({ label, ...inputConfig }) => {
  return (
    <div className="group">
      <input className="form-input" {...inputConfig} />
      {label && (
        <label
          className={`${
            inputConfig.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
