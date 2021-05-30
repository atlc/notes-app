import { useToaster } from '../hooks/useToaster'

const TOKEN = localStorage.getItem('token');

const Fetcher = async (uri: string, method: string = 'GET', object_data: {} = {}) => {
    const bathBomb = useToaster();
    uri = `https://atlc-core-api.herokuapp.com` + uri;

    const headers: { [key: string]: string } = {
        'Content-type': 'application/json; charset=utf-8'
    };

    if (TOKEN) headers['Authorization'] = `Bearer ${TOKEN}`;

    const options: { [key: string]: string | {} | [] } = {
        method,
        headers,
        body: JSON.stringify(object_data)
    };

    if (method === 'GET' || method === 'DELETE') {
        delete headers['Content-type'];
        delete options['body'];
    }


    try {
        const res = await fetch(uri, options);
        try {
            const json = await res.json();
            return json;
        } catch (error) {
            console.log({ error })
            // checking to see if non-JSON response was sent but otherwise a healthy response
            if (error.toString().substring(0, 29) === "SyntaxError: Unexpected token") return { message: res?.statusText, status: res?.status };
            // sends any other error to second catch below
            return { error };
        }
    } catch (error) {
        console.log(`[fetch service error]`, { error })
        return bathBomb({ message: error.message, type: 'error', time_ms: 3000 })
    }
}

export const GET = (api_path: string) => Fetcher(api_path);
export const POST = (api_path: string, data: {}) => Fetcher(api_path, 'POST', data);
export const PUT = (api_path: string, data: {}) => Fetcher(api_path, 'PUT', data);
export const DELETE = (api_path: string) => Fetcher(api_path, 'DELETE');