module.exports = {
  generalError: "Something went wrong.",
  InvalidToken: "Invalid token.",
  signedIn: "You have been signed in successfully",
  userNotFound: "Couldn't find your Account",
  success: "Success!",
  verified: "Email verified successfully",
  invalidCode: "Invalid code entered, please try again.",
  resendCode: "verification code has been sent to you again",
  invalidId: 'Please provide a valid id',
  badRequest: "Bad request",
  invalidFormat: (key) => {
    return `your ${key} is not valid`;
  },
  cannotBeEmpty: (key) => {
    return `Please provide ${key}`
  },
  emailExists: "Email already exists!",
  sessionExpiry: "Session has been expired!",
  codeExpired: "Your code has expired.",
  weakPassword: 'Invalid password, please use at-least one uppercase ( A-Z), one digit ( 0-9) and one character.',
  userExists: (param) => {
    return `Another user with this ${param} already exists.`
  },
  emailNotVerify: 'Sorry, your email is not verified. Kindly first verify your email',
  wrongCredentials: 'Sorry, Login email and password are incorrect',
  noOneRegisteredWithEmail: 'Sorry, we cannot find any account with your provided email',
  passwordChanged: 'Your password is successfully is changed. Please Login',
  wrongPassword: 'Your old password is not correct',
  emailVerified: 'Your email is successfully verified',
  logoutSuccess: 'You have successfully logout',
};
