import * as Yup from "yup";
import { isRequired } from '@/app/utils/convertions';

export const schemaValidation = Yup.object().shape({
    account_name: Yup.string()
        .min(3, 'Too Short!')
        .max(100, 'Too Long!')
        .required(isRequired('Account name')),
    type: Yup.string(),
    initial_balance: Yup.string().required(isRequired('Initial balance')),
    account_number: Yup.string(),
    agency: Yup.string().max(4, 'Max 4 characteres'),
    bankId: Yup.number().nullable()
});