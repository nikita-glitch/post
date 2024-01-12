import * as yup from "yup";
import { TopcategoryInterface } from "../entity/Topcategory";

const topcategorySchema: yup.ObjectSchema<TopcategoryInterface> = yup.object({
  name: yup.string().required(),
});
export default topcategorySchema;
