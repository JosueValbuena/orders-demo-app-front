import type { OrderInterface } from "@/components/shared/interfaces";
import Cards from "../cards/Cards";

interface HomeTemplateInterface {
    data: OrderInterface[]
}

const OrdersContainer = ({ data }: HomeTemplateInterface) => {
    return (
        <div className="w-full flex justify-center p-2">
            <div className="w-full flex flex-col gap-4 max-w-[40rem]">
                {data.map((order) => (
                    <Cards
                        key={order.id}
                        created_at={order.created_at}
                        customer_name={order.customer_name}
                        id={order.id}
                        item={order.item}
                        quanty={order.quanty}
                        status={order.status}
                    />
                ))}
            </div>
        </div>
    );
};

export default OrdersContainer;