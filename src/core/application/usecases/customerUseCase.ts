import { Customer } from "src/core/domain/entities/customer";
import { ICustomerRepository } from "src/core/domain/repositories/customerRepository";
import { ICustomerUseCase } from "src/core/domain/usecases/ICustomerUseCase";

export class CustomerUseCase implements ICustomerUseCase {
  constructor(private readonly customerRepository: ICustomerRepository) {}

  getCustomerByDocument(document: string): Promise<Customer> {
    return this.customerRepository.getCustomerByDocument(document);
  }

  getCustomerByMail(mail: string): Promise<Customer> {
    return this.customerRepository.getCustomerByEmail(mail);
  }

  async addCustomer(body: Customer): Promise<Customer> {
    return this.customerRepository.addCustomer(body);
  }
}
