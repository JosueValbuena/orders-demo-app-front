import { Pagionation } from "@/components/molecules";
import { OrdersContainer } from "@/components/organism";

import type { OrderInterface } from "@/components/shared/interfaces";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Select } from "@radix-ui/react-select";

interface HomeTemplateInterface {
    data: OrderInterface[],
    currentPage: number,
    totalPages: number,
    totalResults: number,
    onNext: () => void,
    onPrev: () => void,
    onFilterChange: (status: string) => void,
}

const HomeTemplate = ({
    data,
    currentPage,
    totalPages,
    totalResults,
    onNext,
    onPrev,
    onFilterChange,
}: HomeTemplateInterface) => {

    return (
        <>
            <div className="flex flex-col justify-center gap-4 my-4 px-4 md:flex-row md:items-center md:gap-16">
                <div className="flex items-center gap-4">
                    <p>Filter by:</p>
                    <Select onValueChange={onFilterChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                    <p
                        className="cursor-pointer text-red-600 font-medium hover:underline hover:text-red-400"
                        onClick={() => onFilterChange('')}
                    >
                        Delete filter
                    </p>
                </div>
                <div>
                    <p>Total results: {totalResults}</p>
                </div>
            </div>
            <OrdersContainer data={data} />
            <Pagionation
                currentPage={currentPage}
                totalPages={totalPages}
                onNext={onNext}
                onPrev={onPrev}
            />
        </>
    );
};

export default HomeTemplate;