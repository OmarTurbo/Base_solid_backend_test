export const EXCEL_ERROR = {
    NO_FILE: { message: "No file uploaded", statusCode: 400 },
    EMPTY_FILE: { message: "The Excel file has no worksheet", statusCode: 400, },
    TOO_MANY_ROWS: { message: "Too many rows in the file: Max is 2000", statusCode: 400 },

} as const;