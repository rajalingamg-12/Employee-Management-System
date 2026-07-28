import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load user from Local Storage
    useEffect(() => {

        const storedUser = localStorage.getItem("user");

        if (storedUser) {

            try {

                setUser(JSON.parse(storedUser));

            } catch (error) {

                console.error("Invalid user data", error);

                localStorage.removeItem("user");

            }

        }

        setLoading(false);

    }, []);

    // Login
    const login = (userData) => {

        setUser(userData);

        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );

    };

    // Logout
    const logout = () => {

        setUser(null);

        localStorage.removeItem("user");

    };

    return (

        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                loading
            }}
        >

            {children}

        </AuthContext.Provider>

    );

};

export const useAuth = () => {

    return useContext(AuthContext);

};