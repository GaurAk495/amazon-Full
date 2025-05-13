const BASE_URL = 'https://amazon-mern-58p7.onrender.com'; // 👈 इसे अपने backend के base URL से बदलें

const defaultHeaders = {
    'Content-Type': 'application/json',
};

const token = localStorage.getItem('token')

// Generic request function
async function request(endpoint, method = 'GET', data = null, customHeaders) {
    const config = {
        method,
        headers: { ...defaultHeaders, 'Authorization': `Bearer ${token}` },
    };

    if (data) {
        config.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, config);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'API Error');
        }

        return await response.json();
    } catch (err) {
        throw err;
    }
}

// Exported API methods
export const apiClient = {
    get: (endpoint, headers) => request(endpoint, 'GET', null, headers),
    post: (endpoint, data, headers) => request(endpoint, 'POST', data, headers),
    put: (endpoint, data, headers) => request(endpoint, 'PUT', data, headers),
    delete: (endpoint, headers) => request(endpoint, 'DELETE', null, headers),
};
