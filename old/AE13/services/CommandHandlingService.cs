using System;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Discord;
using Discord.Commands;
using Discord.WebSocket;


//// READ THE DOCUMENTATAION https://docs.stillu.cc/api/Discord.Commands.CommandService.html#Discord_Commands_CommandService_ExecuteAsync_Discord_Commands_ICommandContext_System_Int32_System_IServiceProvider_Discord_Commands_MultiMatchHandling_

namespace AE13.Services
{
    public class CommandHandlingService
    {
        private readonly CommandService _commands;
        private readonly DiscordSocketClient _discord;
        private readonly IServiceProvider _services;

        public CommandHandlingService(IServiceProvider services)
        {
            _commands = services.GetRequiredService<CommandService>();
            _discord = services.GetRequiredService<DiscordSocketClient>();
            _services = services;
            // Hook CommandExecuted to handle post-command-execution logic.
            _commands.CommandExecuted += CommandExecutedAsync;
            // Hook MessageReceived so we can process each message to see
            // if it qualifies as a command.
            _discord.MessageReceived += MessageReceivedAsync;
            _discord.ReactionAdded += ReactionReceivedAsync;
        }

        public async Task InitializeAsync()
        {
            // Register modules that are public and inherit ModuleBase<T>.
            await _commands.AddModulesAsync(Assembly.GetEntryAssembly(), _services);
        }

        public async Task MessageReceivedAsync(SocketMessage rawMessage)
        {
            // Ignore system messages, or messages from other bots
            // NOTICE HOW WE ASSIGN message HERE
            if (!(rawMessage is SocketUserMessage message)) return;
            if (message.Source != MessageSource.User) return;

            // ensure that our message starts with !
            var argPos = 0;
            if (!message.HasCharPrefix('!', ref argPos)) return;

            Console.WriteLine($"Received message: {message}");

            var context = new SocketCommandContext(_discord, message);
            // Perform the execution of the command
            // The command service will perform precondition and parsing check
            // before executing the command if one is matched.
            await _commands.ExecuteAsync(context, argPos, _services); 
            // Note that normally a result will be returned by this format, but here
            // we will handle the result in CommandExecutedAsync,
        }

        public async Task ReactionReceivedAsync(Cacheable<IUserMessage, ulong> cachedMessage, ISocketMessageChannel originChannel, SocketReaction reaction)
        {
          // testing out how reaction.Emote comes through
          var message = await cachedMessage.GetOrDownloadAsync();
          if (message != null && reaction.User.IsSpecified)
              Console.WriteLine($"{reaction.User.Value} just added a reaction '{reaction.Emote}' " +
                                $"to {message.Author}'s message ({message.Id}).");
        }

        public async Task CommandExecutedAsync(Optional<CommandInfo> command, ICommandContext context, IResult result)
        {
            // command is unspecified when there was a search failure (command not found); we don't care about these errors
            if (!command.IsSpecified)
                return;

            // the command was successful, we don't care about this result, unless we want to log that a command succeeded.
            if (result.IsSuccess)
                return;

            // the command failed, let's notify the user that something happened.
            await context.Channel.SendMessageAsync($"error: {result}");
        }
    }
}