using Microsoft.AspNetCore.Mvc;

namespace DiaryApi.Controllers
{
    [Route("[Controller]")]
    [ApiController]
    public class ContactNoteController : Controller
    {
        [HttpGet]
        public async Task<string> Get([FromQuery] string contactRef)
        {
            var service = new ApiService();
            string data = await service.GetItemsAsync($"/contact-note?contactReference={contactRef}");
            return data;
        }
    }
}
