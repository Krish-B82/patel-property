import axios from 'axios';

// Get base URLs from environment variables or use placeholders
export const RAILWAY_URL = import.meta.env.VITE_RAILWAY_URL || 'https://patelproperty-production.up.railway.app/api';
export const RENDER_URL = import.meta.env.VITE_RENDER_URL || 'https://patelproperty.onrender.com/api';
export const LOCAL_URL = 'http://localhost:5000/api';

const isDev = import.meta.env.DEV;
export const PRIMARY_URL = isDev ? LOCAL_URL : RAILWAY_URL;
export const FALLBACK_URL = isDev ? LOCAL_URL : RENDER_URL;

/**
 * Wrapper for Axios to handle automatic fallback from Railway to Render
 */
export const axiosWithFallback = async (method, endpoint, data = null, config = {}) => {
  let requestUrl = endpoint;
  if (!requestUrl.startsWith('/')) {
    requestUrl = '/' + requestUrl;
  }

  try {
    // 1. Try Primary with 5-second timeout
    const response = await axios({
      method,
      url: `${PRIMARY_URL}${requestUrl}`,
      data,
      ...config,
      timeout: 5000, 
    });
    return response;
  } catch (error) {
    const isTimeoutOrNetworkError = error.code === 'ECONNABORTED' || error.message === 'Network Error' || !error.response;
    
    // If it failed due to network/timeout issues, switch to fallback
    if (isTimeoutOrNetworkError) {
       console.warn(`Primary source failed: ${error.message}. Switching to Render (may take 30s to wake up)...`);
       
       // 2. Fallback to Render with 60-second timeout (since Render takes ~30s to wake up)
       const fallbackResponse = await axios({
         method,
         url: `${FALLBACK_URL}${requestUrl}`,
         data,
         ...config,
         timeout: 60000, 
       });
       return fallbackResponse;
    }
    
    // Otherwise it's a backend validation error (e.g., 400 Bad Request, 401 Unauthorized), so just throw it.
    throw error;
  }
};

/**
 * Wrapper for native fetch to handle automatic fallback
 */
export const fetchWithFallback = async (endpoint, options = {}) => {
  let requestUrl = endpoint;
  if (!requestUrl.startsWith('/')) {
    requestUrl = '/' + requestUrl;
  }

  // 1. Try Primary with 5-second timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);
  
  try {
     const response = await fetch(`${PRIMARY_URL}${requestUrl}`, {
       ...options,
       signal: controller.signal
     });
     clearTimeout(timeoutId);
     
     // Note: fetch doesn't throw on HTTP error statuses (like 404, 500)
     // If it's a 502/503 from Railway (bad gateway), we might want to fallback.
     if (!response.ok && (response.status === 502 || response.status === 503 || response.status === 504)) {
       throw new Error(`Primary returned status ${response.status}`);
     }
     
     return response;
  } catch (error) {
     clearTimeout(timeoutId);
     
     // AbortError is thrown when controller.abort() is called (Timeout)
     // TypeError is usually thrown on network issues
     // So we fall back to Render with NO strict short timeout
     console.warn(`Primary source failed: ${error.message}. Switching to Render...`);
     
     const fallbackOptions = { ...options };
     // Remove the abort signal for fallback so it can wait for 30s wake-up
     delete fallbackOptions.signal;
     
     const fallbackResponse = await fetch(`${FALLBACK_URL}${requestUrl}`, fallbackOptions);
     return fallbackResponse;
  }
};
