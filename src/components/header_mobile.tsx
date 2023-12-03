import Image from 'next/image'
import signature from '../resources/Signature.png'
import { logoSizeSmall, mobileSize } from '../constants';
import { Dispatch, SetStateAction } from 'react';
import styles from './header_mobile.module.css'

interface Props {
    onNavClick: (path : string) => void,
    setIsMobileNavOpen: Dispatch<SetStateAction<boolean>>,
}

export default function HeaderMobile(props: Props) {
    return (
        <div className={styles.header}>
            <div
                className={styles.logo}
                onClick={() => {props.onNavClick('/')}}
            >
                <Image
                    src={signature}
                    alt='signature logo'
                    sizes={`(max-width: ${mobileSize}px) ${logoSizeSmall}px`}
                    fill={true}
                />
            </div>
            <div
                className={styles.hamburger}
                onClick={() => {props.setIsMobileNavOpen(true)}}
            >
                MENU
            </div>
        </div>
    )
}
