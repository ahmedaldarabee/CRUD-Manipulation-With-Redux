import * as Yup from 'yup';

// Validation schema part
// you can know more about Yup validation library from own account on github
export const postSchema = Yup.object().shape({
    title: Yup.string()
        .min(2, 'at least of accepted data is 2, try to add more...')
        .max(20, 'at most of accepted data is 20!')
        .required('please add data, this part is required!'),
    description: Yup.string()
        .min(2, 'at least character is 2, try to add more...')
        .max(20, 'at most of accepted data is 20!')
        .required('please add data, this part is required!'),
});