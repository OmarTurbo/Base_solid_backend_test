import ExcelJS from "exceljs";
import { getCellText } from "./getCellText-helper";

export function getCellNumber(cell: ExcelJS.Cell): number {
  const n = Number(getCellText(cell));
  return Number.isNaN(n) ? 0 : n;
};