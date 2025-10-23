import { useNavigate, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import AlertBox from "@/components/organism/alertsBox/AlertsBox";
import { createOrder, editOrderByID, getOrderByID } from "@/components/services";
import { useEffect, useState } from "react";
import type { OrderInterface } from "@/components/shared/interfaces";
import { Spinner } from "@/components/ui/spinner";

const safeTextRegex = /^[a-zA-Z0-9\s.,'-]*$/;
const safeNameRegex = /^[a-zA-Z\s]*$/;

const orderFormSchema = z.object({
    customerName: z
        .string()
        .min(6, "Customer name required min 6 characters")
        .max(100)
        .regex(safeNameRegex, "Customer Name must only contain letters and spaces."),
    item: z
        .string()
        .min(6, "Item required min 6 characters")
        .max(200)
        .regex(safeTextRegex, "Item description contains invalid characters."),
    quantity: z
        .coerce.number()
        .min(1, "Number is required"),
    status: z.enum(["pending", "completed", "cancelled"] as const, {
        error: "Status is required",
    }),
});

type OrderFormValues = z.infer<typeof orderFormSchema>;

interface QueryDataInterface {
    data: OrderInterface | null,
    error: string | null,
    loading: boolean,
    status: 'fail' | 'success' | null
};



const OrderCreate = () => {

    const [queryData, setQueryData] = useState<QueryDataInterface>({
        data: null,
        error: null,
        loading: false,
        status: null
    });

    const [orderData, setOrderData] = useState<QueryDataInterface>({
        data: null,
        error: null,
        loading: false,
        status: null
    });

    const navigate = useNavigate();
    const { id } = useParams();

    const form = useForm<OrderFormValues>({
        resolver: zodResolver(orderFormSchema) as any,
        defaultValues: {
            customerName: /* defaultValues?.customerName || */ "",
            item: /* defaultValues?.item || */ "",
            quantity: 1,
            status: /* defaultValues?.status || */ "pending",
        },
    });

    const onSubmit = async (values: OrderFormValues) => {

        setQueryData({
            data: null,
            error: null,
            loading: true,
            status: null
        })

        if (orderData.data) {
            const newEditedData = {
                ...orderData.data,
                customer_name: values.customerName,
                item: values.item,
                quantity: values.quantity,
                status: values.status
            };

            try {
                const [error, data] = await editOrderByID(orderData.data.id, newEditedData);
                setQueryData({
                    data: data?.data ?? null,
                    error: error,
                    loading: false,
                    status: data?.status ?? null
                });
            } catch (error) {
                console.error(error);
                setQueryData({
                    data: null,
                    error: null,
                    loading: false,
                    status: 'fail'
                });
            };
            return
        };

        const newData = {
            customer_name: values.customerName,
            item: values.item,
            quantity: values.quantity,
            status: 'pending'
        };

        try {
            const [error, data] = await createOrder(newData);
            setQueryData({
                data: data?.data ?? null,
                error: error,
                loading: false,
                status: data?.status ?? null
            });
        } catch (error) {
            console.error(error);
            setQueryData({
                data: null,
                error: null,
                loading: false,
                status: 'fail'
            });
        };
    };

    useEffect(() => {

        let timer = null;

        if (queryData && (queryData.data || queryData.error) && !queryData.loading) {
            timer = setTimeout(() => {
                setQueryData({
                    data: null,
                    error: null,
                    loading: false,
                    status: null
                });

                if (queryData.error) return;

                if (orderData && orderData.data) {
                    navigate(`/orders/orderdetail/${id}`);
                } else {
                    navigate(`/`);
                }
            }, 3000);
        };

        return () => {
            if (timer) {
                clearTimeout(timer);
            };
        };
    }, [queryData]);

    useEffect(() => {
        if (id) {
            (async () => {
                setOrderData({
                    data: null,
                    error: '',
                    loading: true,
                    status: null
                })
                const [error, order] = await getOrderByID(id);
                setOrderData({
                    data: order ?? null,
                    error: error,
                    loading: false,
                    status: 'success'
                })
            })();
        };
    }, [id]);

    useEffect(() => {

        if (orderData.data) {
            form.setValue('customerName', orderData.data.customer_name);
            form.setValue('item', orderData.data.item);
            form.setValue('quantity', Number(orderData.data.quantity));
            form.setValue('status', orderData.data.status);
        };

    }, [orderData.data])

    return (
        <div className="p-6">
            <div className="max-w-3xl mx-auto">
                <Button
                    variant="ghost"
                    onClick={() => navigate("/")}
                    className="mb-6 bg-gray-800 text-white font-semibold cursor-pointer hover:bg-gray-700 hover:text-white"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver
                </Button>

                <div className="p-8 border border-gray-800 rounded-xl">

                    {
                        orderData && orderData.data
                            ? (
                                <p className="font-bold text-xl">Editing order #{orderData.data.id}</p>
                            )
                            : (
                                <p className="font-bold text-xl">Create new order</p>
                            )
                    }

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
                            <FormField
                                control={form.control}
                                name="customerName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Customer Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="item"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Item</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Iphone 17 Pro Max" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="quantity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Quantity</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="1" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {orderData && orderData.data && (
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Status</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select status" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="pending">Pending</SelectItem>
                                                    <SelectItem value="completed">Completed</SelectItem>
                                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}

                            <Button
                                type="submit"
                                className="w-full bg-gray-700 hover:bg-gray-500"
                                disabled={queryData && queryData.loading}
                            >
                                {queryData && queryData.loading
                                    ? <Spinner />
                                    : 'Save Order'}
                            </Button>
                        </form>
                    </Form>
                </div>

                {queryData && queryData.data && (
                    <AlertBox variant="success" description={
                        orderData && orderData.data
                            ? `Order #${queryData.data.id} edited successfully`
                            : `Order #${queryData.data.id} created successfully`
                    } />
                )}

                {orderData && orderData.error && (
                    <AlertBox variant="error" description={'Something went wrong. Try again later or call support'} />
                )}

                {queryData && queryData.error && (
                    <AlertBox variant="error" description={'Error on creating order. Try again later or call support'} />
                )}

            </div>
        </div>
    );
};

export default OrderCreate;