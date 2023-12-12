import zod from 'zod'

const AuthSchema = zod.object({
    email: zod.string().min(1, "login.fieldNotEmpty").email("login.wrongFormat").default(''),
    password: zod.string().min(1, "login.fieldNotEmpty").max(25, "login.maximumNumberCharaters").default(''),
    name:zod.string().min(1,"login.fieldNotEmpty").max(25, "login.maximumNumberCharaters").default(''),
}).strict()

export default AuthSchema

export type AuthSchemaType = zod.infer<typeof AuthSchema>