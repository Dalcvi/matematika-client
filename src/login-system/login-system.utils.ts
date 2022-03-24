import {
  InputErrorMessages,
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
  UsernameValidationByRule,
  PasswordValidationByRule,
} from './';

export const settingEmailErrors =
  (setEmailError: (error: string) => void) => (email: string) => {
    if (email === '') {
      setEmailError('');
      return;
    }
    const isValid = isEmailValid(email);
    const error = isValid ? '' : InputErrorMessages.INVALID_EMAIL;
    setEmailError(error);
  };

export const settingUsernameErrors =
  (setUsernameErrors: (error: string[]) => void) => (username: string) => {
    if (username === '') {
      setUsernameErrors([]);
      return;
    }

    const usernameProblems = getusernameProblems(username);
    const errors = getUsernameErrors(usernameProblems);

    setUsernameErrors(errors);
  };

export const getUsernameErrors = (isValid: UsernameValidationByRule) => {
  const errors = [];
  if (!isValid.isValidMinLength) {
    errors.push(
      InputErrorMessages.MIN_LENGTH.replace(
        '{minLength}',
        MIN_USERNAME_LENGTH.toString(),
      ),
    );
  }
  if (!isValid.isValidUsername) {
    errors.push(InputErrorMessages.INVALID_USERNAME);
  }
  return errors;
};

export const getusernameProblems = (
  username: string,
): UsernameValidationByRule => {
  return {
    isValidMinLength: validationFunctions.minLength(
      username,
      MIN_USERNAME_LENGTH,
    ),
    isValidUsername: validationFunctions.containsOnlyWordChars(username),
  };
};

export const settingPassErrors =
  (setPassErrors: (error: string[]) => void) => (pass: string) => {
    if (pass === '') {
      setPassErrors([]);
      return;
    }

    const passwordProblems = getPasswordProblems(pass);
    const errors = getPassErrors(passwordProblems);

    setPassErrors(errors);
  };

export const getPassErrors = (isValid: PasswordValidationByRule) => {
  const errors = [];
  if (!isValid.isValidMinLength) {
    errors.push(
      InputErrorMessages.MIN_LENGTH.replace(
        '{minLength}',
        MIN_PASSWORD_LENGTH.toString(),
      ),
    );
  }
  if (!isValid.isValidNumbers) {
    errors.push(InputErrorMessages.PASSWORD_ONE_NUMBER);
  }
  if (!isValid.isValidUpperCase) {
    errors.push(InputErrorMessages.PASSWORD_ONE_UPPERCASE);
  }
  return errors;
};

export const getPasswordProblems = (
  password: string,
): PasswordValidationByRule => {
  return {
    isValidUpperCase: validationFunctions.upperCase(password),
    isValidNumbers: validationFunctions.numbers(password),
    isValidMinLength: validationFunctions.minLength(
      password,
      MIN_PASSWORD_LENGTH,
    ),
  };
};

const validationFunctions = {
  upperCase: (text: string) => {
    return text.toLowerCase() !== text;
  },
  numbers: (text: string) => {
    return /\d/.test(text);
  },
  minLength: (text: string, length: number) => {
    return text.length >= length;
  },
  containsOnlyWordChars: (text: string) => {
    return /^[a-zA-Z0-9_]+$/.test(text);
  },
};

export const isFormCorrect = (formValues: string[], errors: string[]) => {
  const reduceFunc = (prev: boolean, curr: string) => prev && !!curr;
  const areFormValuesCorrect = formValues.reduce(reduceFunc, true);
  const doesFormHaveErrors = errors.reduce(reduceFunc, false);

  return !doesFormHaveErrors && areFormValuesCorrect;
};

export const isEmailValid = (email: string) => {
  return email.match(/^\S+@\S+\.\S+$/);
};
