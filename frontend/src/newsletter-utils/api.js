const BASE_URL = 'https://lit-backend-azajexa8e2a9g4az.canadacentral-01.azurewebsites.net/api';

export const api = {
  subscribe: async (email) => {
    try {
      const response = await fetch(`${BASE_URL}/subscribers/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': 'https://www.luxuryintaste.com', // replace if frontend domain changes
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          error: errorData.error || `Server error: ${response.status}`,
        };
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        error: 'Network error: Unable to connect to the server. Please try again later.',
      };
    }
  },

  confirmSubscription: async (email) => {
    try {
      const response = await fetch(`${BASE_URL}/subscribers/confirm?email=${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': 'https://lit-client.vercel.app', // replace if frontend domain changes
        },
        mode: 'cors',
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          error: errorData.error || `Server error: ${response.status}`,
        };
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        error: 'Network error: Unable to connect to the server. Please try again later.',
      };
    }
  },
};
