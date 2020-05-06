using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using MQTTnet;
using MQTTnet.Server;

namespace MqttServer
{
    public static class CustomMqttServerExtensions
    {
        public static IApplicationBuilder UseCustomMqttServer(this IApplicationBuilder app)
        {
            var server = app.ApplicationServices.GetRequiredService<IMqttServer>();
            configure(server);
            return app;
        }

        private static void configure(IMqttServer server)
        {
            server.Started += async (sender, args) =>
            {
                var msg = new MqttApplicationMessageBuilder()
                        .WithPayload("Mqtt is awesome")
                        .WithTopic("message");

                while (true)
                {
                    try
                    {
                        await server.PublishAsync(msg.Build());
                        msg.WithPayload("Mqtt is still awesome at " + DateTime.Now);
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine(e);
                    }
                    finally
                    {
                        await Task.Delay(TimeSpan.FromSeconds(2));
                    }
                }
            };
        }
    }
}