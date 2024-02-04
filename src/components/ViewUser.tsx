import Link from 'next/link'
import { User } from '@prisma/client'
import React from 'react'

interface Props {
    users: User[],
    roleUsuario: string
}
function ViewUser({ users, roleUsuario }: Props) {
    return (
        <div>
            {
                roleUsuario === "admin" && (
                    <div>
                        <div className='flex flex-col items-center justify-center'>
                            <h2 className="text-xl md:text-3xl font-bold text-center">
                                Administrador
                            </h2>
                                        <hr className="h-1 w-52 bg-cyan-600 " />

                            <p className="text-center text-lg font-semibold">Puedes ver los usuarios y sus roles</p>
                        </div>
                        <div>{users.map((user) => (
                            <Link
                                href={`/dashboard/user/${user.id}`}
                                key={user.id}
                                className="flex items-center justify-between  p-4 rounded-lg my-4 bg-gray-200 text-black font-medium hover:bg-gray-300 transition-all hover:shadow-lg hover:scale-105 cursor-pointer "
                            >
                                <div className="flex flex-col ">
                                    <p className="font-bold text-lg">
                                        Nombre: <span className="uppercase">{user.name}</span>
                                    </p>
                                    <p className="mt-1">Email: {user.email}</p>
                                </div>
                                <p className="mt-1">Roles: {user.roles}</p>

                            </Link>
                        ))}</div>
                    </div>
                )
            }
        </div>
    )
}

export default ViewUser