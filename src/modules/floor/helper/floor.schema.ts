import { z } from "zod";
import { FloorType, FloorStatus } from "../../../enums";

export const createFloorSchema = z.object({
  floorName: z
    .string({ error: "Floor name is required" })
    .trim()
    .min(1, "Floor name cannot be empty"),
  floorType: z.enum(FloorType, {
    error: "Floor type must be Commercial, Administrative or Clinical",
  }),
  floorStatus: z
    .enum(FloorStatus, { error: "Floor status must be Blocked or Available" })
    .optional(),
});

export const updateFloorSchema = createFloorSchema.partial();

export type CreateFloorInput = z.infer<typeof createFloorSchema>;
export type UpdateFloorInput = z.infer<typeof updateFloorSchema>;