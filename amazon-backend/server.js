// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const Products = require("./Products");
// const Users = require("./Users");
// const Orders = require("./Orders");
// const stripe = require("stripe")(
//   "sk_test_51NpHLcSFjV9tm2LtdmAGVxrGs21jDX6sZc8zwgjC8Q39jnRHEIymDwoIq5nSzB5xSslDDpFxj90JvivpVDyeRLWI001NaQ6PZI"
// );

// //ip=146.196.34.161/32

// const app = express();
// const port = 8000;

// // Middlewares
// app.use(express.json());
// app.use(cors());

// // connection url

// const connection_url =
//   "mongodb+srv://gauravrai2783:admin@cluster0.sfedcof.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp";

// mongoose.connect(connection_url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// // API

// app.get("/", (req, res) => res.status(200).send("Home Page"));

// // add product

// // add product
// app.post("/products/add", async (req, res) => {
//   const productDetail = req.body;

//   console.log("Product Detail >>>>", productDetail);

//   try {
//     const data = await Products.create(productDetail);
//     res.status(201).send(data);
//   } catch (err) {
//     res.status(500).send(err.message);
//     console.error(err);
//   }
// });


// //fetch
// app.get("/products/get", async (req, res) => {
//   try {
//     const data = await Products.find();
//     res.status(200).send(data);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send(err.message);
//   }
// });

// // API for SIGNUP

// app.post("/auth/signup", async (req, res) => {
//   try {
//     const { email, password, fullName } = req.body;

//     const encrypt_password = await bcrypt.hash(password, 10);

//     const userDetail = {
//       email,
//       password: encrypt_password,
//       fullName,
//     };

//     const userExist = await Users.findOne({ email });

//     if (userExist) {
//       res.status(409).json({ message: "Email is already in use" });
//     } else {
//       const newUser = await Users.create(userDetail);
//       res.status(201).json({ message: "User Created Successfully", user: newUser });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // API for LOGIN

// app.post("/auth/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const userDetail = await Users.findOne({ email });

//     if (userDetail) {
//       const passwordMatch = await bcrypt.compare(password, userDetail.password);
//       if (passwordMatch) {
//         res.status(200).json({ message: "Login Successful", user: userDetail });
//       } else {
//         res.status(401).json({ error: "Invalid Password" });
//       }
//     } else {
//       res.status(404).json({ error: "User not found" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });


// // API for PAYMENT

// app.post("/payment/create", async (req, res) => {
//   const total = req.body.amount;
//   console.log("Payment Request received for this rupees", total);

//   try {
//     const payment = await stripe.paymentIntents.create({
//       amount: total*100,
//       currency: "inr",
//     });

//     console.log("Client Secret:", payment.client_secret);

//     res.status(201).send({
//       clientSecret: payment.client_secret,
//     });
//   } catch (error) {
//     console.error("Error creating payment intent:", error);
//     res.status(500).send({ error: "Payment intent creation failed" });
//   }
// });

// // API TO add ORDER DETAILS

// // app.post("/orders/add", async (req, res) => {
// //   try {
// //     const { basket, price, email, address } = req.body;

// //     const orderDetail = {
// //       products: basket,
// //       price: price,
// //       address: address,
// //       email: email,
// //     };

// //     const order = await Orders.create(orderDetail);
// //     console.log("Order added to database >> ", order);
// //     res.status(201).json(order);
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ error: "Error adding order to the database" });
// //   }
// // });


// app.post("/orders/get", (req, res) => {
//   const email = req.body.email;

//   Orders.find((err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       const userOrders = result.filter((order) => order.email === email);
//       res.send(userOrders);
//     }
//   });
// });
// app.post("/orders/get", async (req, res) => {
//   try {
//     const email = req.body.email;
//     const userOrders = await Orders.find({ email: email }).exec();
//     console.log("Orders data sent:", userOrders); // Log the data being sent
//     res.status(200).json(userOrders);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "An error occurred while fetching orders" });
//   }
// });


// app.listen(port, () => console.log("listening on the port", port));

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Products = require("./Products");
const Users = require("./Users");
const Orders = require("./Orders");
const stripe = require("stripe")(
  "sk_test_51NpHLcSFjV9tm2LtdmAGVxrGs21jDX6sZc8zwgjC8Q39jnRHEIymDwoIq5nSzB5xSslDDpFxj90JvivpVDyeRLWI001NaQ6PZI"
);

const app = express();
const port = process.env.PORT || 8000;

// Middlewares
app.use(express.json());
app.use(cors());

// connection url

const connection_url =
  "mongodb+srv://Pdpatel267:admin@cluster0.wiq7i.mongodb.net/Cluster0?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// API

app.get("/", (req, res) => res.status(200).send("Home Page"));

// add product

app.post("/products/add", (req, res) => {
  const productDetail = req.body;

  console.log("Product Detail >>>>", productDetail);

  Products.create(productDetail, (err, data) => {
    if (err) {
      res.status(500).send(err.message);
      console.log(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/products/get", (req, res) => {
  Products.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// API for SIGNUP

app.post("/auth/signup", async (req, res) => {
  const { email, password, fullName } = req.body;

  const encrypt_password = await bcrypt.hash(password, 10);

  const userDetail = {
    email: email,
    password: encrypt_password,
    fullName: fullName,
  };

  const user_exist = await Users.findOne({ email: email });

  if (user_exist) {
    res.send({ message: "The Email is already in use !" });
  } else {
    Users.create(userDetail, (err, result) => {
      if (err) {
        res.status(500).send({ message: err.message });
      } else {
        res.send({ message: "User Created Succesfully" });
      }
    });
  }
});

// API for LOGIN

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const userDetail = await Users.findOne({ email: email });

  if (userDetail) {
    if (await bcrypt.compare(password, userDetail.password)) {
      res.send(userDetail);
    } else {
      res.send({ error: "invaild Password" });
    }
  } else {
    res.send({ error: "user is not exist" });
  }
});

// API for PAYMENT

app.post("/payment/create", async (req, res) => {
  const total = req.body.amount;
  console.log("Payment Request recieved for this ruppess", total);

  const payment = await stripe.paymentIntents.create({
    amount: total * 100,
    currency: "inr",
  });

  res.status(201).send({
    clientSecret: payment.client_secret,
  });
});

// API TO add ORDER DETAILS

app.post("/orders/add", (req, res) => {
  const products = req.body.basket;
  const price = req.body.price;
  const email = req.body.email;
  const address = req.body.address;

  const orderDetail = {
    products: products,
    price: price,
    address: address,
    email: email,
  };

  Orders.create(orderDetail, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("order added to database >> ", result);
    }
  });
});

app.post("/orders/get", (req, res) => {
  const email = req.body.email;

  Orders.find((err, result) => {
    if (err) {
      console.log(err);
    } else {
      const userOrders = result.filter((order) => order.email === email);
      res.send(userOrders);
    }
  });
});

app.listen(port, () => console.log("listening on the port", port));