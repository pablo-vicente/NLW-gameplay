import React, { createContext, useContext, useState, ReactNode } from "react";

import * as AuthSession from 'expo-auth-session';
const { REDIRECT_URI } = process.env;
const { SCOPE } = process.env;
const { RESPOSE_TYPE } = process.env;
const { CLIENT_ID } = process.env;
const { CND_IMAGE } = process.env;

import { api } from "../services/api";

type User = {
    id: string,
    username: string;
    firstName: string,
    avatar: string,
    email: string,
    token: string
}

type AuthContextDate = {
    user: User,
    loading: boolean,
    signIn: () => Promise<void>;
}

type AuthProviderProps = {
    children: ReactNode
}

type AuthorizationRepose = AuthSession.AuthSessionResult & {
    params: {
        access_token?: string,
        error?: string
    }
}

export const AuthContext = createContext({} as AuthContextDate);

function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<User>({} as User)
    const [loading, setLoading] = useState(false)

    const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPOSE_TYPE}&scope=${SCOPE}`;

    async function signIn() {
        try {
            setLoading(true)

            const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationRepose;

            if (type === 'success' && !params.error) {
                api.defaults.headers.authorization = `Bearer ${params.access_token}`;
                const userInfo = await api.get('/users/@me')
                const firstName = userInfo.data.username.split(' ')[0]
                const avatar = userInfo.data.avatar = `${CND_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`;

                setUser({
                    ...userInfo.data,
                    firstName,
                    avatar,
                    token: params.access_token
                })
                setLoading(false)
            } else {

            }

        } catch {
            throw new Error("Não foi posível autenticar.");
        } finally {
            setLoading(false)
        }
    }

    return (

        <AuthContext.Provider value={{
            user,
            signIn,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export {
    AuthProvider,
    useAuth
}