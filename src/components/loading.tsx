'use client'

import { Dispatch, SetStateAction, useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation';
import styles from './loading.module.css'

interface Props {
    navigate: boolean,
    loading: boolean,
    setLoading: Dispatch<SetStateAction<boolean>>
}

export default function Loading(props: Props) {
    const pathname = usePathname();
    const savedpathname = useRef(pathname);
    const [loadClass, setLoadClass] = useState("out");

    // Open loading page upon tab navigation
    useEffect(() => {
        if (props.navigate) {
            setLoadClass("in");
            setTimeout(() => {
                props.setLoading(true);
            }, 500)
        }
    }, [props.navigate])

    // Close loading page upon successful page change
    useEffect(() => {
        if (savedpathname.current != pathname) {
            setLoadClass("out");
            props.setLoading(false);
            savedpathname.current = pathname;
        }
    }, [pathname])

    return (
        <div
            className={styles['wrapper'] + ' ' + styles[`${loadClass}`]}
        >
            <div className={styles['loading']}>
                LOADING
                <span>.</span>
                <span>.</span>
                <span>.</span>
            </div>
        </div>
    )
}
