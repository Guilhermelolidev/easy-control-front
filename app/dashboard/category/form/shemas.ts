import * as Yup from "yup";
import { isRequired } from '@/app/utils/convertions';

export const schemaCreate = Yup.object().shape({
    categories: Yup.array().min(1, 'At least one category must be selected'),
});

export const schemaEdit = Yup.object().shape({
    name: Yup.string().required(isRequired('Category'))
});