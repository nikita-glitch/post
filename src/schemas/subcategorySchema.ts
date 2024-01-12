import * as yup from "yup";
import { SubcategoryInterface } from "../entity/Subcategory";

const subcategorySchema: yup.ObjectSchema<SubcategoryInterface> = yup.object({
  name: yup.string().required(),
});
export default subcategorySchema;
