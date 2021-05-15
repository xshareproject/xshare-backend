"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonRoutesConfig = void 0;
class CommonRoutesConfig {
    constructor(app, name) {
        this.app = app;
        this.name = name;
    }
    getName() {
        return this.name;
    }
    log(toLog) {
        console.log(toLog);
    }
}
exports.CommonRoutesConfig = CommonRoutesConfig;
//# sourceMappingURL=common.routes.config.js.map