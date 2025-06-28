import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function App() {
  const mainRef = useRef<HTMLElement | null>(null);
  const section2Ref = useRef<HTMLDivElement | null>(null);

  // Scroll progress for the whole page
  const { scrollYProgress: pageScroll } = useScroll({
    target: mainRef,
    offset: ['start start', 'end end'],
  });

  // Scroll progress specifically for Section 2 image zoom
  const { scrollYProgress: section2Scroll } = useScroll({
    target: section2Ref,
    offset: ['start end', 'end start'],
  });

  // Section 1 animation
  const section1Scale = useTransform(pageScroll, [0, 0.5], [1, 0.85]);
  const section1Rotate = useTransform(pageScroll, [0, 0.5], [0, -2]);

  // Section 2 image zoom animation
  const imageScale = useTransform(section2Scroll, [0, 1], [0.25, 1]);

  return (
    <main
      ref={mainRef}
      className='relative h-[300vh]'>
      {/* Section 1 */}
      <motion.div
        style={{ scale: section1Scale, rotate: section1Rotate }}
        className='sticky top-0 h-screen bg-red-300 flex items-center justify-center text-5xl font-bold z-10'>
        Section 1
      </motion.div>

      {/* Section 2 */}
      <div
        ref={section2Ref}
        className='h-[200vh] relative z-20'>
        <div className='sticky top-0 h-screen bg-amber-600 flex items-center justify-center overflow-hidden'>
          <motion.img
            src='https://images.pexels.com/photos/39811/pexels-photo-39811.jpeg'
            alt='road'
            style={{ scale: imageScale }}
            className='h-screen w-screen object-cover'
          />
        </div>
      </div>
    </main>
  );
}
