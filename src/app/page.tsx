"use client";

import David from "./../resources/David.png";
import Image from "next/image";
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
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

interface MovStyle {
  transition: string;
  transform: string;
}

export default function Home() {
  const radPerSec = (2 * Math.PI) / davidRotationTime;
  const isMobile = useRef<boolean>(false);
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

  const startStyle = (hor: boolean): MovStyle => {
    const mod = hor
      ? davidInfo.current.startPosMod.x
      : davidInfo.current.startPosMod.y;
    const pageSize = hor
      ? davidInfo.current.pageDimensions.width
      : davidInfo.current.pageDimensions.height;
    const davidSize = hor
      ? davidInfo.current.dimensions.width
      : davidInfo.current.dimensions.height;

    return {
      transition: "all 0s linear",
      transform: `translate${hor ? "X" : "Y"}(
        calc((${mod} * ${pageSize}) - (0.5 * ${davidSize}px)))`,
    };
  };
  const [animateX, setAnimateX] = useState<MovStyle>(startStyle(true));
  const [animateY, setAnimateY] = useState<MovStyle>(startStyle(false));

  useEffect(() => {
    const x = document.querySelector(`.${styles.x}`);
    const y = document.querySelector(`.${styles.y}`);
    const rotate = document.querySelector(`.${styles.rotate}`);

    // Obtain David's new dimensions (due to rotation) when it reaches the
    // opposite edge after bouncing on current edge
    const newDimensions = (movTime: number): DimenNum => {
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
    const bounceX = (
      e?: Event,
      time: number = davidInfo.current.animateTime.x
    ): void => {
      // Stop bubbling so that bounceY does not get mistakenly called
      if (e) e.stopPropagation();

      const dimensions: DimenNum = newDimensions(time);
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
    const bounceY = (
      e?: Event,
      time: number = davidInfo.current.animateTime.y
    ): void => {
      // Stop bubbling so that bounceX does not get mistakenly called
      if (e) e.stopPropagation();

      const dimensions: DimenNum = newDimensions(time);
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

    // Mobile view will have a different initial movements due to David size
    // difference
    const onResize = (e?: Event, init: boolean = false): void => {
      let viewChange: boolean = false;

      if (window.innerWidth <= mobileSize && !isMobile.current) {
        isMobile.current = true;
        viewChange = true;
        davidInfo.current = {
          ...davidInfo.current,
          animateTime: davidMoveTimeMobile,
          dimensions: davidSmallSize,
          pageDimensions: pageSizeMobile,
          goingRight: false,
          goingTop: false,
        };
      } else if (window.innerWidth > mobileSize && isMobile.current) {
        isMobile.current = false;
        viewChange = true;
        davidInfo.current = {
          ...davidInfo.current,
          animateTime: davidMoveTime,
          dimensions: davidSize,
          pageDimensions: pageSize,
          goingRight: false,
          goingTop: false,
        };
      }

      if (viewChange || init) {
        setAnimateX(startStyle(true));
        setAnimateY(startStyle(false));
        setTimeout(() => {
          bounceX(
            undefined,
            davidInfo.current.animateTime.x * davidInfo.current.startPosMod.x
          );
          bounceY(
            undefined,
            davidInfo.current.animateTime.y * davidInfo.current.startPosMod.y
          );
        }, 500);
      }
    };
    onResize(undefined, true);

    // Event listeners
    x?.addEventListener("transitionend", bounceX);
    y?.addEventListener("transitionend", bounceY);
    window.addEventListener("resize", onResize);

    return () => {
      x?.removeEventListener("transitionend", bounceX);
      y?.removeEventListener("transitionend", bounceY);
      window.removeEventListener("resize", onResize);
    };
  }, []);

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
