import * as z from "zod";

export const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const signUpFormSchema = z.object({
  fullname: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

export const forgotPasswordFormSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirm password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  });

export type resetPasswordFormSchemaType = z.infer<
  typeof resetPasswordFormSchema
>;

export type signUpFormSchemaType = z.infer<typeof signUpFormSchema>;
export type forgotPasswordFormSchemaType = z.infer<
  typeof forgotPasswordFormSchema
>;

export type signInFormSchemaType = z.infer<typeof signInFormSchema>; // Fix: Change 'signInFormType' to 'SignInFormType'
