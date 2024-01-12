import * as yup from "yup";
import { UserInterface } from "../entity/User";

const userSchema: yup.ObjectSchema<UserInterface> = yup.object({
  name: yup.string().required("name is required").trim(),
  email: yup
    .string()
    .email("must be a valid email")
    .required("email is required")
    .trim(),
  password: yup
    .string()
    .min(5, "password must be at least 5 characters long")
    .max(12, "password must be less than 12 characters long"),
  role: yup.string().required()
});
export default userSchema;
