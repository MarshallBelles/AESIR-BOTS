import discord

client = discord.Client()

@client.event
async def on_message(message):
    if message.author == client.user: # ensures we don't reply to our own messages
        return

    if message.content.startswith('!mp'):
        await message.channel.send('You called?')

client.run ('Nzc2NDczMTczNTI4NDEyMjMw.X61Y_g.RhJ8yyx-twKQYutuikAJCDjeE_A')