export const UNIT_ERRORS = {
  NOT_FOUND: { message: "Unit not found", statusCode: 404 },
  INVALID_ID: { message: "Invalid unit ID", statusCode: 400 },
  ALREADY_EXISTS: { message: "The unit name already exists", statusCode: 400 },
  FLOOR_NOT_FOUND: { message: "The floor associated with this unit does not exist", statusCode: 404 },
  NO_DATA: { message: "No data provided for update", statusCode: 400 },
  FORBIDDEN_FIELDS: { message: "Attempting to update forbidden fields", statusCode: 403 },
  
} as const;
