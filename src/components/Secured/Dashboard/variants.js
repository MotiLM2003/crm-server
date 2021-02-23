export const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.3 },
    },
  };
  
  export const itemVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
      y: '-100vh',
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        type: 'spring',
        ease: 'easeInOut',
        stiffness: 50,
      },
    },
  };