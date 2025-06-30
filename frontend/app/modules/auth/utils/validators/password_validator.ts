import { type ResponseType } from './types';

export function passwordValidator(val: string): ResponseType {
  if (val.trim().length === 0) {
    return {
      isValid: false,
      error: 'Password cannot be empty',
    };
  }

  if (val.trim().length < 8) {
    return {
      isValid: false,
      error: 'Password must be at least 8 characters long',
    };
  }

  if (!/[A-Z]/.test(val)) {
    return {
      isValid: false,
      error: 'Password must contain at least one uppercase letter',
    };
  }

  if (!/[a-z]/.test(val)) {
    return {
      isValid: false,
      error: 'Password must contain at least one lowercase letter',
    };
  }

  if (!/\d/.test(val)) {
    return {
      isValid: false,
      error: 'Password must contain at least one digit',
    };
  }

//   if (!/[\W_]/.test(pass)) {
//     return {
//       isValid: false,
//       error: 'Password must contain at least one special character',
//     };
//   }

  return {
    isValid: true,
    error: '',
  };
}
