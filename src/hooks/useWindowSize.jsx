import { useLayoutEffect, useState } from "react";
import { throttle } from "../utils/helper";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useLayoutEffect(() => {
    const handleSize = throttle(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    });

    window.addEventListener("resize", handleSize);

    handleSize();

    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, []);

  return windowSize;
}

export default useWindowSize;
