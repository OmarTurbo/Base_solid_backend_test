import { z } from "zod";
import { UnitStatus, TypeSegment } from "../../../enums";

export const createUnitSchema = z.object({
    floor: z
        .string({ error: "Floor is required" })
        .regex(/^[0-9a-fA-F]{24}$/, "Floor must be a valid ID"),
    unitSegment: z
        .string({ error: "Unit segment is required" })
        .trim()
        .min(1, "Unit segment cannot be empty"),
    typeSegment: z.enum(TypeSegment, {
        error: `Type segment must be one of: ${Object.values(TypeSegment).join(", ")}`,
    }),
    unitStatus: z
        .enum(UnitStatus, {
            error: `Unit status must be one of: ${Object.values(UnitStatus).join(", ")}`,
        })
        .optional(),
    mtrPrice: z.number({ error: "Meter price must be a number" }).optional(),
    outdoorTerrace: z.number({ error: "Outdoor terrace must be a number" }).optional(),
    totalArea: z.number({ error: "Total area is required and must be a number" }),
    GSAArea: z.number({ error: "GSA area is required and must be a number" }),
    finalPrice: z.number({ error: "Final price is required and must be a number" }),
});

export const updateUnitSchema = createUnitSchema.partial().loose();

export type CreateUnitInput = z.infer<typeof createUnitSchema>;
export type UpdateUnitInput = z.infer<typeof updateUnitSchema>;