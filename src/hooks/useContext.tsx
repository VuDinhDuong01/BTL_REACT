import { createContext, useState, type ReactNode, type SetStateAction } from 'react'
import { getAccessTokenToLS } from '../helps'

interface ContextProp {
    auth: AuthType,
    setAuth: React.Dispatch<SetStateAction<AuthType>>
}

interface AuthType {
    role?: string,
    auth: boolean
}

const init = {
    auth: { role: '', auth: Boolean(getAccessTokenToLS()) },
    setAuth: () => null
}
export const ContextAPI = createContext<ContextProp>(init)

export const ProviderContext = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState<AuthType>(Object)
    return <ContextAPI.Provider value={{ auth, setAuth }}>{children}</ContextAPI.Provider>
}