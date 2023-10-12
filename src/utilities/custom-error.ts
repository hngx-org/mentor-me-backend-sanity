class CustomError extends Error {
    status: number;
    data: any;

    /**
     * Create custom error
     *
     * @param {*} message Error message for request response
     * @param {number} statusCode HTTP status code. Default is 400
     * @param {*} data Data the error returns
     */
    constructor(message: string, statusCode?: number, data?: any) {
        super(message);

        this.name = this.constructor.name;
        this.status = statusCode || 400;
        this.data = data || {};
    }
}

export default CustomError;
