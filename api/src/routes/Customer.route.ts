import { Router } from "express";

import { updateCustomerProfile } from "../controllers/customer/updateCustomer";
export const CustomerRouter = Router().put("/:userId", updateCustomerProfile);
