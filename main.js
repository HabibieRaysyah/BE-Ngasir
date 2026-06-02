const express = require("express");
const app = express();
const port = 3002;
const userRoutes = require("./routes/userRoutes");
const storeRoutes = require("./routes/storeRoutes");
const suplierRoutes = require("./routes/suplierRoutes");
const categoireRoutes = require("./routes/categorieRoutes");
const productRoutes = require("./routes/productRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const transactionitemsRoutes = require("./routes/transitemRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const AuthMiddleware = require("./middleware/authMiddleware");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api", userRoutes);
app.use("/api/store", AuthMiddleware, storeRoutes);
app.use("/api/categorie", AuthMiddleware, categoireRoutes);
app.use("/api/suplier", AuthMiddleware, suplierRoutes);
app.use("/api/product", AuthMiddleware, productRoutes);
app.use("/api/transaction", AuthMiddleware, transactionRoutes);
app.use("/api/transitems", AuthMiddleware, transactionitemsRoutes);
app.use("/api/inventory", AuthMiddleware, inventoryRoutes);

app.get("/", (req, res) => {
  res.send("hellow");
});

app.get("/test", (req, res) => {
  res.json({ message: "API jalan" });
});

app.listen(port, () => {
  console.log(`🚀 Server running at ${port} 🚀`);
});
