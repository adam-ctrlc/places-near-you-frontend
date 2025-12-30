import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function searchPlaces(lat, lon, query, radius = 5000, page = 1, limit = 10) {
  const response = await api.get("/places/search", {
    params: { lat, lon, q: query, radius, page, limit },
  });
  return response.data;
}

export async function getPlaceById(id) {
  const response = await api.get(`/places/${id}`);
  return response.data;
}

export async function geocodeLocation(location) {
  const response = await api.get("/places/geocode", {
    params: { location },
  });
  return response.data;
}

export async function reverseGeocode(lat, lon) {
  const response = await api.get("/places/reverse-geocode", {
    params: { lat, lon },
  });
  return response.data;
}

export async function getCategories() {
  const response = await api.get("/places/categories");
  return response.data;
}

export async function getFeaturedPlaces(lat, lon) {
  const response = await api.get("/places/featured", {
    params: { lat, lon },
  });
  return response.data;
}
