const AWS = require('aws-sdk');

module.exports = async function (userId, movieId, eventValue, genres, sessionId) {

  new Promise(function(success, reject){
    const params = {
      eventList: [
        {
          eventType: 'RATEING',
          sentAt: new Date(),
          properties: {
            eventValue: eventValue,
            itemId: `${movieId}`,
            genres: genres
          }
        }
      ],
      sessionId: sessionId,
      trackingId: '6a38e634-d16b-4577-92c7-a414b4d2dc1e',
      userId: `${userId}`
    }
    const personalizeevents = new AWS.PersonalizeEvents();
    personalizeevents.putEvents(params, function (error, data) {
      if (error) {
        reject(error);
      } else {
        success(data);
      }
    });
  });
  
}