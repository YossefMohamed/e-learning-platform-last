import React, { useState, useEffect } from "react";

const useScrollToBottom = () => {
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(document.documentElement.scrollTop);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToBottom = () => {
    document.documentElement.scrollTop = document.documentElement.scrollHeight;
  };

  return {
    scrollTop,
    scrollToBottom,
  };
};

export default useScrollToBottom;
