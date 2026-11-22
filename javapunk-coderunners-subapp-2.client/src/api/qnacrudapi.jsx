const basePath = "https://localhost:7063/api/qnacrud";

export const CreateQuestion = async (question) => {
    const response = await fetch(`${basePath}/create`, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(question)
    });

    if (!response.ok) {
        throw new Error(`Could not create question (${response.status} ${response.statusText})`);
    }
}

export const GetQuestions = async () => {
    const response = await fetch(`${basePath}/getall`, {
        method: 'GET',
        mode: 'cors',
    });

    if (!response.ok) {
        throw new Error(`Could not load questions (${response.status} ${response.statusText})`);
    }

    return response.json();
}

export const GetQuestionWithId = async (questionId) => {
    const response = await fetch(`${basePath}/getwithid/${questionId}`, {
        method: 'GET',
        mode: 'cors',
    });

    if (!response.ok) {
        throw new Error(`Could not load question (${response.status} ${response.statusText})`);
    }

    return response.json();
}

export const UpdateQuestion = async (question, questionId) => {
    const response = await fetch(`${basePath}/update?questionId=${questionId}`, {
        method: 'PUT',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(question)
    });

    if (!response.ok) {
        throw new Error(`Could not update question (${response.status} ${response.statusText})`);
    }
}

export const DeleteQuestion = async (questionId) => {
    const response = await fetch(`${basePath}/delete?questionId=${questionId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error(`Could not delete question (${response.status} ${response.statusText})`);
    }
}
