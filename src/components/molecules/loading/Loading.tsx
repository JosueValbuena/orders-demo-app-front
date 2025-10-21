import { Spinner } from "@/components/ui/spinner";

const Loading = () => {
    return (
        <div className="flex justify-center  max-w-xs flex-col gap-4">
            <div className="flex justify-center gap-8 rounded-lg p-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                <div className="flex items-center justify-center">
                    <Spinner />
                </div>
                <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">Cargando...</p>
                </div>
            </div>
        </div>
    );
};

export default Loading;