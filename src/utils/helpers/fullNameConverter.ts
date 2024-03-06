export const fullNameConverter = (firstName: string, lastName: string) => {
  let fullName;
  if (lastName) {
    fullName = firstName + " " + lastName;
  } else {
    fullName = firstName;
  }
  return fullName;
};
