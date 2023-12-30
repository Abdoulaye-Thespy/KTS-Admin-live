/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = event => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const { Expo } = require('expo-server-sdk');

  // Create a new Expo SDK client
  // optionally providing an access token if you have enabled push security
  let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });

  // Create the messages that you want to send to clients
   let messages = [];

  for (const record of event.Records) {
    console.log('DynamoDB Record: %j', record.dynamodb);
    if (record.eventName === 'MODIFY') {
      // Access the modified item in the record
      const oldItem = record.dynamodb.OldImage;
      const newItem = record.dynamodb.NewImage;

      // Compare the attributes
      const changedAttributes = {};
      for (const key in newItem) {
        if (!oldItem || JSON.stringify(oldItem[key]) !== JSON.stringify(newItem[key])) {
          changedAttributes[key] = newItem[key];
        }
      }
      
      const pushToken = newItem.ParentPushToken.S;
      // const pushToken="ExponentPushToken[lmxDQKKXKq9GFUUcaQlBy7]";
      console.log("Changed attributes", changedAttributes);

      if (changedAttributes.pickTime) {
        console.log("Hello, Admin has specified your child pickTime", changedAttributes.pickTime);

        // Check that the push token is a valid Expo push token
        if (!Expo.isExpoPushToken(pushToken)) {
          console.error(`Push token ${pushToken} is not a valid Expo push token`);
          // Handle the error or continue with the loop
        }
        else {
        messages.push({
          to: pushToken,
          sound: 'default',
          title: `${newItem.student.S}`,
          body: `Pick Up time: ${newItem.pickTime.S}`,
          data: { id: newItem.student_id, modified: "pickTime", modifiedValue: newItem.pickTime },
        });

        }

      }
      
      
      
      if (changedAttributes.driverMorning) {
        console.log("Morning driver", newItem.driverEvening.name);

        // Check that the push token is a valid Expo push token
        if (!Expo.isExpoPushToken(pushToken)) {
          console.error(`Push token ${pushToken} is not a valid Expo push token`);
          // Handle the error or continue with the loop
        }
        else {
        messages.push({
          to: pushToken,
          sound: 'default',
          title: `${newItem.student.S}`,
          body: 'Morning driver is Set',
          data: { id: newItem.student_id},
        });

        }

      }
      
       if (changedAttributes.driverEvening) {
        console.log("Morning Evening", newItem.driverMorning.name);

        // Check that the push token is a valid Expo push token
        if (!Expo.isExpoPushToken(pushToken)) {
          console.error(`Push token ${pushToken} is not a valid Expo push token`);
          // Handle the error or continue with the loop
        }
        else {
        messages.push({
          to: pushToken,
          sound: 'default',
          title: `${newItem.student.S}`,
          body: 'Evening driver is Set',
          data: { withSome: newItem.driverEvening.name},
        });

        }

      }
      
    }
  }

  // Send the push notifications
  const chunks = expo.chunkPushNotifications(messages);
  const sendPromises = [];
  for (const chunk of chunks) {
    sendPromises.push(expo.sendPushNotificationsAsync(chunk));
  }

  return Promise.all(sendPromises)
    .then(() => {
      console.log('Push notifications sent successfully');
      return 'Successfully processed DynamoDB record';
    })
    .catch(error => {
      console.error('Error sending push notifications:', error);
      throw error;
    });
};