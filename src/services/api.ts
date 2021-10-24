import { useToaster } from "../hooks/useToaster";

const TOKEN = localStorage.getItem("token");

const Fetcher = async (uri: string, method: string = "GET", object_data: {} = {}) => {
    const bathBomb = useToaster();
    uri = `https://api.atlc.dev` + uri;

    const headers: { [key: string]: string } = {
        "Content-type": "application/json; charset=utf-8"
    };

    if (TOKEN) headers["Authorization"] = `Bearer ${TOKEN}`;

    const options: { [key: string]: string | {} | [] } = {
        method,
        headers,
        body: JSON.stringify(object_data)
    };

    if (method === "GET" || method === "DELETE") {
        delete headers["Content-type"];
        delete options["body"];
    }

    try {
        const res = await fetch(uri, options);
        try {
            const json = await res.json();
            if (res.ok) {
                return json;
            } else {
                return bathBomb({ message: json.error || json.message, type: "error", time_ms: 3000 });
            }
        } catch (error) {
            console.log({ error, location: "first catch" });
            // checking to see if non-JSON response was sent but otherwise a healthy response
            if (
                error.toString().substring(0, 29) === "SyntaxError: Unexpected token" ||
                error.toString() === "SyntaxError: Unexpected end of JSON input"
            )
                return { message: res?.statusText, status: res?.status };
            // sends any other error to second catch below
            return bathBomb({ message: error.error || error.message, type: "error", time_ms: 3000 });
        }
    } catch (error) {
        console.log({ error, location: "second catch" });
        console.log(`[fetch service error]`, { error });
        return bathBomb({ message: error.message, type: "error", time_ms: 3000 });
    }
};

export const GET = (api_path: string) => Fetcher(api_path);
export const POST = (api_path: string, data: {}) => Fetcher(api_path, "POST", data);
export const PUT = (api_path: string, data: {}) => Fetcher(api_path, "PUT", data);
export const DELETE = (api_path: string) => Fetcher(api_path, "DELETE");
