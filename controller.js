const CustomerModel = require("./model");

// find existing customers
const findCustomerById = async (customerId, res) => {
  try {
    const existingCustomer = await CustomerModel.findOne({ customerId: customerId});
    return existingCustomer;
  } catch (error) {
    res.status(422).json({
      error,
      desc: "Error occurred when finding existing customers",
    });
  }
};

// add new Customer
exports.addCustomer = async (req, res) => {
  const {
    name,
    address,
    email,
    contactNo,
    customerId,
    purchaseDate
  } = req.body;

  try {
    const customerExist = await findCustomerById(customerId, res);
    if (customerExist) {
      res.status(400).json({
        desc: "Cannot add customer - Customer Already Exists!",
      });
    } else {
      const newCustomer = await CustomerModel.create({
        name,
        address,
        email,
        contactNo,
        customerId,
        purchaseDate
      });
      res.status(201).json({
        newCustomer,
        desc: "Added Customer Successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred when Adding New Customer",
    });
  }
};

// get all Customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await CustomerModel.find();
    res.status(200).send({
      customers,
    });
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred when retrieving all customers",
    });
  }
};

// retrieve customer by customer id
exports.getCustomerById = async (req, res) => {
  const customerId = req.params.customerId;
  try {
    const customer = await CustomerModel.findOne({ customerId});
    res.status(200).send({
      customer,
    });
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred when retrieving customer by Id",
    });
  }
};

// update customer
exports.updateCustomer = async (req, res) => {
  let {
    name,
    address,
    email,
    contactNo,
    customerId,
    purchaseDate
  } = req.body;
  if (!name) {
    name = undefined;
  }
  if (!address) {
    address = undefined;
  }
  if (!email) {
    email = undefined;
  }
  if (!contactNo) {
    contactNo = undefined;
  }
  if (!purchaseDate) {
    purchaseDate = undefined;
  }
  try {
    const updatedCustomer = await CustomerModel.findOneAndUpdate(
      { customerId },
      {
        $set: {
          name,
          address,
          email,
          contactNo,
          customerId,
          purchaseDate
        },
      },
      {
        new: true,
        upsert: false,
        omitUndefined: true,
      }
    );
    res.status(200).send({
      desc: "Customer updated successfully",
      updatedCustomer,
    });
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred when updating customer details",
    });
  }
};

// delete Customer
exports.deleteCustomer = async (req, res) => {
  const customerId = req.params.customerId;
  try {
    await CustomerModel.deleteOne({ customerId });
    res.status(202).json({ desc: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred when deleting customer",
    });
  }
};

