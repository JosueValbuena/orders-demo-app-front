export interface Orders {
    code: number;
    status: string;
    message: string;
    page: number;
    page_size: number;
    total_results: number;
    total_pages: number;
    data: OrderInterface[];
}

export interface OrderInterface {
    created_at: string;
    customer_name: string;
    id: string;
    item: string;
    quantity: number;
    status: OrderStatus;
};

export interface NewOrderInterface {
    customer_name: string;
    item: string
    quantity: number
    status: OrderStatus;
};

type OrderStatus = 'pending' | 'completed' | 'cancelled';