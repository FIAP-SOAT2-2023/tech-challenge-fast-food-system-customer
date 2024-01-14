import { Address } from "core/domain/entities/address";
import { IAddressRepository } from "core/domain/repositories/addressRepositoriy";
import { IAddressUseCase } from "core/domain/usecases/IAddressUseCase";

export class AddressUseCase implements IAddressUseCase {
  constructor(private readonly addressRepository: IAddressRepository) {}

  addAddress(body: Address): Promise<Address> {
    return this.addressRepository.addAddress(body);
  }
}
