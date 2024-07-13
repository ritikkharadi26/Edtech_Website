import React, { useEffect, useState } from 'react';

const ScrollBeam = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const top = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollTop(top);
      setWindowHeight(height);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollPercentage = (scrollTop / windowHeight) * 100;

  return (
    <div className="fixed left-6 top-0 h-full w-4 z-10 ">
      <div
        className="h-20 w-full bg-pink-500 transition-all duration-200"
        style={{ transform: `translateY(${scrollPercentage}%)` }}
      ></div>
    </div>
  );
};

export default ScrollBeam;
