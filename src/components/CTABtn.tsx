import Link from 'next/link'
import React from 'react'

interface CTABtnProps {
    redirectTo: string
    message: string
}

function CTABtn({ message, redirectTo }: CTABtnProps) {
    return (
        <div>
            <Link
                href={redirectTo}
                className="inline-flex border-2 border-primary items-center justify-center px-10 py-4 rounded-full font-semibold bg-gradient-to-r from-yellow-600 via-orange-500 to-red-500 hover:bg-orange-600 hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:border-white"
            >
                {message}
            </Link>
        </div>
    )
}

export default CTABtn