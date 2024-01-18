import * as yup from "yup";
import { TopcategoryInterface } from "../entity/Topcategory";

const topcategoryAddOrUpdateSchema: yup.ObjectSchema<TopcategoryInterface> = yup.object({
  name: yup.string().required('Topcategory name is required'),
});

const topcategoryDeleteteSchema = yup.object({
  id: yup.string().required('Id is required'),
});

export default { topcategoryAddOrUpdateSchema, topcategoryDeleteteSchema };
