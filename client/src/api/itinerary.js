import api from "./axios";

export const uploadDocuments = (formData) =>
  api.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getItineraries = () => api.get("/itineraries");
export const getItinerary = (id) => api.get(`/itineraries/${id}`);
export const deleteItinerary = (id) => api.delete(`/itineraries/${id}`);
export const getShared = (token) => api.get(`/itineraries/shared/${token}`);