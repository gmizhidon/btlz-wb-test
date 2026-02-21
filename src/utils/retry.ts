export async function retry<T>(
    callback: () => Promise<T>,
    retries: number = 3,
    delay: number = 60_000,
    errorMessage?: string
): Promise<T> {
    try {
        return await callback();
    } catch (e) {
        if (retries <= 0 || (e instanceof Error && e.message !== errorMessage)) {
            throw e;
        }
        await new Promise(resolve => setTimeout(resolve, delay));
        return retry(callback, retries - 1, delay);
    }
}
