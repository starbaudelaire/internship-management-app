"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Changed from 'next/navigation' for client-side use

export default function AutoLogout() {
  const router = useRouter();
  const [showLogoutWarning, setShowLogoutWarning] = useState(false);
  const [countdown, setCountdown] = useState(60); // 60 seconds warning

  let logoutTimer: NodeJS.Timeout;
  let warningTimer: NodeJS.Timeout;
  let countdownInterval: NodeJS.Timeout;

  const resetTimers = () => {
    clearTimeout(logoutTimer);
    clearTimeout(warningTimer);
    clearInterval(countdownInterval);

    // Set logout warning after 14 minutes (840 seconds)
    warningTimer = setTimeout(() => {
      setShowLogoutWarning(true);
      setCountdown(60); // Reset countdown for new warning
      countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            handleLogout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 14 * 60 * 1000); // 14 minutes

    // Log out after 15 minutes (900 seconds)
    logoutTimer = setTimeout(handleLogout, 15 * 60 * 1000); // 15 minutes
  };

  const handleLogout = () => {
    // In a real application, you would clear user session here
    // e.g., localStorage.removeItem('token');
    // Then redirect to login page
    router.push("/login"); // Redirect to a generic login page
  };

  const handleStayLoggedIn = () => {
    setShowLogoutWarning(false);
    resetTimers(); // Reset all timers
  };

  useEffect(() => {
    resetTimers();

    const events = [
      "load",
      "mousemove",
      "mousedown",
      "click",
      "scroll",
      "keypress",
    ];
    events.forEach((event) => {
      window.addEventListener(event, resetTimers);
    });

    return () => {
      clearTimeout(logoutTimer);
      clearTimeout(warningTimer);
      clearInterval(countdownInterval);
      events.forEach((event) => {
        window.removeEventListener(event, resetTimers);
      });
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <>
      {showLogoutWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-white p-6 shadow-xl max-w-sm w-full">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Peringatan Logout!
            </h2>
            <p className="text-gray-700 mb-6">
              Anda akan secara otomatis logout dalam {countdown} detik karena
              tidak ada aktivitas.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleStayLoggedIn}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Tetap Login
              </button>
              <button
                onClick={handleLogout}
                className="rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Logout Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}