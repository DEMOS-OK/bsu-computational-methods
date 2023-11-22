class ZeroDeterminantError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ZeroDeterminantError";
    }
}

export default ZeroDeterminantError;
