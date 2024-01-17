import {Customer} from "../../src/core/domain/entities/customer";
import {CustomerUseCase} from "../../src/core/application/usecases/customerUseCase";

const customerRepository = require("infra/repositories/customerRepository");
describe("Customer Service", () => {
  let customers: Customer;
  beforeEach(() => {
    customers = {
      firstName: "Elir",
      lastName: "Ribeiro",
      document: "665656565",
      email: "elirweb",
      cellphone: "7676767",
    };
  });
  let customerUseCase: CustomerUseCase;
  customerUseCase = new CustomerUseCase(customerRepository);
  it("should create new customer", async () => {
    const result = await customerUseCase.addCustomer({
      firstName: "Elir",
      lastName: "Ribeiro",
      document: "665656565",
      email: "elirweb",
      cellphone: "7676767",
    });
    console.log(result);
    //expect(result).toHaveProperty("firstName");
  });
});
