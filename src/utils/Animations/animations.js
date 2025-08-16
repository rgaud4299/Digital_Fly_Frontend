
export const textVariants = {
    hidden: { opacity: 0, y: 80 ,scale: 1.25 },
    visible: { opacity: 1, y: 0, scale: 1,transition: {delay : 0, duration: 1 } },
  };

export const imageVariants = {
    hidden: { opacity: 0, y:200, scale: 1.3 },
    visible: { opacity: 1,y:0, scale: 1, transition: { duration: 1 } },
  };

``
  export  const cardVariants = (delay= 0, duration= 1)=>({
  hidden: { opacity: 0, y: 100, scale: 1.1 },
  visible: {
    opacity: 1,
    x:0,
    y: 0,
    scale: 1,
    transition: {
      delay,
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1], 
    },
  },
    whileHover: {
        scale: 1.03,
        rotateX: 3,
        rotateY: -3,
        boxShadow: "0 15px 40px rgba(0, 255, 255, 0.2)",
        transition: { delay,duration},
     } })


export const cardDelayVariants = (delay= 0, duration= 1) => ( {

  
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay, duration, ease: "easeOut" }
  }
});



// Stagger Children Animation
export const staggerContainer = (staggerChildren= 0.2) => ({
   hidden: { opacity: 0, y: 200 ,scale: 1.3 },
    visible: { opacity: 1, y: 0, scale: 1, transition: {
      staggerChildren
    } },

});


//Default Options
export const defaultOptions = {
  once: true,
  threshold: 0.2
};







  // Parent variant with stagger
export const staggerContainer2 = (stagger = 0.1, delayChildren = 0) => ({
  hidden: {
    ...textVariants.hidden, // inherit hidden from textVariants
  },
  visible: {
    ...textVariants.visible, // inherit visible from textVariants
    transition: {
      ...textVariants.visible.transition, // keep parent animation timing
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

// Slide-in-left child variant
// 
export const slideInLeft2 = ( duration = 0.6) => ({
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    x:0,
    y: 0,
    transition: {  duration }
  }
});
