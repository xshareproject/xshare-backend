"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRoutes = void 0;
const common_routes_config_1 = require("../../common/common.routes.config");
const user_db_1 = require("../../db/user_db");
class UsersRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, "UsersRoutes");
    }
    configureRoutes() {
        this.app.route("/users").post((request, response) => {
            user_db_1.createUser(request.body)
                .then((result) => {
                response.status(200).send(result);
            })
                .catch((error) => {
                response.status(500).send(error.message);
            });
        });
        return this.app;
    }
}
exports.UsersRoutes = UsersRoutes;
//# sourceMappingURL=users.routes.config.js.map