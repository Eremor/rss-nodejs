export default class CustomErrors extends Error {
  constructor(message) {
    super(message);
    this.isCustom = true;
  }
}

export const errorHandler = (err) => {
  const { isCustom, message } = err;

  if(isCustom) {
    process.stderr.write(message);
    process.exit();
  } else {
    throw err
  }
}