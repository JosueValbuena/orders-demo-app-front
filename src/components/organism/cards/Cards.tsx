import { formatDate, ordersStatus } from "@/components/shared/helpers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router";

interface CardInterface {
    id: string;
    item: string;
    customer_name: string;
    quanty: number;
    status: 'pending' | 'completed' | 'cancelled';
    created_at: string;
}

const Cards = ({
    id,
    item,
    customer_name,
    quanty,
    status,
    created_at
}: CardInterface) => {

    const navigate = useNavigate();

    const handleNavigate = (id: string | number): void => {
        navigate(`orders/orderdetail/${id}`)
    };

    return (
        <Card
            className="bg-gray-800 border-gray-700 hover:bg-gray-700 hover:cursor-pointer transition-colors"
            onClick={() => handleNavigate(id)}
        >
            <CardHeader className="flex flex-col items-start justify-between space-y-0 pb-4 md:flex-row md:items-center">
                <CardTitle className="text-lg font-semibold text-white">
                    Order #{id}
                </CardTitle>
                <p className={ordersStatus[status].classname}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </p>
            </CardHeader>
            <CardContent className="space-y-3">
                <div>
                    <p className="text-sm text-gray-400">Cliente</p>
                    <p className="text-base font-medium text-gray-100">{customer_name}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-400">Item</p>
                    <p className="text-base font-medium text-gray-100">{item}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-400">Cantidad de Items</p>
                    <p className="text-base font-medium text-gray-100">{quanty}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-400">Fecha de Creación</p>
                    <p className="text-base font-medium text-gray-100">{formatDate(created_at)}</p>
                </div>
            </CardContent>
        </Card>
    );
};

export default Cards;