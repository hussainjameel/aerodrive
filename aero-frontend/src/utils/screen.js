
  export const enterFullScreen = () => {
    if (!isFullScreen()) {
      const element = document.documentElement;
      if (element.requestFullscreen) element.requestFullscreen();
      else if (element.msRequestFullscreen) element.msRequestFullscreen();
      else if (element.mozRequestFullScreen) element.mozRequestFullScreen();
      else if (element.webkitRequestFullscreen) element.webkitRequestFullscreen();
    }
  };
  
  export const exitFullScreen = () => {
    if (isFullScreen()) document.exitFullscreen();
  };
  
  export const isFullScreen = () => {
    const fsDoc = document ;
    return !!(
      fsDoc.fullscreenElement ||
      fsDoc.webkitIsFullScreen ||
      fsDoc.mozFullScreen ||
      fsDoc.msFullscreenElement
    );
  };
  