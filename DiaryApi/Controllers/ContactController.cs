using Microsoft.AspNetCore.Mvc;

namespace DiaryApi.Controllers
{
    [Route("[Controller]")]
    [ApiController]
    public class ContactController : Controller
    {
        [HttpGet]
        public async Task<string> Get()
        {
            var service = new ApiService();
            string data = await service.GetItemsAsync("/contact/ /LOE/search");
            return data;
        }
    }
}
