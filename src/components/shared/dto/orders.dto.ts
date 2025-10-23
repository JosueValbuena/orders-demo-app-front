export class OrderDTO {
    private constructor(
        public readonly created_at: string,
        public readonly customer_name: string,
        public readonly id: string,
        public readonly item: string,
        public readonly status: "pending" | "completed" | "cancelled",
        public readonly quantity: number,
    ) { };

    static response(props: { [key: string]: any }): OrderDTO {
        const transformData = {
            created_at: props.created_at || 'No data',
            customer_name: props.customer_name || 'No data',
            id: props._id || 'No data',
            item: props.item || 'No data',
            status: props.status || 'No data',
            quantity: props.quantity || 'No data',
        };
        return transformData;
    };
};