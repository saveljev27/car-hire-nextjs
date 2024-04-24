import React from 'react'

interface InputProps {
  id: string
  name: string
  label: string
  type?: string
  value: string
  placeholder: string
  onChange: any
}

const Input = ({
  id,
  name,
  label,
  type,
  value,
  onChange,
  placeholder,
}: InputProps) => {
  return (
    <div className="relative mt-3">
      <label htmlFor="">{label}</label>
      <input
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        className="block w-full rounded-md border-0 mt-1 py-1.5 pl-5 pr-20 ring-1 ring-insetplaceholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>
  )
}

export default Input
