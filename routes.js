const express = require("express");
const router = express.Router();

const {
    addCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
  } = require("./controller");

// books
router.route("/customer").post(addCustomer);
router.route("/customers").get(getAllCustomers);
router.route("/customer/:customerId").get(getCustomerById);
router.route("/customer").put(updateCustomer);
router.route("/customer/:customerId").delete(deleteCustomer);

module.exports = router;