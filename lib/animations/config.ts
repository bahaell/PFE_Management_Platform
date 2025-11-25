export const animationConfig = {
  duration: {
    fast: 0.15,
    normal: 0.25,
    slow: 0.35
  },
  ease: {
    easeOut: [0.0, 0.0, 0.2, 1],
    easeIn: [0.4, 0.0, 1, 1],
    easeInOut: [0.4, 0.0, 0.2, 1]
  },
  spring: {
    stiff: { stiffness: 300, damping: 25 },
    smooth: { stiffness: 120, damping: 20 },
    bouncy: { stiffness: 400, damping: 15 }
  }
}

export const reducedMotionConfig = {
  duration: 0.01,
  transition: { duration: 0.01 }
}
