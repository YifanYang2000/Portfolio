"use client"

import David from './../resources/David.png'
import Image from 'next/image'
import {
  davidMovTime,
  davidSmallSize,
  davidSize,
  mobileSize
} from '../constants'
import { useEffect, useRef, useState } from 'react'
import styles from './page.module.css'

export default function Home() {
  const isRight = useRef<boolean>(true);   // X mov direction
  const isTop = useRef<boolean>(true);     // Y mov direction
  const davidDimensions = useRef<{height: number, width: number}>(davidSize);
  const timeX = useRef<number>(davidMovTime.web.x);
  const timeY = useRef<number>(davidMovTime.web.y);
  const [animateX, setAnimateX] = useState<{transition: string, transform: string}>({
    transition: `all ${davidMovTime.web.x}s linear`,
    transform: 'translateX(0)'    // Init x pos
  });
  const [animateY, setAnimateY] = useState<{transition: string, transform: string}>({
    transition: `all ${davidMovTime.web.y}s linear`,
    transform: 'translateY(calc(50vh - 7px - 367px))'   // Init y pos
  });

  const rotDegPerSec = 3;

  // Detect when David reaches the side of the container and make it bounce
  // the opposite direction. The David should always overflow 25% of its
  // height/width to the horizontal/vertical edges before bouncing back
  //
  // When transitioning from web to mobile view or vice-versa, reset
  // the animation
  useEffect(() => {
    const x = document.querySelector(`.${styles.x}`);
    const y = document.querySelector(`.${styles.y}`);
    const rotate = document.querySelector(`.${styles.rotate}`);

    // Obtain David's new dimensions (due to rotation) when it reaches the
    // opposite edge after bouncing on current edge
    const newDimensions = (horMov: boolean): {width: number, height: number} => {
      const dimensions = {width: 0, height: 0};

      try {
        if (rotate != null) {
          const matrixEl = window
            .getComputedStyle(rotate)
            .getPropertyValue('transform')
            .split(', ');
          const currRad = matrixEl[0] != 'none'
            ? Math.acos(Number(matrixEl[3]))
            : 0;
          const travelRad = horMov
            ? rotDegPerSec * timeX.current * (Math.PI/180)
            : rotDegPerSec * timeY.current * (Math.PI/180);
          const finalRad = currRad + travelRad;
          const newCos = Math.cos(finalRad);
          const newSin = Math.sin(finalRad);

          if ((0 <= finalRad && finalRad <= (Math.PI * 0.5)) ||
              (Math.PI <= finalRad && finalRad <= (Math.PI * 1.5)))
          {
            dimensions.height = Math.round(Math.abs(
              davidDimensions.current.width * newSin +
              davidDimensions.current.height * newCos
            ));
            dimensions.width = Math.round(Math.abs(
              davidDimensions.current.width * newCos +
              davidDimensions.current.height * newSin
            ));
          } else {
            dimensions.height = Math.round(Math.abs(
              davidDimensions.current.width * newSin -
              davidDimensions.current.height * newCos
            ));
            dimensions.width = Math.round(Math.abs(
              davidDimensions.current.width * newCos -
              davidDimensions.current.height * newSin
            ));
          }
          return dimensions;
          
        } else {
          throw new Error("Rotate div is null");
        }

      } catch (e : any) {
        console.error(e);
        return dimensions;
      }
    }

    // Calc new x movement upon David reaching a horizontal edge, adjusted for
    // 25% horizontal overflow
    const bounceX = (e : Event) => {
      e.stopPropagation();
  
      const dimensions = newDimensions(true);
      const overflow = Math.round(dimensions.width * 0.25);
      const horDiff = Math.round(Math.abs(
        (dimensions.width - davidDimensions.current.width) / 2
      ));

      if (isRight.current) {
        setAnimateX({
          ...animateX,
          transform: `translateX(${horDiff - overflow}px)`
        });
      } else {
        setAnimateX({
          ...animateX,
          transform: `translateX(calc(100vw - 803px + ${overflow - horDiff}px))`
        });
      }
      isRight.current = !isRight.current;
    }

    // Calc new y movement upon David reaching vertical edge, adjusted for
    // 25% vertical overflow
    const bounceY = (e : Event) => {
      e.stopPropagation();

      const dimensions = newDimensions(false);
      const overflow = Math.round(dimensions.height * 0.25);
      const verDiff = Math.round(Math.abs(
        (davidDimensions.current.height - dimensions.height) / 2
      ));

      // Note that unlike horizontal offset. vertical offset is affected by the
      // fact that David's h > w
      if (isTop.current) {
        const offsetBot = dimensions.height > davidDimensions.current.height
          ? overflow - verDiff 
          : overflow + verDiff;
        setAnimateY({
          ...animateY,
          transform: `translateY(calc(100vh - 748px + ${offsetBot}px))`
        });
      } else {
        const offsetTop = dimensions.height > davidDimensions.current.height
          ? verDiff - overflow
          : 0 - overflow - verDiff;
        setAnimateY({
          ...animateY,
          transform: `translateY(${offsetTop}px)`
        });
      }
      isTop.current = !isTop.current;
    }

    const onResize = () => {
      const isMobile = window.innerWidth <= mobileSize;

      davidDimensions.current = isMobile ? davidSmallSize : davidSize;
      timeX.current = isMobile ? davidMovTime.mobile.x : davidMovTime.web.x;
      timeY.current = isMobile ? davidMovTime.mobile.y : davidMovTime.web.y;
      setAnimateX({
        ...animateX,
        transition: `all ${isMobile ? davidMovTime.mobile.x : davidMovTime.web.x}s linear`
      });
      setAnimateY({
        ...animateY,
        transition: `all ${isMobile ? davidMovTime.mobile.y : davidMovTime.web.y}s linear`
      });
    }

    // Init
    // onResize();
    setAnimateX({
      ...animateX,
      transform: 'translateX(calc(100vw - 482px - 321px))'
    });
    setAnimateY({
      ...animateY,
      transform: 'translateY(0)'
    });

    // Event listeners
    x?.addEventListener("transitionend", bounceX);
    y?.addEventListener("transitionend", bounceY);
    window.addEventListener('resize', onResize);

    return () => {
      x?.removeEventListener("transitionend", bounceX);
      y?.removeEventListener("transitionend", bounceY);
      window.removeEventListener('resize', onResize);
    }
  }, [])

  return (
    <main className={styles.main}>
      <div className={styles.intro}>
        <div className={styles.title_1}>Hello, it's me</div>
        <div className={styles.title_2}>Yifan<span>.</span></div>
        <div className={styles.desc}>
          I am a software engineer with a passion for creativity and
          innovation. I blend my technical expertise with a keen eye for
          aesthetics to promote the development of smooth, user-friendly
          products.
        </div>
      </div>
      <div className={styles.david}>
        <div className={styles.x} style={animateX}>
          <div className={styles.y} style={animateY}>
            <div className={styles.rotate}>
              <Image
                src={David}
                alt='The David sculpture'
                sizes={`(max-width: ${mobileSize}px) 241px`}
                fill={true}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
