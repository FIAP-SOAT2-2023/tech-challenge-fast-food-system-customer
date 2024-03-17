import { Customer } from "../entities/customer";

export interface ICustomerUseCase {
  addCustomer(body: Customer): Promise<Customer>;
  getCustomerByDocument(document: string): Promise<Customer>;
  getCustomerByMail(mail: string): Promise<Customer>;
  getCustomerQuee(): Promise<string>;
  deleteUser(firstName: string, cellphone: string): Promise<boolean>;
}
