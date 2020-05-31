const { config } = require('../config/index');
const sgMail = require('@sendgrid/mail');

class MailService {
  constructor() {
    this.from = `HALAH Laboratories <${config.businessMail}>`;
    sgMail.setApiKey(config.sendgridApiKey);
  }
  /**
   * Send mail
   * @param {object} data
   * @param {string} data.to email recipient
   * @param {string} data.subject subject of email
   * @param {string} data.html mail body in html
   * @returns {null|object} errors
   */
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
