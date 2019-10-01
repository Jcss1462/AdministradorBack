var nodemailer = require('nodemailer'); // email sender function 
exports.sendEmail =  function (req, res) {

    //process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'greenlightproject2019@gmail.com',
            pass: 'djgkyscjdpygwwlq'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    var mailOptions = {
        from: 'greenlightproject2019@gmail.com',
        to: req.to,
        subject: req.asunto,
        text: req.texto
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(00000);
            console.log(error);
            res.send(500, err.message);
        } else {
            console.log("Email sent");
            console.log(11111);
            res.status(200).jsonp(req.body);
        }
    });
};