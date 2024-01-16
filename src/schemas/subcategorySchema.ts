import * as yup from "yup";
import { SubcategoryInterface } from "../entity/Subcategory";

interface SubcategoryAddInterface extends SubcategoryInterface{
  topcategoryName: string;
}

const subcategoryAddSchema: yup.ObjectSchema<SubcategoryAddInterface> = yup.object({
  topcategoryName: yup.string().required('Topcategory name is required'),
  name: yup.string().required('Subcategory name is required'),
});

const subcategoryUpdateSchema: yup.ObjectSchema<SubcategoryInterface> = yup.object({
  name: yup.string().required('Subcategory name is required'),
});

export default { subcategoryAddSchema, subcategoryUpdateSchema };
