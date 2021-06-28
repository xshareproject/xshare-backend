import _ from "lodash";

import {
  CreateAddress,
  CreateRestaurant,
  GetRestaurant,
} from "./restaurant.types.config";
import RestaurantService from "./restaurant.service";

class RestaurantValidation {
  private readonly CREATE_RESTAURANT_PROPERTIES = [
    "name",
    "address",
    "googleMapsAddressLink",
    "phoneNumber",
    "paymentType",
  ];

  private readonly ADDRESS_PROPERTIES = [
    "addressLineOne",
    "city",
    "province",
    "postalCode",
  ];

  async validateGetRestaurant(body: GetRestaurant): Promise<boolean> {
    const restaurant = await RestaurantService.fetchRestaurant(body.id);

    return !_.isNil(restaurant);
  }

  validateCreateRestaurant(body: CreateRestaurant): boolean {
    return (
      this.validatePropertiesOfObject(
        this.CREATE_RESTAURANT_PROPERTIES,
        body
      ) && this.validateAddress(body.address)
    );
  }

  private validateAddress(address: CreateAddress): boolean {
    return this.validatePropertiesOfObject(this.ADDRESS_PROPERTIES, address);
  }

  private validatePropertiesOfObject(
    properties: string[],
    object: any
  ): boolean {
    let isValid = true;

    properties.forEach((property) => {
      isValid = !_.isNil(property);
    });

    return isValid;
  }
}

export default new RestaurantValidation();
