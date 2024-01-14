import express, { Request, Response, NextFunction } from "express";
import { AddressUseCase } from "src/core/application/usecases/addressUseCase";
import { CustomerUseCase } from "src/core/application/usecases/customerUseCase";
import { AddressRepository } from "src/infra/persistence/repositories/addressRepository";
import { CustomerRepository } from "src/infra/persistence/repositories/customerRepository";
import { CustomerController } from "./controllers/customerController";
import swaggerUi from "swagger-ui-express";
import swaggerConfig from "src/infra/docs/swagger";

export interface Error {
  message?: string;
}
export class Route {
  static async asyncWrapper(
    req: Request,
    res: Response,
    next: NextFunction,
    fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
  ): Promise<void> {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.error("Error:", error);
      if (res.headersSent) {
        return;
      }

      const errorValue = error as Error;
      const { message } = errorValue;

      if (message) {
        res.status(400).json({ error: [message] });
      } else {
        res.status(500).json({ error: ["Internal Server Error"] });
      }
    }
  }

  static Setup() {
    const addressRepository = new AddressRepository();
    const addressUseCase = new AddressUseCase(addressRepository);

    const customerRepository = new CustomerRepository();
    const customerUseCase = new CustomerUseCase(customerRepository);
    const customerController = new CustomerController(
      customerUseCase,
      addressUseCase
    );
    const app = express();
    app.use(express.json());

    app.use("/docs", swaggerUi.serve);
    app.get("/docs", swaggerUi.setup(swaggerConfig));

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error("Error:", err);
      if (!res.headersSent) {
        res.status(500).json({ error: "Internal server error" });
      }
    });

    app.post("/customers", async (req, resp, next) => {
      await Route.asyncWrapper(
        req,
        resp,
        next,
        customerController.addCustomer.bind(customerController)
      );
    });
    app.get("/customers/:document", async (req, resp, next) => {
      await Route.asyncWrapper(
        req,
        resp,
        next,
        customerController.getCustomerByDocument.bind(customerController)
      );
    });

    app.get("/customers/mail/:mail", async (req, resp, next) => {
      await Route.asyncWrapper(
        req,
        resp,
        next,
        customerController.getCustomerByEmail.bind(customerController)
      );
    });
    app.listen(3000, () =>
      console.log(
        "Server is listening on port 3000 \n SWAGGER: http://localhost:3000/docs"
      )
    );
  }
}
