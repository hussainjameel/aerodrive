import { enterFullScreen, exitFullScreen } from "~/utils";


export const createSystemSlice = (set) => ({
  dark: false,
  volume: 100,
  brightness: 80,
  wifi: true,
  bluetooth: true,
  airdrop: true,
  fullscreen: false,
  toggleDark: () =>
    set((state) => {
      if (!state.dark) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
      return { dark: !state.dark };
    }),
  toggleWIFI: () => set((state) => ({ wifi: !state.wifi })),
  toggleBluetooth: () => set((state) => ({ bluetooth: !state.bluetooth })),
  toggleAirdrop: () => set((state) => ({ airdrop: !state.airdrop })),
  toggleFullScreen: (v) =>
    set(() => {
      v ? enterFullScreen() : exitFullScreen();
      return { fullscreen: v };
    }),
  setVolume: (v) => set(() => ({ volume: v })),
  setBrightness: (v) => set(() => ({ brightness: v }))
});
