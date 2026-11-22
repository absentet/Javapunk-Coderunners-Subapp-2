//Service for modules that talks to backend

const API_BASE_URL = "http://localhost:5147/api";

async function handleResponse(response) {
    if (!response.ok) {
        throw new Error(`Request failed (${response.status})`);
    }
    return response.json();
}

function authHeaders() {
    return {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    };
}

export async function getModules(token) {
    const response = await fetch(`${API_BASE_URL}/modules`, {
        headers: authHeaders(),
    });
    return handleResponse(response);
}

export async function getMyProgress() {
    const response = await fetch(`${API_BASE_URL}/modules/progress`, {
        headers: authHeaders(),
    });
}