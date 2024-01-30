import * as Yup from "yup";
import { isRequired } from '@/app/utils/convertions';

export const schema = Yup.object().shape({
    description: Yup.string()
        .min(3, 'Too Short!')
        .max(100, 'Too Long!')
        .required(isRequired('Description')),
    value: Yup.string()
        .required(isRequired('Value')),
    type: Yup.string(),
    categoryId: Yup.number().required(isRequired('Category')),
    accountWalletId: Yup.number().required(isRequired('Account or wallet')),
});