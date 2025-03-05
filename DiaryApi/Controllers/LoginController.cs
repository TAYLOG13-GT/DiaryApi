
using Microsoft.AspNetCore.Mvc;
namespace DiaryApi.Controllers
{
    [Route("[Controller]")]
    [ApiController]
    public class LoginController : Controller
    {
        private string Domain { get; set; } = "BRANCH";
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] LoginRequest request)
        {
            var service = new ApiService();
            if (request.UserName != null && request.Password != null)
            {
               
                    var returnVal = await service.GetItemsAsync($"/systemuser/{request.UserName}/from-domain-logon-name");
                    if (returnVal != null)
                    {
                        return Ok(returnVal);
                    }
                
            }
            return Unauthorized("TAYLOG13");
        }

        public class LoginRequest
        {
            public string? UserName { get; set; }
            public string? Password { get; set; }
        }
    }
}
