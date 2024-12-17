import { useRef, useEffect } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef(null);
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) handler();
      }
      //third argument of true set execution of handlers in capturing
      //not bubble phase
      document.addEventListener("click", handleClick, listenCapturing);
      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );
  return ref;
}
