import express, { Request, Response } from "express";
import { AddressUseCase } from "src/core/application/usecases/addressUseCase";
import { CustomerUseCase } from "src/core/application/usecases/customerUseCase";
import { ValidationUtil } from "../validation/validationRequest";
import { Address } from "src/core/domain/entities/address";
import { CustomerRequest } from "../request/customerRequest";
export class CustomerController {
  constructor(
    private readonly customerUseCase: CustomerUseCase,
    private readonly addressUseCase: AddressUseCase
  ) {}

  async getCustomerByDocument(req: Request, res: Response) {
    const document = req.params.document;
    const customer = await this.customerUseCase.getCustomerByDocument(document);

    if (customer.message) {
      res.status(404).json(customer);
    } else {
      res.status(200).json(customer);
    }
  }

  async getCustomerByEmail(req: Request, res: Response) {
    const mail = req.params.mail;
    const customer = await this.customerUseCase.getCustomerByMail(mail);

    if (customer.message) {
      res.status(404).json(customer);
    } else {
      res.status(200).json(customer);
    }
  }

  async addCustomer(req: Request, res: Response) {
    const customerRequest = await ValidationUtil.validateAndTransform(
      CustomerRequest,
      req.body,
      res
    );

    const result = await this.customerUseCase.addCustomer(customerRequest);

    let address: Address = {
      ...req.body.address,
      customerId: result.uuid,
    };
    await this.addressUseCase.addAddress(address);
    res.status(201).json(result);
  }
}
