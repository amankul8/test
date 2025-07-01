import React from "react";

type ContentType = {
    children: React.ReactNode
}

export default function Content({children}: ContentType) {

    return (
        <section className="
            w-full m-auto max-w-[1110px] p-5
        ">
            {children}
        </section>
    )
}