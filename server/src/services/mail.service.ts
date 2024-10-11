import transporter from "../config/smtp.config";
import Mail from "nodemailer/lib/mailer";

class MailService {
    public sendMail = async (mailOptions: Mail.Options) => {
        transporter.sendMail(mailOptions);
    };
}

const mailService = new MailService();

export { mailService };