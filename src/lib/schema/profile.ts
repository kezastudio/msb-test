import * as z from "zod";

export const completeProfileSchema = z.object({
  goals: z.string().min(20).max(500),
  site: z.string().url(),
});
export const EditProfileSchema = z.object({
  username: z.string().min(3).max(30),
  goals: z.string().min(20).max(500),
  site: z.string().url(),
});

export const uploadSchema = z.object({
  file: z.string().url(),
  title: z.string().min(5).max(100),
  caption: z.string().min(20).max(500),
});

export const helpSchema = z.object({
  subject: z.string().min(5).max(100),
  email: z.string().email(),
  body: z.string().min(20).max(500),
});

export const contactSchema = z.object({
  subject: z.string().min(5).max(100),
  email: z.string().email(),
  body: z.string().min(20).max(500),
});

// export const donateBoxSchema = z.object({
//   amount: z
//     .number()
//     .min(5, { message: "Amount must be at least £5" })
// });

export const donateBoxSchema = z.object({
  amount: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z.number().min(5, { message: "Amount must be at least £5" })
  ),
});


export type helpSchemaType = z.infer<typeof helpSchema>;
export type contactSchemaType = z.infer<typeof contactSchema>;
export type EditProfileSchemaType = z.infer<typeof EditProfileSchema>;

export type uploadSchemaType = z.infer<typeof uploadSchema>;

export type completeProfileSchemaType = z.infer<typeof completeProfileSchema>;

export type donateBoxSchemaType = z.infer<typeof donateBoxSchema>;