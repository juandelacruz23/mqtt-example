using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using MQTTnet.AspNetCore;

namespace MQTTServer
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
          WebHost.CreateDefaultBuilder(args)
            .UseKestrel(o =>
            {
                o.ListenAnyIP(1883, l => l.UseMqtt());
                o.ListenAnyIP(5000);
            })
            .UseStartup<Startup>();
    }
}
