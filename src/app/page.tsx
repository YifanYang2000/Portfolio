"use client";

import David from "./../resources/David.png";
import Image from "next/image";
import { MobileContext } from "../components/app_wrapper";
import {
  CoordNum,
  DimenNum,
  DimenStr,
  davidInitPos,
  davidMoveTime,
  davidMoveTimeMobile,
  davidSmallSize,
  davidSize,
  davidOverflow,
  davidRotationTime,
  mobileSize,
  pageSize,
  pageSizeMobile,
} from "../constants";
import { useContext, useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

interface MovStyle {
  transition: string;
  transform: string;
}

export default function Home() {
  const radPerSec = (2 * Math.PI) / davidRotationTime;
  const [animateX, setAnimateX] = useState<MovStyle | {}>({});
  const [animateY, setAnimateY] = useState<MovStyle | {}>({});
  const isMobile = useContext<boolean>(MobileContext);
  const timeoutID = useRef<NodeJS.Timeout | undefined>(undefined);
  const davidInfo = useRef<{
    dimensions: DimenNum;
    pageDimensions: DimenStr;
    startPosMod: CoordNum;
    animateTime: CoordNum;
    goingRight: boolean;
    goingTop: boolean;
  }>({
    dimensions: davidSize,
    pageDimensions: pageSize,
    startPosMod: davidInitPos,
    animateTime: davidMoveTime,
    goingRight: false,
    goingTop: false,
  });

  // Obtain David's new dimensions (due to rotation) when it reaches the
  // opposite edge after bouncing on current edge
  const newDimensions = (rotate: Element | null, movTime: number): DimenNum => {
    let dimensions: DimenNum = { width: 0, height: 0 };
    try {
      if (rotate != null) {
        const matrixEl = window
          .getComputedStyle(rotate)
          .getPropertyValue("transform")
          .split(", ");
        const currRad =
          matrixEl[0] != "none"
            ? Math.atan2(Number(matrixEl[1]), Number(matrixEl[3]))
            : 0;
        const travelRad = radPerSec * movTime;
        const finalRad = (currRad + travelRad) % (2 * Math.PI);
        const finalRadPos = finalRad < 0 ? finalRad + 2 * Math.PI : finalRad;

        const cos = Math.cos(finalRadPos);
        const sin = Math.sin(finalRadPos);
        const height = davidInfo.current.dimensions.height;
        const width = davidInfo.current.dimensions.width;

        if (
          (0 <= finalRadPos && finalRadPos < Math.PI * 0.5) ||
          (Math.PI <= finalRadPos && finalRadPos < Math.PI * 1.5)
        ) {
          dimensions = {
            height: Math.round(Math.abs(width * sin + height * cos)),
            width: Math.round(Math.abs(width * cos + height * sin)),
          };
        } else {
          dimensions = {
            height: Math.round(Math.abs(height * cos - width * sin)),
            width: Math.round(Math.abs(width * cos - height * sin)),
          };
        }

        return dimensions;
      } else {
        throw new Error("Rotate div is null");
      }
    } catch (e: any) {
      console.error(e);
      return dimensions;
    }
  };

  // Calc new x movement upon David reaching a horizontal edge, adjusted for
  // 25% horizontal overflow
  const bounceX = (rotate: Element | null, time: number): void => {
    const dimensions: DimenNum = newDimensions(rotate, time);
    const overflow: number = Math.round(dimensions.width * davidOverflow);
    const horDiff: number = Math.round(
      Math.abs((dimensions.width - davidInfo.current.dimensions.width) / 2)
    );

    setAnimateX({
      transition: `all ${time}s linear`,
      transform: davidInfo.current.goingRight
        ? `translateX(${horDiff - overflow}px)`
        : `translateX(calc(
              ${davidInfo.current.pageDimensions.width} -
              ${davidInfo.current.dimensions.width}px +
              ${overflow - horDiff}px))`,
    });
    davidInfo.current.goingRight = !davidInfo.current.goingRight;
  };

  // Calc new y movement upon David reaching vertical edge, adjusted for
  // 25% vertical overflow
  const bounceY = (rotate: Element | null, time: number): void => {
    const dimensions: DimenNum = newDimensions(rotate, time);
    const overflow: number = Math.round(dimensions.height * davidOverflow);
    const verDiff: number = Math.round(
      Math.abs((davidInfo.current.dimensions.height - dimensions.height) / 2)
    );
    const newDimenTaller: boolean =
      dimensions.height > davidInfo.current.dimensions.height;

    // Note that unlike horizontal offset. vertical offset is affected by the
    // fact that David's h > w
    setAnimateY({
      transition: `all ${time}s linear`,
      transform: davidInfo.current.goingTop
        ? `translateY(calc(
              ${davidInfo.current.pageDimensions.height} -
              ${davidInfo.current.dimensions.height}px +
              ${newDimenTaller ? overflow - verDiff : overflow + verDiff}px))`
        : `translateY(${
            newDimenTaller ? verDiff - overflow : 0 - overflow - verDiff
          }px)`,
    });
    davidInfo.current.goingTop = !davidInfo.current.goingTop;
  };

  // Detect transition ends and reset new transition to bounce David back
  useEffect(() => {
    const x = document.querySelector(`.${styles.x}`);
    const y = document.querySelector(`.${styles.y}`);
    const rotate = document.querySelector(`.${styles.rotate}`);

    const onTransitionEndX = (e: Event) => {
      e.stopPropagation();
      bounceX(rotate, davidInfo.current.animateTime.x);
    };
    const onTransitionEndY = (e: Event) => {
      e.stopPropagation();
      bounceY(rotate, davidInfo.current.animateTime.y);
    };

    x?.addEventListener("transitionend", onTransitionEndX);
    y?.addEventListener("transitionend", onTransitionEndY);

    return () => {
      x?.removeEventListener("transitionend", onTransitionEndX);
      y?.removeEventListener("transitionend", onTransitionEndY);
    };
  }, []);

  // Upon view change, change David's properties & reset its animations
  useEffect(() => {
    const rotate = document.querySelector(`.${styles.rotate}`);

    davidInfo.current = isMobile
      ? {
          ...davidInfo.current,
          animateTime: davidMoveTimeMobile,
          dimensions: davidSmallSize,
          pageDimensions: pageSizeMobile,
          goingRight: false,
          goingTop: false,
        }
      : {
          ...davidInfo.current,
          animateTime: davidMoveTime,
          dimensions: davidSize,
          pageDimensions: pageSize,
          goingRight: false,
          goingTop: false,
        };

    clearTimeout(timeoutID.current);
    setAnimateX({});
    setAnimateY({});
    timeoutID.current = setTimeout(() => {
      // A timeout is necessary to allow the davidInfo ref to update
      const animate = davidInfo.current.animateTime;
      const startPos = davidInfo.current.startPosMod;
      bounceX(rotate, animate.x * startPos.x);
      bounceY(rotate, animate.y * startPos.y);
    }, 500);
  }, [isMobile]);

  return (
    <main className={styles.main}>
      <div className={styles.intro}>
        <div className={styles.title_1}>Hello, it's me</div>
        <div className={styles.title_2}>
          Yifan<span>.</span>
        </div>
        <div className={styles.desc}>
          I am a software engineer with a passion for creativity and innovation.
          I blend my technical expertise with a keen eye for aesthetics to
          promote the development of smooth, user-friendly products.
        </div>
      </div>
      <div className={styles.david}>
        <div className={styles.x} style={animateX}>
          <div className={styles.y} style={animateY}>
            <div className={styles.rotate}>
              <Image
                src={David}
                alt="The David sculpture"
                sizes={`(max-width: ${mobileSize}px) 241px`}
                fill={true}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
