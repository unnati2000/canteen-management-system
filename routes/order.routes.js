const express = require("express");
const Order = require("../models/order.models");
const User = require("../models/auth.models");
const router = express.Router();
const auth = require("../middleware/auth");

// get admin orders : GET (private)
router.get("/orders", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.isAdmin) {
      const orders = await Order.find({ paymentStatus: false })
        .populate("user", "name branch role")
        .sort("-date");
      res.json({ data: orders });
    } else {
      return res.status(401).json({ msg: "You can't access this route" });
    }
  } catch (err) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// get user(my) orders : GET (private)
router.get("/myorders", auth, async (req, res) => {
  try {
    const result = await Order.find({ user: req.user.id }).sort("-date");
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// post orders : POST (private)
router.post("/place/order", auth, async (req, res) => {
  try {
    const user = req.user.id;

    const order = new Order({
      user,
      orders: req.body.cart,
      totalPrice: req.body.totalPrice,
      roomNo: req.body.roomNo,
      message: req.body.message ? req.body.message : "",
      paymentType: "",
    });

    await order.save();

    res.json(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Update order status : PUT (private)
router.put("/orders/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user.isAdmin) {
      const order = await Order.findOneAndUpdate(
        { _id: req.params.id },
        { isConfirmed: req.body.isConfirmed },
        { new: true }
      );
      res.json({ data: order });
    } else {
      return res.status(401).json({ msg: "You can't access this route" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// set payment type :  PUT (private)

router.put("/order/payment-type/:id", auth, async (req, res) => {
  try {
    const { paymentType } = req.body;

    const order = await Order.findOneAndUpdate(
      { _id: req.params.id },
      { paymentType },
      { new: true }
    );

    res.json({ data: order });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Payment : PUT (private)
router.put("/payment-status/:id", auth, async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id },
      { paymentStatus: true },
      { new: true }
    );

    res.json({ data: order });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
