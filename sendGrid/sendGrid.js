
require('dotenv').configDotenv()
const cloud_client = require('../cloud_client.js')
const sgMail = require('@sendgrid/mail')
let msg;

async function loadSendGird() {
  if (!msg) {
    const secrets = await cloud_client.get_cloud_service("secrets")
    const sender = await secrets.getSecret("SENDGRID_SENDER")
    const sgkey = await secrets.getSecret("SENDGRID_API_KEY")
    console.log(sender)
    sgMail.setApiKey(sgkey)
    msg = {
      from: sender
    }
    console.log(msg)
  }
}

async function sendMail(in_msg) {
  await loadSendGird()
  Object.assign(in_msg, msg)
  sgMail
    .send(in_msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
}
