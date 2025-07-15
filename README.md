# AICHAN SLACKBOT  
  
uhhhhh...  
  
it does slackbot things?  
  
name is an [HI3](https://en.wikipedia.org/wiki/Honkai_Impact_3rd) reference  
  
## Commands  
  
Write these commands by dming them to AI-chan  
  
### get users  
  
Update the cached list of users/pfps/usernames  
  
syntax: `get users`  
example: `get users`  
  
### yell  
  
Send a message from Slackbot to everybody   
  
syntax: `yell [message]`  
example `yell hello world`  
  
### yap  
  
Send a message [as somebody else/ as AI-chan*]  
  
syntax: `yap§ #[channel] §[message]§ @[user]` [spaces optional]  
example: `yap§ #lounge§hello world§ @Slackbot`  
example: `yap§ #lounge§hello world` [sends as AI-chan]  
  
### log  
  
Log a message to the terminal hosting the app and to whatever channel id is specified as `devChannelId`  
  
syntax: `log [message]`  
example: `log hello world`  
  
### roll  
  
Roll a die! [uses D&D notation]  
  
syntax: `roll [die]`   
example: `roll 1d6`  
example: `roll 2d7 + 1d5 + 8`  
  
### mem  
  
Switch AI-chan* to Mem [does it for everyone]  
  
syntax: `mem`  
example: `mem`  
  
### paimon  
  
Switch AI-chan* to Paimon [does it for everyone]  
  
syntax: `paimon`  
example: `paimon`  
  
### suggest  
  
Dms whoevers DM channel ID is set as `devDmUid`  
  
syntax: `suggest [message]`  
example: `suggest hello world`  
  
### annoy  
  
Sends a message [not changeable] from AI-chan* to the user specified; the message is `@user, somebody tried to annoy you!`  
  
syntax: `annoy @[user]`  
example: `annoy @Slackbot`  
  
  
### update
  
Update your HSR data
  
syntax: `update/[key]/[value]`
example: `update/jade/1000000` [i wish :(]

Options for keys: `jade, starlight, pity, tickets, lost50_50, chara.* [unused]`  
Note: data may be assumed to be for limited character banners, but it should work for other stuff

### pull hsr
  
Update hsr data easily
  
syntax: `pull hsr [amount of times] [which one was 5 star or 0 if you didn't get one] [[did you lose your 50/50 [optional]]]`
example: `pull hsr 20 17 true` > you pull 20 times and get a 5 star on your 17th pull, but it isn't the featured one
example: `pull hsr 80 0` > you pull 80 times and don't get a 5 star

### pulls left hsr

See how many pulls you have available; UPDATE YOUR DATA FIRST!!!!!!

syntax: `pulls left hsr`
example: `pulls left hsr`

### poll

Send a poll! Replace the spaces in the question and options with underscores [`_`]

syntax: `poll #[channel] [question] [option_1]..[option_n]`
example: `poll #lounge What_is_your_preferred_AI_mode? AI-chan_(the_correct_one) Paimon Mem`

### hello
  
fairly self-explanatory

### bye

same as hello



  
*or whoever she is set to