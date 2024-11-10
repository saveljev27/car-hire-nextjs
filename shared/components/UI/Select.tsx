interface SelectProps {
  options: any;
  title: string;
  defaultValue: string;
}

export const Select = ({ options, title, defaultValue }: any) => {
  return (
    <div className="relative mt-3">
      <label htmlFor={title}>{title}</label>
      <select
        id={title}
        name={title}
        className="custom-input"
        defaultValue={defaultValue}
      >
        {options.map((option: any) => (
          <option id={option.title} key={option.title} value={option.value}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  );
};
