import { CustomerUseCase } from "core/application/usecases/customerUseCase";
import { Customer } from "core/domain/entities/customer";
import { ICustomerRepository } from "core/domain/repositories/customerRepository";
import { mock } from "jest-mock-extended";

jest.mock("infra/persistence/repositories/customerRepository", () => ({
  addCustomer: jest.fn(),
}));
describe("Customer Service", () => {
  const mockedcustomerRepository = mock<ICustomerRepository>();

  const customerUseCase = new CustomerUseCase(mockedcustomerRepository);
  let mockCustomer: Customer;
  beforeEach(() => {
    mockCustomer = {
      firstName: "Elir",
      lastName: "Ribeiro",
      document: "665656565",
      email: "elirweb",
      cellphone: "7676767",
    };
  });

  it("should create new customer", async () => {
    const addCustomerSpyOn = jest.spyOn(customerUseCase, "addCustomer");
    (addCustomerSpyOn as jest.Mock).mockResolvedValue(mockCustomer);

    const result = await customerUseCase.addCustomer({
      firstName: "Elir",
      lastName: "Ribeiro",
      document: "665656565",
      email: "elirweb",
      cellphone: "7676767",
    });

    expect(addCustomerSpyOn).toHaveBeenCalledWith(mockCustomer);
    addCustomerSpyOn.mockRestore();
    expect(result).toEqual(mockCustomer);
  });
});
