import { z } from "zod";

export const FormSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  imageUrl: z
    .string()
    .url({ message: "Please provide a valid image URL" })
    .optional(),
  category: z
    .string()
    .min(2, { message: "category must be at least 2 characters" }),
});
