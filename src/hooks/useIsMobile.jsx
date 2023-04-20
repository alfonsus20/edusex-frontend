import useWindowSize from "./useWindowSize";

function useIsMobile() {
  const isMobile = useWindowSize().width < 768;

  return { isMobile };
}

export default useIsMobile;
