import ExcelJS from "exceljs";

export function getCellText(cell: ExcelJS.Cell): string {
  const val = cell.value;
  if (val === null || val === undefined) return "";
  if (typeof val === "object" && "text" in val)
    return String((val as any).text).trim();
  if (typeof val === "object" && "richText" in val)
    return (val as any).richText.map((r: any) => r.text).join("").trim();
  return String(val).trim();
};