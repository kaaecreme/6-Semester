const db = require("../models");
const Payment = db.payments;

// Create and Save a new Payment
exports.create = (req, res) => {
  if (!req.body.id && !req.body.order_id && !req.body.amount) {
    res.status(400).send({ message: "order id and amount can not be empty!" });
    return;
  }

  const payment = new Payment({
    id: req.body.id,
    order_id: req.body.order_id,
    amount: req.body.amount
  });

  if (Math.random() * 10 > 7) {
    res.status(500).send({
      message: "Random failure"
    });
    return;
  }

  // Save Payment in the database
  payment
    .save(payment)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Payment."
      });
    });
};

// Retrieve all Payments from the database.
exports.findAll = (req, res) => {
  Payment.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Payments."
      });
    });
};

// Find a single Payment with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Payment.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Payment with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Payments with id=" + id });
    });
};
