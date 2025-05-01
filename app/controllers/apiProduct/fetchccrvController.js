exports.verificationCallback = async (req, res) => {
  try {
    // Get the callback data from the request body
    const callbackData = req.body.data

    // Validate that we have the transaction ID in the callback data
    if (!callbackData || !callbackData.transaction_id) {
      console.error('Invalid callback data received:', req.body)
      return res
        .status(400)
        .json({ success: false, message: 'Invalid callback data' })
    }

    const transactionId = callbackData.transaction_id

    // Find the verification request by transaction ID
    const verification = await CCRVVerification.findOne({ transactionId })

    // If no verification found, log the error but still return 200 to acknowledge receipt
    if (!verification) {
      console.error(
        `No verification found for transaction ID: ${transactionId}`
      )
      // We still return 200 as mentioned in the requirements
      return res
        .status(200)
        .json({ success: false, message: 'Verification not found' })
    }

    // Update the verification with the callback data
    verification.callbackReceived = true
    verification.callbackTimestamp = new Date()
    verification.status = callbackData.ccrv_status || 'COMPLETED'
    verification.callbackData = callbackData

    await verification.save()

    // Return 200 to acknowledge successful receipt (as per requirements)
    return res
      .status(200)
      .json({ success: true, message: 'Callback received successfully' })
  } catch (error) {
    console.error('Error processing CCRV verification callback:', error)
    // Still return 200 to avoid triggering retries unnecessarily
    return res.status(200).json({
      success: false,
      message: 'Error processing callback, but acknowledged receipt',
      error: error.message
    })
  }
}
