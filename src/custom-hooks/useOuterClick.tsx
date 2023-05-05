import { useState, useEffect, useRef } from "react";

const useOuterClick = () => {
  const ref = useRef<HTMLInputElement>(null);

  const [out, setOut] = useState(false);
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, true);
    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
    };
  });

  const handleOutsideClick = (e: any) => {
    if (ref.current && ref.current.contains(e.target)) {
      setOut(false);
    } else {
      setOut(true);
    }
  };
  return { ref, out };
  // return ref; client can omit `useRef`
};

export default useOuterClick;
