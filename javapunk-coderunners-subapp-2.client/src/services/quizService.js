const API_BASE_URL = import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api`
    : "http://localhost:5147/api";

async function readResponse(response) {
    const responseText = await response.text();

    let data = {};
    try {
        data = responseText ? JSON.parse(responseText) : {};
    } catch {
        data = { message : responseText};
    }

    if (!response.ok) {
        throw new Error(
            result.message ||
            result.title ||
            result.detail ||
            responseText ||
            `Request failed with status ${response.status}.` 
        );
    }

    return data;
}

function getHeaders() {
    const token = localStorage.getItem("authToken");

    return {
        "Content-type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` }: {}),
    };
}

export async function getQuestionsForModule(moduleId) {
    const response = await fetch(`${API_BASE_URL}/quiz/modules/${moduleId}/questions`,
        {
            method: "GET",
            headers: getHeaders(),
        }
    );

    return readResponse(response);
}

export async function checkAnswer(questionId, answerId) {
    const response = await fetch(`${API_BASE_URL}/quiz/check`,
        {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({ questionId, answerId }),
        }
    );

    return readResponse(response);
}

export async function submitQuiz(answers) {
    const response = await fetch(`${API_BASE_URL}/quiz/submit`,
        {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({ answers })
        }
    );

    return readResponse(response);
}