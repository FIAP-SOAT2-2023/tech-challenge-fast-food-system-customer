import { injectable } from "tsyringe";
import AddressModel from "../models/addressModel";
import { IAddressRepository } from "core/domain/repositories/addressRepositoriy";
import { Address } from "core/domain/entities/address";

@injectable()
export class AddressRepository implements IAddressRepository {
  async addAddress(body: Address): Promise<Address> {
    const result = await AddressModel.create({
      ...body,
    });

    return body;
  }
}
