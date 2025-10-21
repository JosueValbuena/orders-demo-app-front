import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationInterface {
    currentPage: number,
    totalPages: number,
    onNext: () => void,
    onPrev: () => void
};

const Pagionation = ({
    currentPage,
    totalPages,
    onNext,
    onPrev,
}: PaginationInterface) => {
    return (
        <div className='flex items-center gap-4 justify-center my-4'>
            <ChevronLeft
                onClick={onPrev}
                className={currentPage <= 1 ? 'opacity-5' : 'cursor-pointer'}
            />
            Page {currentPage} of {totalPages}
            <ChevronRight
                onClick={onNext}
                className={currentPage >= totalPages ? 'opacity-5' : 'cursor-pointer '}
            />
        </div>
    );
};

export default Pagionation;