import { mock } from "jest-mock-extended";
import { CustomerUseCase } from "src/core/application/usecases/customerUseCase";
import { ICustomerRepository } from "src/core/domain/repositories/customerRepository";

jest.mock("infra/persistence/repositories/customerRepository", () => ({
  addCustomer: jest.fn(),
}));

describe("Customer", () => {
  const mockedcustomerRepository = mock<ICustomerRepository>();
  const customerUseCase = new CustomerUseCase(mockedcustomerRepository);

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("document can content 11 characters", () => {
    it("document should 11 characters", async () => {
      const msgValidation: string = "document should 11 characters";
      const addCustomerSpyOn = jest.spyOn(customerUseCase, "addCustomer");
      (addCustomerSpyOn as jest.Mock).mockResolvedValue(msgValidation);

      const result = await customerUseCase.addCustomer({
        firstName: "Fernando",
        lastName: "Bruno",
        document: "123232323",
        email: "fernando.bruno@fiap.com.br",
        cellphone: "11960809533",
      });

      console.log(result);
      expect(addCustomerSpyOn).toHaveBeenCalledWith({
        firstName: "Fernando",
        lastName: "Bruno",
        document: "123232323",
        email: "fernando.bruno@fiap.com.br",
        cellphone: "11960809533",
      });
      expect(customerUseCase.addCustomer).toHaveBeenCalledWith({
        firstName: "Fernando",
        lastName: "Bruno",
        document: "123232323",
        email: "fernando.bruno@fiap.com.br",
        cellphone: "11960809533",
      });
      expect(result).toEqual(msgValidation);
    });
  });

  describe("Document invalid", () => {
    it("Documento inválido!", async () => {
      const msgValidation: string = "Documento inválido!";
      const addCustomerSpyOn = jest.spyOn(customerUseCase, "addCustomer");
      (addCustomerSpyOn as jest.Mock).mockResolvedValue(msgValidation);

      const result = await customerUseCase.addCustomer({
        firstName: "Fernando",
        lastName: "Bruno",
        document: "11111111111",
        email: "fernando.bruno@fiap.com.br",
        cellphone: "11960809533",
      });

      console.log(result);
      expect(addCustomerSpyOn).toHaveBeenCalledWith({
        firstName: "Fernando",
        lastName: "Bruno",
        document: "11111111111",
        email: "fernando.bruno@fiap.com.br",
        cellphone: "11960809533",
      });
      expect(customerUseCase.addCustomer).toHaveBeenCalledWith({
        firstName: "Fernando",
        lastName: "Bruno",
        document: "11111111111",
        email: "fernando.bruno@fiap.com.br",
        cellphone: "11960809533",
      });
      expect(result).toEqual(msgValidation);
    });
  });
});
