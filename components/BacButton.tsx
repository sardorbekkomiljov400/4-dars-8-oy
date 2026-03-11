"use client"

import { useRouter } from "next/navigation"

const BackButton = () => {

    const router = useRouter()

    return (
        <button
            onClick={() => router.back()}
            className="mb-6 px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800"
        >
            ← Back
        </button>
    )
}

export default BackButton