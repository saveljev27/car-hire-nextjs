import { InputProps } from '@/types';

export const Input = ({
  id,
  name,
  label,
  type,
  defaultValue,
  onChange,
  placeholder,
  disabled = false,
  required = false,
  readOnly = false,
  hidden = false,
}: InputProps) => {
  return (
    <div className={hidden ? 'hidden' : `relative mt-3`}>
      <label className="capitalize" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        defaultValue={defaultValue || ''}
        onChange={onChange}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        type={type || 'text'}
        className="custom-input"
        readOnly={readOnly}
      />
    </div>
  );
};
