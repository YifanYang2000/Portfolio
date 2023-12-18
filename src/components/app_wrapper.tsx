"use client";

import HeaderMobile from "./header_mobile";
import Loading from "./loading";
import Navigation from "./navigation";
import { mobileSize, slideAnimationDuration } from "../constants";
import { createContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./app_wrapper.module.css";

// As providing props to pages is hard without hacks, a context will be
// introduced so that children (pages) have access to onNavClick and will be
// able to initiate navigation
export const NavContext = createContext((path: string): void => {});
export const MobileContext = createContext(false);

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState<boolean>(false);
  const [nextPathname, setNextPathname] = useState<string>(pathname);
  const savedPathname = useRef<string>(pathname);

  const loadingScreen = <Loading showLoadingScreen={showLoadingScreen} />;

  // Determine whether on mobile view on resize
  useEffect(() => {
    const onResize = () => {
      window.innerWidth <= mobileSize ? setIsMobile(true) : setIsMobile(false);
    };
    onResize();

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // During navigation, once new page is fully loaded, close loading page
  // & allow for next navigation action
  useEffect(() => {
    if (savedPathname.current != pathname) {
      setShowLoadingScreen(false);
      setNextPathname(pathname);
      savedPathname.current = pathname;
    }
  }, [pathname]);

  // Navigate to different page on element click
  // Show loading screen first before proceeding to push next path to router
  function onNavClick(path: string) {
    if (showLoadingScreen || path == pathname) {
      return;
    }
    setShowLoadingScreen(true);
    setNextPathname(path);
    setTimeout(() => {
      if (isMobileNavOpen) {
        setIsMobileNavOpen(false);
      }
      router.push(path);
    }, slideAnimationDuration);
  }

  return (
    <div className={styles.components}>
      {isMobile ? loadingScreen : null}
      <Navigation
        isMobile={isMobile}
        isMobileNavOpen={isMobileNavOpen}
        nextPathName={nextPathname}
        onNavClick={onNavClick}
        setIsMobileNavOpen={setIsMobileNavOpen}
      />
      <div className={styles.page}>
        <HeaderMobile
          onNavClick={onNavClick}
          setIsMobileNavOpen={setIsMobileNavOpen}
        />
        {!isMobile ? loadingScreen : null}
        <MobileContext.Provider value={isMobile}>
          <NavContext.Provider value={onNavClick}>
            {children}
          </NavContext.Provider>
        </MobileContext.Provider>
      </div>
    </div>
  );
}
