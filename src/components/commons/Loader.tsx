import anime from 'animejs';
import { useEffect } from 'react';
import logo from '../../__assets__/logo.png';
export const Loader = () => {
    const animate = () => {
        const loader = anime.timeline({
            complete: () => {
                console.log('complete');
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
            });
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            console.log('timeout');
        }, 100);
        animate();
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="flex gap-5 flex-col justify-center items-center h-full w-full">
            <img src={logo} alt="logo" id="logo" className="w-24 h-24" />
            <span className="text-xl font-semibold text-[#d21717] uppercase">Infi Chat</span>
        </div>
    );
};
