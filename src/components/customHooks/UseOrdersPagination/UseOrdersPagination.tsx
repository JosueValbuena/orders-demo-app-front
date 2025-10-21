
import { getOrders } from "@/components/services";
import type { Orders } from "@/components/shared/interfaces";
import { useEffect, useState } from "react";

interface queryData {
    data: Omit<Orders, "message"> | null,
    error: string | null,
    loading: boolean
};

export const useOrdersPagination = () => {
    const [queryData, setQueryData] = useState<queryData>({
        data: null,
        error: null,
        loading: false
    });
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [statusFilter, setStatusFilter] = useState<string | undefined>();

    const fetchOrders = async (page: number = 1, status?: string) => {
        setQueryData({ data: null, error: null, loading: true });

        const [error, orders] = await getOrders(page, status ? { status } : undefined);
        
        setQueryData({
            data: orders ?? null,
            error: error,
            loading: false,
        });
    };

    const nextPage = () => {
        if (queryData.data && currentPage < queryData.data.total_pages) {
            setCurrentPage(prev => prev + 1);
        };
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        };
    };

    useEffect(() => {
        fetchOrders(currentPage, statusFilter);
    }, [currentPage]);

    useEffect(() => {
        fetchOrders(currentPage, statusFilter);
        setCurrentPage(1);
    }, [statusFilter])

    return {
        ...queryData,
        currentPage,
        totalPages: queryData.data?.total_pages ?? 1,
        totalResults: queryData.data?.total_results ?? 0,
        nextPage,
        prevPage,
        setStatusFilter,
    };
};