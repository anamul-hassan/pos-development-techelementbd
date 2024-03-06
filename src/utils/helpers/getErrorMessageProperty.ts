export const getErrorMassageByProperty = (error: any, name: any) => {
  let message = error;
  if (message[name]) {
    message = message[name];
  } else {
    return (message = undefined);
  }
  return message?.message;
};
