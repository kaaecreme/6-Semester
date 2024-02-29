const amqp = require("amqplib/callback_api");
const mongoose = require("mongoose");

// Mongo
mongoose.connect("mongodb://root:example@localhost:27020/rabbitmq", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// Save data to MongoDB
const ExampleModel = mongoose.model("t", { name: String });

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// RabbitMQ
amqp.connect("amqp://localhost", function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }

    var queue = "rabbitMQTesssst";

    channel.assertQueue(queue, {
      durable: false,
    });

    console.log(
      " [*] Waiting for messages in %s (I am consumer). To exit press CTRL+C",
      queue
    );

    channel.consume(
      queue,
      async (msg) => {
        const data = JSON.parse(msg.content.toString());
        await new ExampleModel({ name: data.name }).save();
        console.log(" [x] Received %s", data.name);
      },
      { noAck: true }
    );
  });
});
