const { v4: uuidv4 } = require("uuid");
const db = require("../db");
const formidable = require("formidable");
var fs = require("fs");
const { no_attachment } = require(".././Helper/mailer");
const { attachment } = require(".././Helper/mailer");

exports.enquiry = (req, res) => {
  var form = new formidable.IncomingForm();
  form.keepExtensions = true;
  let date = new Date();
  let formatteddate =
    date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
  form.parse(req, function (err, fields, files) {
    if (err) {
      console.log("FORMPARSE", err.message);
      return;
    }
    console.log("test", fields, files);

    //destructure the fields
    const { name, email, phone, test_type, test_name, pincode } = fields;
    const file = files;

    //Without attachment
    if (JSON.stringify(file) === "{}") {
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
    }

    //With Attachment
    else {
      console.log(file);
      console.log("FILE_NAME", file.name);
      const img_name = file.name;
      const id = uuidv4();
      console.log("ID", id);

      if (!file.myfile.path) {
        console.log("FILE_PATH IS NOT THERE");
      } else {
        console.log("FILE IS THERE");
        var oldpath = `${file.myfile.path}`;
        var newpath =
          "C:/Users/Admin/Desktop/Sunny/spectramed/spectramed-backend/upload_prescription/" +
          id;
        fs.rename(oldpath, newpath, function (err) {
          if (err) {
            var fold_err = "not saved in folder";
            console.log(err);

            const sqlInsert =
              "INSERT INTO Enquiry(Name,Email,Phone_no,Test_type,Test_name,Pincode,Prescription) VALUES (?,?,?,?,?,?,?)";
            db.query(
              sqlInsert,
              [name, email, phone, test_type, test_name, pincode, fold_err],
              (err, result) => {
                if (err) {
                  return res.status(400).json({
                    err: "Not able to savein DB",
                  });
                }
              }
            );
          } else {
            console.log("SAVED IN FOLDER");
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
                id,
              ],
              (err, result) => {
                if (err) {
                  return res.status(400).json({
                    err: "Not able to savein DB",
                  });
                } else {
                  res.json("successfully added in DB");
                  attachment(
                    name,
                    email,
                    phone,
                    test_type,
                    test_name,
                    newpath,
                    pincode
                  );
                }
              }
            );
          }
        });
      }
    }
  });
};
