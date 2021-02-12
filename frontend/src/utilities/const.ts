const DEV_MODE = process.env.APP_ENV === 'development';
const API_PORT = process.env.BACKEND_PORT || window.location.port;
const POLL_MS = parseInt(process.env.POLL_MS || '500');
const googleMapsApiKey = process.env.CSD_GOOGLE_API_KEY || '';

export { DEV_MODE, API_PORT, POLL_MS, googleMapsApiKey };
