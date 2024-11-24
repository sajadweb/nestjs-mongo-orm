import { TObjectId } from "../helper";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mongoose = require('mongoose');

declare global {
    interface String {
        getObjectId(): TObjectId;
        toLike(): RegExp;

    }
}
if (typeof String.prototype.getObjectId !== "function") {
    /**
     * Converts the string to a MongoDB ObjectId.
     * @returns A MongoDB ObjectId, or null if the string is not a valid ObjectId.
     */
    String.prototype.getObjectId = function (): TObjectId {
        return new mongoose.Types.ObjectId(this);
    };
}

if (typeof String.prototype.toLike !== "function") {
    /**
     * Converts the string to a case-insensitive regular expression.
     * Useful for performing case-insensitive searches.
     * @returns A RegExp object representing the case-insensitive pattern.
     */
    String.prototype.toLike = function (): RegExp {
        return new RegExp(`${this}`, 'i');
    };
}

export default {};