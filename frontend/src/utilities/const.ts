const DEV_MODE = process.env.APP_ENV === 'development';
const API_PORT = process.env.BACKEND_PORT || 8080;
const googleMapsApiKey = process.env.CSD_GOOGLE_API_KEY || '';

export { DEV_MODE, API_PORT, googleMapsApiKey };
