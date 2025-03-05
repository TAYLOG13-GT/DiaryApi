using Microsoft.AspNetCore.Mvc;
using static DiaryApi.Controllers.LoginController;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace DiaryApi.Controllers
{
    [Route("[Controller]")]
    [ApiController]
    public class UserDiaryController : Controller
    {

        [HttpGet]
        public async Task<string> Get([FromQuery] string branchref)
        {
            var service = new ApiService();
            return await service.GetItemsAsync($"/branch/{branchref}/diary-user-list");
        }

        [HttpGet("tasks")]
        public async Task<string> Get([FromQuery] string appontment,string date)
        {
            var service = new ApiService();
            return await service.GetItemsAsync($"/appointments/{appontment}/{date}/diary-tasks");
        }
    }
}
