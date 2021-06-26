import { PaymentType } from "../../../models/payment_service/payment.service.model";

export interface CreateRestaurant {
  name: string;
  address: CreateAddress;
  googleMapsAddressLink?: string;
  phoneNumber: string;
  paymentType: PaymentType;
}

interface CreateAddress {
  addressLineOne: string;
  city: string;
  province: string;
  postalCode: string; // FORM: ABC123 (no space between)
}
