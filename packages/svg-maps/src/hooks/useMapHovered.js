import shallow from "zustand/shallow";
import useMapStore from "./useMapStore";

/**
 * Provides the hovered key and setter for the map
 * @returns {string}
 */
export default function useMapHovered() {
  return useMapStore((state) => [state.hovered, state.setHovered], shallow);
}
