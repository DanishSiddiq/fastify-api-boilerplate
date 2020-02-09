const { enrolled } = require('../module/student-enrolled');
const { logInfoDetails } = require('../../helper/logger');

let channel;
const setChannel = (val) => {
  channel = val;
};

const process = async (msg) => {

  if(msg && msg.content){
    logInfoDetails({ message: `Message received from student enrolled queue has content: ${msg.content.toString()}`});
    enrolled(JSON.parse(msg.content).body);
  } else {
    logInfoDetails({ message: `Message received from student enrolled queue has no pay load`});
  }

  channel.ack(msg, false);
};

module.exports = { process, setChannel };
