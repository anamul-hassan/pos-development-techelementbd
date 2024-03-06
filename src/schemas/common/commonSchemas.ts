import * as Yup from "yup";

// VALIDATE PASSWORD
export const password = Yup.string()
  .min(8, "Password must be at least 8 characters.")
  .max(20, "Password must be at most 20 characters.")
  .matches(/[0-9]/, "Password must contain at least one number.")
  .matches(/[A-Z]/, "Password must contain at least one capital letter.")
  .matches(
    /[!@#$%^&*(),.?":{}|<>]/,
    "Password must contain at least one special character."
  );

// VALIDATION FOR ONLY ENGLISH ALPHABET AND NUMBER
export const englishOnly = Yup.string().test(
  "is-english-characters",
  "Please write in English",
  (value: any) => {
    // CHECK IF THE STRING CONTAINS ONLY ENGLISH ALPHABET AND SPACE
    const englishAlphabetRegex = /^[a-zA-Z0-9\s]+$/;
    return !value || englishAlphabetRegex.test(value);
  }
);
// VALIDAITON FOR BANGLA ALPHABET AND NUMBER
export const banglaOnly = Yup.string().test(
  "is-bangla-characters",
  "Please write in Bangla",
  (value: any) => {
    // CHECK IF THE STRING CONTAINS ONLY BASIC BANGLA ALPHABETS AND SPACE
    const banglaCharactersRegex = /^[ঀ-৾\s]+$/;
    return banglaCharactersRegex.test(value);
  }
);

// VALIDATION FOR ENGLISH NUMBER ONLY
export const englishNumPositiveOnly = Yup.number()
  .test(
    "is-english-number",
    "Please enter only English digits",
    (value: any) => {
      // CHECK IF THE NUMBERS CONTAINS ONLY ENGLISH DIGITS
      const englishNumberRegex = /^[0-9]+$/;
      return !value || englishNumberRegex.test(value);
    }
  )
  .test("is-negative", "Must be a positive number", (value: any) => value > 0);

// PHONE NUMBER ONLY ENGLISH
export const phoneEng = Yup.string().matches(
  /^\d{10,15}$/,
  "Invalid phone number"
);

// ADDRESS SCHEMA
export const addressInfoSchema = Yup.object().shape({
  town: englishOnly
    .trim()
    .required("Town name is required")
    .max(50, "Town limit 50 characters."),
  postOffice: englishOnly
    .trim()
    .required("Post office name is required")
    .max(50, "Post office limit 50 characters."),
  district: englishOnly
    .trim()
    .required("District is required")
    .max(50, "District limit 50 characters."),
  upazila: englishOnly
    .trim()
    .required("Upazila/ Police Station is required")
    .max(50, "Upazila/ Police Station 50 characters."),
  division: englishOnly
    .trim()
    .required("Division is required")
    .max(50, "Division limit 50 characters."),
  nationality: englishOnly
    .trim()
    .required("Nationality is required")
    .max(50, "Nationality limit 50 characters."),
});
