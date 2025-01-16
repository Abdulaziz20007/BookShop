const nodemailer = require("nodemailer");
const config = require("config");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "mail",
      host: config.get("smtp_host"),
      port: config.get("smtp_port"),
      secure: true,
      auth: {
        user: config.get("smtp_user"),
        pass: config.get("smtp_password"),
      },
    });
  }
  async sendMailActivationCode(toEmail, verification) {
    const url = `${config.get("domain")}/customer/verify/${verification}`;
    await this.transporter.sendMail({
      from: config.get("smtp_user"),
      to: toEmail,
      subject: "Bookshop akkauntini faollashtirish",
      text: "",
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5; border-radius: 8px;">
      <h2 style="color: #333; text-align: center; margin-bottom: 20px;">Akkauntni faollashtirish uchun quyidagi linkni bosing</h2>
      <a href="${url}" style="display: block; width: 200px; margin: 0 auto; padding: 15px; background-color: #4CAF50; color: white; text-align: center; text-decoration: none; font-weight: bold; border-radius: 5px;">FAOLLASHTIRISH</a>
    </div>
        `,
    });
  }
}

module.exports = new MailService();
