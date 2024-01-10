import * as yup from "yup"


const changePasswordSchema = yup.object({
    password: yup.string().required('changePassword.notEmpty').min(6, "login.minximumNumberCharaters").max(25, "login.maximumNumberCharaters").default(''),
    new_password: yup.string().required('changePassword.notEmpty').min(6, "login.minximumNumberCharaters").max(25, "login.maximumNumberCharaters").default(''),
    confirm_password: yup.string().required('changePassword.notEmpty').min(6, "login.minximumNumberCharaters").max(25, "login.maximumNumberCharaters").oneOf([yup.ref('new_password')],'changePassword.newPasswordNotCorrect').default(''),
})

export default changePasswordSchema

export type ChangePasswordSchemaType = yup.InferType<typeof changePasswordSchema>;