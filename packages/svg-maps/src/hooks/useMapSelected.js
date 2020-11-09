import shallow from "zustand/shallow";
import useMapStore from "./useMapStore";

/**
 * Provides the hovered key and setter for the map
 * @returns {string}
 */
export default function useMapSelected() {
  return useMapStore((state) => [state.selected, state.setSelected], shallow);
}
