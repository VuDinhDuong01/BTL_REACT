import zod from 'zod'

const loginSchema = zod.object({
    email: zod.string().min(1, "login.fieldNotEmpty").email("login.wrongFormat"),
    password: zod.string().min(1, "login.fieldNotEmpty").max(25, "login.maximumNumberCharaters")
}).strict()

export default loginSchema

export type login = zod.infer<typeof loginSchema>