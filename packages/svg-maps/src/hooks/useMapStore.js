import create from "zustand";

const useMapStore = create((set, get) => ({
  hovered: null,
  setHovered: (hovered) => set({ hovered }),
  selected: null,
  setSelected: (selected) => set({ selected }),
}));

export default useMapStore;
