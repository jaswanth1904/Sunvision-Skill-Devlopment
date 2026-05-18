export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const API_ROUTES = {
  GALLERY: `${API_BASE_URL}/api/gallery`,
  COURSES: `${API_BASE_URL}/api/courses`,
  PARTNERS: `${API_BASE_URL}/api/partners`,
  STATS: `${API_BASE_URL}/api/stats`,
  TESTIMONIALS: `${API_BASE_URL}/api/testimonials`,
  CONTACT: `${API_BASE_URL}/api/contact`,
  SETTINGS: {
    ABOUT: `${API_BASE_URL}/api/settings/about`,
    FOOTER: `${API_BASE_URL}/api/settings/footer`,
  },
};
