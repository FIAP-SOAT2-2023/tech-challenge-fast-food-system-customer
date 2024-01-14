import { Customer } from "src/core/domain/entities/customer";
import { ICustomerRepository } from "src/core/domain/repositories/customerRepository";
import { injectable } from "tsyringe";
import CustomerModel from "../models/customerModel";
import { ValidationDocument } from "src/core/domain/valueObject/validationDocument";
import { CustomerMap } from "src/framework/mapper/customerMap";

@injectable()
export class CustomerRepository implements ICustomerRepository {
  async getCustomerByDocument(document: string): Promise<Customer> {
    let message: string = "";
    let partialCustomer: Partial<Customer> = {};
    const customer = await CustomerModel.findOne({
      where: {
        document: document,
      },
    });
    if (!ValidationDocument.isValidCPF(document)) {
      message = "Documento inválido!";
    }
    if (!customer) {
      partialCustomer = CustomerMap.Convert(message);
    } else {
      partialCustomer = CustomerMap.Convert(message, customer);
    }

    return partialCustomer as Customer;
  }

  async addCustomer(body: Customer): Promise<Customer> {
    if (!ValidationDocument.isValidCPF(body.document)) {
      throw new Error("Documento inválido!");
    }
    let customer = await CustomerModel.create({
      ...body,
    });

    return CustomerMap.ConvertSimple(customer) as Customer;
  }

  async findByUUID(customerId: string): Promise<Customer> {
    return new Promise<Customer>(async (resolve, reject) => {
      const customerModel = await CustomerModel.findOne({
        where: {
          uuid: customerId,
        },
      });

      if (customerModel == null) {
        reject(new Error("Usuario não cadastrado"));

        return;
      }

      const { ...customerValues } = customerModel?.dataValues;

      const customerResult: Customer = {
        ...customerValues,
      };

      resolve(customerResult);
    });
  }

  async getCustomerByEmail(email: string): Promise<Customer> {
    let message: string = "";
    let partialCustomer: Partial<Customer> = {};
    const customer = await CustomerModel.findOne({
      where: {
        email,
      },
    });

    if (!customer) {
      partialCustomer = CustomerMap.Convert(message);
    } else {
      partialCustomer = CustomerMap.Convert(message, customer);
    }

    return partialCustomer as Customer;
  }
}