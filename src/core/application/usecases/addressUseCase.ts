import { Address } from "src/core/domain/entities/address";
import { IAddressRepository } from "src/core/domain/repositories/addressRepositoriy";
import { IAddressUseCase } from "src/core/domain/usecases/IAddressUseCase";

export class AddressUseCase implements IAddressUseCase {
  constructor(private readonly addressRepository: IAddressRepository) {}

  addAddress(body: Address): Promise<Address> {
    return this.addressRepository.addAddress(body);
  }
}
