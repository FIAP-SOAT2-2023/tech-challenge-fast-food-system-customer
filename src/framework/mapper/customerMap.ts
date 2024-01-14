import { Customer } from "src/core/domain/entities/customer";
import CustomerModel from "src/infra/persistence/models/customerModel";

export class CustomerMap {
  static Convert(message: string, customer?: CustomerModel): Partial<Customer> {
    let partialCustomer: Partial<Customer> = {};
    if (!customer) {
      partialCustomer = {
        message: "Cliente não encontrado",
      };
    } else {
      partialCustomer = {
        uuid: customer.uuid,
        firstName: customer.firstName,
        lastName: customer.lastName as string,
        cellphone: customer.cellphone,
        document: customer.document,
        email: customer.email,
      };
    }
    return partialCustomer;
  }

  static ConvertSimple(customer?: CustomerModel): Partial<Customer> {
    return this.Convert("", customer);
  }
}