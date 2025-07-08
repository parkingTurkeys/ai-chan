const { App } = require('@slack/bolt');
const process = require('node:process');
const fs = require('node:fs');
let data = JSON.parse(fs.readFileSync('data.json'))
const devChannelId = "C094628GGR4"
const devDmId = "D0909H55R2N"
const devUid = "U08N10Z3GSG"
const spamId = "C094FCQM1KP"
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


app.message('yell', async ({message, say}) => {
  say({text:"okidoki"})
  //broadcast message
  allUsers = app.client.users.list({token:process.env.SLACK_BOT_TOKEN}) //not working i am bad at this lmao
  log(allUsers)
  for (i = 0; i < all.length; i++) {
    uid = allUsers.members[i].id 
    log(uid)
    client.app.chat.postMessage({
      username: name,
      icon_emoji: pfp,
      token: process.env.SLACK_BOT_TOKEN,
      channel: uid,
      text: `${message.text.slice(6)}`
    })
  }
});

app.message('yap', async ({message, say}) => {
  //yap§<#CHANNELID|>§Text with spaces, and special characters!/[<@USERTOIMPERSONATE>]
  if (message.user == devUid) {
    temp_array = message.text.split("§")
    temp_array[1] = temp_array[1].split("|")
    chan_id = temp_array[1][0].slice(2)
    if (temp_array.length == 4) {
      //if impersonating somebody
      temp_array[3] = temp_array[3].split("|")
      victim_id = temp_array[3][0].slice(2)
      user_profile = await app.client.users.info({
        token: process.env.SLACK_BOT_TOKEN,
        user: victim_id
      })
      user_profile = user_profile.user

      client.app.chat.postMessage({
        username: user_profile.display_name,
        icon_emoji: user_profile.profile.image_48,
        token: process.env.SLACK_BOT_TOKEN,
        channel: chan_id,
        text: `${temp_array[2]}`
      })
    } else {
    client.app.chat.postMessage({
      username: name,
      icon_emoji: pfp,
      token: process.env.SLACK_BOT_TOKEN,
      channel: chan_id,
      text: `${temp_array[2]}`
    })
    say({
      text: "ok"
    })
    }
  } else {
    say({
      text: "You aren't allowed to do this!"
    })
  }
})

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

//poll #channel question_with_multiple_words option option option_with_multiple_words
/*
blocks[3].options  where value == clicked .text > .split("| ") change the second one +1 or -1
{
	"blocks": [
		{ "type": "section", "text": {"type": "plain_text", "text": "Poll Question", "emoji": true } }, # done
		{"type": "section","text": {"type": "mrkdwn","text": "Poll Options"}, # done
    "accessory": {"type": "checkboxes","options": [
    {"text": {"type": "mrkdwn", "text": "*this is mrkdwn text*" }, "description": { "type": "mrkdwn", "text": "*this is mrkdwn text*"},"value": "value-0" },
					{
						"text": {
							"type": "mrkdwn",
							"text": "*this is mrkdwn text*"
						},
						"description": {
							"type": "mrkdwn",
							"text": "*this is mrkdwn text*"
						},
						"value": "value-1"
					},
					{
						"text": {
							"type": "mrkdwn",
							"text": "*this is mrkdwn text*"
						},
						"description": {
							"type": "mrkdwn",
							"text": "*this is mrkdwn text*"
						},
						"value": "value-2"
					}
				],
				"action_id": "checkboxes-action"
			}
		}
	]
}
*/

app.message('update', async ({message, say}) => {
  //update/key/value 
  updateArray = message.text.split("/")
  say({
    text: `updating key ${updateArray[1]} to value ${updateArray[2]}`
  })
  data[message.user].hsr[updateArray[1]] = updateArray[2]
  fs.writeFileSync('data.json', JSON.stringify(data), )
});

app.message('pull hsr', async ({message, say}) => {
  //pull hsr *$times *$whichonewas5staror0ifnot $5050waslost?
  //one pass costs 160 jade in hsr; half pity is 90, then id you lose your 50/50 you're guerranteed a win after another 90
  pullArray = message.text.split(" ")
  pullArray[2] = parseInt(pullArray[2])
  pullArray[3] = parseInt(pullArray[3])
  if (pullArray[3] == 0) {
    //if did not get 5 star
    data[message.user].hsr.pity = parseInt(data[message.user].hsr.pity) + parseInt(pullArray[2])
    

  } else {
    //if get 5 star
    pity = pullArray[3]
    if (pullArray[4]) {
      data[message.user].hsr.lost50_50 = true
    } else {
      data[message.user].hsr.lost50_50 = false
    }
  }
  if (tickets >= pullArray[2]) {
      //if tickets were used
      data[message.user].hsr.tickets = parseInt(data[message.user].hsr.tickets) - parseInt(pullArray[2])
    } else {
      //if [tickets and] jade [was|were] used
      jadeUsed = pullArray[2] - parseInt(data[message.user].hsr.tickets)
      data[message.user].hsr.tickets = 0
      data[message.user].hsr.jade = parseInt(data[message.user].hsr.jade) - jadeUsed*160
    }
  fs.writeFileSync('data.json', JSON.stringify(data), )
});

app.message('pulls left hsr', async ({message, say}) => {
  uid = message.user
  temp_data = data[message.user].hsr
  jades = parseInt(temp_data.jade)
  starlights = parseInt(temp_data.starlight)
  ticketss = parseInt(temp_data.tickets)
  pityy = parseInt(temp_data.pity)
  pulls_left = Math.floor(jades/160) + Math.floor(starlights/20) + Math.floor(ticketss)
  pity_plus_pulls = Math.floor(jades/160) + Math.floor(starlights/20) + Math.floor(ticketss) + Math.floor(pityy)
  say({
    username: name,
    icon_emoji: pfp,
    text: `You have ${pulls_left} pulls if you use all of your resources! This would give you ${pity_plus_pulls} pity ~`
  })
})


app.message('poll', async ({message, say}) => {
  pollArray = message.text.split(" ")
  //pollArray: 0 = "poll", 1 = <#channelid|>, 2 = question, 3..length = option[_with_multiple_words]
  regexy = new RegExp("[<#>]", "g")
  channelId = pollArray[1].replaceAll(regexy, "")
  channelId = channelId.split("|")[0]
  question = pollArray[2].replaceAll("_", " ")
  options = pollArray.splice(3)
  for (i = 0; i < options.length; i++) {
    options[i] = options[i].replaceAll("_", " ")
  }
  blocks = `[{ "type": "section", "text": {"type": "mrkdwn", "text": "${question}"} },		{"type": "section","text": {"type": "mrkdwn","text": "Poll Options"},`
  blocks += `"accessory": {"type": "checkboxes","options": [` 
  for (i = 0; i < options.length - 1;) {
    blocks += `{"text": {"type": "mrkdwn", "text": "${options[i]} | 0" },"value": "value_${i}" },`
    i++
  }
  blocks += `{"text": {"type": "mrkdwn", "text": "${options[i]} | 0" },"value": "value_${i}" }`
  blocks += `],
				"action_id": "poll-checked"
			}

}]`
  log(blocks)
  blocks = JSON.parse(blocks)
  app.client.chat.postMessage({
    username: name,
    icon_emoji: pfp,
    token: process.env.SLACK_BOT_TOKEN,
    channel: channelId,
    text: `poll with question ${question}`,
    blocks: blocks 
  })
  /* i'm stupid i don't need this :) app.client.chat.postMessage({ //this goes last
    username: "AI-chan",
    icon_emoji: ":ai-chan:",
    token: process.env.SLACK_BOT_TOKEN,
    channel: "C094K8W7DU4",
    text: `` //add poll message id here
  }) */
});





(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);
  date = new Date()
  log(`\\^o^/ AI-chan is running~`)
})();

process.on('SIGINT', (code) => {
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

app.action('poll-checked', async ({ body, ack }) => {
  await ack();
  clicked = body.actions.value
  blocks = body.message.blocks
  options = blocks[2].options
  for (n = 0; n < options.length; n++) {
    if (options[n].value == clicked) {
      break;
    }
  }
  textToChange = blocks[2].options[n].text.text
  textToChangeArray = textToChange.split("| ")
  log(blocks)
  app.client.chat.update({
    token: process.env.SLACK_BOT_TOKEN,
    ts: body.message.ts,
    channel: body.channel.id,
    blocks: blocks //edit these blocks!
  })
  log(body.toString())
});

//stuff copied from other stuff i made

function rand(max, min = 0) {
  max = parseInt(max)
    //max will never be returned (i should have noticed this)
    return Math.floor(Math.random() * (max - min) + min)
}

//IT'S TIME TO GO INSANE WITH GACHA GAMES !!!
function calculatePulls(data /*tickets, jade, starlight, ~~embers, usedEmbers,~~ [who cares abt embers] pity, lost50_50, chara|lcs, ~~rateUp~~ [global] */ ) {

}