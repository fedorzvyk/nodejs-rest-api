const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmailBySendGrid = async data => {
  // eslint-disable-next-line no-useless-catch
  try {
    const email = { ...data, from: 'phonebook-goit@meta.ua' };
    await sgMail.send(email);
    console.log('email sent');
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmailBySendGrid;
