'use client'
import React, { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';

const AosProvide = () => {
    useEffect(() => {
        AOS.init({
            duration: 1500,
        });
    }, [])

    return (
        <></>
    )
}

export default AosProvide