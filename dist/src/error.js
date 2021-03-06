export const jsonifyError = (error) => {
    if (!!error.type) {
        return error.toJson();
    }
    return {
        message: error.message,
        type: error.name,
        context: {},
        stack: error.stack,
    };
};
export class Result {
    constructor(error, value) {
        if (error) {
            this.isError = true;
            this.error = error;
        }
        else {
            this.isError = false;
            this.value = value;
        }
    }
    getValue() {
        if (this.isError) {
            throw new Error(`Can't getValue() of error result: ${this.error}`);
        }
        return this.value;
    }
    getError() {
        if (this.isError) {
            return this.error;
        }
        return undefined;
    }
    toJson() {
        if (!this.isError) {
            return { isError: false, value: this.value };
        }
        return {
            isError: true,
            error: jsonifyError(this.error),
        };
    }
    static fromJson(json) {
        if (!json.isError) {
            return Result.ok(json.value);
        }
        return json.error.type
            ? Result.fail(VectorError.fromJson(json.error))
            : Result.fail(json.error);
    }
    static fail(error) {
        return new Result(error);
    }
    static ok(result) {
        return new Result(undefined, result);
    }
}
export class VectorError extends Error {
    constructor(msg, context = {}, type = "VectorError") {
        super(msg);
        this.msg = msg;
        this.context = context;
        this.type = type;
    }
    toJson() {
        return {
            message: this.msg,
            context: this.context,
            type: this.type,
            stack: this.stack,
        };
    }
    static fromJson(json) {
        var _a, _b, _c;
        return new VectorError(json.message, (_a = json.context) !== null && _a !== void 0 ? _a : {}, (_c = (_b = json.type) !== null && _b !== void 0 ? _b : json.name) !== null && _c !== void 0 ? _c : "VectorError");
    }
}
export class MessagingError extends VectorError {
    constructor(message, context = {}, type = "MessagingError") {
        super(message, context, type);
        this.message = message;
        this.context = context;
        this.type = type;
    }
}
MessagingError.reasons = {
    Timeout: "Request timed out",
    Unknown: "Unknown messaging error",
};
export class ProtocolError extends VectorError {
    constructor(msg, state, update, params, context = {}, type = "ProtocolError") {
        super(msg, Object.assign(Object.assign({}, context), { update, state, params }), type);
        this.msg = msg;
        this.type = type;
    }
}
export class EngineError extends VectorError {
    constructor(msg, channelAddress, publicIdentifier, context = {}, type = "EngineError") {
        super(msg, Object.assign(Object.assign({}, context), { channelAddress, publicIdentifier }), type);
        this.msg = msg;
        this.type = type;
    }
}
export class NodeError extends VectorError {
    constructor(msg, context = {}, type = "NodeError") {
        super(msg, Object.assign({}, context), type);
        this.msg = msg;
        this.type = type;
    }
}
export class RouterError extends VectorError {
    constructor(msg, context = {}, type = "RouterError") {
        super(msg, Object.assign({}, context), type);
        this.msg = msg;
        this.type = type;
    }
}
//# sourceMappingURL=error.js.map