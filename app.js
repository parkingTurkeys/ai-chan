const { App } = require('@slack/bolt');
const devChannelId = "C094628GGR4"
const name = "AI-chan"
const pfp = ":ai-chan:"


/**
 * This sample slack application uses SocketMode.
 * For the companion getting started setup guide, see:
 * https://tools.slack.dev/bolt-js/getting-started/
 */

// Initializes your app with your bot token and app token
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN
});

/* 
blocks: [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `Hey there <@${message.user}>!`
        },
        "accessory": {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "Click Me"
          },
          "action_id": "button_click"
        }
      }
    ],
    text: `Hey there <@${message.user}>!`

*/

// Listens to incoming messages that contain "log"
app.message('log', async ({ message, say }) => {
  
  messageNoLog = message.text.slice(4)
  await app.client.chat.postMessage({
    username: name,
    icon_emoji: pfp,
    token: process.env.SLACK_BOT_TOKEN,
    channel: devChannelId,
    text: `User <@${message.user}> sent message: ${messageNoLog}`
  })
  await say({
    text: `Log seen <@${message.user}>!`
  }
  )
  ;
});

app.client.views.publish({
  "user_id": "U08N10Z3GSG",
  "view": {
    "type": "home",
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "Pick an item from the dropdown list"
        },
        "accessory": {
          "type": "static_select",
          "placeholder": {
            "type": "plain_text",
            "text": "Select who you want to see!",
            "emoji": true
          },
          "options": [
            {
              "text": {
                "type": "plain_text",
                "text": "*AI-chan*",
                "emoji": true
              },
              "value": "value-0"
            },
            {
              "text": {
                "type": "plain_text",
                "text": "*Mem*",
                "emoji": true
              },
              "value": "value-1"
            },
            {
              "text": {
                "type": "plain_text",
                "text": "*Paimon*",
                "emoji": true
              },
              "value": "value-2"
            }
          ],
          "action_id": "static_select-action"
        }
      }
    ]
}})

/*
app.action('button_click', async ({ body, ack, say }) => {
  // Acknowledge the action
  await ack();
  await say(`<@${body.user.id}> clicked the button`);
});
*/


(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  app.logger.info('\^o^/ AI-chan is running~');
})();
