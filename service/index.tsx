// Server Request
// Server Actions
"use server"

import { revalidatePath } from "next/cache"

export const GetAll = async (URL: string) => {
    const res = await fetch(`http://localhost:3001${URL}`, {
        next: { revalidate: 60 }
    })
    const data = await res.json()
    return data
}

export const Create = async (data: any, URL: string) => {
    fetch(`http://localhost:3001${URL}`, {
        method: "POST",
        body: JSON.stringify(data)
    })
    revalidatePath("/")
}
