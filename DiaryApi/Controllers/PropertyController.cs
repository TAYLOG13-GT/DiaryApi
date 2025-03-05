using Microsoft.AspNetCore.Mvc;

namespace DiaryApi.Controllers
{
    [Route("[Controller]")]
    [ApiController]
    public class PropertyController : Controller
    {

        [HttpGet]
        public async Task<string> Get()
        {
            var service = new ApiService();
            string data= await service.GetItemsAsync("/property/ /LOE/search");
            return data;
        }
    }
}
