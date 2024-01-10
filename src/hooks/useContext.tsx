import { createContext, useState, type ReactNode, type SetStateAction } from 'react'
import { getAccessTokenToLS } from '../helps'

interface ContextProp {
    auth: AuthType | null,
    setAuth: React.Dispatch<SetStateAction<AuthType | null>>
    reset:() => void
}

interface AuthType {
    role?: string,
    auth: boolean
}

const init = {
    auth: { role: '', auth: Boolean(getAccessTokenToLS()) },
    setAuth: () => null,
    reset:()=>null
}
export const ContextAPI = createContext<ContextProp>(init)

export const ProviderContext = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState<AuthType | null>(Object)
    
    const reset = () => {
        setAuth(null)
    }
    return <ContextAPI.Provider value={{ auth, setAuth , reset}}>{children}</ContextAPI.Provider>
}

