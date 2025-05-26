const API_BASE = (() => {
  const api = import.meta.env.VITE_API_URL || "";
  return api
})();

export default API_BASE;