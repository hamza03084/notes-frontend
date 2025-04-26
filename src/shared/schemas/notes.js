import * as Yup from 'yup';
import {TAGS_ENUM} from '../constants/notes';

export const noteSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  content: Yup.string().required('Content is required'),
  tags: Yup.array().of(Yup.string().oneOf(TAGS_ENUM)),
});
