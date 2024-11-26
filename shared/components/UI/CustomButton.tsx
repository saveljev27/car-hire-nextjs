'use client';

import Image from 'next/image';
import { CustomButtonProps } from '@/types';
import { useFormStatus } from 'react-dom';

export const CustomButton = ({
  title,
  btnType,
  containerStyles,
  handleClick,
  textStyles,
  rightIcon,
  isDisabled,
}: CustomButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending || isDisabled}
      type={btnType || 'button'}
      className={`custom-btn ${containerStyles}`}
      onClick={handleClick}
    >
      <span className={`text-center ${textStyles}`}>{title}</span>
      {rightIcon && (
        <div className="relative w-6 h-6">
          <Image
            src={rightIcon}
            alt={rightIcon}
            fill
            className="object-contain"
          />
        </div>
      )}
    </button>
  );
};
