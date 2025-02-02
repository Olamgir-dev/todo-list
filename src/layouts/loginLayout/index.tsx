import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Auth from '../../services/api/auth';

function Index() {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            Auth.UserInfo().then(res => {
                if (res.status === 200) {
                    navigate('/');
                }
            })
        }
    }, [localStorage.getItem('token')])
    return (
        <div className='w-full h-screen bg-bg bg-cover bg-repeat bg-bottom flex justify-center items-center' >
            <Outlet />
        </div>
    )
}

export default Index