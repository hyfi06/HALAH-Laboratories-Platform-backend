const { config } = require('../config/index');
const sgMail = require('@sendgrid/mail');

class MailService {
  constructor() {
    this.from = config.businessMail;
    sgMail.setApiKey(config.sendgridApiKey);
  }

  async sendMail({ to, subject, html }) {
    const message = { to, subject, html, from: this.from };
    try {
      await sgMail.send(message);
    } catch (error) {
      return error;
    }
  }
}

module.exports = MailService;
