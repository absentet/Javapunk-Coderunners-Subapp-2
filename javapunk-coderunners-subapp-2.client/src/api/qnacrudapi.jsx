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
