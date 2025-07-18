const { App } = require('@slack/bolt');
const process = require('node:process');
const https = require('node:https');
const fs = require('node:fs');
let data = JSON.parse(fs.readFileSync(process.env.data_file))
let poll_data = JSON.parse(fs.readFileSync(process.env.poll_data_file))
const devChannelId = process.env.devChannelId
const devDmId = process.env.devDmId
const devUid = process.env.devUid
const spamId = process.env.spamId
let name = "AI-chan"
let pfp = ":ai-chan:"
const admins = [
  "U08N10Z3GSG"
]

//message.user and body.user.id have the same length :partyparrot:


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
allUsers = await app.client.users.list({token:process.env.SLACK_BOT_TOKEN})
fs.writeFileSync(process.env.user_data_file, JSON.stringify(allUsers), )
*/
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

//commands that are messaged to AI-chan

app.message('ai-chan on', async ({message, say}) => {
  
  name = "AI-chan"
  pfp = ":ai-chan:"
  await say({
    username: name,
    icon_emoji: pfp,
    text: `the correct mode`
  })

  log(`User <@${message.user}> changed to AI-chan`)

});

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

app.message('bye', async ({message, say}) => {
  say({
    username: name,
    icon_emoji: pfp,
    text: "o(*^▽^*)┛"
  })
});

app.message('get users', async ({}) => {
  allUsers = await app.client.users.list({token:process.env.SLACK_BOT_TOKEN})
  fs.writeFileSync(process.env.user_data_file, JSON.stringify(allUsers), )

})

app.message('hello', async ({say}) => {
  say({
    text: "hai!",
    username: name,
    icon_emoji: pfp,
  })
})

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

app.message('mem', async ({message, say}) => {
  
  name = "Mem"
  pfp = ":mem:"
  await say({
    username: name,
    icon_emoji: pfp,
    text: `Mem memmemmem... Memi memimem memmemmemimemmem ~`
  })

  log(`User <@${message.user}> changed to Mem`)

});

app.message('multipoll', async ({message, say}) => {
  multipoll(message)
  /* i'm stupid i don't need this :) app.client.chat.postMessage({ //this goes last
    username: "AI-chan",
    icon_emoji: ":ai-chan:",
    token: process.env.SLACK_BOT_TOKEN,
    channel: "C094K8W7DU4",
    text: `` //add poll message id here
  }) */
});

app.message('nuke', async ({message, say}) => {
  //nuke [url]
  if (/*admins.includes(message.user )*/true) {
    threadUrl = message.text.split(" ")[1]
    threadUrl = threadUrl.replace("https://", "")
    threadUrlArray = threadUrl.split("/")
    chan_id = threadUrlArray[2]
    ts = threadUrlArray[3].replace("p","")
    ts = ts.slice(0,10) + "." + ts.slice(10)
    /* i dont need this ig???
    thread_to_nuke = await app.client.conversations.history({
      //https://api.slack.com/messaging/retrieving#individual_messages
      token: process.env.SLACK_BOT_TOKEN,
      channel: chan_id,
      latest: ts,
      inclusive: true,
      limit: 1
    });
    */
    thread_to_nuke = await app.client.conversations.replies({
      token: process.env.SLACK_BOT_TOKEN,
      ts: ts,
      channel: chan_id
    })
    for (i = 0; i < thread_to_nuke.messages.length; i++) {
      app.client.chat.delete({
        token: process.env.SLACK_USER_TOKEN,
        ts: thread_to_nuke.messages[i].ts,
        channel: chan_id,
        as_user: true
      })
    }
    
  } else {
    await say({
      username: name,
      icon_emoji: pfp,
      text: "You aren't allowed to do that!"
    })
    log(`<@${message.user} tried to delete a thread!!!! that's not allowed :(`)
  }
})

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

app.message('poll', async ({message, say}) => {
  if (!message.text.includes("multipoll")){poll(message)}
  /* i'm stupid i don't need this :) app.client.chat.postMessage({ //this goes last
    username: "AI-chan",
    icon_emoji: ":ai-chan:",
    token: process.env.SLACK_BOT_TOKEN,
    channel: "C094K8W7DU4",
    text: `` //add poll message id here
  }) */
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
  fs.writeFileSync(process.env.data_file, JSON.stringify(data), )
});

app.message('pulls left hsr', async ({message, say}) => {
  uid = message.user
  temp_data = data[uid].hsr
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
    username: name,
    icon_emoji: pfp,
    text: `<@${message.user}>, You rolled a ${result}`
  })
});

app.message('suggest', async ({message, say}) => {
  await DmToDev(`user <@${message.user}> [${message.user}] sent \`${message.text}\` `)
  await say({
    username: name,
    icon_emoji: pfp,
    text: `<@${devUid}> has received your message!`
  })
})

app.message('update', async ({message, say}) => {
  //update/key/value 
  updateArray = message.text.split("/")
  say({
    username: name,
    icon_emoji: pfp,
    text: `updating key ${updateArray[1]} to value ${updateArray[2]}`
  })
  data[message.user].hsr[updateArray[1]] = updateArray[2]
  fs.writeFileSync(process.env.data_file, JSON.stringify(data), )
});

app.message('yell', async ({message, say}) => {
  say({
    username: name,
    icon_emoji: pfp,
    text:"okidoki"})
  //broadcast message
  allUsers = JSON.parse(fs.readFileSync(process.env.user_data_file))
  log(allUsers.members.length)
  for (i = 0; i < allUsers.members.length; i++) {
    uid = allUsers.members[i].id 
    log(uid)
    app.client.chat.postMessage({
      username: name,
      icon_emoji: pfp,
      token: process.env.SLACK_BOT_TOKEN,
      channel: uid,
      text: `${message.text.slice(5)}`
    })
  }
});

app.message('yap', async ({message, say}) => {
  //yap§<#CHANNELID|>§Text with spaces, and special characters!§ [<@USERTOIMPERSONATE>]
  if (/*message.user == devUid*/ true) {
    regexy = new RegExp("[<@# >]", "g")
    temp_array = message.text.split("§")
    temp_array[1] = temp_array[1].replaceAll(" ", "")
    temp_array[1] = temp_array[1].split("|")
    chan_id = temp_array[1][0].replaceAll(regexy, "")
    log(chan_id)
    if (temp_array.length == 4) {
      //if impersonating somebody
      temp_array[3] = temp_array[3].split("|")
      
      victim_id = temp_array[3][0].replaceAll(regexy, "")
      log(`user ${message.user} is sending a message as user <@${victim_id}> [${victim_id}]`)

      user_profile = await app.client.users.info({
        token: process.env.SLACK_BOT_TOKEN,
        user: victim_id
      })
      log(JSON.stringify(user_profile))
      user_profile = user_profile.user
      app.client.chat.postMessage({
        username: user_profile.profile.display_name,
        icon_url: user_profile.profile.image_48,
        token: process.env.SLACK_BOT_TOKEN,
        channel: chan_id,
        text: `${temp_array[2]}`
      })
    } else {
    app.client.chat.postMessage({
      username: name,
      icon_emoji: pfp,
      token: process.env.SLACK_BOT_TOKEN,
      channel: chan_id,
      text: `${temp_array[2]}`
    })
    say({
      text: "ok",
      username: name,
    icon_emoji: pfp,
    })
    }
  } else {
    say({
      username: name,
      icon_emoji: pfp,
      text: "You aren't allowed to do this!"
    })
  }
})



function poll(message) {
  var pollArray = message.text.split(" ")
  //poll <#chan_id> question option option_with_multiple words...
  //pollArray: 0 = "poll", 1 = <#channelid|>, 2 = question, 3..length = option[_with_multiple_words]
  var regexy = new RegExp("[<#>]", "g")
  channelId = pollArray[1].replaceAll(regexy, "")
  channelId = channelId.split("|")[0]
  question = pollArray[2].replaceAll("_", " ")
  options = pollArray.splice(3)
  for (i = 0; i < options.length; i++) {
    options[i] = options[i].replaceAll("_", " ")
  }
  blocks = `[{ "type": "section", "text": {"type": "mrkdwn", "text": "${question}"} },		{"type": "section","text": {"type": "mrkdwn","text": "Poll Options"},`
  blocks += `"accessory": {"type": "radio_buttons","options": [` 
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
};

function multipoll(message) {
  var pollArray = message.text.split(" ")
  //multipoll <#chan_id> question option option_with_multiple words...
  //pollArray: 0 = "poll", 1 = <#channelid|>, 2 = question, 3..length = option[_with_multiple_words]
  var regexy = new RegExp("[<#>]", "g")
  var channelId = pollArray[1].replaceAll(regexy, "")
  channelId = channelId.split("|")[0]
  var question = pollArray[2].replaceAll("_", " ")
  var options = pollArray.splice(3)
  for (i = 0; i < options.length; i++) {
    options[i] = options[i].replaceAll("_", " ")
  }
  var blocks = `[{ "type": "section","text": {"type": "mrkdwn", "text": "${question}"} },		{"type": "section","block_id": "multipoll" ,"text": {"type": "mrkdwn","text": "Poll Options"},`
  blocks += `"accessory": {"type": "checkboxes","options": [` 
  for (i = 0; i < options.length - 1;) {
    blocks += `{"text": {"type": "mrkdwn", "text": "${options[i]} | 0" },"value": "value_${i}" },`
    i++
  }
  blocks += `{"text": {"type": "mrkdwn", "text": "${options[i]} | 0" },"value": "value_${i}" }`
  blocks += `],
				"action_id": "multi-poll-checked"
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
};




(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);
  date = new Date()
  log(`\\^o^/ AI-chan is running~`)
})();

process.on('SIGINT', (code) => {
  log(`(っ °Д °;)っ AI-chan stopped (;´༎ຶД༎ຶ\`)`)
  process.exit(); 
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

//on modal submit (。・ω・。)

app.view('hsr_data_modal', async ({body, ack}) => {
    log(JSON.stringify(body))
  ack();
  //data[message.user].hsr[key] = value
  data[body.user.id].hsr.jade = body.view.state.values.jade["number_input-action"].value
  data[body.user.id].hsr.starlight = body.view.state.values.starlight["number_input-action"].value
  data[body.user.id].hsr.tickets = body.view.state.values.tickets["number_input-action"].value
  data[body.user.id].hsr.pity = body.view.state.values.pity["number_input-action"].value
  if (body.view.state.values.coin_flip["checkboxes-action"].selected_option.value == "true") {
    data[body.user.id].hsr.lost50_50 = true
  } else {
    data[body.user.id].hsr.lost50_50 = false
  }
  fs.writeFileSync(process.env.data_file, JSON.stringify(data), )
})

app.view('poll_modal', async ({body, ack}) => {
  log(JSON.stringify(body))
  //poll <#chan_id> question option option_with_multiple words...
  var message = {text: ""}
  message.text = `poll <#${body.view.state.values.chan.response.selected_conversation}> ${body.view.state.values.q.response.value.replaceAll(" ", "_")}`
  var array = body.view.state.values.a.response.value.split("\\n")
  for (var baguette = 0; baguette < array.length; baguette++) {
    message.text += " " + array[baguette]
  }
  ack();
  poll(message)
});

app.view('annoy_modal', async ({body, ack}) => {
  //log(JSON.stringify(body))
  var uid = body.view.state.values.uid.uid.selected_user
  //log(uid)
  annoyedDM =  await app.client.conversations.open({
      token: process.env.SLACK_BOT_TOKEN,
      users: uid
    })
  //log(JSON.stringify(annoyedDM))
  app.client.chat.postMessage({
    username: name,
    icon_emoji: pfp,
    token: process.env.SLACK_BOT_TOKEN,
    channel: annoyedDM.channel.id,
    text: `<@${uid}>, somebody tried to annoy you!`
  })
  //log(`<@${message.user}> [${message.user}] tried to annoy <@${annoyedUID}> [${annoyedUID}]`)
  ack();
});




/* i'm giving up on this bc i don't feel like getting around the just a moment and cookies accepty thing
function getAO3Data(url){
  //hehehe
  https.get(url, (res) => {
    res.on('data', (d) => {
    process.stdout.write(d);
  });
  })
}

getAO3Data(process.env.TEST_URL)
*/

//app.action('')


//stuff copied from other stuff i made



allUsers = JSON.parse(fs.readFileSync(process.env.user_data_file))
  for (i = 0; i < allUsers.members.length; i++) {
    uid = allUsers.members[i].id 

app.client.views.publish({
  "user_id": uid,
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
        "action_id": "switch_character"
      }
    },
    {
      "type": "actions",
      "elements": [
        {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": ":mem: Update HSR data",
            "emoji": true
          },
          "value": "update_hsr_data",
          "action_id": "update_hsr_data"
        }
      ]
    },
    {
      "type": "actions",
      "elements": [
        {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "Annoy somebody!",
            "emoji": true
          },
          "value": "annoy_somebody",
          "action_id": "annoy_somebody"
        }
      ]
    },
    {
      "type": "actions",
      "elements": [
        {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "Create a Poll!",
            "emoji": true
          },
          "value": "make_poll",
          "action_id": "make_poll"
        }
      ]
    }
  ]
}  })}

//app home buttons

app.action('annoy_somebody', async ({ body, ack }) => {
  result = await app.client.views.open({
    trigger_id: body.trigger_id,
    token: process.env.SLACK_BOT_TOKEN,
    view: {
      "callback_id": "annoy_modal",
      "external_id": "annoy_modal",
      "type": "modal",
      "title": {
          "type": "plain_text",
          "text": "Annoy Somebody",
          "emoji": true
        },
      "submit": {
        "type": "plain_text",
        "text": "Submit",
        "emoji": true
      },
      "close": {
        "type": "plain_text",
        "text": "Cancel",
        "emoji": true
      },
      "blocks": [
        {
          "block_id": "uid",
          "type": "input",
          "element": {
            "type": "users_select",
            "placeholder": {
              "type": "plain_text",
              "text": "Select users",
              "emoji": true
            },
            "action_id": "uid"
          },
          "label": {
            "type": "plain_text",
            "text": "Label",
            "emoji": true
          }
        }
      ]
    }
  })
});

app.action('make_poll', async ({ body, ack }) => {
  result = await app.client.views.open({
    trigger_id: body.trigger_id,
    token: process.env.SLACK_BOT_TOKEN,
    view: {
            "callback_id":"poll_modal",
      "external_id": "poll_modal",

	"type": "modal",
	"title": {
		"type": "plain_text",
		"text": "Create Poll",
		"emoji": true
	},
	"submit": {
		"type": "plain_text",
		"text": "Submit",
		"emoji": true
	},
	"close": {
		"type": "plain_text",
		"text": "Cancel",
		"emoji": true
	},
	"blocks": [
		{
      "block_id": "q",
			"type": "input",
			"element": {
				"type": "plain_text_input",
				"action_id": "response"
			},
			"label": {
				"type": "plain_text",
				"text": "Question",
				"emoji": true
			}
		},
    {
      "block_id": "chan",
    "type": "input",
    "label": {
      "type": "plain_text",
      "text": "Channel"
    },
    "element": {
      "action_id": "response",
      "type": "conversations_select",
      "placeholder": {
        "type": "plain_text",
        "text": "Select a channel"
      }
    }
  },
		{
      "block_id": "a",
			"type": "input",
			"element": {
				"type": "plain_text_input",
				"multiline": true,
				"action_id": "response"
			},
			"label": {
				"type": "plain_text",
				"text": "Options",
				"emoji": true
			}
		}
	]
}
  })
})

app.action('switch_character', async ({ body, ack }) => {
  await ack();
  log(JSON.stringify(body))
  char = body.actions[0].selected_option.text.text
  if (char == "*AI-chan*") {
    name = "AI-chan"
    pfp = ":ai-chan:"
    log(`User <@${body.user.id}> changed to AI-chan`)
  } else if (char == "*Paimon*") {
    name = "Paimon"
    pfp = ":paimon:"
    log(`User <@${body.user.id}> changed to Paimon`)  
  } else if (char == "*Mem*") {
    name = "Mem"
    pfp = ":mem:"
    log(`User <@${body.user.id}> changed to Mem`)
  }
})

app.action('update_hsr_data', async ({ body, ack }) => {
  
  ack();
  if (data[body.user.id].hsr.lost50_50 == true) {
    fiftyfiftytext = "Yes";
    value5050 = "true"
  } else {
    fiftyfiftytext = "Yes";
    value5050 = "true"
  }
  //log("aaaaaaaaaa, modals suck [actually they're pretty cool]")
  result = await app.client.views.open({
    trigger_id: body.trigger_id,
    token: process.env.SLACK_BOT_TOKEN,
    view: {
      "callback_id":"hsr_data_modal",
      "external_id": "hsr_data_modal",
      "type": "modal",
      "title": {
        "type": "plain_text",
        "text": "Edit HSR Data",
        "emoji": true
      },
      "submit": {
        "type": "plain_text",
        "text": "Submit",
        "emoji": true
      },
      "close": {
        "type": "plain_text",
        "text": "Cancel",
        "emoji": true
      },
      "blocks": [
        {
          "type": "input",
          "block_id": "jade",
          "element": {
            "type": "number_input",
            "is_decimal_allowed": false,
            "action_id": "number_input-action"
          },
          "label": {
            "type": "plain_text",
            "text": "Jade",
            "emoji": true
          },
          "hint": {
            "type": "plain_text",
            "text": data[body.user.id].hsr.jade.toString(),
            "emoji": true
          }
        },
        {
          "type": "input",
          "block_id": "tickets",
          "element": {
            "type": "number_input",
            "is_decimal_allowed": false,
            "action_id": "number_input-action"
          },
          "label": {
            "type": "plain_text",
            "text": "Tickets",
            "emoji": true
          },
          "hint": {
            "type": "plain_text",
            "text": data[body.user.id].hsr.tickets.toString(),
            "emoji": true
          }
        },
        {
          "type": "input",
          "block_id": "starlight",
          "element": {
            "type": "number_input",
            "is_decimal_allowed": false,
            "action_id": "number_input-action"
          },
          "label": {
            "type": "plain_text",
            "text": "Starlight",
            "emoji": true
          },
          "hint": {
            "type": "plain_text",
            "text": data[body.user.id].hsr.starlight.toString(),
            "emoji": true
          }
        },
        {
          "type": "input",
          "block_id": "pity",
          "element": {
            "type": "number_input",
            "is_decimal_allowed": false,
            "action_id": "number_input-action"
          },
          "label": {
            "type": "plain_text",
            "text": "Pity",
            "emoji": true
          },
          "hint": {
            "type": "plain_text",
            "text": data[body.user.id].hsr.pity.toString(),
            "emoji": true
          }
        },
        
        {
          "type": "input",
          "block_id": "coin_flip",
          "element": {
            "type": "radio_buttons",
            "initial_option": {
                "text": {
                  "type": "plain_text",
                  "text": fiftyfiftytext,
                  "emoji": true
                },
                "value": value5050
              },
            "options": [
              {
                "text": {
                  "type": "plain_text",
                  "text": "Yes",
                  "emoji": true
                },
                "value": "true"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "No",
                  "emoji": true
                },
                "value": "false"
              }
            ],
            "action_id": "checkboxes-action"
          },
          "label": {
            "type": "plain_text",
            "text": "Did you lose your last 50/50?",
            "emoji": true
          }
        }
      ]
    }
  })
  log(JSON.stringify(result))
});

//other interaction

app.action('poll-checked', async ({ body, ack }) => {
  await ack();
  //log(JSON.stringify(body))
  clicked = body.actions[0].selected_option.value
  blocks = body.message.blocks
  options = blocks[1].accessory.options
  for (n = 0; n < options.length; n++) {
    if (options[n].value == clicked) {
      break;
    }
  }
  /*
  textToChange = options[n].text.text
  textToChangeArray = textToChange.split("| ")
  textToChangeArray[1] = parseInt(textToChangeArray[1]) + 1
  blocks[1].accessory.options[n].text.text = textToChangeArray[0] + "| " + textToChangeArray[1]
  */

  poll_data[body.user.id][body.container.channel_id + body.container.message_ts] = n
  fs.writeFileSync(process.env.poll_data_file, JSON.stringify(poll_data), )
  for (x = 0; x < options.length; x++) {
    //clear the poll
      textToChange = options[x].text.text
      textToChangeArray = textToChange.split("| ")
      textToChangeArray[1] = 0
      blocks[1].accessory.options[x].text.text = textToChangeArray[0] + "| " + textToChangeArray[1]
    
  }
  for (x = 0; x < Object.keys(poll_data).length; x++) {
    //get the persons poll data > get the poll > get which one is clicked > add 1
    textToChange = options[poll_data[Object.keys(poll_data)[x]][body.container.channel_id + body.container.message_ts]].text.text
    textToChangeArray = textToChange.split("| ")
    textToChangeArray[1] = parseInt(textToChangeArray[1]) + 1
    blocks[1].accessory.options[poll_data[Object.keys(poll_data)[x]][body.container.channel_id + body.container.message_ts]].text.text = textToChangeArray[0] + "| " + textToChangeArray[1]
  }
  //log(blocks)
  app.client.chat.update({
    token: process.env.SLACK_BOT_TOKEN,
    ts: body.message.ts,
    channel: body.channel.id,
    blocks: blocks //edit these blocks!
  })
  //log(body.toString())
});

app.action('multi-poll-checked', async ({ body, ack }) => {
  await ack();
  log(JSON.stringify(body))
  var clicked = body.state.values.multipoll["multi-poll-checked"].selected_options
  var clicked_neat = []
  var blocks = body.message.blocks
  var options = blocks[1].accessory.options
  blocks[1].accessory.initial_options = []
  for (n = 0; n < clicked.length; n++) {
    clicked_neat[n] = parseInt(clicked[n].value.replace("value_", ""))
    
  }
  poll_data[body.user.id][body.container.channel_id + body.container.message_ts] = clicked_neat
  /*
  var options = blocks[1].accessory.options
  for (n = 0; n < options.length; n++) {
    if (options[n].value == clicked) {
      break;
    }
  }
  /*
  textToChange = options[n].text.text
  textToChangeArray = textToChange.split("| ")
  textToChangeArray[1] = parseInt(textToChangeArray[1]) + 1
  blocks[1].accessory.options[n].text.text = textToChangeArray[0] + "| " + textToChangeArray[1]
  */

  //poll_data[body.user.id][body.container.channel_id + body.container.message_ts] = n

  fs.writeFileSync(process.env.poll_data_file, JSON.stringify(poll_data), )
  for (x = 0; x < options.length; x++) {
    //clear the poll
      textToChange = options[x].text.text
      textToChangeArray = textToChange.split("| ")
      textToChangeArray[1] = 0
      blocks[1].accessory.options[x].text.text = textToChangeArray[0] + "| " + textToChangeArray[1]
    
  }
  var poll_data_person
  for (x = 0; x < Object.keys(poll_data).length; x++) {
    //~~get the persons poll data > get the poll > get which one is clicked > add 1~~
    
    /*
    textToChange = options[poll_data[Object.keys(poll_data)[x]][body.container.channel_id + body.container.message_ts]].text.text
    textToChangeArray = textToChange.split("| ")
    textToChangeArray[1] = parseInt(textToChangeArray[1]) + 1
    blocks[1].accessory.options[poll_data[Object.keys(poll_data)[x]][body.container.channel_id + body.container.message_ts]].text.text = textToChangeArray[0] + "| " + textToChangeArray[1]
    */
    poll_data_person = poll_data[Object.keys(poll_data)[x]][body.container.channel_id + body.container.message_ts]
    //poll data : [0, 2] etc.
    //get the persons poll data > get poll > get which is clicked > repeat for length > add 1 ig ?
    for (n = 0; n < poll_data_person.length; n++) {
      textToChange = options[poll_data[Object.keys(poll_data)[x]][body.container.channel_id + body.container.message_ts][n]].text.text
      textToChangeArray = textToChange.split("| ")
      textToChangeArray[1] = parseInt(textToChangeArray[1]) + 1
      blocks[1].accessory.options[poll_data[Object.keys(poll_data)[x]][body.container.channel_id + body.container.message_ts][n]].text.text = textToChangeArray[0] + "| " + textToChangeArray[1]
    }
  }
  for (n = 0; n < clicked.length; n++) {
    //blocks[1].accessory.options[parseInt(clicked[n].value.replace("value_", ""))]
    blocks[1].accessory.initial_options[n] = blocks[1].accessory.options[parseInt(clicked[n].value.replace("value_", ""))]
    console.log(blocks[1].accessory.options[parseInt(clicked[n].value.replace("value_", ""))])
  }
  //log(blocks)
  app.client.chat.update({
    token: process.env.SLACK_BOT_TOKEN,
    ts: body.message.ts,
    channel: body.channel.id,
    blocks: blocks //edit these blocks!
  })
  //log(body.toString())
});

//just useful stuff

function rand(max, min = 0) {
  max = parseInt(max)
    //max will never be returned (i should have noticed this)
    return Math.floor(Math.random() * (max - min) + min)
}