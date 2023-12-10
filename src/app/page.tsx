"use client"

import David from './../resources/David.png'
import Image from 'next/image'
import {
  davidMoveTime,
  davidSmallSize,
  davidSize,
  davidRotationTime,
  mobileSize,
  pageHeight,
  pageWidth
} from '../constants'
import { useEffect, useRef, useState } from 'react'
import styles from './page.module.css'

export default function Home() { 
  const rotDegPerSec = 360 / davidRotationTime;
  const startPosMod = 0.5;
  const startPos = (
    x: boolean,
    mod: number,
    pageSize: string,
    davidSize: number
  ): string => {
    return `translate${x ? 'X' : 'Y'}(
      calc(${mod} * (${pageSize}) - 0.5 * ${davidSize}px)
    )`;
  }
  
  const isMobile = useRef<boolean>(false);
  const isRight = useRef<boolean>(true);   // Horizontal mov direction
  const isTop = useRef<boolean>(true);     // Vertical mov direction
  const davidDimensions = useRef<{height: number, width: number}>(davidSize);
  const [animateX, setAnimateX] = useState<{transition: string, transform: string}>({
    transition: `all ${davidMoveTime.x}s linear`,
    transform: `${startPos(true, startPosMod, pageWidth, davidSize.width)}`
  });
  const [animateY, setAnimateY] = useState<{transition: string, transform: string}>({
    transition: `all ${davidMoveTime.y}s linear`,
    transform: `${startPos(false, startPosMod, pageHeight, davidSize.height)}`
  });

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
    const newDimensions = (movTime: number): {width: number, height: number} => {
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
          const travelRad = rotDegPerSec * movTime * (Math.PI/180);
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
    const bounceX = (e?: Event, time: number = davidMoveTime.x): void => {
      // Stop bubbling so that bounceY does not get mistakenly called
      if (e) {
        e.stopPropagation();
      }

      const dimensions = newDimensions(time);
      const overflow = Math.round(dimensions.width * 0.25);
      const horDiff = Math.round(Math.abs(
        (dimensions.width - davidDimensions.current.width) / 2
      ));

      if (isRight.current) {
        setAnimateX({
          transition: `all ${time}s linear`,
          transform: `translateX(${horDiff - overflow}px)`
        });
      } else {
        setAnimateX({
          transition: `all ${time}s linear`,
          transform: `translateX(calc(100vw - 803px + ${overflow - horDiff}px))`
        });
      }
      isRight.current = !isRight.current;
    }

    // Calc new y movement upon David reaching vertical edge, adjusted for
    // 25% vertical overflow
    const bounceY = (e?: Event, time: number = davidMoveTime.y): void => {
      if (e) {
        // Stop bubbling so that bounceX does not get mistakenly called
        e.stopPropagation();
      }

      const dimensions = newDimensions(time);
      const overflow = Math.round(dimensions.height * 0.25);
      const verDiff = Math.round(Math.abs(
        (davidDimensions.current.height - dimensions.height) / 2
      ));

      // Note that unlike horizontal offset. vertical offset is affected by the
      // fact that David's h > w
      const newDimenTaller = dimensions.height > davidDimensions.current.height;
      if (isTop.current) {
        setAnimateY({
          transition: `all ${time}s linear`,
          transform: `translateY(calc(100vh - 748px + ${newDimenTaller
            ? overflow - verDiff
            : overflow + verDiff}px))`
        });
      } else {
        setAnimateY({
          transition: `all ${time}s linear`,
          transform: `translateY(${newDimenTaller
            ? verDiff - overflow
            : 0 - overflow - verDiff}px)`
        });
      }
      isTop.current = !isTop.current;
    }

    // David animations will have different 
    const initMov = (): void => {
      bounceX(undefined, davidMoveTime.x * startPosMod);
      bounceY(undefined, davidMoveTime.y * startPosMod);
    }

    // Mobile view will have a different initial movements due to David size
    // difference
    const onResize = (): void => {
      try {
      } catch(e: any) {
        console.error(e);
      }
    }
    initMov();

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
