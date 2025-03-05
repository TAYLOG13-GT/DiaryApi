import axios from "axios"

axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const apiService = {
    getUSerDiaryItems: async (branchref) => {
        try {
            console.log("STARTING")
            console.log("API BASE: userdiary");
            const { data } = await axios.get("userdiary", {
                params: {
                    branchref: branchref
                }
            }); 
          
           return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }
    },
    getUSerDiaryTasks: async (appontment, date) => {
        try {
            console.log("STARTING")
            console.log("API BASE: userdiary");
            const { data } = await axios.get("userdiary/tasks", {
                params: {
                    appontment: appontment,
                    date: date,
                }
            });

            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }
    },
    getPropertyItems: async () => {
        try {
            console.log("STARTING")
            console.log("API BASE: property");
            const { data }  = await axios.get("property");
            console.log(data.Data.length);
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }
    },
    getContactItems: async () => {
        try {
            console.log("STARTING")
            console.log("API BASE: contact");
            const { data } = await axios.get("contact");
            console.log(data.Data.length);
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }
    },
    getLoginUser: async (credentails) => {
        try {
            console.log("STARTING") 
            console.log("API BASE: Login");
            const response = await axios.post("login", credentails, { withCredentais:true });
            return response;
        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }
    },
    getContactNotes: async (contactRef) => {
        try {
            console.log("STARTING")
            console.log("API BASE: Contact note");
            const { data } = await axios.get("contactnote", {
                params: {
                    contactRef: contactRef
                }
            });
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }
    },
};

export default apiService;
