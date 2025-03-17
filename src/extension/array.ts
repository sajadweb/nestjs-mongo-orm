import { TObjectId } from "../helper/objectId";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mongoose = require('mongoose');

declare global {
    interface Array<T> {
        getObjectIds(): TObjectId[];
    }
}
if (typeof Array.prototype.getObjectIds !== "function") {
    
    Array.prototype.getObjectIds = function (): TObjectId[] {
        const list: TObjectId[] = []
        for (let i = 0; i < this.length; i++) {
            const element = this[i];
            if(typeof element === 'string'){
                list.push(new mongoose.Types.ObjectId(element));
            }
        }
        return list;
    };
}

export default {};