const TOKEN = localStorage.getItem('token');

const opinionated_fetch = async (uri: string, method: string = 'GET', object_data: {} = {}) => {
    uri = `${process.env.REACT_APP_API_URL_BASE}` + uri;

    const headers: { [key: string]: string } = {
        'Content-type': 'application/json'
    };

    if (TOKEN) headers['Authorization'] = `Bearer ${TOKEN}`;

    const options: { [key: string]: string | {} | [] } = {
        method,
        headers,
        data: JSON.stringify(object_data)
    };

    if (method === 'GET' || method === 'DELETE') {
        delete headers['Content-type'];
        delete options['data'];
    }

    try {
        const res = await fetch(uri, options);
        const json = await res.json();

        return res.ok ? json : new Error(json.error.message);
    } catch (error) {
        console.log({ error, source: "Fetch, after options set & during attempt" });
    }
}

export const GET = (api_path: string) => opinionated_fetch(api_path);
export const POST = (api_path: string, data: {}) => opinionated_fetch(api_path, 'POST', data);
export const PUT = (api_path: string, data: {}) => opinionated_fetch(api_path, 'PUT', data);
export const DELETE = (api_path: string) => opinionated_fetch(api_path, 'DELETE');