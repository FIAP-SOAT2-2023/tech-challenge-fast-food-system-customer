import "reflect-metadata";

import "infra/persistence/config/mysqlConfig";
import sequelize from "infra/persistence/database/connection";
import { Route } from "framework/route";

sequelize.sync();
Route.Setup();
