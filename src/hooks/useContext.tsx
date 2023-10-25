import { createContext, useState, type ReactNode } from 'react'

interface ContextProp {
    auth: boolean,
    setAuth: React.Dispatch<React.SetStateAction<boolean>>
}

const init = {
    auth: false,
    setAuth: () => null
}
const ContextAPI = createContext<ContextProp>(init)

export const ProviderContext = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState<boolean>(false)
    return <ContextAPI.Provider value={{ auth, setAuth }}>{children}</ContextAPI.Provider>
}