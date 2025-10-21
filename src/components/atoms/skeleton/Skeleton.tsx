interface skeletonInterface {
    w: string,
    h: string
}

const Skeleton = ({ w, h }: skeletonInterface) => {
    return (
        <div className="flex items-center justify-between p-3 border-b border-gray-100 dark:border-gray-700 animate-pulse">
            <div className="flex items-center space-x-3">
                <div className={`h-${h} w-${w} bg-gray-200 dark:bg-gray-700 rounded hidden sm:block`}></div>
            </div>
        </div>
    );
};

export default Skeleton;