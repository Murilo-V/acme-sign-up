import ClientData from "./ClientData";

export default interface IClientsDataContext {
    formState: ClientData;
    setFormState: React.Dispatch<React.SetStateAction<ClientData>>;
    errorState: boolean;
    setErrorState: React.Dispatch<React.SetStateAction<boolean>>;
    editState: boolean;
    setEditState: React.Dispatch<React.SetStateAction<boolean>>
}