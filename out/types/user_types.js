"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUserRequestCorrect = void 0;
const isUserRequestCorrect = (userRequestBody) => {
    const { firstName, lastName, email, phoneNumber, password } = userRequestBody;
    if (firstName && lastName && email && phoneNumber && password) {
        // more correction checking etc.
        return true;
    }
    return false;
};
exports.isUserRequestCorrect = isUserRequestCorrect;
//# sourceMappingURL=user_types.js.map