export interface Users {
    id: string;
    username: string;
    email: string;
    password?: string;
    hashed: string;
    roles: string; // JSON stringified array of strings
    avatar?: string;
    visible: number;
    created_at: string;
    updated_at: string;
};

export interface Note {
    id: string;
    user_id: string;
    content: string;
    created_at?: string;
    updated_at?: string;
}