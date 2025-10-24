export const stringCalculator = (input) => {
    if (!input.trim())
        return 0;
    const parts = input.split(/[\s,]+/);
    const numbers = parts.map((p) => {
        const num = Number(p);
        if (isNaN(num))
            throw new Error(`Invalid number: "${p}"`);
        return num;
    });
    return numbers.reduce((sum, n) => sum + n, 0);
};
