import React from 'react'
import { Input } from './ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { AuthContext } from '@/providers/AuthProvider'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'


function Navbar() {
    const { userName } = AuthContext();
    const router = useRouter()
    return (
        <div>
            <header className="flex items-center justify-between p-2 bg-white shadow max-h-[50px]">
                <Button className="text-black bg-white hover:text-white group" onClick={(e)=>router.push('/')}>
                    <svg className="w-6 h-6 text-gray-800 group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clip-rule="evenodd" />
                    </svg>
                    Home
                </Button>

                <Input
                    type="text"
                    placeholder="Press ⌘ + F to search"
                    className="p-2 border rounded-md w-full mx-2"
                />
                <div className="flex items-center space-x-4">
                    <span className="inline-flex font-semibold items-center bg-primary text-white p-1.5 px-2 rounded-lg border whitespace-nowrap">
                        Credits: 0
                    </span>
                    <button className="text-black p-2 rounded-lg">
                        <svg
                            className="w-6 h-6 text-black hover:text-primary"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M17.133 12.632v-1.8a5.407 5.407 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.933.933 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175Zm-13.267-.8a1 1 0 0 1-1-1 9.424 9.424 0 0 1 2.517-6.391A1.001 1.001 0 1 1 6.854 5.8a7.43 7.43 0 0 0-1.988 5.037 1 1 0 0 1-1 .995Zm16.268 0a1 1 0 0 1-1-1A7.431 7.431 0 0 0 17.146 5.8a1 1 0 0 1 1.471-1.354 9.424 9.424 0 0 1 2.517 6.391 1 1 0 0 1-1 .995ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z" />
                        </svg>
                    </button>
                    <Avatar className="w-[30px] cursor-pointer" onClick={(e) => router.push('/profile')}>
                        <AvatarImage className="rounded-full" src={`https://ui-avatars.com/api/?name=${userName}&background=1e90ff&color=FFFFFF`} />
                        <AvatarFallback>{userName}</AvatarFallback>
                    </Avatar>

                </div>
            </header>
        </div>
    )
}

export default Navbar