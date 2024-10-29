"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useSession, signOut } from "next-auth/react";
import {
    useChangeEncryptionKeyModal,
    useUsernameModal,
} from "@/stores/modals-store";
import { useTheme } from "next-themes";
import profile from '../../public/assets/profilePic.jpg'


type TestimonialItem = {
    img: string;
    stars: string;
    text: string;
    name: string;
};

const Testimonial = () => {
    const { data: session, status } = useSession();
    const loading = status === "loading";
    const loggedIn = !!session;

    const usernameChangeModal = useUsernameModal();
    const changeEncryptionKeyModal = useChangeEncryptionKeyModal();

    const { resolvedTheme } = useTheme();
    console.log(resolvedTheme)
    const [active, setActive] = useState<number>(3); // Define 'active' as a number
    const items: TestimonialItem[] = [
        {
            img: "",
            stars: "★★★★★",
            text: "Using Truth-Tunnel has been a game-changer for secure communication. The anonymity feature is incredible, and knowing that all my messages are encrypted gives me peace of mind. The OTP login process is smooth and easy to use, ensuring my privacy at all times.",
            name: "- Arjun Sharma"
        },
        {
            img: "",
            stars: "★★★★★",
            text: "Truth-Tunnel is the perfect platform for secure, anonymous messaging. I appreciate how seamless the OTP verification system is, and the interface is simple yet efficient. It's refreshing to use a platform where privacy is truly prioritized!",
            name: "- Priya Desai"
        },
        {
            img: "",
            stars: "★★★★★",
            text: "The user experience on Truth-Tunnel is fantastic. From the encrypted messaging to the OTP login, everything feels secure and reliable. It’s great to be able to communicate without worrying about revealing my identity or compromising my privacy.",
            name: "- Rohan Patel"
        },
        {
            img: "",
            stars: "★★★★",
            text: "Truth-Tunnel’s commitment to privacy and security is unmatched. The OTP login and encrypted messaging features make it stand out from other platforms. Plus, the web and mobile accessibility make it super convenient!",
            name: "- Neha Iyer"
        },
        {
            img: " ",
            stars: "★★★★★",
            text: "What I love most about Truth-Tunnel is the ease of use combined with top-notch security. Sending anonymous messages has never been more secure, and the cross-platform availability ensures I can stay connected wherever I go.",
            name: "- Rahul Singh"
        },
        {
            img: " ",
            stars: "★★★★★",
            text: "I’ve been using Truth-Tunnel for a while now, and the security features are truly impressive. The anonymity feature and encrypted messaging make it the ideal platform for secure communication. I highly recommend it!",
            name: "- Kavita Nair"
        }
    ];


    useEffect(() => {
        const interval = setInterval(() => {
            setActive(prev => (prev + 1) % items.length);
        }, 2500);

        return () => clearInterval(interval);
    }, [items.length]);

    useEffect(() => {
        loadShow();
    }, [active]);

    const loadShow = (): void => {
        const itemsElement = document.querySelectorAll<HTMLElement>('.slider .item');
        if (!itemsElement || itemsElement.length === 0) return;

        itemsElement[active].style.transform = `none`;
        itemsElement[active].style.zIndex = "1";
        itemsElement[active].style.filter = 'none';
        itemsElement[active].style.opacity = "1";

        // Show after
        let stt = 0;
        for (let i = active + 1; i < itemsElement.length; i++) {
            stt++;
            itemsElement[i].style.transform = `translateX(${120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(-1deg)`;
            itemsElement[i].style.zIndex = "0";
            itemsElement[i].style.filter = 'blur(5px)';
            itemsElement[i].style.opacity = stt > 2 ? "0" : "0.6";
        }
        stt = 0;
        for (let i = (active - 1); i >= 0; i--) {
            stt++;
            itemsElement[i].style.transform = `translateX(${-120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(1deg)`;
            itemsElement[i].style.zIndex = "0";
            itemsElement[i].style.filter = 'blur(5px)';
            itemsElement[i].style.opacity = stt > 2 ? "0" : "0.6";
        }
    };

    return (
        <div>
            <h1 className='text-center text-3xl font-bold text-red-600' data-aos='zoom-in'>See what our client say&apos;s about us </h1>
            <div className="slider" style={{ position: 'relative', marginTop: '100px', width: '100%', height: '550px', overflow: 'hidden' }} data-aos='fade-up'>
                {items.map((item, index) => (
                    <div className={`item max-sm:!w-[300px] max-sm:!h-[430px] ${resolvedTheme === 'light' ? 'bg-[#f0dee0] text-red-800' : 'bg-gradient-to-br from-red-500 to-red-800 text-white'} `} key={index} style={{
                        position: 'absolute',
                        width: '320px',
                        height: '420px',
                        textAlign: 'justify',
                        borderRadius: '12px',
                        padding: '20px',
                        transition: '0.5s',
                        left: 'calc(50% - 150px)',
                        top: '0',
                        marginBottom: '100px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                        overflow: 'hidden',
                    }}>

                        <Image
                            src={profile}
                            alt="User Avatar"
                            width={150}
                            height={150}
                            className="rounded-lg object-cover cursor-pointer max-sm:h-[120px] mb-0"
                            style={{
                                transition: 'transform 0.3s ease, filter 0.3s ease',
                                border: '3px solid #d0e7b0'
                            }}
                            onMouseOver={(e) => {
                                (e.currentTarget as HTMLElement).style.transform = 'scale(1.1)';
                                (e.currentTarget as HTMLElement).style.filter = 'brightness(1.1)';
                            }}
                            onMouseOut={(e) => {
                                (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                                (e.currentTarget as HTMLElement).style.filter = 'brightness(1)';
                            }}
                        />
                        <div className="stars text-[#ffd700] text-2xl mt-auto max-sm:mt-2">{item.stars}</div>
                        <p className={`text-justify max-sm:text-xs max-sm:mb-0 text-[0.8rem] ${resolvedTheme === 'light' ? 'text-red-500' : 'text-white'}`}>{item.text}</p>
                        <h2 className={`mb-[10px] text-xl font-semibold max-sm:mb-1 max-sm:text-lg ${resolvedTheme === 'light' ? 'text-red-800' : 'text-white'}`}>{item.name}</h2>
                    </div>
                ))}
                <button id="next" className='absolute top-[40%] text-orange-900 bg-none border-none text-6xl font-mono font-bold opacity-80 transition-opacity z-10 right-[50px] max-sm:text-white max-sm:text-2xl max-sm:right-2' onClick={() => setActive(prev => (prev + 1 < items.length ? prev + 1 : prev))}>{">>"}</button>
                <button id="prev" className='absolute top-[40%] text-orange-900 bg-none border-none text-6xl font-mono font-bold opacity-80 transition-opacity z-10 left-[50px] max-sm:text-white max-sm:text-2xl max-sm:left-2' onClick={() => setActive(prev => (prev - 1 >= 0 ? prev - 1 : prev))}>{"<<"}</button>
            </div>
        </div>
    );
};

export default Testimonial
