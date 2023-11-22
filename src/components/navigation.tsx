"use client"

import Link from 'next/link';
import Image from 'next/image'
import howl from '@/resources/Howl.jpeg'
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
        },
    ];
    const howlStyle = {
        width: '100%',
        height: 'auto',
        borderRadius: 'var(--border-radius)',
    }

    function getTabs() {
        return (
            <ul className={styles.tab_list}>
                {tabs.map((tab, index) => (
                    <li
                        className={
                            styles['tab'] + " " +
                            `${pathname == tab.path ? styles['tab_active'] : ''}`}
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
                <Image
                    src={signature}
                    alt='signature logo'
                    height={75}
                    width={75}
                />
                {getTabs()}
            </div>

            <div className={styles.music}>
                <div className={styles.image}>
                    <Image
                        src={howl}
                        alt='Howl and Sophie'
                        style={howlStyle}
                        priority={true}
                    />
                </div>
                <div>
                    <div className={styles.marquee}>
                        <ul className={styles.marquee_content}>
                            <li>Merry-Go-Around of Fate</li>
                        </ul>
                        <ul aria-hidden="true" className={styles.marquee_content}>
                            <li>Merry-Go-Around of Fate</li>
                        </ul>
                    </div>
                    <div className={styles.composer}>Joe Hisaishi</div>
                </div>
            </div>
        </div>
    )
}
