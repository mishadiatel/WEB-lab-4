    const nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: "mishadiatel13@gmail.com",
            pass: "iljcwogfrposeyyr"
        }
    });
    let message = {
        from: '"LR JS 2022" <mishadiatel13@gmail.com>',
        to: "webkpi21@gmail.com",
        subject: "ЛР4 ТР-12 Дятел Михайло",
        text: `ПІБ: Дятел Михайло Борисович\nГрупа: ТР-12\nОцінка: 14 / 14\n`
    }

    transporter.sendMail(message, function(err, info) {
        if (err) {
        console.log(err)
        } else {
        console.log(info);
        }
    });


