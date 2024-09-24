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
      <label htmlFor="">{label}</label>
      <input
        id={id}
        name={name}
        defaultValue={defaultValue || ''}
        onChange={onChange}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        type={type || 'text'}
        className="block w-full rounded-md mt-1 py-1.5 pl-5 pr-5 bg-light-white outline-none cursor-pointer text-sm ring-1 ring-gray-300 focus:ring-primary-red"
      />
    </div>
  );
};
