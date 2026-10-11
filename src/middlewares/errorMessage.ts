export const MIDDLEWARE_ERRORS = {
  NOT_AUTHENTICATED: {
    message: "You are not logged in!",
    statusCode: 401,
  },
  NOT_FOUND: {
    message: "User not exist!",
    statusCode: 401,
  },
  INVALID_VALUE: {
    message: "Invalid value for field",
    statusCode: 400,
  },
  INVALID_INPUT: {
    message: "Invalid input",
    statusCode: 400,
  },
  INVALID_TOKEN: {
    message: "Invalid token. Please log in again!",
    statusCode: 401,
  },
  TOKEN_EXPIRED: {
    message: "Your token has expired. Please log in again!",
    statusCode: 401,
  },
  DUPLICATE_FIELD: {
    message: "Duplicate field value. Please use another value!",
    statusCode: 400,
  },
  SOMETHING_WENT_WRONG: {
    message: "Something went wrong!",
    statusCode: 500,
  },
  FORBIDDEN: {
    message: "You do not have permission to perform this action!",
    statusCode: 403,
  },
} as const;
