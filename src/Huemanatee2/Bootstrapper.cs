using Nancy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nancy.Bootstrapper;
using Nancy.TinyIoc;
using Q42.HueApi;
using Microsoft.Extensions.PlatformAbstractions;
using Nancy.Conventions;

namespace Huemanatee2
{
  public class Bootstrapper : DefaultNancyBootstrapper
  {
    private readonly DnxRootPathProvider _rootPathProvider;

    public Bootstrapper(IApplicationEnvironment appEnvironment)
    {
      this._rootPathProvider = new DnxRootPathProvider(appEnvironment);
    }

    protected override void ConfigureConventions(NancyConventions nancyConventions)
    {
      base.ConfigureConventions(nancyConventions);

      nancyConventions.StaticContentsConventions.Clear();
      nancyConventions.StaticContentsConventions
          .Add(StaticContentConventionBuilder.AddDirectory("/", "wwwroot"));
    }

    protected override async void ApplicationStartup(TinyIoCContainer container, IPipelines pipelines)
    {
      base.ApplicationStartup(container, pipelines);

      var bridgeLocator = new HttpBridgeLocator();
      
      var bridges = await bridgeLocator.LocateBridgesAsync(TimeSpan.FromMinutes(1));
      
      HueContext.CurrentBridge = bridges.FirstOrDefault();   
    }

    protected override IRootPathProvider RootPathProvider => _rootPathProvider;

    private class DnxRootPathProvider : IRootPathProvider
    {
      private readonly IApplicationEnvironment _appEnvironment;

      public DnxRootPathProvider(IApplicationEnvironment appEnv)
      {
        this._appEnvironment = appEnv;
      }

      public string GetRootPath()
      {
        return _appEnvironment.ApplicationBasePath;
      }
    }
  }

  
}
