import { Loading } from "@/components/molecules";
import AlertBox from "@/components/organism/alertsBox/AlertsBox";
import { deleteOrderByID, getOrderByID } from "@/components/services";
import type { OrderInterface } from "@/components/shared/interfaces";
import { OrderDetailTemplate } from "@/components/templates";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

interface QueryDataInterface {
    data: OrderInterface | null,
    error: string | null,
    loading: boolean
};

interface DeletedDataInterface {
    status: string | null,
    error: string | null,
    loading: boolean
};

const OrderDetail = () => {

    const [queryData, setQueryData] = useState<QueryDataInterface>({
        data: null,
        error: '',
        loading: false
    });

    const [deletedData, setDeletedData] = useState<DeletedDataInterface>({
        status: null,
        error: null,
        loading: false
    });

    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = async (id: string): Promise<void> => {
        setDeletedData({
            status: null,
            error: null,
            loading: true
        })
        const [error, data] = await deleteOrderByID(id);
        setDeletedData({
            status: data ?? null,
            error: error,
            loading: false
        })
    };

    const handleEdit = (id: string): void => {
        navigate(`/orders/editorder/${id}`);
    };

    useEffect(() => {
        if (id) {
            const fechOrders = async () => {

                setQueryData({
                    data: null,
                    error: '',
                    loading: true
                })

                const [error, order] = await getOrderByID(id);
                setQueryData({
                    data: order ?? null,
                    error: error,
                    loading: false
                })
            };
            fechOrders();
        };
    }, [id]);

    useEffect(() => {

        let timer;

        if (deletedData && deletedData.status === 'success') {
            timer = setTimeout(() => {
                navigate('/')
            }, 2000);
        };

        if (deletedData && deletedData.error) {
            timer = setTimeout(() => {
                setDeletedData({
                    status: null,
                    error: null,
                    loading: false
                })
            }, 2000);
        };

        if (timer) return () => {
            clearTimeout(timer);
        };
    }, [deletedData]);

    return (
        <>

            {(queryData?.loading || deletedData?.loading) && (
                <div className="flex justify-center mt-8">
                    <Loading />
                </div>
            )}

            {deletedData && deletedData.status && (
                <AlertBox variant="success" description="Order Deleted Successfully" />
            )}

            {queryData && queryData.error && (
                <div className="flex flex-col items-center justify-center">
                    <AlertBox variant="error" description="Something went wrong. Please, try again later o call support" />
                    <Button
                        variant="ghost"
                        onClick={() => navigate("/")}
                        className="mb-6 bg-gray-800 text-white font-semibold cursor-pointer hover:bg-gray-700 hover:text-white"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Volver
                    </Button>
                </div>
            )}

            {queryData && queryData.data && deletedData.status !== 'success' && (
                <OrderDetailTemplate
                    data={queryData.data}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                />
            )}

            {deletedData && deletedData.error && (
                <AlertBox variant="error" description="Error deleting the order. Please, try again later o call support" />
            )}
        </>
    );
};

export default OrderDetail;