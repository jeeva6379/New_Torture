const express = require("express");
const app = express();
const multer = require("multer");
const WordExtractor = require("word-extractor");
const fs = require("fs");  
const { text } = require("body-parser");
const { log } = require("console");
const jwt = require("jsonwebtoken");
const path = require("path");
const { Extractor } = require('mammoth');

const textract = require("textract");
const { createWorker } = require("tesseract.js");
const secretKey = "tp tool";
app.use(express.json());

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  if (email === "123@gmail.com" && password === "pass") {
    const token = jwt.sign({ email }, secretKey, { expiresIn: "1h" });
    // Generate JWT token with email payload
    res.json({ success: true, message: "Login successful", token });
  } else {
    res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  }
});

// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },

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
      let pattern_ = pattern
        .replace("(", "\\(")
        .replace(")", "\\)")
        .replace("[", "\\[")
        .replace("]", "\\]");
      const regex = new RegExp(`${pattern_}`, "gi");

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
