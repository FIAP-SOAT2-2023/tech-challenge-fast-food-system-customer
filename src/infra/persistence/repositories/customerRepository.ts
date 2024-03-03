import { injectable } from "tsyringe";
import CustomerModel from "../models/customerModel";
import { ICustomerRepository } from "../../../core/domain/repositories/customerRepository";
import { Customer } from "../../../core/domain/entities/customer";
import { ValidationDocument } from "../../../core/domain/valueObject/validationDocument";
import { CustomerMap } from "../../../framework/mapper/customerMap";

import "dotenv/config";
import { ReceiveMessageCommand, SQSClient } from "@aws-sdk/client-sqs";
@injectable()
export class CustomerRepository implements ICustomerRepository {
  getCustomerQuee(): Promise<string> {
    return new Promise<string>(async (resolve) => {
      let response: string = "";
      const sqsClient = new SQSClient({
        region: process.env.AWS_REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESSKEY,
          secretAccessKey: process.env.AWS_SECRETKEY,
        },
      });

      const params = {
        QueueUrl: process.env.AWS_CUSTOMER_QUEE01,
        MaxNumberOfMessages: 10,
        VisibilityTimeout: 30,
        WaitTimeSeconds: 20,
      };

      try {
        const receiveMessageCommand = new ReceiveMessageCommand(params);
        const readMessage = await sqsClient.send(receiveMessageCommand);

        if (readMessage.Messages && readMessage.Messages.length > 0) {
          for (const message of readMessage.Messages) {
            console.log("Corpo da Mensagem:", message.Body);
            if (message.Body !== undefined) {
              response += message.Body;
            }
          }
        }
      } catch (error) {
        console.error("Erro ao receber mensagens da fila:", error);
      }

      resolve(response);
    });
  }
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
