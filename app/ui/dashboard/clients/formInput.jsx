import styles from "@/app/ui/dashboard/clients/singleClient/singleClient.module.css";

const FormInput = ({
  label,
  type = "input",
  name,
  placeholder,
  value,
  defaultValue,
  onChange,
  options,
}) => {
  return (
    <div className={styles.inputContainer}>
      <label>{label}</label>
      {type === "select" ? (
        <select name={name} value={value} onChange={onChange}>
          <option value={defaultValue || ''} disabled>
            {placeholder}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          defaultValue={defaultValue}
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default FormInput;
