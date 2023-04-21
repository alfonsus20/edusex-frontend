import { useEffect } from "react";

function usePreloadImages(images) {
  useEffect(() => {
    images.forEach((image) => {
      new Image().src = image;
    });
  }, []);
}

export default usePreloadImages;
