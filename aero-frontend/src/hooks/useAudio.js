import { useEffect, useRef, useState } from "react";

export function useAudio(props) {
  const element = new Audio(props.src);
  const ref = useRef(element);

  const [state, setState] = useState({
    volume: 1,
    playing: false
  });

  const controls = {
    play: () => {
      const el = ref.current;
      if (el) {
        setState({ ...state, playing: true });
        return el.play();
      }
    },

    pause: () => {
      const el = ref.current;
      if (el) {
        setState({ ...state, playing: false });
        return el.pause();
      }
    },

    toggle: () => {
      const el = ref.current;
      if (el) {
        const promise = state.playing ? el.pause() : el.play();
        setState({ ...state, playing: !state.playing });
        return promise;
      }
    },

    volume: (value) => {
      const el = ref.current;
      if (el) {
        value = Math.min(1, Math.max(0, value));
        el.volume = value;
        setState({ ...state, volume: value });
      }
    }
  };

  useEffect(() => {
    const handler = () => {
      if (props.autoReplay) controls.play();
    };

    element.addEventListener("ended", handler);
    return () => {
      element.removeEventListener("ended", handler);
    };
  }, [props.autoReplay]);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    setState({
      volume: el.volume,
      playing: !el.paused
    });
  }, [props.src]);

  return [element, state, controls, ref];
}
