const API_BASE_URL = "http://localhost:5147/api";

//Handle error responses from the API and make them undersandable for the user
async function getErrorMessage(response) {
    const responseText = await response.text();

    if (!responseText) {
        return `Login failed (${response.status})`;
    }

    try {
        const errorData = JSON.parse(responseText);
        
        if(typeof errorData === "string") {
            return errorData;
        }

        return (
            errorData.detail || 
            errorData.title ||
            errorData.message || 
            responseText
        );
    } catch { 
        return responseText;
    }
}

export async function login(username, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error("Invalid username or password");
        }

        throw new Error(await getErrorMessage(response));
    }
    return response.json();
}