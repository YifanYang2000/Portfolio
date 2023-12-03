import styles from './loading.module.css'

interface Props {
    showLoadingScreen: boolean,
}

export default function Loading(props: Props) {
    return (
        <div
            className={styles['loading_wrapper'] + ' ' +
                `${props.showLoadingScreen
                    ? styles['show_loading']
                    : styles['hide_loading']}`}
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
