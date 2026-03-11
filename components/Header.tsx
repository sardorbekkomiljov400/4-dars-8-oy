"use client"

import { setCookie } from "cookies-next"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

const Header = () => {

    const [openModal, setOpenModal] = useState(false)
    const [users, setUsers] = useState<any[]>([])

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function handleCheck() {

        const findUser = users.find((item: any) =>
            item.username === username && item.password === password
        )

        if (findUser) {
            setCookie("token", JSON.stringify(findUser))
            redirect("/admin")
        }
        else {
            alert("User topilmadi")
        }
    }

    useEffect(() => {
        fetch(`http://localhost:3001/users`)
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])

    return (
        <header className="flex items-center justify-between px-10 py-5 bg-black text-white">

            <h1 className="text-2xl font-bold">
                🍎 Apple Store
            </h1>

            <button
                onClick={() => setOpenModal(true)}
                className="px-5 py-2 bg-white text-black rounded-xl hover:bg-gray-200"
            >
                Login
            </button>


            {openModal && (

                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

                    <div className="bg-white p-8 rounded-2xl w-87.5 space-y-4">

                        <h2 className="text-xl font-bold text-center">
                            Login
                        </h2>

                        <input
                            placeholder="username"
                            className="w-full border p-3 rounded-lg"
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <input
                            placeholder="password"
                            type="password"
                            className="w-full border p-3 rounded-lg"
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            onClick={handleCheck}
                            className="w-full bg-black text-white p-3 rounded-lg"
                        >
                            Login
                        </button>

                        <button
                            onClick={() => setOpenModal(false)}
                            className="w-full border p-2 rounded-lg"
                        >
                            Close
                        </button>

                    </div>

                </div>

            )}

        </header>
    )
}

export default Header