import zod from 'zod'

const UpdateMeSchema = zod.object({
    // avatar: zod.string().min(1, "login.fieldNotEmpty").max(25, "login.maximumNumberCharaters").default(''),
    // photo_avatar: zod.string().min(1, "login.fieldNotEmpty").max(25, "login.maximumNumberCharaters").default(''),
    username: zod.string().min(1, "login.fieldNotEmpty").max(25, "login.maximumNumberCharaters").default(''),
    location: zod.string().min(1, "login.fieldNotEmpty").default(''),
    website: zod.string().min(6, "login.minximumNumberCharaters").max(25, "login.maximumNumberCharaters").default(''),
    bio: zod.string().min(6, "login.minximumNumberCharaters").max(25, "login.maximumNumberCharaters").default(''),
})

export default UpdateMeSchema

export type UpdateMeSchemaType = zod.infer<typeof UpdateMeSchema>