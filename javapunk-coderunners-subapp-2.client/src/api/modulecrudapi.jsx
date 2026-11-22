const basePath = "https://localhost:7063/api/modulecrud";

export const CreateModule = async (moduleName) => {
    const response = await fetch(`${basePath}/create`, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleName })
    });

    if (!response.ok) {
        throw new Error(`Could not create module (${response.status} ${response.statusText})`);
    }
}

export const GetModules = async () => {
    const response = await fetch(`${basePath}/getall`, {
        method: 'GET',
        mode: 'cors',
    });

    if (!response.ok) {
        throw new Error(`Could not load modules (${response.status} ${response.statusText})`);
    }

    return response.json();
}

export const GetModuleWithId = async (moduleId) => {
    const response = await fetch(`${basePath}/getwithid/${moduleId}`, {
        method: 'GET',
        mode: 'cors',
    });

    if (!response.ok) {
        throw new Error(`Could not load module (${response.status} ${response.statusText})`);
    }

    return response.json();
}

export const UpdateModule = async (module) => {
    const response = await fetch(`${basePath}/update`, {
        method: 'PUT',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(module)
    });

    if (!response.ok) {
        throw new Error(`Could not update module (${response.status} ${response.statusText})`);
    }
}

export const DeleteModule = async (moduleId) => {
    const response = await fetch(`${basePath}/delete?moduleId=${moduleId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error(`Could not delete module (${response.status} ${response.statusText})`);
    }
}
