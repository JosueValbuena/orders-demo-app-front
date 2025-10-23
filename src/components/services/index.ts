import { OrderDTO } from "../shared/dto/orders.dto";
import type { OrderInterface, Orders } from "../shared/interfaces";

const baseUrl: string = 'http://localhost:3001/api/v1/orders/';

export const getOrders = async (page?: number, filter?: { [key: string]: any }): Promise<[string | null, Omit<Orders, 'message'> | null | undefined]> => {

    let currentPage: number = page || 1;

    const query = new URLSearchParams({ page: String(currentPage), ...filter }).toString();

    const response = await fetch(`${baseUrl}?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
        return ['Error creating order', null]
    };

    const data = await response.json() as Orders;
    const dataToReturn: Omit<Orders, 'message'> = {
        code: data.code,
        status: data.status,
        page: data.page,
        page_size: data.page_size,
        total_results: data.total_results,
        total_pages: data.total_pages,
        data: data.data.map(order => OrderDTO.response(order))
    };
    return [null, dataToReturn]
};

export const getOrderByID = async (id: string): Promise<[string | null, OrderInterface | null | undefined]> => {
    const response = await fetch(`${baseUrl}${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
        return ['Error consultando datos', null]
    };
    const data = await response.json();
    console.log({ data })
    return [null, OrderDTO.response(data.data)]
};

export const createOrder = async (formData: Partial<OrderInterface>): Promise<[string | null, { data: OrderInterface, status: 'success' | 'fail' } | null | undefined]> => {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (!response.ok) {
        return ['Error consultando datos', null]
    };
    const data = await response.json();
    const dataToReturn: { data: OrderInterface, status: 'success' | 'fail' } = {
        data: OrderDTO.response(data.data),
        status: 'success'
    };
    return [null, dataToReturn]
};

export const editOrderByID = async (id: string, formData: Partial<OrderInterface>): Promise<[string | null, { data: OrderInterface, status: 'fail' | 'success' } | null | undefined]> => {
    const response = await fetch(baseUrl + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (!response.ok) {
        return ['Error consultando datos', null]
    };
    const data = await response.json();
    const dataToReturn: { data: OrderInterface, status: 'success' | 'fail' } = {
        data: OrderDTO.response(data.data),
        status: 'success'
    };
    return [null, dataToReturn]
};

export const deleteOrderByID = async (id: string): Promise<[string | null, string | null | undefined]> => {
    const response = await fetch(baseUrl + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (!response.ok) {
        return ['Error consultando datos', null]
    };
    const data = await response.json();
    return [null, data.status]
};