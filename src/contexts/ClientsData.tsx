import { createContext } from "react";
import IClientsDataContext from "../interfaces/ClientsDataContext";

const ClientsDataContext = createContext<IClientsDataContext>({} as IClientsDataContext);
 
export default ClientsDataContext;