'use client'

import styles from './app_wrapper.module.css'
import Navigation from './navigation'
import Loading from './loading'
import { useState } from 'react'

export default function AppWrapper({
    children,
}: {
    children: React.ReactNode
}) {
    const [navigate, setNavigate] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
        <div className={styles.components}>
            <Navigation
                loading={loading}
                navigate={navigate}
                setNavigate={setNavigate}
            />
            <div className={styles.content}>
                <Loading
                    navigate={navigate}
                    loading={loading}
                    setLoading={setLoading}
                />
                {children}
            </div>
        </div>
    )
}
