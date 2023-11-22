class NonSquareMatrixError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NonSquareMatrixError";
    }
}

export default NonSquareMatrixError;
