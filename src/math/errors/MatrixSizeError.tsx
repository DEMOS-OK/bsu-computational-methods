class MatrixSizeError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "MatrixSizeError";
    }
}

export default MatrixSizeError;
