using System;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Discord;
using Discord.WebSocket;
using Discord.Commands;
using AE13.Services;

namespace AE13
{
    
    class Program
    {
        // Running .NET async should provide significant performance gains over our previous Node bots - and use less memory.
        static void Main(string[] args) => new Program().MainAsync().GetAwaiter().GetResult();

        public async Task MainAsync()
        {
            using (var services = ConfigureServices())
            {
                var client = services.GetRequiredService<DiscordSocketClient>();

                client.Log += LogAsync;
                services.GetRequiredService<CommandService>().Log += LogAsync;

                // Hard coding the token is a BAD practice, but we will do it anyways :)
                await client.LoginAsync(TokenType.Bot, "Nzc2NTI5NDM5MTYwNzk1MTY1.X62NZQ.s90oWkajTJo2PLRk8HwksK7JaK8");
                await client.StartAsync();

                // Here we initialize the logic required to register our commands - see ./services/CommandHandlingService.cs
                await services.GetRequiredService<CommandHandlingService>().InitializeAsync();

                await Task.Delay(Timeout.Infinite);
            }
        }

        private Task LogAsync(LogMessage log)
        {
            Console.WriteLine(log.ToString());

            return Task.CompletedTask;
        }

        private ServiceProvider ConfigureServices()
        {
            var config = new DiscordSocketConfig
            {
                AlwaysDownloadUsers = true,
                MessageCacheSize = 100
            };
            return new ServiceCollection()
                .AddSingleton<DiscordSocketClient>()
                .AddSingleton<CommandService>()
                .AddSingleton<CommandHandlingService>()
                .AddSingleton<HttpClient>()
                .BuildServiceProvider();
        }
    }
}
