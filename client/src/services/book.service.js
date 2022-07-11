import environments from "../environments/environments";

const API_URL = environments.REACT_APP_API_URL;

export const getAllBooks = async () => {
    const response = await fetch(`${API_URL}/books`);
    if (!response.ok) throw new Error();

    const payload = await response.json();

    return payload;
}