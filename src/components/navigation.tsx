"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
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

    function getTabs() {
        return (
            <ul className={styles.list}>
                {tabs.map((tab, index) => (
                    <li
                        className={
                            styles['tab'] + " " +
                            `${pathname == tab.path ? styles['tab-active'] : ''}`}
                        key={index}
                    >
                        <Link
                            href={tab.path}
                        >
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
            {getTabs()}
            <div className={styles.music}>
            </div>
        </div>
    )
}
