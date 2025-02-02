import { Input } from 'antd';
import React from 'react'
type Props = {
    label: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
}
function Index({ label, className, value, onChange, placeholder }: Props) {
    return (
        <div className={className}>
            <p className='text-[14px] line-height-[22px] font-[Roboto]'>{label}</p>
            <Input value={value} onChange={onChange} placeholder={placeholder} />
        </div>
    )
}

export default Index