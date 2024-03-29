import { ICustomerUseCase } from "../../domain/usecases/ICustomerUseCase";
import { ICustomerRepository } from "../../domain/repositories/customerRepository";
import { Customer } from "../../domain/entities/customer";

export class CustomerUseCase implements ICustomerUseCase {
  constructor(private readonly customerRepository: ICustomerRepository) {}
  deleteUser(firstName: string, cellphone: string): Promise<boolean> {
    return this.customerRepository.deleteUser(firstName, cellphone);
  }

  async getCustomerByDocument(document: string): Promise<Customer> {
    return this.customerRepository.getCustomerByDocument(document);
  }

  async getCustomerByMail(mail: string): Promise<Customer> {
    return this.customerRepository.getCustomerByEmail(mail);
  }

  async addCustomer(body: Customer): Promise<Customer> {
    return this.customerRepository.addCustomer(body);
  }

  async getCustomerQuee(): Promise<string> {
    return this.customerRepository.getCustomerQuee();
  }
}
