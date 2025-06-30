import { type ResponseType } from './types';

const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

export function emailValidator(val: string): ResponseType {
  const trimmedEmail = val.trim();

  if (trimmedEmail.length === 0) {
    return {
      isValid: false,
      error: 'Email cannot be empty',
    };
  }

  if (!EMAIL_REGEXP.test(trimmedEmail)) {
    return {
      isValid: false,
      error: 'Email is not valid',
    };
  }

  return {
    isValid: true,
    error: '',
  };
}
