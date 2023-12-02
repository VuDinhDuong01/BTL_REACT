import zod from 'zod'

const AuthSchema = zod.object({
    email: zod.string().min(1, "login.fieldNotEmpty").email("login.wrongFormat"),
    password: zod.string().min(1, "login.fieldNotEmpty").max(25, "login.maximumNumberCharaters"),
    name:zod.string().min(1,"login.fieldNotEmpty").max(25, "login.maximumNumberCharaters"),
}).strict()

export default AuthSchema

export type AuthSchemaType = zod.infer<typeof AuthSchema>