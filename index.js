const express = require("express");
const mongoose = require("mongoose");
const crypto = require("crypto");

const app = express();
const multer = require("multer");
const WordExtractor = require("word-extractor");
const fs = require("fs");
const { text } = require("body-parser");
const { log } = require("console");
const jwt = require("jsonwebtoken");
const path = require("path");
const { Extractor } = require("mammoth");
const cors = require("cors");
const textract = require("textract");
const { createWorker } = require("tesseract.js");
const secretKey = "tp tool";

app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/tpdatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});

const User = mongoose.model("User", userSchema);

app.use(express.json());

// app.post("/api/create-user", (req, res) => {
//   const { name, email, password, role } = req.body;
//   if (!name || !email || !password || !role) {
//     return res
//       .status(400)
//       .json({ success: false, error: "All fields are required" });
//   }

//   // Create a new User instance
//   const user = new User({
//     name,
//     email,
//     password,
//     role,
//   });

//   // Save the user to the database
//   user
//     .save()
//     .then(() => {
//       return res
//         .status(200)
//         .json({ success: true, message: "User created successfully" });
//     })
//     .catch((error) => {
//       console.error("Error creating user:", error);
//       return res
//         .status(500)
//         .json({ success: false, error: "Error creating user" });
//     });
// });




// Fetch all users from the database

const bcrypt = require('bcrypt');

app.post("/api/create-user", (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res
      .status(400)
      .json({ success: false, error: "All fields are required" });
  }

  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res
        .status(500)
        .json({ success: false, error: "Error creating user" });
    }

    // Create a new User instance
    const user = new User({
      name,
      email,
      password: hashedPassword, // Store the hashed password
      role,
    });

    // Save the user to the database
    user
      .save()
      .then(() => {
        return res
          .status(200)
          .json({ success: true, message: "User created successfully" });
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        return res
          .status(500)
          .json({ success: false, error: "Error creating user" });
      });
  });
});


app.get("/api/users", (req, res) => {
  User.find()
    .then((users) => {
      return res.status(200).json({ success: true, data: users });
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
      return res
        .status(500)
        .json({ success: false, error: "Error fetching users" });
    });
});

app.put("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  const updatedUserData = req.body;

  User.findByIdAndUpdate(userId, updatedUserData, { new: true })
    .then((updatedUser) => {
      // Send the updated user data in the response
      res.json(updatedUser);
    })
    .catch((error) => {
      // Handle error
      console.error(error);
      res.sendStatus(500);
    });
});

//delete on the user account api
app.delete("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(id);
    console.log(user.name);

    res.status(200).json({ message: "User data deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, error: "Error deleting user" });
  }
});





app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
console.log(email, password);
  try {
    // Find the user in the database by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the stored hashed password
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a token
    const token = jwt.sign({ email }, "secret_key", { expiresIn: "30d" });

    // Return the token and a success message
    return res.status(200).json({ token, message: "Logged in successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});




const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
const colors = [
  "#FF0000",
  "#0000FF",
  "#FF00FF",
  "#808000",
  "#FFA500",
  "#000000",
  "#808080",
  "#3CB371",
  "#57E964",
  "#FDBD01",
  "#D4A017",
  "#513B1C",
  "#EB5406",
  "#F62217",
  "#810541",
  "#F8B88B",
  "#FF00FF",
  "#BA55D3",
  "#800080",
];
const wordMatchColor = {};
let nextMatchColor = 0;

// Read the patterns file
const patterns = JSON.parse(fs.readFileSync("patterns.json", "utf8"));

const highlightAndCountMatches = (text, patterns) => {
  const wordCounts = {};

  if (patterns && Array.isArray(patterns)) {
    patterns.forEach((pattern) => {
      let pattern_ = pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      console.log(pattern_);
      // .replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
      // .replace("(", "\\(")
      // .replace(")", "\\)")
      // .replace("[", "\\[")
      // .replace("]", "\\]");
      const regex = new RegExp(`\\b${pattern_}\\b`, "gi");

      text = text.replace(regex, (match) => {
        wordCounts[match] = (wordCounts[match] || 0) + 1;

        if (!wordMatchColor[match]) {
          wordMatchColor[match] = colors[nextMatchColor];

          nextMatchColor++;

          if (nextMatchColor === colors.length) {
            nextMatchColor = 0;
          }
        }
        return ` <span style='background-color:${wordMatchColor[match]}; color: white; display:table;'>&nbsp;${match}&nbsp;</span> `;
      });
    });
  }

  const highlightedText = `
    <html>
      <head>
        <title>Highlighted Text and Word Counts</title>
      </head>
      <body>
        <div style="display:table;">
          ${text}
        </div><br/><br/>
        <div>
        <h3>Torture Phrases Word Counts:</h3>
          <ul>
            ${Object.keys(wordCounts)
              .map((key) => {
                const count = wordCounts[key];
                return `<div style='color: ${wordMatchColor[key]}; '>${key}: ${count}</div>`;
              })
              .join("")}
          </ul>
        </div>
      </body>
    </html>
  `;

  return { highlightedText, wordCounts };
};

app.post("/api/upload", upload.single("file"), (req, res) => {
  const uploadedFile = req.file;

  if (!uploadedFile) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const docPath = uploadedFile.path;

  const extractor = new WordExtractor();

  const extracted = extractor.extract(docPath);
  extracted
    .then(function (doc) {
      const extractedText = doc.getBody();

      const { highlightedText, wordCounts } = highlightAndCountMatches(
        extractedText,
        patterns
      );

      // Write the extracted and highlighted text to a file
      const outputPath = "output.html";
      fs.writeFileSync(outputPath, highlightedText);

      res.json({
        message: "File uploaded, extracted, and highlighted successfully",
        filename: uploadedFile.originalname,
        size: uploadedFile.size,
        path: uploadedFile.path,
        extractedText,
        highlightedText,
        outputPath,
        wordCounts,
      });
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred during extraction" });
    });
});

app.listen(4000, () => {
  console.log("Server Running on port 4000");
});
