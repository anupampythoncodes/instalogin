import express from "express";
const app = express();
import mongoose from "mongoose";
import cors from "cors";

const port = 3000;

app.use(cors());
app.use(express.json());

const mongourl =
  "mongodb+srv://anupamsingh1414:rishisingh@instadata.wxmcy.mongodb.net/";

mongoose
  .connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);

app.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`server started at ${port}`);
});
