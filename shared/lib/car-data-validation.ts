import { carSchema } from '@/utils/zod';

interface ValidationError {
  key: string;
  message: string;
}

interface ValidationResult {
  success: boolean;
  errors?: ValidationError[];
  message?: string;
}

export const validateCarData = (data: any): ValidationResult => {
  const validation = carSchema.safeParse(data);

  if (!validation.success) {
    const { fieldErrors } = validation.error.flatten();

    const errors = Object.entries(fieldErrors).map(([key, value]) => ({
      key,
      message: value ? value.join(', ') : 'Unknown error',
    }));

    return {
      success: false,
      message: 'Please fill in the required fields',
      errors,
    };
  }

  return { success: true };
};
