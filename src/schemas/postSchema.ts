import * as yup from "yup";
import { PostInterface } from "../entity/Post";

const postSchema: yup.ObjectSchema<PostInterface> = yup.object({
  postText: yup.string().required("Post text is required"),
});
export default postSchema;
