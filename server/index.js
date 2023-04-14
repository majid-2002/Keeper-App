import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

//* CONFIGURATIONS
const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json());

//* MONGOOSE CONFIGURATION

mongoose.set("strictQuery", true);
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

//* Notes Schema
const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Note = mongoose.model("Note", noteSchema);

//*Handle Routes
app.post("/notes", (req, res) => {
  const { title, content } = req.body;
  console.log(`Received note: title: ${title}, content: ${content}`);

  const newNote = new Note({ title, content });

  newNote
    .save()
    .then((note) => {
      res.json({ status: "success" });
    })
    .catch((error) => {
      console.error(error);
      res.json({ status: "failure" });
    });
});

app.get("/notes", (req, res) => {
  Note.find()
    .then((notes) => {
      res.json(notes);
    })
    .catch((error) => {
      console.error(error);
      res.json({ status: "failure" });
    });
});

app.delete("/notes/:id", (req, res) => {
  const id = req.params.id;

  Note.findByIdAndDelete(id)
    .then((notes) => {
      res.json({ status: "success" });
    })
    .catch((err) => {
      res.json({ status: "failure" });
    });
});

app.put("/notes/:id", async (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  const { title, content } = req.body;

  Note.findByIdAndUpdate(id, { title, content })
    .then((notes) => {
      res.json({ status: "success" });
    })
    .catch((err) => {
      res.json({ status: "failure" });
    });
});
