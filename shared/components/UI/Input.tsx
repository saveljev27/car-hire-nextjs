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
}: InputProps) => {
  return (
    <div className="relative mt-3">
      <label htmlFor={id}>{label}</label>
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
      />
    </div>
  );
};
