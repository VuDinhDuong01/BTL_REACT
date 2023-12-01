// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface  GenerateType<T=Record<string ,any>>{
    message:string ,
    data:T;
}