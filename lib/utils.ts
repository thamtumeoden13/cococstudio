import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
// import hero from "../public/assets/images/hero.jpeg";

// export const heroImg = hero;

// import hmv from "../public/assets/videos/hero.mp4";
// import smallmv from "../public/assets/videos/smallhero.mp4";
// import highlightFirstmv from "../public/assets/videos/highlightfirst.mp4";
// import highlightSectmv from "../public/assets/videos/hightlightthird.mp4";
// import highlightThirdmv from "../public/assets/videos/hightlightsec.mp4";
// import highlightFourthmv from "../public/assets/videos/hightlightfourth.mp4";
// import exploremv from "../public/assets/videos/explore.mp4";
// import framemv from "../public/assets/videos/frame.mp4";

// import apple from "../public/assets/images/apple.svg";
// import search from "../public/assets/images/search.svg";
// import bag from "../public/assets/images/bag.svg";
// import watch from "../public/assets/images/watch.svg";
// import right from "../public/assets/images/right.svg";
// import replay from "../public/assets/images/replay.svg";
// import play from "../public/assets/images/play.svg";
// import pause from "../public/assets/images/pause.svg";

// import yellow from "../public/assets/images/yellow.jpg";
// import blue from "../public/assets/images/blue.jpg";
// import white from "../public/assets/images/white.jpg";
// import black from "../public/assets/images/black.jpg";
// import explore1 from "../public/assets/images/explore1.jpg";
// import explore2 from "../public/assets/images/explore2.jpg";
// import chip from "../public/assets/images/chip.jpeg";
// import frame from "../public/assets/images/frame.png";

// export const heroVideo = hmv;
// export const smallHeroVideo = smallmv;
// export const highlightFirstVideo = highlightFirstmv;
// export const highlightSecondVideo = highlightSectmv;
// export const highlightThirdVideo = highlightThirdmv;
// export const highlightFourthVideo = highlightFourthmv;
// export const exploreVideo = exploremv;
// export const frameVideo = framemv;

// export const appleImg = apple;
// export const searchImg = search;
// export const bagImg = bag;
// export const watchImg = watch;
// export const rightImg = right;
// export const replayImg = replay;
// export const playImg = play;
// export const pauseImg = pause;

// export const yellowImg = yellow;
// export const blueImg = blue;
// export const whiteImg = white;
// export const blackImg = black;
// export const explore1Img = explore1;
// export const explore2Img = explore2;
// export const chipImg = chip;
// export const frameImg = frame;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function parseServerActionResponse<T>(response: T) {
  return JSON.parse(JSON.stringify(response));
}


// ERROR HANDLER
export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    // This is a native JavaScript error (e.g., TypeError, RangeError)
    console.error(error.message);
    throw new Error(`Error: ${error.message}`);
  } else if (typeof error === "string") {
    // This is a string error message
    console.error(error);
    throw new Error(`Error: ${error}`);
  } else {
    // This is an unknown type of error
    console.error(error);
    throw new Error(`Unknown error: ${JSON.stringify(error)}`);
  }
};

export const navVariants = {
  hidden: {
    opacity: 0,
    y: -50,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 140,
    },
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      delay: 1,
    },
  },
};

export const slideIn = (direction: string, type: string, delay: number, duration: number) => ({
  hidden: {
    x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
    y: direction === 'up' ? '100%' : direction === 'down' ? '100%' : 0,
  },
  show: {
    x: 0,
    y: 0,
    transition: {
      type,
      delay,
      duration,
      ease: 'easeOut',
    },
  },
});

export const staggerContainer = (staggerChildren?: number, delayChildren?: number) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const textVariant = (delay: number) => ({
  hidden: {
    y: 50,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 1.25,
      delay,
    },
  },
});

export const textContainer = {
  hidden: {
    opacity: 0,
  },
  show: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: i * 0.1 },
  }),
};

export const textVariant2 = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'tween',
      ease: 'easeIn',
    },
  },
};

export const fadeIn = (direction: string, type: string, delay: number, duration: number) => ({
  hidden: {
    x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
    y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type,
      delay,
      duration,
      ease: 'easeOut',
    },
  },
});

export const planetVariants = (direction: string) => ({
  hidden: {
    x: direction === 'left' ? '-100%' : '100%',
    rotate: 120,
  },
  show: {
    x: 0,
    rotate: 0,
    transition: {
      type: 'spring',
      duration: 1.8,
      delay: 0.5,
    },
  },
});

export const zoomIn = (delay: number, duration: string) => ({
  hidden: {
    scale: 0,
    opacity: 0,
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'tween',
      delay,
      duration,
      ease: 'easeOut',
    },
  },
});

export const footerVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 140,
    },
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      delay: 0.5,
    },
  },
};

