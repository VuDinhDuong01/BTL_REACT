import zod from 'zod'

const UpdateMeSchema = zod.object({
    username: zod.string().min(1, "login.fieldNotEmpty").max(25, "login.maximumNumberCharaters").default(''),
    name: zod.string().min(1, "login.fieldNotEmpty").max(25, "login.maximumNumberCharaters").default(''),
    location: zod.string().min(1, "login.fieldNotEmpty").default(''),
    website: zod.string().min(1, "login.fieldNotEmpty").max(25, "login.maximumNumberCharaters").default(''),
    bio: zod.string().min(1, "login.fieldNotEmpty").max(25, "login.maximumNumberCharaters").default(''),
})


export default UpdateMeSchema

export type UpdateMeSchemaType = zod.infer<typeof UpdateMeSchema>