//https://docs.amplify.aws/lib/analytics/personalize/q/platform/js#installation-and-configuration

import { Analytics, AmazonPersonalizeProvider } from 'aws-amplify';
import { Auth } from 'aws-amplify';

Analytics.addPluggable(new AmazonPersonalizeProvider());
Analytics.configure({
  AmazonPersonalize: {
    trackingId: '6a38e634-d16b-4577-92c7-a414b4d2dc1e',
    region: 'eu-west-1',
  }
});

type EventType = 'RATING' | 'SEARCH';

export async function PutEvent(eventType: EventType, itemId: string, eventValue: number) {
  const user = await Auth.currentAuthenticatedUser();
  const options = {
    eventType,
    userId: user.attributes.sub,
    properties: {
      "itemId": `${itemId}`,
      "eventValue": `${eventValue}`
    }
  };
  console.log(Analytics);
  const response = await Analytics.record(options, "AmazonPersonalize");
  console.log('RESPONSE', response);
}