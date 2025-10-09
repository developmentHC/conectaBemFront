
import { z } from "zod";

export const ACCESSIBILITY_OPTIONS = [
  "Piso tátil",
  "Atendimento em libras",
  "Audiodescrição",
  "Corrimão",
  "Rampas",
] as const;

export const accessibilitySchema = z.object({
  accessibility: z.array(z.string()),
});
export type AccessibilityData = z.infer<typeof accessibilitySchema>;
