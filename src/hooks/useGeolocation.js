import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "user-location";

function getSavedLocation() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // ignore
  }
  return null;
}

function saveLocation(location) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(location));
  } catch {
    // ignore
  }
}

export function useGeolocation() {
  const [location, setLocation] = useState(() => getSavedLocation());
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(!getSavedLocation());
  const [isManual, setIsManual] = useState(false);

  useEffect(() => {
    if (location && !loading) return;

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        setLocation(newLocation);
        saveLocation(newLocation);
        setLoading(false);
        setIsManual(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
        if (!location) {
          const defaultLocation = { lat: 14.5995, lon: 120.9842 };
          setLocation(defaultLocation);
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  }, []);

  const refresh = useCallback(() => {
    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        setLocation(newLocation);
        saveLocation(newLocation);
        setLoading(false);
        setIsManual(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
  }, []);

  const setManualLocation = useCallback((lat, lon) => {
    const newLocation = { lat, lon };
    setLocation(newLocation);
    saveLocation(newLocation);
    setIsManual(true);
    setError(null);
  }, []);

  return { location, error, loading, refresh, setManualLocation, isManual };
}
