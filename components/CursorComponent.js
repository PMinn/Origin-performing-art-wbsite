import { useEffect, useState } from 'react';
import styles from '../styles/CursorComponent.module.css';

export default function CursorComponent() {
    const [isShow, setIsShow] = useState(false);
    const [isHover, setIsHover] = useState(false);

    useEffect(() => {
        const dot = document.querySelector('.cursor .dot');
        const area = document.querySelector('.cursor .area');
        function mousemove(e) {
            if (document.querySelectorAll('.pointer:hover').length > 0) {
                dot.style.top = `${e.clientY - 5}px`;
                dot.style.left = `${e.clientX - 5}px`;
                area.style.top = `${e.clientY - 25}px`;
                area.style.left = `${e.clientX - 25}px`;
                setIsHover(true);
            } else {
                dot.style.top = `${e.clientY - 5}px`;
                dot.style.left = `${e.clientX - 5}px`;
                area.style.top = `${e.clientY - 25}px`;
                area.style.left = `${e.clientX - 25}px`;
                setIsHover(false);
            }
        }

        function checkMouse() {
            if (window.innerWidth >= 480) {
                setIsShow(true);
                window.addEventListener('mousemove', mousemove);
            } else {
                setIsShow(false);
                window.removeEventListener('mousemove', mousemove);
            }
        }

        checkMouse();
        window.addEventListener('resize', checkMouse);
    }, [])
    return (
        <div className={styles.cursor + ' ' + (isShow ? styles.show : '') + ' ' + (isHover ? styles.hover : '') + ' cursor'} >
            <div className={styles.area + ' area'}></div>
            <div className={styles.dot + ' dot'}></div>
        </div>
    )
}