export const formatDate = (isoDateString: string): string => {
    const date = new Date(isoDateString);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    const formattedDay = String(day).padStart(2, '0');
    const formattedMonth = String(month).padStart(2, '0');
    const formattedYear = String(year).slice(-2);
    return `${formattedDay}-${formattedMonth}-${formattedYear}`;
};

export const ordersStatus = {
    pending: {
        label: 'pending',
        classname: 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 px-4 py-2 rounded-xl font-semibold'
    },
    completed: {
        label: 'completed',
        classname: 'bg-green-500/10 text-green-500 hover:bg-green-500/20 px-4 py-2 rounded-xl font-semibold'
    },
    cancelled: {
        label: 'cancelled',
        classname: 'bg-red-500/10 text-red-500 hover:bg-red-500/20 px-4 py-2 rounded-xl font-semibold'
    },
}