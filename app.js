const { App } = require('@slack/bolt');
const devChannelId = "C094628GGR4"
let name = "AI-chan"
let pfp = ":ai-chan:"


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
  
  messageNoCmd = message.text.slice(4)
  await app.client.chat.postMessage({
    username: name,
    icon_emoji: pfp,
    token: process.env.SLACK_BOT_TOKEN,
    channel: devChannelId,
    text: `User <@${message.user}> sent message: ${messageNoCmd}`
  })
  await say({
    username: name,
    icon_emoji: pfp,
    text: `Log seen <@${message.user}>!`
  }
  )
  ;
});

app.message('roll', async ({message, say}) => {
  await say({
    username: name,
    icon_emoji: pfp,
    text: "Rolling die..."
  })
  //example message: "roll 1d4 + 3"
  messageNoCmd = message.text.slice(5)
  result = rollDie(messageNoCmd)
  await app.client.chat.postMessage({
    username: name,
    icon_emoji: pfp,
    token: process.env.SLACK_BOT_TOKEN,
    channel: devChannelId,
    text: `User <@${message.user}> rolled die: ${messageNoCmd}, and received a ${result}`
  })
  await say({
    text: `<@${message.user}>, You rolled a ${result}`
  })
});

app.message('mem', async ({message, say}) => {
  
  name = "Mem"
  pfp = ":mem:"
  await say({
    username: name,
    icon_emoji: pfp,
    text: `Mem memmemmem... Memi memimem memmemmemimemmem ~`
  })

  await app.client.chat.postMessage({
    username: name,
    icon_emoji: pfp,
    token: process.env.SLACK_BOT_TOKEN,
    channel: devChannelId,
    text: `User <@${message.user}> changed to Mem`
  })

});

/* idk why but this won't work

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

*/
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

  app.logger.info('\\^o^/ AI-chan is running~');
})();


function rollDie(die) {
  //example: "2d5 + 4"
  die = die.replaceAll(" ", "")
  //example: "2d5+4"
  numberThings = die.split("+")
  numberThingsInts = []
  
  for (i = 0; i < numberThings.length; i++) {
    if (numberThings[i].includes("d")) {
      //numberThings[i] = ((numberThings[i].split("d")[1] + 1)/ 2) * numberThings[i].split("d")[0] | i'm an idiot this is the average
      number = 0
      for (n = 0; n < parseInt(numberThings[i].split("d")[0]); n++) {
        number += rand(numberThings[i].split("d")[1]) + 1 
      }
      numberThings[i] = number
    }
  }
  result = 0
  for (i = 0; i < numberThings.length; i++) {
    result += numberThings[i]
  }
  return result
}


//stuff copied from other stuff i made

function rand(max, min = 0) {
  max = parseInt(max)
    //max will never be returned (i should have noticed this)
    return Math.floor(Math.random() * (max - min) + min)
}