"use client"

import Link from 'next/link';
import Image from 'next/image'
import signature from '@/resources/Signature.png'
import { usePathname } from 'next/navigation';
import styles from './navigation.module.css'

export default function Navigation() {
    const pathname = usePathname();
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

    function getTabs() {
        return (
            <ul className={styles.tab_list}>
                {tabs.map((tab, index) => (
                    <li
                        className={
                            styles['tab'] + " " +
                            `${pathname == tab.path ? styles['tab_active'] : styles['tab_inactive']}`}
                        key={index}
                    >
                        <Link href={tab.path}>
                            <div className={styles.title}>{tab.title}</div>
                            <div>{tab.desc}</div>
                        </Link>
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <div className={styles.navigation}>
            <div className={styles.navigate}>
                <Link href={'/'}>
                    <Image
                        src={signature}
                        alt='signature logo'
                        height={75}
                        width={75}
                    />
                </Link>
                {getTabs()}
            </div>

            <div className={styles.music}>
                <div className={styles.title}>CURRENT MOOD</div>
                <iframe
                    src="https://open.spotify.com/embed/track/1CHswVnHopmeIly3bTSnmF?utm_source=generator&theme=0"
                    width="100%"
                    height="352"
                    frameBorder="0"
                    allow="clipboard-write; encrypted-media;
                           fullscreen; picture-in-picture"
                    loading="lazy"
                >
                </iframe>
            </div>
        </div>
    )
}
