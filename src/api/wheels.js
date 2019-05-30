import api from "../helpers/api"

export function favorite(id) {
  return api.post(`/api/wheels/${id}/favorite`);
}

export function unfavorite(id) {
  return api.delete(`/api/wheels/${id}/favorite`);
}

export function like(id) {
  return api.post(`/api/wheels/${id}/like`);
}

export function unlike(id) {
  return api.delete(`/api/wheels/${id}/like`);
}
