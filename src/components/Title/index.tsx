import React from 'react'

function Index({ children }: { children?: React.ReactNode }) {
    return (
        <h1 className='font-roboto font-[700] text-[36px] leading-[22px]'>
            {children}
        </h1>
    )
}

export default Index