import React from 'react'

type Props = {
    type?: string;
    children?: React.ReactNode;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLElement>;
}

function Index({
    type = 'primary',
    children,
    className,
    ...props
}: Props) {
    return (
        <button
            className={`bg-[#7CB305]  text-white font-medium py-2 px-4 rounded shadow-md ${className}`}
            {...props}>{children}</button>
    )
}

export default Index