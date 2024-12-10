const axios = require('axios')

const sendVerificationEmail = async (req = {}, res = {}) => {
  let verificationCode = ''
  verificationCode = Math.floor(1000 + Math.random() * 9000)
  try {
    const apiUrl =
      // 'https://dnqq72a1ng.execute-api.us-west-2.amazonaws.com/v1/CTC_NODE16_TESTEMAIL';
      process.env.SES_URL

    // const htmlData = `This verification code was sent to your email for verify your email address ${req.body.email}.
    // <br><br>
    // <b>${verificationCode}</b>
    // <br><br>
    // If you don't know why you received this, you are not required to take any action. Please do not share this OTP with anyone.`;
    const htmlData = `<table bgcolor="#F2F2F2" border="0" cellpadding="0" cellspacing="0" width="100%">
<tbody>
  <tr>
    <td>
      <div style='margin:50px;font-size:16px;line-height:24px'>
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tbody>
            <tr>
              <td>
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tbody>
                    <tr style="">
                      <td style="background-color:white;padding-top:20px;padding-bottom:30px">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                          <tbody>
                            <tr style="display:flex;justify-content:start;align-items:center;padding-bottom:20px;">
                              <td align="left" style="padding-top:0;padding-left:10px"> <a href="https://uat.coincircletrust.com/" rel="noreferrer" target="_blank"> <img src=${process.env.email_banner_image} alt="CoinCirlceTrust" width="376" height="73" style="vertical-align:middle" class="CToWUd" data-bit="iit"> </a>
                              </td>
                            </tr>
                            <tr>
                              <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px">Thank you for choosing Your Brand. Use the following OTP to complete your Sign Up procedures. ${req.body.email}. </td>
                            </tr>
                            <tr>
                              <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px">  
                              <b>${verificationCode}</b>
<br /><br />
                              If you don't know why you received this, you are not required to take any action. Please do not share this OTP with anyone. </td>
                            </tr>
                            <tr>
                              <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:30px;margin-left:px;margin-right:px"> Thanks,<br>${process.env.company_title} Team</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </td>
  </tr>
</tbody>
</table>`
    const body = {
      verificationCode: verificationCode,
      email: req.body.email,
      subject: 'SignUp OTP',
      htmlData: htmlData
    }

    const response = await axios.post(apiUrl, JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.status === 200) {
      const obj = {
        message: 'Invite created successfully',
        verificationCode: verificationCode,
        verificationCodeTimestamp: Date.now()
      }
      return obj
      // res.status(200).json({ message: 'Invite created successfully', verificationCode: verificationCode });
    } else {
      const obj = {
        message: 'Failed to create the invite',
        verificationCode: verificationCode,
        verificationCodeTimestamp: Date.now()
      }
      return obj
      // res.status(response.status).json({ message: 'Failed to create the invite', verificationCode: verificationCode });
    }
  } catch (err) {
    console.error('Error:', err)
    const obj = {
      message: 'Internal server error',
      verificationCode: verificationCode,
      verificationCodeTimestamp: Date.now()
    }
    return obj
    // res.status(500).json({ error: 'Internal server error' });
  }
}

const sendLoginOTP = async (req = {}, res = {}) => {
  let verificationCode = ''
  verificationCode = Math.floor(1000 + Math.random() * 9000)
  try {
    const apiUrl =
      // 'https://dnqq72a1ng.execute-api.us-west-2.amazonaws.com/v1/CTC_NODE16_TESTEMAIL';
      process.env.SES_URL

    // const htmlData = `This verification code was sent to your email for login with your email address ${req.body.email}.
    // <br><br>
    // <b>${verificationCode}</b>
    // <br><br>
    // If you don't know why you received this, you are not required to take any action. Please do not share this OTP with anyone.`;
    const htmlData = `<table bgcolor="#F2F2F2" border="0" cellpadding="0" cellspacing="0" width="100%">
<tbody>
  <tr>
    <td>
      <div style='margin:50px;font-size:16px;line-height:24px'>
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tbody>
            <tr>
              <td>
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tbody>
                    <tr style="">
                      <td style="background-color:white;padding-top:20px;padding-bottom:30px">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                          <tbody>
                            <tr style="display:flex;justify-content:start;align-items:center;padding-bottom:20px;">
                              <td align="left" style="padding-top:0;padding-left:10px"> <a href="https://uat.coincircletrust.com/" rel="noreferrer" target="_blank"> <img src=${process.env.email_banner_image} alt="CoinCirlceTrust" width="376" height="73" style="vertical-align:middle" class="CToWUd" data-bit="iit"> </a>
                              </td>
                            </tr>
                            <tr>
                              <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px">Use the following OTP to login into your ${process.env.company_title} account ${req.body.email}. </td>
                            </tr>
                            <tr>
                              <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px">  
                              <b>${verificationCode}</b>
<br /><br />
                              If you don't know why you received this, you are not required to take any action. Please do not share this OTP with anyone. </td>
                            </tr>
                            <tr>
                              <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:30px;margin-left:px;margin-right:px"> Thanks,<br>${process.env.company_title} Team</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </td>
  </tr>
</tbody>
</table>`
    const body = {
      verificationCode: verificationCode,
      email: req.body.email,
      subject: 'Login OTP',
      htmlData: htmlData
    }

    const response = await axios.post(apiUrl, JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.status === 200) {
      const obj = {
        message: 'Invite created successfully',
        verificationCode: verificationCode,
        verificationCodeTimestamp: Date.now()
      }
      return obj
    } else {
      const obj = {
        message: 'Failed to create the invite',
        verificationCode: verificationCode,
        verificationCodeTimestamp: Date.now()
      }
      return obj
    }
  } catch (err) {
    console.error('Error:', err)
    const obj = {
      message: 'Internal server error',
      verificationCode: verificationCode,
      verificationCodeTimestamp: Date.now()
    }
    return obj
  }
}

const sendSignupOTP = async (req = {}, res = {}) => {
  let verificationCode = ''
  verificationCode = Math.floor(1000 + Math.random() * 9000)
  try {
    const apiUrl =
      // 'https://dnqq72a1ng.execute-api.us-west-2.amazonaws.com/v1/CTC_NODE16_TESTEMAIL';
      process.env.SES_URL

    // const htmlData = `This verification code was sent to your email for login with your email address ${req.body.email}.
    // <br><br>
    // <b>${verificationCode}</b>
    // <br><br>
    // If you don't know why you received this, you are not required to take any action. Please do not share this OTP with anyone.`;
    const htmlData = `<table bgcolor="#F2F2F2" border="0" cellpadding="0" cellspacing="0" width="100%">
<tbody>
  <tr>
    <td>
      <div style='margin:50px;font-size:16px;line-height:24px'>
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tbody>
            <tr>
              <td>
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tbody>
                    <tr style="">
                      <td style="background-color:white;padding-top:20px;padding-bottom:30px">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                          <tbody>
                            <tr style="display:flex;justify-content:start;align-items:center;padding-bottom:20px;">
                              <td align="left" style="padding-top:0;padding-left:10px"> <a href="https://uat.coincircletrust.com/" rel="noreferrer" target="_blank"> <img src=${process.env.email_banner_image}alt="CoinCirlceTrust" width="376" height="73" style="vertical-align:middle" class="CToWUd" data-bit="iit"> </a>
                              </td>
                            </tr>
                            <tr>
                              <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px">Thank you for choosing Your Brand. Use the following OTP to complete your Sign Up procedures.${req.body.email}. </td>
                            </tr>
                            <tr>
                              <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px">  
                              <b>${verificationCode}</b>
<br /><br />
                              If you don't know why you received this, you are not required to take any action. Please do not share this OTP with anyone. </td>
                            </tr>
                            <tr>
                              <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:30px;margin-left:px;margin-right:px"> Thanks,<br>${process.env.company_title} Team</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </td>
  </tr>
</tbody>
</table>`
    const body = {
      verificationCode: verificationCode,
      email: req.body.email,
      subject: 'SignUp OTP',
      htmlData: htmlData
    }

    const response = await axios.post(apiUrl, JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.status === 200) {
      const obj = {
        message: 'Invite created successfully',
        verificationCode: verificationCode
      }
      return obj
    } else {
      const obj = {
        message: 'Failed to create the invite',
        verificationCode: verificationCode
      }
      return obj
    }
  } catch (err) {
    console.error('Error:', err)
    const obj = {
      message: 'Internal server error',
      verificationCode: verificationCode
    }
    return obj
  }
}
//---------------------------send Invite to candidate on email ---------------------------------------

const sendInvite = async (req = {}, res = {}) => {
  try {
    const apiUrl =
      // 'https://dnqq72a1ng.execute-api.us-west-2.amazonaws.com/v1/CTC_NODE16_TESTEMAIL';
      process.env.SES_URL

    const htmlData = `<table bgcolor="#F2F2F2" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tbody>
            <tr>
              <td>
                <div style='margin:50px;font-size:16px;line-height:24px'>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tbody>
                      <tr>
                        <td>
                          <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tbody>
                              <tr style="">
                                <td style="background-color:white;padding-top:20px;padding-bottom:30px">
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tbody>
                                    <tr style="display:flex;justify-content:start;align-items:center;padding-bottom:20px;">
                                    <td align="left" style="padding-top:0;padding-left:10px"> <a href="https://uat.coincircletrust.com/" rel="noreferrer" target="_blank"> <img src=${process.env.email_banner_image} alt="CoinCirlceTrust" width="376" height="73" style="vertical-align:middle" class="CToWUd" data-bit="iit"> </a>
                                    </td>
                                  </tr>
                                      <tr>
                                        <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px">Hi <b>${req.body.name}</b>, We hope this email finds you well. We are writing to request your assistance in completing your verification process by filling in some required details through our secure online portal.

                                       </td>
                                      </tr>
                                      <tr>
                                        <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px">  
                                        To complete the process, please follow the link below:<br /><br />
                                       <a href="${req.body.url}" rel="noreferrer" target="_blank">Link to fill details</a> </td>
                                      </tr>


                                      <tr>
                                        <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px">  
                                        Upon clicking the link, you will be asked to log in with your email. And you will get an OTP on your email.<br /><br />
                                       </td>
                                      </tr>


                                      <tr>
                                        <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px">  
                                        Do not forgot to click on Submit Details button after filling details on the Form.<br /><br />
                                       </td>
                                      </tr>

                                      
                                      <tr>
                                        <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:30px;margin-left:px;margin-right:px"> Thanks,<br>${req.body.companyName} Team</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>`
    const body = {
      email: req.body.email,
      subject: 'Upload Documents for Background Verification',
      htmlData: htmlData
    }

    const response = await axios.post(apiUrl, JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.status === 200) {
      res.status(200).json({ message: 'Invitation send successfully' })
    } else {
      res.status(400).json({ message: 'Failed to send invite' })
    }
  } catch (err) {
    res.status(400).json({ message: 'Internal server error', err: err })
  }
}

//---------------------------send web form email on mail ---------------------------------------

const sendWebFormEmail = async (req = {}, res = {}) => {
  try {
    const apiUrl =
      // 'https://dnqq72a1ng.execute-api.us-west-2.amazonaws.com/v1/CTC_NODE16_TESTEMAIL';
      process.env.SES_URL

    // const htmlData = `Hi ${req.body.email}, This is your special invitation to register with <b>Coin Cricle Trust</b>.
    // <br>
    // Please click on below link to register
    // <br>
    // <a href="${req.body.url}" rel="noreferrer" target="_blank">Register with US</a>.
    // <br><br>`;
    const htmlData = `<table bgcolor="#F2F2F2" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tbody>
            <tr>
              <td>
              
                <div style='margin:50px;font-size:16px;line-height:24px'>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tbody>
                  <tr style="display:flex;justify-content:start;align-items:center;padding-bottom:20px;">
                    <td align="left" style="padding-top:0;padding-left:10px"> <a href="https://www.uat.coincircletrust.com/" rel="noreferrer" target="_blank"> <img src=${process.env.email_banner_image}alt="CoinCirlceTrust" width="376" height="73" style="vertical-align:middle" class="CToWUd" data-bit="iit"> </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px"><b>Dear Sir/Mam</b> </td>
                  </tr>
                  <tr>
                    <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px">  
                    We would like to introduce us as ${process.env.company_title}, a private organization engaged and authorized by its clients to conduct the background verification of its existing and potential employees with due written consent from its employees.<br />
                  </tr>
                  <tr>
                    <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px">  
                    Hence, with reference to the above subject, we request you to kindly provide the details of the employment record, of the <b>${req.body.candidateName}</b> by clicking the below link to fill the form.<br /><br />
                   <a href="${req.body.url}" rel="noreferrer" target="_blank">Verification Form</a> </td>
                  </tr>

                  <tr>
                    <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:30px;margin-left:px;margin-right:px"> Thanks,<br>${process.env.company_title} Team</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>`
    const body = {
      email: req.body.email,
      subject: `Regarding Ex-employee Verification : ${req.body.candidateName}`,
      htmlData: htmlData
    }

    const response = await axios.post(apiUrl, JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.status === 200) {
      res.status(200).json({ message: 'WebForm Created successfully' })
    } else {
      res.status(400).json({ message: 'Failed to Create WebForm' })
    }
  } catch (err) {
    res.status(400).json({ message: 'Internal server error', err: err })
  }
}

// --------------------------send (webform) user link on email --------------------------------------------

const sendUserLink = async (req = {}, res = {}) => {
  try {
    const apiUrl =
      // 'https://dnqq72a1ng.execute-api.us-west-2.amazonaws.com/v1/CTC_NODE16_TESTEMAIL';
      process.env.SES_URL

    // const htmlData = `Hi ${req.body.email}, This is your special invitation to register with <b>Coin Cricle Trust</b>.
    // <br>
    // Please click on below link to register
    // <br>
    // <a href="${req.body.url}" rel="noreferrer" target="_blank">Register with US</a>.
    // <br><br>`;
    const htmlData = `<table bgcolor="#F2F2F2" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tbody>
            <tr>
              <td>
              
                <div style='margin:50px;font-size:16px;line-height:24px'>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tbody>
                  <tr style="display:flex;justify-content:start;align-items:center;padding-bottom:20px;">
                    <td align="left" style="padding-top:0;padding-left:10px"> <a href="https://www.uat.coincircletrust.com/" rel="noreferrer" target="_blank"> <img src=${process.env.email_banner_image}alt="CoinCirlceTrust" width="376" height="73" style="vertical-align:middle" class="CToWUd" data-bit="iit"> </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px"><b>Dear Sir/Mam</b> </td>
                  </tr>
                  <tr>
                    <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px">  
                    We would like to introduce us as ${process.env.company_title}, a private organization engaged and authorized by its clients to conduct the background verification of its existing and potential employees with due written consent from its employees.<br />
                  </tr>
                  <tr>
                    <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px">  
                    Hence, with reference to the above subject, we request you to kindly provide the details of the employment record, of the <b>${req.body.candidateName}</b> by clicking the below link to fill the form.<br /><br />
                   <a href="${req.body.url}" rel="noreferrer" target="_blank">Verification Form</a> </td>
                  </tr>

                  <tr>
                    <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:30px;margin-left:px;margin-right:px"> Thanks,<br>${process.env.company_title} Team</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>`
    const body = {
      email: req.body.email,
      subject: `Regarding Ex-employee Verification : ${req.body.candidateName}`,
      htmlData: htmlData
    }

    const response = await axios.post(apiUrl, JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.status === 200) {
      res.status(200).json({ message: 'WebForm Created successfully' })
    } else {
      res.status(400).json({ message: 'Failed to Create WebForm' })
    }
  } catch (err) {
    res.status(400).json({ message: 'Internal server error', err: err })
  }
}

//---------------------------------------send notification to vendor----------------

const sendLinkToVendor = async (req = {}, res = {}) => {
  try {
    const apiUrl =
      // 'https://dnqq72a1ng.execute-api.us-west-2.amazonaws.com/v1/CTC_NODE16_TESTEMAIL';
      process.env.SES_URL

    const htmlData = `<table bgcolor="#F2F2F2" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tbody>
            <tr>
              <td>
              
                <div style='margin:50px;font-size:16px;line-height:24px'>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tbody>
                  <tr style="display:flex;justify-content:start;align-items:center;padding-bottom:20px;">
                    <td align="left" style="padding-top:0;padding-left:10px"> <a href="https://www.uat.coincircletrust.com/" rel="noreferrer" target="_blank"> <img src=${process.env.email_banner_image}alt="CoinCirlceTrust" width="376" height="73" style="vertical-align:middle" class="CToWUd" data-bit="iit"> </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px"><b>Dear ${req.body.name}</b> </td>
                  </tr>
                  <tr>
                    <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px">  
                   We have successfully assigned a new case to you for verification. Please log in to your account using your credentials to review and proceed with the necessary verifications.<br />
                  </tr>
                  <tr>
                    <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px">  
                   You can log in to your account at <a href="${req.body.url}" rel="noreferrer" target="_blank">Login URL</a> </td><br /><br />
                  
                  </tr>

                  <tr>
                    <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:30px;margin-left:px;margin-right:px"> Thanks,<br>${process.env.company_title} Team</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>`

    const body = {
      email: req.body.email,
      subject: 'Case Assigned for Verification - Please Log In to Review',
      htmlData: htmlData
    }

    const response = await axios.post(apiUrl, JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.status === 200) {
      res.status(200).json({ message: 'Invitation send successfully' })
    } else {
      res.status(400).json({ message: 'Failed to send invite' })
    }
  } catch (err) {
    res.status(400).json({ message: 'Internal server error', err: err })
  }
}

//-----------------------SIRIUS EMAIL SERVICE----------------------------------------------------

//-------------------------------------sirius invitation mail for candidate----------------------------
const sendInviteToSiriusCandidate = async (req = {}, res = {}) => {
  try {
    const apiUrl =
      // 'https://dnqq72a1ng.execute-api.us-west-2.amazonaws.com/v1/CTC_NODE16_TESTEMAIL';
      process.env.SES_URL

    const htmlData = `<table bgcolor="#F2F2F2" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tbody>
            <tr>
              <td>
                <div style='margin:50px;font-size:16px;line-height:24px'>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tbody>
                      <tr>
                        <td>
                          <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tbody>
                              <tr style="">
                                <td style="background-color:white;padding-top:20px;padding-bottom:30px">
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tbody>
                                    <tr style="display:flex;justify-content:start;align-items:center;padding-bottom:20px;">
                                    <td align="left" style="padding-top:0;padding-left:10px"> <a href="https://uat.coincircletrust.com/" rel="noreferrer" target="_blank"> <img src=${process.env.email_banner_image} alt="CoinCirlceTrust" width="376" height="73" style="vertical-align:middle" class="CToWUd" data-bit="iit"> </a>
                                    </td>
                                  </tr>
                                      <tr>
                                         <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px"><b>Dear Candidate,</b> </td>
                                      </tr>

                                      <tr>
                                         <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px"><b>Greetings from LTIMindtree!!</b> </td>
                                      </tr>
                                      <tr>
                                        <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px">  
                                       As a part of your onboarding, it is mandatory to complete the background verification process. Your verification process will happen through SIRIUS INFO SERVICES PVT LTD, an authorized vendor of LTIMindtree. Please complete the electronic form in the link given below and submit the duly filled attached ‘Letter of Authorization’ along with the required documents.<br /><br />
                                       
                                      </tr>
                                       <tr>
                                         <td style="font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:20px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px"><b>User Name : XYZ</b> </td>
                                      </tr>
                                       <tr>
                                         <td style="font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:20px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px"><b>Password : ABC@1234</b> </td>
                                      </tr>
                                       <tr>
                                         <td style="font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:20px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px"><b>Link : <a href="${req.body.url}" rel="noreferrer" target="_blank">${req.body.url}</a></b> </td>
                                      </tr>

                                       <tr>
                                        <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px">  
                                        Personal Details:<br>
                                         ---Please fill the necessary details as mentioned below:<br>

                                           * For education check – Upload all graduated educational certificates and all mark sheets.<br>
                                           * For employment check – Upload all your employment experience/service certificates, relieving letters in chronological order.<br>
                                           * For current employer – upload relieving accepted communication email / screen shot and fill the date to upload service letter.<br>
                                           * Recommendation for scanning : Please scan in maximum 200 dpi in PDF format.<br /><br />
                                       </td>
                                      </tr>



                                      <tr>
                                        <td style="font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:20px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px">  
                                        <b>Do not forgot to click on Submit Details button after filling details on the Form.</b><br /><br />
                                       </td>
                                      </tr>

                                      
                                      <tr>
                                        <td style="font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:20px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:30px;margin-left:px;margin-right:px"> Regards,<br>${req.body.companyName} Team</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>`
    const body = {
      email: req.body.email,
      subject: 'Upload Documents for Background Verification',
      htmlData: htmlData
    }

    const response = await axios.post(apiUrl, JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.status === 200) {
      res.status(200).json({ message: 'Invitation send successfully' })
    } else {
      res.status(400).json({ message: 'Failed to send invite' })
    }
  } catch (err) {
    res.status(400).json({ message: 'Internal server error', err: err })
  }
}

//-------------------------------------GVS invitation mail for candidate----------------------------
const sendInviteToGVSCandidate = async (req = {}, res = {}) => {
  try {
    const apiUrl = `https://rxdbb6m591.execute-api.ap-south-1.amazonaws.com/default/genuine-verification-service-send-email`

    const htmlData = `<table bgcolor="#F2F2F2" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tbody>
            <tr>
              <td>
                <div style='margin:50px;font-size:16px;line-height:24px'>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tbody>
                      <tr>
                        <td>
                          <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tbody>
                              <tr style="">
                                <td style="background-color:white;padding-top:20px;padding-bottom:30px">
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tbody>
                                    <tr style="display:flex;justify-content:start;align-items:center;padding-bottom:20px;">
                                    <td align="left" style="padding-top:0;padding-left:10px"> <a href="https://uat.coincircletrust.com/" rel="noreferrer" target="_blank"> <img src=https://cct-public-images.coincircletrust.com/genuine/public/assets/loginlogo.png alt="BrokenImage" width="376" height="250" style="vertical-align:middle" class="CToWUd" data-bit="iit"> </a>
                                    </td>
                                  </tr>
                                      <tr>
                                        <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px">Hi <b>${req.body.name}</b>, We hope this email finds you well. We are writing to request your assistance in completing your verification process by filling in some required details through our secure online portal.

                                       </td>
                                      </tr>
                                      <tr>
                                        <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px">  
                                        To complete the process, please follow the link below:<br /><br />
                                       <a href="${req.body.url}" rel="noreferrer" target="_blank">Link to fill details</a> </td>
                                      </tr>


                                      <tr>
                                        <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px">  
                                        Upon clicking the link, you will be asked to log in with your email. And you will get an OTP on your email.<br /><br />
                                       </td>
                                      </tr>


                                      <tr>
                                        <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px">  
                                        Do not forgot to click on Submit Details button after filling details on the Form.<br /><br />
                                       </td>
                                      </tr>

                                      
                                      <tr>
                                        <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:30px;margin-left:px;margin-right:px"> Thanks,<br>${req.body.companyName} Team</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>`
    const body = {
      email: req.body.email,
      subject: 'Upload Documents for Background Verification',
      htmlData: htmlData
    }

    const response = await axios.post(apiUrl, JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.status === 200) {
      res.status(200).json({ message: 'Invitation send successfully' })
    } else {
      res.status(400).json({ message: 'Failed to send invite' })
    }
  } catch (err) {
    res.status(400).json({ message: 'Internal server error', err: err })
  }
}

//-----------------------VLEADER EMAIL SERVICE------------------------------------------------------

//---------------send  email to HR for employement verification for vleader ---------------------------------------

const sendEmailToHr = async (req = {}, res = {}) => {
  try {
    const apiUrl = `https://swopgdamti.execute-api.ap-south-1.amazonaws.com/default/vleader-send-email`

    const candidateInfo = req.body.info // assuming the data is passed in the `info` object
    const htmlData = `
    <table bgcolor="#F2F2F2" border="0" cellpadding="0" cellspacing="0" width="100%">
      <tbody>
        <tr>
          <td>
            <div style='margin:50px;font-size:16px;line-height:24px'>
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tbody>
                  
                  <tr>
                    <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px">
                      Dear Concern,
                    </td>
                  </tr>
                  <tr>
                    <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px">
                      <b>Greetings from Vleader Verification Services!!!</b>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px">
                      Vleader Verification Services is one of India's leading background screening and risk consulting companies based out of Gurgaon. We are guided by a vision to create global impact for a secure business environment. Built on trust and confidence, Vleader never compromises on its high standard of quality and information security.
                    </td>
                  </tr>
                  <tr>
                    <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px">
                      With reference to <b>“${
                        candidateInfo.info.organizationName
                      }”</b>, we would appreciate your assistance in verifying the details provided by the ex-employee of <b>“${
      candidateInfo.info.organizationName
    }”</b>.
                      If any of the details mentioned in the job application form are incorrect, may we kindly request you to provide the correct details in your reply, referring to the appropriate sub-heads.
                    </td>
                  </tr>
                  <tr>
                    <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px">
                      <b style="background-color:yellow;">The same is very urgent!!!</b>
                    </td>
                  </tr>

                  <!-- Dynamic Table for Information -->
                  <tr>
                    <td style="padding:20px">
                      <table border="1" cellpadding="10" cellspacing="0" width="100%" style="border-collapse:collapse;">
                        <thead style="background-color:#80808066;">
                          <tr>
                            <th>Criteria</th>
                            <th>Details as Mentioned by the Applicant in the Job Application Form</th>
                            <th>Details Confirmed by ${
                              candidateInfo.info.organizationName
                            }</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><strong>Name of the Employee</strong></td>
                            <td>${req.body.candidateName}</td>
                            <td></td>
                          </tr>
                          <tr>
                            <td><strong>Employee Code</strong></td>
                            <td>${candidateInfo.info.employeeCode}</td>
                           <td></td>
                          </tr>
                          <tr>
                            <td><strong>Employment Start Date</strong></td>
                            <td>${new Date(
                              candidateInfo.info.employmentStartDates
                            ).toLocaleDateString('en-GB')}</td>
                            <td></td>
                          </tr>
                           <tr>
                            <td><strong>Employment End Date</strong></td>
                            <td>${new Date(
                              candidateInfo.info.employmentEndDates
                            ).toLocaleDateString('en-GB')}</td>
                            <td></td>
                          </tr>
                          <tr>
                            <td><strong>Designation</strong></td>
                            <td>${candidateInfo.info.designation}</td>
                            <td></td>
                          </tr>
                          <tr>
                            <td><strong>Department</strong></td>
                            <td>${
                              candidateInfo.info.department || 'Please Confirm'
                            }</td>
                           <td></td>
                          </tr>
                          <tr>
                            <td><strong>Salary</strong></td>
                            <td>${candidateInfo.info.salary}</td>
                           <td></td>
                          </tr>
                          <tr>
                            <td><strong>Reporting Manager</strong></td>
                            <td>${candidateInfo.info.supervisorName}</td>
                            <td></td>
                          </tr>
                          <tr>
                            <td><strong>Reason for Leaving</strong></td>
                            <td>${candidateInfo.info.reasonForLeaving}</td>
                            <td></td>
                          </tr>
                          <tr>
                            <td><strong>Full & Final Formalities</strong></td>
                            <td>${candidateInfo.info.fnFSettled}</td>
                            <td></td>
                          </tr>
                          <tr>
                            <td><strong>Any Disciplinary/Performance Issues</strong></td>
                            <td colspan="2"></td>
                          </tr>
                          <tr>
                            <td> <strong>Pending Dues (If Any)</strong></td>
                            <td colspan="2"></td>
                          </tr>
                           <tr>
                            <td><strong>Is the Attached Document Genuine?(Yes/NO/NA)</strong></td>
                           <td colspan="2"></td>
                          </tr>
                          <tr>
                            <td><strong>Eligible for Rehire (If No, Please Specify the reason)</strong></td>
                            <td colspan="2"></td>
                          </tr>
                           <tr>
                            <td><strong>Additional Remarks</strong></td>
                            <td colspan="2"></td>
                          </tr>
                          <tr>
                            <td><strong>Verified By : (Please specify Name, Designation and Contact No)</strong></td>
                           <td colspan="2"></td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>

                 <tr>
                    <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:30px;margin-left:px;margin-right:px">
                     <p style = "background-color:yellow;"> Awaiting your valuable response, as the candidate’s joining is on hold.</p>
                    </td>
                 </tr>


                  <tr>
                    <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:30px;margin-left:px;margin-right:px">
                      Thanks & Regards,<br>
                      Executive-Operations<br>
                      Vleader Team
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      </tbody>
    </table>`

    const body = {
      email: req.body.email,
      subject: `Regarding Ex-employee Verification : ${req.body.candidateName}`,
      htmlData: htmlData
    }

    const response = await axios.post(apiUrl, JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.status === 200) {
      res.status(200).json({ message: 'WebForm Created successfully' })
    } else {
      res.status(400).json({ message: 'Failed to Create WebForm' })
    }
  } catch (err) {
    res.status(400).json({ message: 'Internal server error', err: err })
  }
}

//---------------------------send  email to HR for education verification for vleader ---------------------------------------

const sendEmailForEducation = async (req = {}, res = {}) => {
  try {
    const apiUrl = `https://swopgdamti.execute-api.ap-south-1.amazonaws.com/default/vleader-send-email`

    const candidateInfo = req.body.info // assuming the data is passed in the `info` object
    const htmlData = `
    <table bgcolor="#F2F2F2" border="0" cellpadding="0" cellspacing="0" width="100%">
      <tbody>
        <tr>
          <td>
            <div style='margin:50px;font-size:16px;line-height:24px'>
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tbody>
                  
                  <tr>
                    <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px">
                      Dear Sir/Madam,
                    </td>
                  </tr>
                  <tr>
                    <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px">
                      <b>Greetings from VLeader Verification Services…!!!</b>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px">
                      VLeader Group is India's leading background screening and Risk Management Company based out of Gurgaon. Built on trust and confidence, VLeader never compromises on its high standard of quality and develops very effective mitigation plans to reduce corresponding impact on business projects.
                    </td>
                  </tr>
                  <tr>
                    <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px">
                      With reference to the background checks, we would appreciate your assistance in verifying the below details provided by the ex-student <b>${
                        req.body.candidate
                      }</b>.
                      If any of the details mentioned in the job application form are incorrect, we kindly request you to provide the correct details in your reply, referring to the appropriate sub-heads.
                    </td>
                  </tr>

                  <!-- Dynamic Table for Information -->
                  <tr>
                    <td style="padding:20px">
                      <table border="1" cellpadding="10" cellspacing="0" width="100%" style="border-collapse:collapse;">
                        <thead style="background-color:#80808066;">
                          <tr>
                            <th>Particulars</th>
                            <th>Details Provided by the Applicant</th>
                            <th>Details Verified & Confirmed by the University/Institute</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><strong>Name of the Subject</strong></td>
                            <td>${req.body.candidate}</td>
                            <td></td>
                          </tr>
                          <tr>
                            <td><strong>Degree/Course</strong></td>
                            <td>${candidateInfo.info.degreeName}</td>
                           <td></td>
                          </tr>
                          <tr>
                            <td><strong>Seat No. / Roll No./ Reg.No.</strong></td>
                            <td>${candidateInfo.info.enrollmentNumber}</td>
                            <td></td>
                          </tr>
                           <tr>
                            <td><strong>School/College/Institute Name</strong></td>
                            <td>${candidateInfo.info.instituteName}</td>
                            <td></td>
                          </tr>
                          <tr>
                            <td><strong>Affiliated University/Board</strong></td>
                            <td>${candidateInfo.info.unversityName}</td>
                            <td></td>
                          </tr>
                          <tr>
                            <td><strong>Full Time/Part Time/ Correspondence/ Open Learning</strong></td>
                            <td>${'Please Confirm'}</td>
                           <td></td>
                          </tr>
                          <tr>
                            <td><strong>Percentage of Marks & Class/Grade obtained</strong></td>
                            <td>${candidateInfo.info.grade}</td>
                           <td></td>
                          </tr>
                          <tr>
                            <td><strong>Passing Year</strong></td>
                            <td>${new Date(
                              candidateInfo.info.yearOfPassing
                            ).toLocaleDateString('en-GB')}</td>
                            <td></td>
                          </tr>                                                                    
                        </tbody>
                      </table>
                    </td>
                  </tr>                 
                  <tr>
                    <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:30px;margin-left:px;margin-right:px">
                      Thanks & Regards,<br>
                      Executive-Operations<br>
                      Vleader Team
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      </tbody>
    </table>`

    const body = {
      email: req.body.email,
      subject: `Regarding Education Verification : ${req.body.candidate}`,
      htmlData: htmlData
    }

    const response = await axios.post(apiUrl, JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.status === 200) {
      res.status(200).json({ message: 'WebForm Created successfully' })
    } else {
      res.status(400).json({ message: 'Failed to Create WebForm' })
    }
  } catch (err) {
    res.status(400).json({ message: 'Internal server error', err: err })
  }
}

//----------------------------send insuff email to vleader client------------------------

const sendInsuffEmailToClient = async (req = {}, res = {}) => {
  try {
    const apiUrl = `https://swopgdamti.execute-api.ap-south-1.amazonaws.com/default/vleader-send-email`

    const { checkName, caseID, name, email } = req.body

    const htmlData = `
      <table bgcolor="#F2F2F2" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tbody>
          <tr>
            <td>
              <div style='margin:50px;font-size:16px;line-height:24px'>
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tbody>
                    <tr style="display:flex;justify-content:start;align-items:center;padding-bottom:20px;">
                      <td align="left" style="padding-top:0;padding-left:10px">
                        <a href="https://www.uat.coincircletrust.com/" rel="noreferrer" target="_blank">
                          <img src=https://cct-public-images.coincircletrust.com/vleader/public/assets/loginlogo.png alt="BrokenIamge" width="390" height="150" style="vertical-align:middle">
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding:20px 20px 0">
                        <b>Dear Sir/Madam,</b>
                      </td>
                    </tr>
                    <tr>
                      <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding:20px">
                        We have identified insufficiencies in the information provided for case <b>${caseID}</b> and the check <b>${checkName}</b>, related to <b>${name}</b>.
                        Please address these issues promptly to ensure that everything is resolved within the committed timeframe.
                      </td>
                    </tr>
                    <tr>
                      <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding:20px">
                        Your cooperation in this matter is highly appreciated.
                      </td>
                    </tr>
                    <tr>
                      <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding:30px 20px">
                        Thanks,<br>The Vleader Team
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>`

    const body = {
      email: email,
      subject: `Action Required: Insufficiency in Case ${caseID}`,
      htmlData: htmlData
    }

    const response = await axios.post(apiUrl, JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.status === 200) {
      res.status(200).json({ message: 'Email sent successfully.' })
    } else {
      res.status(400).json({ message: 'Failed to send the email.' })
    }
  } catch (err) {
    res.status(400).json({ message: 'Internal server error.', err })
  }
}

//---------------send  email to HR for employement verification for pamac ---------------------------------------

const sendEmailToHrForPamac = async (req = {}, res = {}) => {
  try {
    const apiUrl = `https://n4rm1rz4jg.execute-api.ap-south-1.amazonaws.com/default/pamac-send-email`
    const candidateInfo = req.body.info
    const htmlData = `
    <table bgcolor="#F2F2F2" border="0" cellpadding="0" cellspacing="0" width="100%">
      <tbody>
        <tr>
          <td>
            <div style='margin:50px;font-size:16px;line-height:24px'>
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tbody>

                 <tr>
                    <td style="font-family:Trebuchet MS;font-size:15px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px;color:#002060;">
                    <strong>Classification : Private / Confidential</strong>
                      
                    </td>
                  </tr>
                  
                  <tr>
                    <td style="font-family:Cambria;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px;color:#002060;">
                      Dear Concern,
                    </td>
                  </tr>
                  <tr>
                    <td style="font-family:Cambria;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px;color:#002060;">
                      <b>Greeting From PAMAC!!!</b>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-family:Cambria;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px;color:#002060;">
                      “PAMAC- Employee Background Check Services”. We provide specialized services like Pre & Post Employment Verification, Education Verification, Address Validation, Global & India Specific Database Checks, and Personal & Professional Reference Check PAMAC has a pan India presence with offices in 33 locations.
                    </td>
                  </tr>
                  
                  <tr>
                    <td style="font-family:Cambria;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px;color:#002060; ">
                      Request you to kindly verify the below mentioned details Ex-employee who claims to have been employed with your esteemed organization in the past.Kindly revert back with the verifications of the below mentioned candidate:
                    </td>
                  </tr>
                  

                  <!-- Dynamic Table for Information -->
                  <tr>
                    <td style="padding:20px">
                      <table border="1" cellpadding="10" cellspacing="0" width="100%" style="border-collapse:collapse;">
                        <thead style="background-color:#80808066;">
                          <tr>
                            <th>Details to be Verify</th>
                            <th>As provided by the candidate</th>
                            <th>Details as per HR record (Please Specify)
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><strong>Name of the Employer</strong></td>
                            <td>${candidateInfo.info.companyName}</td>
                            <td></td>
                          </tr>
                          <tr>
                            <td><strong>Name of the Candidate</strong></td>
                            <td>${req.body.candidateName}</td>
                            <td></td>
                          </tr>
                          <tr>
                            <td><strong>Employee Code</strong></td>
                            <td>NA</td>
                           <td></td>
                          </tr>
                          <tr>
                            <td><strong>Employment Start Date</strong></td>
                            <td>${new Date(
                              candidateInfo.info.employmentStartDates
                            ).toLocaleDateString('en-GB')}</td>
                            <td></td>
                          </tr>
                           <tr>
                            <td><strong>Employment End Date</strong></td>
                            <td>${new Date(
                              candidateInfo.info.employmentEndDates
                            ).toLocaleDateString('en-GB')}</td>
                            <td></td>
                          </tr>
                          <tr>
                            <td><strong>Title / designation /Grade/Scale</strong></td>
                            <td>${candidateInfo.info.designation}</td>
                            <td></td>
                          </tr>
                          <tr>
                            <td><strong>Reporting Manager’s name & designation</strong></td>
                            <td>Please specify</td>
                           <td></td>
                          </tr>
                          <tr>
                            <td><strong>Salary / remuneration</strong></td>
                            <td>${candidateInfo.info.salary}</td>
                           <td></td>
                          </tr>
                         
                          <tr>
                            <td><strong>Reason for Leaving</strong></td>
                            <td>${candidateInfo.info.reasonForLeaving}</td>
                            <td></td>
                          </tr>
                                                    
                          <tr>
                            <td><strong>Eligible for Rehire (If No, Please Specify the reason)</strong></td>
                            <td colspan="2"></td>
                          </tr>
                           <tr>
                            <td><strong>Additional Remarks</strong></td>
                            <td colspan="2">Please specify</td>
                          </tr>
                         
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-family:Trebuchet MS;font-size:15px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:30px;margin-left:px;margin-right:px">
                    <strong style="color:#002060;">
                     Thanks & Regards,<br>
                       Pamac Team<br>                    
                       Mobile: +91 88983 05426| Email: anup.pal@pamac.com|<br>
                       Website:www.pamac.com|
                       </strong> 
                    </td>
                  </tr>

                  <tr style="display:flex;justify-content:start;align-items:center;padding-bottom:20px;">
                       <td align="left" style="padding-top:0;padding-left:10px"> <a href="https://uat.coincircletrust.com/" rel="noreferrer" target="_blank"> <img src=https://cct-public-images.coincircletrust.com/pamac/public/assets/loginlogo.png alt="BrokenImage" width="220" height="120" style="vertical-align:middle" class="CToWUd" data-bit="iit"> </a>
                       </td>
                  </tr>

                  <tr>
                    <td style="font-family:Cambria;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px">
                     <strong style="color:#002060;">
                      PAMAC Group, BANKING ON OUR CREDENTIALS -5000+ Employee Base|2 Countries|42 Locations|150+ Clients|20+Years in Business
                          </strong>                
                    </td>
                  </tr>

                   <tr>
                    <td style="font-family:Cambria;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px">
                     <strong style="color:#002060;">
                      ****************************************************************************************************************************           
                      </strong>           
                    </td>

                  </tr>

                  <tr>
                    <td style="font-family:Cambria;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px">
                       <strong style="color:#002060;">Disclaimer: This email is confidential. It may also be legally privileged. If you are not the addressee, you may not copy, forward, disclose, or use any part of it. 
                         If you have received this message in error, please delete it and all copies from your system and notify the sender immediately by return e-mail.
                         Internet communications cannot be guaranteed to be timely, secure, error, or virus-free. The sender does not accept liability for any errors or omissions.
       
                         </strong>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-family:Cambria;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px">
                       <strong style="color:#002060;">
                          **************************************************************************************************************************** 
                         </strong>
                    </td>
                  </tr>

                  <tr>
                    <td style="font-family:Trebuchet MS;font-size:15px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;margin-left:px;margin-right:px;color:green;">
                       <strong> Please don't print this e-mail unless you really need to. Let us save the Mother Earth </strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      </tbody>
    </table>`

    const body = {
      email: req.body.email,
      ccEmails: req.body.ccEmails,
      subject: `Regarding Ex-employee Verification : ${req.body.candidateName}`,
      htmlData: htmlData
    }

    const response = await axios.post(apiUrl, JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.status === 200) {
      res.status(200).json({ message: 'WebForm Created successfully' })
    } else {
      res.status(400).json({ message: 'Failed to Create WebForm' })
    }
  } catch (err) {
    res.status(400).json({ message: 'Internal server error', err: err })
  }
}

//-----------------------------------------------------------------------
module.exports = {
  sendVerificationEmail,
  sendLoginOTP,
  sendInvite,
  sendSignupOTP,
  sendWebFormEmail,
  sendLinkToVendor,
  sendInviteToSiriusCandidate,
  sendInviteToGVSCandidate,
  sendUserLink,
  sendEmailToHr,
  sendEmailForEducation,
  sendInsuffEmailToClient,
  sendEmailToHrForPamac
}
