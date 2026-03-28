
export const createDockSlice = (set) => ({
  dockSize: 50,
  dockMag: 2,
  setDockSize: (v) => set(() => ({ dockSize: v })),
  setDockMag: (v) => set(() => ({ dockMag: v }))
});
