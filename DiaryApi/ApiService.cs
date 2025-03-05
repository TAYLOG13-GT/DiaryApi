using System.Net.Http.Headers;

namespace DiaryApi
{
    public class ApiService
    {
        private static readonly HttpClient client;

        static ApiService()
        {
            var handler = new HttpClientHandler
            {
                UseDefaultCredentials = true
            };
            client = new HttpClient(handler);
            //new Uri("http://localhost:8082");//
            client.BaseAddress = new Uri("http://mmapi-sequence.test.branch.local");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json-patch+json"));
            client.DefaultRequestHeaders.Add("Access-Control-Allow-Origin", "*");
        }

        public async Task<string> GetItemsAsync(string request)
        {
            try
            {
                HttpResponseMessage response = await client.GetAsync(request);
                response.EnsureSuccessStatusCode();
                var data = await response.Content.ReadAsStringAsync();
                return data;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching data: {ex.Message}");
                return "";
            }
        }
    }
}
