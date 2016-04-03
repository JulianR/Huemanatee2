using Nancy;
using Q42.HueApi;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Huemanatee2.Modules
{
  public class BridgeModule : NancyModule
  {
    public BridgeModule()
    {
      Get["/bridges/", true] = async (_, ct) =>
      {
        var bridgeLocator = new HttpBridgeLocator();

        var bridgeIPs = await bridgeLocator.LocateBridgesAsync(TimeSpan.FromSeconds(30));

        return bridgeIPs.Select(b => new
        {
          IpAddress = b
        }).ToList();
      };
    }
  }
}
