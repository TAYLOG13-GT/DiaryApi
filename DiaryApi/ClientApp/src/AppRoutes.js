import ContactLog from "./components/ContactLog";
import  Diary  from "./components/Diary";
import { Property } from "./components/Property";
import { LoginDialog } from "./components/LoginDialog";
import PropertyLog from "./components/PropertyLog";
import { Contact } from "./components/Contact";
import { ContactNote }  from "./components/ContactNote";

//const user = {UserName: String,DefaultBranch:String}

const AppRoutes = [
    {
        index: true,
        element: <Diary/>
    },
    {
        path: '/property',
        element: <Property />
    },
    {
        path: '/login',
        element: <LoginDialog/>
    },
    {
        path: '/contactlog',
        element: <ContactLog />
    },
    {
        path: '/propertylog',
        element: <PropertyLog />
    },
    {
        path: '/contact',
        element: <Contact />
    },
    {
        path: '/contactnote',
        element: <ContactNote />
    },
];

export default AppRoutes;
