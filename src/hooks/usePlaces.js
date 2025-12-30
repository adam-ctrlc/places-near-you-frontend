import useSWR from "swr";
import {
  searchPlaces,
  getPlaceById,
  reverseGeocode,
  getCategories,
  getFeaturedPlaces,
} from "../services";

export function usePlacesSearch(lat, lon, query, radius = 5000, page = 1, limit = 10) {
  const { data, error, isLoading, mutate } = useSWR(
    lat && lon && query ? ["places-search", lat, lon, query, radius, page, limit] : null,
    async () => {
      const response = await searchPlaces(lat, lon, query, radius, page, limit);
      return response;
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  return {
    places: data?.data || [],
    pagination: data?.pagination || null,
    isLoading,
    isError: error,
    mutate,
  };
}

export function usePlaceDetail(id) {
  const { data, error, isLoading } = useSWR(
    id ? ["place-detail", id] : null,
    async () => {
      const response = await getPlaceById(id);
      return response.data;
    },
    {
      revalidateOnFocus: false,
    }
  );

  return {
    place: data,
    isLoading,
    isError: error,
  };
}

export function useLocationName(lat, lon) {
  const { data, error, isLoading } = useSWR(
    lat && lon ? ["location-name", lat, lon] : null,
    async () => {
      const response = await reverseGeocode(lat, lon);
      return response.data;
    },
    {
      revalidateOnFocus: false,
    }
  );

  return {
    locationName: data
      ? `${data.city}${data.state ? `, ${data.state}` : ""}`
      : "",
    locationData: data,
    isLoading,
    isError: error,
  };
}

export function useCategories() {
  const { data, error, isLoading } = useSWR(
    "categories",
    async () => {
      const response = await getCategories();
      return response.data;
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000,
    }
  );

  return {
    categories: data || [],
    isLoading,
    isError: error,
  };
}

export function useFeaturedPlaces(lat, lon) {
  const { data, error, isLoading } = useSWR(
    lat && lon ? ["featured-places", lat, lon] : null,
    async () => {
      const response = await getFeaturedPlaces(lat, lon);
      return response.data;
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  return {
    featuredPlaces: data || [],
    isLoading,
    isError: error,
  };
}
