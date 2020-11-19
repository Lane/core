import { useRef, useEffect } from "react";

/**
 * Hook that allows using a ref while also forwarding it in a functional component
 * See: https://itnext.io/reusing-the-ref-from-forwardref-with-react-hooks-4ce9df693dd
 */
export default function useCombinedRefs(...refs) {
  const targetRef = useRef();

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === "function") {
        ref(targetRef.current);
      } else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
}
