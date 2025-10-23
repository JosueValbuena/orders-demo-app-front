import { formatDate, ordersStatus } from "@/components/shared/helpers";
import type { OrderInterface } from "@/components/shared/interfaces";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Pen, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";

interface OrderDetailTemplateInterface {
    data: OrderInterface,
    handleDelete: (id: string) => void,
    handleEdit: (id: string) => void
};

const OrderDetailTemplate = ({ data, handleDelete, handleEdit }: OrderDetailTemplateInterface) => {
    console.log({ data })
    const navigate = useNavigate();

    return (
        <div className="p-6">
            <div className="max-w-3xl mx-auto">
                <Button
                    variant="ghost"
                    onClick={() => navigate("/")}
                    className="mb-6 bg-gray-800 text-white font-semibold cursor-pointer hover:bg-gray-700 hover:text-white"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Go Back
                </Button>

                {data && (
                    <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors p-8">
                        <div className="flex flex-col justify-between items-start mb-8 gap-4 md:flex-row">
                            <h1 className="text-xl font-bold text-white md:text-3xl">
                                Order #{data.id}
                            </h1>
                            <span className={ordersStatus[data.status].classname}>
                                {ordersStatus[data.status].label}
                            </span>
                        </div>

                        <div className="space-y-6 mb-8">
                            <div>
                                <p className="text-sm text-gray-400 mb-2">Cliente</p>
                                <p className="text-xl font-medium text-white">{data.customer_name}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400 mb-2">Item</p>
                                <p className="text-xl font-medium text-white">{data.item}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400 mb-2">Fecha de Creación</p>
                                <p className="text-xl font-medium text-white">{formatDate(data.created_at)}</p>
                            </div>
                        </div>

                        <div className="flex flex-col-reverse justify-between items-center gap-4 md:flex-row">
                            <Button
                                variant="destructive"
                                onClick={() => handleDelete(data.id)}
                                className="w-40 cursor-pointer"
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Eliminar
                            </Button>

                            <Button
                                variant="outline"
                                onClick={() => handleEdit(data.id)}
                                className="w-40 cursor-pointer"
                            >
                                <Pen className="mr-2 h-4 w-4" />
                                Editar
                            </Button>

                            <div className="flex items-center gap-4">
                                <p className="text-sm text-gray-400 mb-2">Quantity</p>
                                <div className="flex items-center justify-center gap-4 w-12 bg-gray-300 p-2 rounded-2xl">
                                    {/* <Button className="bg-gray-800 font-bold cursor-pointer hover:bg-gray-700">-</Button> */}
                                    <p className="font-bold">{data.quantity}</p>
                                    {/* <Button className="bg-gray-800 font-bold cursor-pointer hover:bg-gray-700">+</Button> */}
                                </div>
                            </div>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default OrderDetailTemplate;