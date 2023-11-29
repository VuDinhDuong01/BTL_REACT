import zod from 'zod'

const loginSchema = zod.object({
    email: zod.string().min(1, "Trường này không được để trống").email("bạn nhập sai định dạng"),
    password: zod.string().min(1, "Trường này không được để trống").max(25, "Số ký tự tối đa cho phép là 25 ký tự")
}).strict()

export default loginSchema

export type login = zod.infer<typeof loginSchema>