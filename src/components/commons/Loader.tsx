import anime from 'animejs';
import { useEffect } from 'react';
import logo from '../../__assets__/logo.svg';

export const Loader = () => {
    const animate = () => {
        const loader = anime.timeline({
            complete: () => {
                console.log('complete')
            },
        });
        loader
            .add({
                targets: '#logo',
                delay: 0,
                scale: 1,
                duration: 500,
                easing: 'easeOutExpo',
            })
            .add({
                targets: '#logo',
                delay: 0,
                scale: 1.25,
                duration: 500,
                easing: 'easeOutExpo',
            })
            .add({
                targets: '#logo',
                delay: 0,
                scale: 1,
                duration: 500,
                easing: 'easeOutExpo',
            })
            .add({
                targets: '#logo',
                delay: 0,
                scale: 1.25,
                duration: 500,
                easing: 'easeOutExpo',
            })
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            console.log('timeout');
        }, 100);
        animate();
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div
            className="w-full h-full flex gap-5 flex-col justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-x-hidden">
            <img id="logo" src={logo} alt="logo" className="w-24 h-24" />
            <span className="text-xl font-semibold text-[#d21717]">Speed Chat</span>
        </div>
    );
};
