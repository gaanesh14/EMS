import { useEffect } from "react";
import API from "../../utils/api";

export const useTokenRefresh = () => {

  useEffect(() => {

    const interval = setInterval(async () => {

      const refreshToken = sessionStorage.getItem("refreshToken");

      if (!refreshToken) return;

      try {

        const res = await API.post("/auth/refresh", { refreshToken });

        sessionStorage.setItem("accessToken", res.data.accessToken);

      } catch (err) {

        sessionStorage.clear();
        window.location.replace("/login");

      }

    }, 120000); // refresh every 120 seconds

    return () => clearInterval(interval);

  }, []);

};

export default useTokenRefresh;