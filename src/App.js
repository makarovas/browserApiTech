import React, { useState, useEffect } from "react";

function App() {
  const initialLocationState = {
    latitude: null,
    longitude: null,
    speed: null,
  };
  const [isOn, setIsOn] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 100, y: 100 });
  const [isOnline, setOnlineStatus] = useState(navigator.onLine);
  const [location, setLocation] = useState(initialLocationState);

  const resizeOnScroll = (e) => {
    setMousePosition({ x: e.pageY, y: e.pageX });
  };
  const handleOnlineStatus = () => {
    setOnlineStatus(true);
  };
  const handleOffline = () => {
    setOnlineStatus(false);
  };

  const handleGeolocation = (e) => {
    setLocation({
      latitude: e.coords.latitude,
      longitude: e.coords.longitude,
      speed: e.coords.speed,
    });
    console.log("location", location);
  };
  useEffect(() => {
    document.title = isOn ? "Ping" : "Pong";
    window.addEventListener("mousemove", resizeOnScroll);
    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOffline);
    navigator.geolocation.getCurrentPosition(handleGeolocation);

    return () => {
      window.removeEventListener("mousemove", resizeOnScroll);
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOffline);
    };
  }, [mousePosition]);

  const toggleColorQub = () => {
    setIsOn((prev) => !prev);
  };
  return (
    <div style={{ backgroundColor: isOn ? "black" : "white", height: "300px" }}>
      <div>{isOnline ? "onLine" : "offLine"}</div>
      <div
        style={{
          backgroundColor: isOn ? "yellow" : "black",
          height: mousePosition.x,
          width: mousePosition.y,
          margin: "0 auto",
          lineHeight: "100px",
        }}
        onClick={toggleColorQub}
        onScroll={resizeOnScroll}
      />
    </div>
  );
}

export default App;
