import { Route } from "src/framework/route";
import "reflect-metadata";

import "infra/persistence/config/mysqlConfig";
import sequelize from "src/infra/persistence/database/connection";
sequelize.sync();
Route.Setup();
