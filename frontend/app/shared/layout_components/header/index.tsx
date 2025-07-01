import React from "react";

type HeaderType = {
    children: React.ReactNode
}

export default function Header({children}: HeaderType) {

    return (
        <header className="bg-[var(--cyan)] w-full">
            {children}
        </header>
    )
}