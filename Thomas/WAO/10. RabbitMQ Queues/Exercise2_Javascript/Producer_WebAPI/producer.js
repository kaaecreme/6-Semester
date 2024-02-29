const express = require("express");
const bodyParser = require("body-parser");
const amqp = require("amqplib/callback_api");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// RabbitMQ
const rabbitUrl = "amqp://localhost";
let channel;

amqp.connect(rabbitUrl, (error, connection) => {
  if (error) {
    throw error;
  }
  connection.createChannel((err, ch) => {
    if (err) {
      throw err;
    }
    channel = ch;
  });
});

// Routes
app.post("/sendmesg", (req, res) => {
  const data = req.body;

  var queueName = "rabbitMQTesssst";
  channel.assertQueue(queueName, {
    durable: false,
  });
  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));

  res.status(200).send("Data sent to RabbitMQ");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
