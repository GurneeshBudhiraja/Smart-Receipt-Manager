import { motion, MotionValue, useTransform } from "framer-motion";

interface ScrollIndicatorProps {
  progress: MotionValue<number>;
}

export function ScrollIndicator({ progress }: ScrollIndicatorProps) {
  const opacity = useTransform(progress, [0, 0.1, 0.85, 0.9], [0, 1, 1, 0]);

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      style={{ opacity }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <div className="w-8 h-14 border-2 border-blue-500 rounded-full flex items-center justify-center">
        <motion.div
          className="w-1 h-3 bg-blue-500 rounded-full"
          animate={{
            y: [0, 6, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>
  );
}
