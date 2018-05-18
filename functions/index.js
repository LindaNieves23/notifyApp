const functions = require('firebase-functions');
const nodemailer = require('nodemailer');


//google account credentials used to send email
const mailTransport = nodemailer.createTransport(
    `smtps://user@domain.com:password@smtp.gmail.com`);

exports.sendEmailCF = functions.https.onRequest((req, res) => {
      

      console.log(req.body);

    

});

// Send email function
function sendEmail(body) {
  const mailOptions = {
    from: `<noreply@domain.com>`,
    to: body.email
  };
  // hmtl message constructions
  mailOptions.subject = 'Tienes notificacion!';
  mailOptions.html = `<p><b>Nombre: </b>${body.nombre}</p>
                      <p><b>Email: </b>${body.email}</p>
                      <p><b>Asunto: </b>${body.asunto}</p>
                      <p><b>Mensaje: </b>${body.msj}</p>`;
  return mailTransport.sendMail(mailOptions);
}