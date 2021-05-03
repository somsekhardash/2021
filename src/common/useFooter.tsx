import React, { useEffect, useState } from "react";

export default function useFooter({ visible, duration = 0, children }) {
  const [isVisible, setVisibility] = useState(false);
  useEffect(() => {
    setVisibility(visible);
  }, [visible]);
  if (!isVisible) return null;
  if (duration) {
    setTimeout(() => {
      setVisibility(false);
    }, duration);
  }
  const mountedStyle = { animation: "inAnimation 700ms ease-in" };
  const unmountedStyle = {
    animation: "outAnimation 700ms ease-out",
    animationFillMode: "forwards",
  };
  return (
    <div
      className="transitionDiv"
      style={visible ? mountedStyle : unmountedStyle}
    >
      {children}
    </div>
  );
}
