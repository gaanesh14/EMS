import { useEffect, useRef } from "react";
import API from "../utils/api";

const IdelTimeout = () => {
  const timer = useRef(null);
  // const navigate = useNavigate();
  const IDLE_TIME = 2 * 60 * 1000; // 2 minutes
  
  // Use sessionStorage to track login status
  const token = sessionStorage.getItem("accessToken");

  const logout = async () => {
    try {
      // 1. Clear server-side cookie
      await API.post("/auth/logout");
    } catch (error) {
      console.error("Server logout failed, clearing local session anyway:", error);
    }

    // 2. Wipe all local data
    sessionStorage.clear();
    localStorage.clear();

    alert("Session expired due to inactivity");
    
    // 3. Force redirect
    window.location.replace("/login"); 
  };

  const resetTimer = () => {
    if (timer.current) clearTimeout(timer.current);
    // Only set the timeout if the user is actually logged in
    if (sessionStorage.getItem("accessToken")) {
      timer.current = setTimeout(logout, IDLE_TIME);
    }
  };

  useEffect(() => {
    // If no token, do not attach event listeners (Fixes login page bug)
    if (!sessionStorage.getItem("accessToken")) return;

    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
    ];

    // Attach listeners
    events.forEach((event) => window.addEventListener(event, resetTimer));
    
    // Start initial timer
    resetTimer();

    // Cleanup function
    return () => {
      if (timer.current) clearTimeout(timer.current);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, []); 

  return null;
};

export default IdelTimeout;