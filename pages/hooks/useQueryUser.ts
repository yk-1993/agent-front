import React from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { User } from '@prisma/client'
import { useRouter } from 'next/router'

export const useQueryUser = () => {
    const router = useRouter()
    const getUSer = async () =>{
        const { data } = await axios.get<Omit<User, 'hashedPassword'>>(
            `${process.env.NEXT_PUBLIC_API_URL}/user`
        )
        return data
    }
    return useQuery<Omit<User, 'hashedPassword'>, Error>({
        queryKey: ['user'],
        queryFn: getUSer,
        onError:(err: any) => {
            if(err.response.status === 401 || err.response.status === 403){
                router.push('/')
            }
        },
    })
}
