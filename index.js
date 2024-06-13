const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Endpoint to receive webhook notifications
app.post('/webhook', (req, res) => {
  const notification = req.body;
  
  // Log the notification payload
  console.log('Received notification:', notification);

  // Process the notification
  if (notification.type === 'validator_status') {
    handleValidatorStatus(notification);
  } else {
    console.log('Unknown notification type:', notification.type);
  }

  res.status(200).send('Webhook received');
});

function handleValidatorStatus(notification) {
  const { validator_id, status, timestamp } = notification;
  
  console.log(`Validator ${validator_id} has status ${status} at ${new Date(timestamp * 1000).toISOString()}`);
  
  // Add your custom logic here to handle the validator status change
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
