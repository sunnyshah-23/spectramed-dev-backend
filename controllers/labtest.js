const { v4: uuidv4 } = require("uuid");
const db = require("../db");
const formidable = require("formidable");
var fs = require("fs");
const { no_attachment } = require(".././Helper/mailer");
const { attachment } = require(".././Helper/mailer");
const ImageDataURI = require("image-data-uri");

exports.enquiry = (req, res) => {
  const { name, email, phone, test_type, test_name, pincode, photo } = req.body;
  console.log(name, email, phone, photo);
  let date = new Date();
  let formatteddate =
    date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
  if (photo === "") {
    const no_photo = "no photo";
    const sqlInsert =
      "INSERT INTO Enquiry(Date,Name,Email,Phone_no,Test_type,Test_name,Pincode,Prescription) VALUES (?,?,?,?,?,?,?,?)";
    db.query(
      sqlInsert,
      [
        formatteddate,
        name,
        email,
        phone,
        test_type,
        test_name,
        pincode,
        no_photo,
      ],
      (err, result) => {
        if (err) {
          return res.status(400).json({
            err: "Not able to save in DB",
          });
        } else {
          res.json("successfully added in DB");
          no_attachment(name, email, phone, test_type, test_name, pincode);
        }
      }
    );
  } else {
    console.log("SAVED IN FOLDER");
    var id = uuidv4();
    const filePath = "upload_prescription/" + id;
    ImageDataURI.outputFile(photo, filePath)

      .then((res) => {
        console.log("DATA URI SUCCCESS", res);
        const ext = res.split(".");
        console.log("EXT", ext);
        id = id + "." + ext[1];
        console.log("id", id);
      })
      .catch((err) => console.log("DATA URI", err));
    const sqlInsert =
      "INSERT INTO Enquiry(Date,Name,Email,Phone_no,Test_type,Test_name,Pincode,Prescription) VALUES (?,?,?,?,?,?,?,?)";
    db.query(
      sqlInsert,
      [formatteddate, name, email, phone, test_type, test_name, pincode, id],
      (err, result) => {
        if (err) {
          return res.status(400).json({
            err: "Not able to savein DB",
          });
        } else {
          res.json("successfully added in DB");
          console.log("BEFORE ATTACHMENt");
          attachment(name, email, phone, test_type, test_name, id, pincode);
        }
      }
    );
  }
};
