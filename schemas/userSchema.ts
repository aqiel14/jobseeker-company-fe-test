import * as yup from "yup";

export const userSchema = yup.object({
  name: yup.string().min(2, "Name must be at least 2 chars").required(),
  username: yup.string().min(2, "Username must be at least 2 chars").required(),
  email: yup.string().email("Invalid email").required(),
  phone: yup.string().required("Phone Number is required"),
  companyName: yup
    .string()
    .min(2, "Username must be at least 2 chars")
    .required(),
});
