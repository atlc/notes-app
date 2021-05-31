import { useState } from 'react';

export const useAuthState = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return { isLoggedIn, setIsLoggedIn };
}