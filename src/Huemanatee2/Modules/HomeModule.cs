using Nancy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nancy.Extensions;

namespace Huemanatee2.Modules
{
  public class HomeModule : NancyModule
  {
    public HomeModule() : base("/")
    {
      Get["/"] = _ =>
      {
        return View["index"];
      };
    }
  }
}
