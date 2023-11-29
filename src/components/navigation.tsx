"use client"

import Image from 'next/image'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import signature from '@/resources/Signature.png'
import { usePathname, useRouter } from 'next/navigation';
import styles from './navigation.module.css'

interface Props {
    loading: boolean,
    navigate: boolean,
    setNavigate: Dispatch<SetStateAction<boolean>>
}

export default function Navigation(props: Props) {
    const pathname = usePathname();
    const savedpathname = useRef(pathname);
    const nextpathname = useRef(pathname);
    const router = useRouter();
    const tabs = [
        {
            'title' : 'HOME',
            'desc' : 'Wait Who Am I',
            'path' : '/'
        },
        {
            'title' : 'PORTFOLIO',
            'desc' : 'Some Selected Work',
            'path' : '/portfolio'
        },
        {
            'title' : 'ART DUMP',
            'desc' : 'My Mom Said I Draw Well',
            'path' : '/art'
        },
        {
            'title' : 'CONTACT',
            'desc' : 'Get In Touch',
            'path' : '/contact'
        }
    ];

    // When loading screen is in-screen, perform page change
    useEffect(() => {
        if (props.loading && nextpathname.current != pathname) {
            router.push(nextpathname.current);
        }
    }, [props.loading])

    // When new page is fully loaded, allow for next navigation action
    useEffect(() => {
        if (savedpathname.current != pathname) {
            props.setNavigate(false);
            savedpathname.current = pathname;
        }
    }, [pathname])

    // Before attempting navigating to new page, 
    function onTabClick(path: string) {
        // Prevent navigation while another navigation is in course
        if (props.navigate || path == nextpathname.current) {
            return;
        }
        props.setNavigate(true);
        nextpathname.current = path;
    }

    function getTabs() {
        return (
            <ul className={styles.tab_list}>
                {tabs.map((tab, index) => (
                    <li
                        className={styles['tab'] + " " +
                            `${nextpathname.current == tab.path
                                ? styles['tab_active']
                                : styles['tab_inactive']}`}
                        onClick={() => {onTabClick(tab.path)}}
                        key={index}
                    >
                        <a href="#">
                            <div className={styles.title}>{tab.title}</div>
                            <div>{tab.desc}</div>
                        </a>
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <div className={styles.navigation}>
            <div className={styles.navigate}>
                <a href="#" onClick={() => {onTabClick('/')}}>
                    <Image
                        src={signature}
                        alt='signature logo'
                        height={75}
                        width={75}
                    />
                </a>
                {getTabs()}
            </div>

            <div className={styles.music}>
                <div className={styles.title}>CURRENT MOOD</div>
                <iframe
                    src="https://open.spotify.com/embed/track/1CHswVnHopmeIly3bTSnmF?utm_source=generator&theme=0"
                    width="100%"
                    height="352"
                    allow="clipboard-write; encrypted-media; fullscreen;
                           picture-in-picture"
                    loading="lazy"
                    style={{"border":"0"}}
                >
                </iframe>
            </div>
        </div>
    )
}
