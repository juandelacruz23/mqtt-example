using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using MQTTnet;
using MQTTnet.AspNetCore;

namespace MQTTServer
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddHostedMqttServer(builder => builder.WithoutDefaultEndpoint());
            services.AddMqttConnectionHandler();
            services.AddMqttWebSocketServerAdapter();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseMqttEndpoint();
            app.UseMqttServer(server =>
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
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.Run(async (context) =>
            {
                await context.Response.WriteAsync("Hello World!");
            });
        }
    }
}
