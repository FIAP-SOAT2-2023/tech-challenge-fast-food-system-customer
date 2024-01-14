import addressModel from "../models/addressModel";
import customerModel from "../models/customerModel";

export default () => {
  customerModel.sync();
  addressModel.sync();
};
