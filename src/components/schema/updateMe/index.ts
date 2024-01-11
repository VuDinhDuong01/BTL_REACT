import zod from 'zod'

const UpdateMeSchema = zod.object({
    username: zod.string().min(1, "login.fieldNotEmpty").max(25, "login.maximumNumberCharaters"),
    name: zod.string().min(1, "login.fieldNotEmpty").max(25, "login.maximumNumberCharaters"),
    location: zod.string().min(1, "login.fieldNotEmpty"),
    website: zod.string().min(1, "login.fieldNotEmpty").max(25, "login.maximumNumberCharaters"),
    bio: zod.string().min(1, "login.fieldNotEmpty").max(25, "login.maximumNumberCharaters"),
    avatar:zod.string(),
    cover_photo:zod.string()
})


export default UpdateMeSchema

export type UpdateMeSchemaType = zod.infer<typeof UpdateMeSchema>