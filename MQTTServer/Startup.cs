using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using MQTTnet.AspNetCore;
using MqttServer;

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
            // use a custom implementation of the mqtt server from a separate file (CustomMqttServerExtensions.cs)
            // if you remove this line, you will have a normal mqtt server
            app.UseCustomMqttServer();

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
