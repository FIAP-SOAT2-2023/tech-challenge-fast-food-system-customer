import express, { Request, Response } from "express";

import { CustomerRequest } from "../request/customerRequest";
import { ValidationUtil } from "../validation/validationRequest";
import { CustomerUseCase } from "../../core/application/usecases/customerUseCase";
import { AddressUseCase } from "../../core/application/usecases/addressUseCase";
import { Address } from "../../core/domain/entities/address";
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

  async getCustomerQuee(res: Response) {
    const result = await this.customerUseCase.getCustomerQuee();

    res.status(200).json(result);
  }
}
