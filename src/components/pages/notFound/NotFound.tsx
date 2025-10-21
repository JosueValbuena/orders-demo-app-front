import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const NotFound = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleNavigate = (path: string): void => {
        navigate(path);
    };

    useEffect(() => {
        console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    }, [location.pathname]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="mb-4 text-4xl font-bold">404</h1>
                <p className="mb-4 text-xl text-gray-600">Oops! Pagina no encontrada</p>
                <a
                    onClick={() => handleNavigate('/')}
                    className="text-blue-500 underline hover:text-blue-700 cursor-pointer"
                >
                    Volver al inicio
                </a>
            </div>
        </div>
    );
};

export default NotFound;