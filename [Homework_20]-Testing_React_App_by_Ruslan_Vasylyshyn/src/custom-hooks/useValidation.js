import { useState, useEffect } from "react";

export const useValidation = (value, validationRules) => {
  const [error, setError] = useState("");

  useEffect(() => {
    if (!validationRules) return;

    const errors = [];

    if (validationRules.required && !value) {
      errors.push("This field is required.");
    }

    if (validationRules.maxLength && value.length > validationRules.maxLength) {
      errors.push(`Must be less than ${validationRules.maxLength} characters.`);
    }

    if (validationRules.pattern && !validationRules.pattern.test(value)) {
      errors.push("Invalid format.");
    }

    if (
      Array.isArray(validationRules.unique) &&
      validationRules.unique.some((todo) => todo.task === value)
    ) {
      errors.push("Task already exists.");
    }

    setError((prevError) => {
      const newError = errors.join(" ");
      return prevError !== newError ? newError : prevError;
    });
  }, [value, validationRules]);

  return error;
};
