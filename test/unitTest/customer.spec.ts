import { mock } from "jest-mock-extended";
import { AddressUseCase } from "src/core/application/usecases/addressUseCase";
import { CustomerUseCase } from "src/core/application/usecases/customerUseCase";
import { Address } from "src/core/domain/entities/address";
import { Customer } from "src/core/domain/entities/customer";
import { IAddressRepository } from "src/core/domain/repositories/addressRepositoriy";
import { ICustomerRepository } from "src/core/domain/repositories/customerRepository";

jest.mock("infra/persistence/repositories/customerRepository", () => ({
  addCustomer: jest.fn(),
  getCustomerByDocument: jest.fn(),
  getCustomerByMail: jest.fn(),
}));

jest.mock("src/core/domain/repositories/addressRepositoriy", () => ({
  addAddress: jest.fn(),
}));
describe("Customer", () => {
  const mockedcustomerRepository = mock<ICustomerRepository>();
  const mockedaddressRepository = mock<IAddressRepository>();

  const customerUseCase = new CustomerUseCase(mockedcustomerRepository);
  const addressUseCase = new AddressUseCase(mockedaddressRepository);

  let mockCustomer: Customer;
  let mockAddress: Address;
  beforeEach(() => {
    mockCustomer = {
      firstName: "Elir",
      lastName: "Ribeiro",
      document: "665656565",
      email: "elirweb",
      cellphone: "7676767",
    };

    mockAddress = {
      id: "1",
      customerId: "2",
      streetName: "Rua leritiba",
      number: "10",
      neighborhood: "pq paulista",
      complement: "",
      zipCode: "08080160",
      state: "SP",
      city: "São paulo",
      country: "Brasil",
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("addCustomer", () => {
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
      expect(customerUseCase.addCustomer).toHaveBeenCalledWith(mockCustomer);
      expect(result).toEqual(mockCustomer);
    });
  });
  describe("getCustomerByDocument", () => {
    it("should return a customer by document", async () => {
      const document = "665656565";

      const getCustomerByDocumentSpyOn = jest.spyOn(
        customerUseCase,
        "getCustomerByDocument"
      );
      (getCustomerByDocumentSpyOn as jest.Mock).mockResolvedValue(mockCustomer);

      const result = await customerUseCase.getCustomerByDocument(document);

      expect(getCustomerByDocumentSpyOn).toHaveBeenCalledWith(document);
      expect(customerUseCase.getCustomerByDocument).toHaveBeenCalledWith(
        document
      );

      expect(result).toEqual(mockCustomer);
    });
  });

  describe("getCustomerByMail", () => {
    it("should return a customer by mail", async () => {
      const mail = "elirweb";
      const getCustomerByMailSpyOn = jest.spyOn(
        customerUseCase,
        "getCustomerByMail"
      );
      (getCustomerByMailSpyOn as jest.Mock).mockResolvedValue(mockCustomer);

      const result = await customerUseCase.getCustomerByMail(mail);
      expect(getCustomerByMailSpyOn).toHaveBeenCalledWith(mail);
      expect(customerUseCase.getCustomerByMail).toHaveBeenCalledWith(mail);
      expect(result).toEqual(mockCustomer);
    });
  });

  describe("CustomerService", () => {
    it("should initialize customerRepository in the constructor", () => {
      expect(customerUseCase["customerRepository"]).toBe(
        mockedcustomerRepository
      );
    });
  });

  describe("Address", () => {
    it("should create new Address after create customer", async () => {
      const addAddressSpyOn = jest.spyOn(addressUseCase, "addAddress");
      (addAddressSpyOn as jest.Mock).mockResolvedValue(mockAddress);

      const result = await addressUseCase.addAddress({
        id: "1",
        customerId: "2",
        streetName: "Rua leritiba",
        number: "10",
        neighborhood: "pq paulista",
        complement: "",
        zipCode: "08080160",
        state: "SP",
        city: "São paulo",
        country: "Brasil",
      });
      expect(addAddressSpyOn).toHaveBeenCalledWith(mockAddress);
      expect(addressUseCase.addAddress).toHaveBeenCalledWith(mockAddress);
      expect(result).toEqual(mockAddress);
    });
  });
});
