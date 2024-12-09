const axios = require('axios');

const sendVerificationEmail = async (req={}, res={}) => {
  let verificationCode = "";
  verificationCode = Math.floor(1000 + Math.random() * 9000);
  try {
    const apiUrl =
      // 'https://dnqq72a1ng.execute-api.us-west-2.amazonaws.com/v1/CTC_NODE16_TESTEMAIL';
    "https://n5ok4z4ixa.execute-api.us-east-1.amazonaws.com/coincircletrust/coincircletrust-email";

    const body = {
        verificationCode: verificationCode,
        email: req.body.email
    };

    const response = await axios.post(apiUrl, JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // console.log("response >>>>>",response)
    if (response.status === 200) {
      const obj = { message: 'Invite created successfully', verificationCode: verificationCode }
      return obj
      // res.status(200).json({ message: 'Invite created successfully', verificationCode: verificationCode });
    } else {
      const obj = { message: 'Failed to create the invite', verificationCode: verificationCode }
      return obj
      // res.status(response.status).json({ message: 'Failed to create the invite', verificationCode: verificationCode });
    }

  } catch (err) {
    console.error('Error:', err);
    const obj = { message: 'Internal server error', verificationCode: verificationCode }
    return obj
    // res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { sendVerificationEmail }