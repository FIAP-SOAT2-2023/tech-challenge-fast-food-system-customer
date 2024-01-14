import { Address } from "src/core/domain/entities/address";
import { IAddressRepository } from "src/core/domain/repositories/addressRepositoriy";
import { injectable } from "tsyringe";
import AddressModel from "../models/addressModel";

@injectable()
export class AddressRepository implements IAddressRepository {
  async addAddress(body: Address): Promise<Address> {
    const result = await AddressModel.create({
      ...body,
    });

    return body;
  }
}
