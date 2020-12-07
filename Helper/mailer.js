const nodemailer = require("nodemailer");
exports.no_attachment = (name, email, phone, test_type, test_name, pincode) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: "techspectramed@gmail.com",
    to: "shahsunny311@gmail.com",
    subject: "Spectramed registration",
    text: `Name: ${name}     Email: ${email}     Phone: ${phone}     Test_type: ${test_type}      Test_name: ${test_name}        Pincode: ${pincode}`,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("Message sent");
      console.log(data);
    }
  });
};

exports.attachment = (
  name,
  email,
  phone,
  test_type,
  test_name,
  id,
  pincode
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  var attachments = [
    {
      filename: `${name}.jpg`,
      path: `.././upload_prescription/${id}`,
      contentType: "application/jpg",
    },
  ];
  const mailOptions = {
    from: "techspectramed@gmail.com",
    to: "shahsunny311@gmail.com",
    subject: "Spectramed registration",
    text: `Name: ${name}     Email: ${email}     Phone: ${phone}     Test_type: ${test_type}      Test_name: ${test_name} Pincode: ${pincode}`,
    attachments: attachments,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("Message sent");
      console.log(data);
    }
  });
};
