export const parseInteger = (val: string): number => {
    const res = parseInt(val, 10);
    return res ? res : 0;
};

export const formatCurrency = (val: number): string => {
    return val.toLocaleString('en-US', {
        currency: 'USD',
        style: 'currency', 
    });
}