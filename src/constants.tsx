export interface DimenStr {
  height: string;
  width: string;
}
export interface DimenNum {
  height: number;
  width: number;
}
export interface CoordNum {
  x: number;
  y: number;
}

export const spacing: number = 7; // Corresponds to global css var
export const navWidth: number = 270; // Corresponds to global css value
export const mobileSize: number = 810;
export const primaryColor: string = "var(--primary-color)";
export const slideAnimationDuration: number = 500; // Corresponds to global css var
export const modalAnimationDuration: number = 250; // Corresponds to modal css var

export const logoSizeLarge: number = 75; // Corresponds to navbar css value
export const logoSizeSmall: number = 50; // Corresponds to navbar css value
export const spotifyNormal: number = 352;
export const spotifyCompact: number = 152;
export const tabs: Array<{ title: string; desc: string; path: string }> = [
  {
    title: "HOME",
    desc: "Wait Who Am I",
    path: "/",
  },
  {
    title: "PORTFOLIO",
    desc: "Some Selected Work",
    path: "/portfolio",
  },
  {
    title: "ART DUMP",
    desc: "My Mom Said I Draw Well",
    path: "/art",
  },
  {
    title: "CONTACT",
    desc: "Get In Touch",
    path: "/contact",
  },
];

export const davidRotationTime: number = 120; // Corresponds to home page css value
export const davidOverflow: number = 0.25;
export const pageSize: DimenStr = {
  height: `(100vh - 2 * ${spacing}px)`,
  width: `(100vw - ${navWidth}px - 3 * ${spacing}px)`,
};
export const pageSizeMobile: DimenStr = {
  height: "100vh",
  width: "100vw",
};
export const davidMoveTime: CoordNum = {
  x: 35,
  y: 25,
};
export const davidMoveTimeMobile: CoordNum = {
  x: 20,
  y: 25,
};
export const davidInitPos: CoordNum = {
  // Corresponds to home page css values
  x: 0.5,
  y: 0.5,
};
export const davidSize: DimenNum = {
  // Corresponds to home page css values
  height: 734,
  width: 482,
};
export const davidSmallSize: DimenNum = {
  // Corresponds to home page css values
  height: 503,
  width: 330,
};

export const projectTabs: Array<{
  title: string;
  path: string;
  IP: boolean;
  temp_bg: string;
}> = [
  {
    title: "Website v4.0",
    path: "/portfolio/website",
    IP: false,
    temp_bg: "blue",
  },
  {
    title: "Unity Game (WIP)",
    path: "/portfolio/unity",
    IP: false,
    temp_bg: "red",
  },
  {
    title: "More Fun Stuff (TBD)",
    path: "",
    IP: true,
    temp_bg: "black",
  },
];

export const socials: Array<{
  type: string,
  link: string
}> = [
  {
    type: "Instagram",
    link: "https://www.instagram.com/yifan.sheep/"
  },
  {
    type: "LinkedIn",
    link: "https://www.linkedin.com/in/yifanyang2000"
  },
  {
    type: "Github",
    link: "https://github.com/YifanYang2000"
  }
]
export const email: string = "yifan.yang@hotmail.ca"
