import discord

client = discord.Client()

@client.event
async def on_message(message):
    # ensure we don't reply to our own messages
    if message.author == client.user: 
        return

    if message.content.startswith('!mp'):
        req = message.content.split()
        if req[1] == 'join':
            await message.channel.send("So you're interested in our mining program, huh? We'd love to have you as part of the wolf pack!")
        elif req[1] == 'hello':
            await message.channel.send("So you're interested in our mining program, huh? We'd love to have you as part of the wolf pack!")
        elif req[1] == 'leave':
            await message.channel.send("You have successfully removed yourself from the Aesir Mining Program")
            await message.channel.send("Please direct feedback to Ethos Ari")
            await message.channel.send("Thank you for participating as part of the pack!")
            await message.channel.send('<:direwolf:776488702468685854>')
        elif req[1] == 'help':
            await message.channel.send("I can help you! \n \n Proper usage: !mp [option] [value] \n \n Examples: \n * !mp join (to join the mining program) \n * !mp sell 5000 spodumain (to tell us you want to sell 5000 spodumain) \n \n Options: \n * help \n * join \n * leave \n * sell [quantity] [ore]")
        else:
            await message.channel.send("I don't understand your request! \n \n Proper usage: !mp [option] [value] \n \n Examples: \n * !mp join (to join the mining program) \n * !mp sell 5000 spodumain (to tell us you want to sell 5000 spodumain) \n \n Options: \n * help \n * join \n * leave \n * sell [quantity] [ore]")


client.run ('Nzc2NDczMTczNTI4NDEyMjMw.X61Y_g.RhJ8yyx-twKQYutuikAJCDjeE_A')