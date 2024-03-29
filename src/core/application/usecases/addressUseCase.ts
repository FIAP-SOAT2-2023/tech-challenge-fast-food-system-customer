import { IAddressUseCase } from "../../domain/usecases/IAddressUseCase";
import { IAddressRepository } from "../../domain/repositories/addressRepositoriy";
import { Address } from "../../domain/entities/address";

export class AddressUseCase implements IAddressUseCase {
  constructor(private readonly addressRepository: IAddressRepository) {}

  async addAddress(body: Address): Promise<Address> {
    return this.addressRepository.addAddress(body);
  }
}
