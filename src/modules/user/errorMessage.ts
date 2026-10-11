export const USER_ERRORS = {
  NOT_FOUND: {
    message: "User not found",
    statusCode: 404,
  },

  INVALID_EMAIL: {
    message: "Invalid email format",
    statusCode: 400,
  },

  INVALID_ID: {
    message: "Invalid user ID",
    statusCode: 400,
  },

  UPDATE_FAILED: {
    message: "Failed to update user",
    statusCode: 400,
  },

  DELETE_FAILED: {
    message: "Failed to delete user",
    statusCode: 400,
  },
} as const;
