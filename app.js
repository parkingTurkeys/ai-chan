const { App } = require('@slack/bolt');
const process = require('node:process');
const devChannelId = "C094628GGR4"
const devDmId = "D0909H55R2N"
const devUid = "U08N10Z3GSG"
let name = "AI-chan"
let pfp = ":ai-chan:"
const admins = [
  "U08N10Z3GSG"
]


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
  log(`User <@${message.user}> sent message: ${messageNoCmd}`)
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
  log(`User <@${message.user}> rolled die: ${messageNoCmd}, and received a ${result}`)
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

  await logToDev(`User <@${message.user}> changed to Mem`)

});

app.message('paimon', async ({message, say}) => {
  
  name = "Paimon"
  pfp = ":paimon:"
  await say({
    username: name,
    icon_emoji: pfp,
    text: `idk what to say i don't play genshin`
  })

  log(`User <@${message.user}> changed to Paimon`)

});

app.message('suggest', async ({message, say}) => {
  await DmToDev(`user <@${message.user}> [${message.user}] sent \`${message.text}\` `)
  await say({
    username: name,
    icon_emoji: pfp,
    text: `<@${devUid}> has received your message!`
  })
})

app.message('annoy', async ({message, say}) => {

  messageNoCmd = message.text.slice(6)
  annoyedUID = messageNoCmd.slice(2,13)
  await say({
    username: name,
    icon_emoji: pfp,
    text: `You annoyed <@${annoyedUID}>!`
  })
  try {
    annoyedDM =  app.client.conversations.open({
      token: process.env.SLACK_BOT_TOKEN,
      users: annoyedUID
    })
    app.client.chat.postMessage({
      username: name,
      icon_emoji: pfp,
      token: process.env.SLACK_BOT_TOKEN,
      channel: annoyedUID,
      text: `<@${annoyedUID}>, somebody tried to annoy you!`
    })
    log(`<@${message.user}> [${message.user}] tried to annoy <@${annoyedUID}> [${annoyedUID}]`)
} catch (error) {
    log(`${error} was logged while <@${message.user}> [${message.user}] tried to annoy <@${annoyedUID}> [${annoyedUID}]`)
  }
  
});

app.message('', async ({message, say}) => {
  profile = app.client.users.profile.get({
    token: process.env.SLACK_BOT_TOKEN,
    user: message.user
  })
  log(message.text + " - <@" + message.user + ">");

} );

/* i'll try this later[tm]
app.message('nuke', async ({message, say}) => {
  if (admins.includes(message.user)) {
    threadUrl = message.text.split(" ")[1]
  } else {
    await say({
      username: name,
      icon_emoji: pfp,
      text: "You aren't allowed to do that!"
    })
    log(`<@${message.user} tried to delete a thread!!!! that's not allowed :(`)
  }
})
  */

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
  date = new Date()
  log(`\\^o^/ AI-chan is running~`)
})();

process.on('exit', (code) => {
  log(`(っ °Д °;)っ AI-chan stopped (;´༎ຶД༎ຶ\`)`)
})

// https://stackoverflow.com/a/51454798
process.on
(
    'uncaughtException',
    function (err)
    {
        
        log(`${err}`)
    }
);

//when sending to me, it's always ai bc i like hi3 > hsr

function logToDev(text) {
  date = new Date()
  app.client.chat.postMessage({
    username: "AI-chan",
    icon_emoji: ":ai-chan:",
    token: process.env.SLACK_BOT_TOKEN,
    channel: devChannelId,
    text: `\`${date.getHours().toString()}:${date.getMinutes().toString()}:${date.getSeconds().toString()} -- ${text}\``
  })
}

function logToTerminal(text) {
  date = new Date()
  console.log(`${date.getHours().toString()}:${date.getMinutes().toString()}:${date.getSeconds().toString()} -- ${text}`)
}

function log(text) {
  logToTerminal(text)
  logToDev(text)
}

function DmToDev(text) {
  app.client.chat.postMessage({
    username: "AI-chan",
    icon_emoji: ":ai-chan:",
    token: process.env.SLACK_BOT_TOKEN,
    channel: devDmId,
    text: text
  })
}


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