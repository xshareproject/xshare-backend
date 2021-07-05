import chai from "chai";
import chaiHttp from "chai-http";
import { PaymentType } from "../../../../models/payment_service/payment.service.model";

import { STATUS_CODES } from "../../../common/constants/response.status";
import { CreateRestaurant, CreateAddress } from "../restaurant.types.config";

chai.use(chaiHttp);

const expect = chai.expect;

const BASE_URL = "http://localhost:4000";

const mockAddress: CreateAddress = {
  addressLineOne: "1234 Mock Rd",
  city: "Mock City",
  postalCode: "123 ABC",
  province: "Mock Province",
};

const mockRestaurant: CreateRestaurant = {
  name: "Mock Restaurant",
  googleMapsAddressLink: "Mock Google Maps Link",
  paymentType: PaymentType.share,
  address: mockAddress,
  phoneNumber: "+1 123 123 1234",
};

describe("Restaurant", async () => {
  it("POST /restaurant", async (done) => {
    chai
      .request(BASE_URL)
      .post("/restaurant")
      .send(mockRestaurant)
      .end((error, response) => {
        expect(response).to.have.status(STATUS_CODES.SUCCESS);
        done();
      });
  });
});
