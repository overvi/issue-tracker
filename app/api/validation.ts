import { z } from "zod";

export const createIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(250),
  description: z.string().min(1, "Description is Required"),
});
export const PatchIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(250).optional(),
  status: z.string().optional(),
  description: z
    .string()
    .min(1, "Description is Required")
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is required")
    .max(255)
    .optional()
    .nullable(),
});

const Validation = (body: any) => {
  return createIssueSchema.safeParse(body);
};

export default Validation;
