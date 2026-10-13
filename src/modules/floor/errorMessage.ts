export const FLOOR_ERRORS = {
  NOT_FOUND: { message: "Floor not found", statusCode: 404 },
  INVALID_ID: { message: "Invalid floor ID", statusCode: 400 },
  ALREADY_EXISTS: { message: "The floor name already exists", statusCode: 400 },
} as const;
