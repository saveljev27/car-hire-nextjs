import { todayDate } from '@/lib';
import { InputProps } from '@/types';

const Input = ({
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
        className="block w-full rounded-md border-0 mt-1 py-1.5 pl-5 pr-5 ring-1 ring-insetplaceholder:text-gray-400 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>
  );
};

export default Input;
