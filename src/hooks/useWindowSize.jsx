import { useLayoutEffect, useState } from "react";
import { throttle } from "../utils/helper";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
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

  console.log({ windowSize });

  return windowSize;
}

export default useWindowSize;
