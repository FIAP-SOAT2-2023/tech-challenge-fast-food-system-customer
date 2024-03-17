import { injectable } from "tsyringe";
import CustomerModel from "../models/customerModel";
import { ICustomerRepository } from "../../../core/domain/repositories/customerRepository";
import { Customer } from "../../../core/domain/entities/customer";
import { ValidationDocument } from "../../../core/domain/valueObject/validationDocument";
import { CustomerMap } from "../../../framework/mapper/customerMap";
import * as AWS from "aws-sdk";
import "dotenv/config";
import {
  DeleteMessageCommand,
  ReceiveMessageCommand,
  SQSClient,
} from "@aws-sdk/client-sqs";
import AddressModel from "../models/addressModel";
@injectable()
export class CustomerRepository implements ICustomerRepository {
  async deleteUser(firstName: string, cellphone: string): Promise<boolean> {
    let response: boolean = false;
    return new Promise<boolean>(async (resolve) => {
      const customer = await CustomerModel.findOne({
        where: {
          firstName,
          cellphone,
        },
      });
      if (customer) {
        await customer.destroy({});
        await AddressModel.destroy({
          where: { customerId: customer.uuid },
        });
        response = true;
      }
      resolve(response);
    });
  }
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

      const processMessage = async (message: AWS.SQS.Message) => {
        try {
          const body = JSON.parse(message.Body!);
          console.log("Mensagem recebida:", body);
        } catch (Error) {
          console.error("Erro ao processar mensagem:", Error);
        } finally {
          // Upon successful processing, delete the message from the queue
          await sqsClient.send(
            new DeleteMessageCommand({
              QueueUrl: process.env.AWS_CUSTOMER_QUEE01,
              ReceiptHandle: message.ReceiptHandle,
            })
          );

          console.debug("Message deleted successfully");
        }
      };

      const receiveMessages = async (sqsClient) => {
        try {
          const params = {
            QueueUrl: process.env.AWS_CUSTOMER_QUEE01,
            MaxNumberOfMessages: 10,
            VisibilityTimeout: 30,
            WaitTimeSeconds: 20,
          };

          const receiveMessageCommand = new ReceiveMessageCommand(params);
          const readMessage = await sqsClient.send(receiveMessageCommand);

          if (readMessage.Messages && readMessage.Messages.length > 0) {
            readMessage.Messages.forEach(processMessage);
          }
        } catch (error) {
          console.error("Erro ao receber mensagens:", error);
        } finally {
          // Chamar a função novamente para continuar escutando a fila
          receiveMessages(sqsClient);
        }
      };

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
