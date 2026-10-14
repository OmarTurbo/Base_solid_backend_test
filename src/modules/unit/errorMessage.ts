export const UNIT_ERRORS = {
  NOT_FOUND: { message: "Unit not found", statusCode: 404 },
  INVALID_ID: { message: "Invalid unit ID", statusCode: 400 },
  ALREADY_EXISTS: { message: "The unit name already exists", statusCode: 400 },
} as const;
