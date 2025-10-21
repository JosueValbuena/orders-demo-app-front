import { Loading } from "@/components/molecules";
import { HomeTemplate } from "@/components/templates";
import { useOrdersPagination } from "@/components/customHooks/UseOrdersPagination/UseOrdersPagination";
import AlertBox from "@/components/organism/alertsBox/AlertsBox";


const Home = () => {

    const {
        data,
        loading,
        error,
        currentPage,
        nextPage,
        prevPage,
        totalPages,
        totalResults,
        setStatusFilter
    } = useOrdersPagination();

    return (
        <>

            {loading && (
                <div className="flex justify-center mt-8">
                    <Loading />
                </div>
            )}

            {error && (
                <div className="flex justify-center mt-8">
                    <AlertBox variant="error" description="Someting went wrong. Please, try again later or call support." />
                </div>
            )}

            {data && (
                <HomeTemplate
                    data={data.data}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalResults={totalResults}
                    onNext={nextPage}
                    onPrev={prevPage}
                    onFilterChange={setStatusFilter}
                />
            )}
        </>
    );
};

export default Home;