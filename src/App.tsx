import { useState } from "react";
import ClientsTableComponent from "./components/ClientsTable";
import FormComponent from "./components/Form";
import ClientsDataContext from "./contexts/ClientsData";
import ClientData from "./interfaces/ClientData";

function App() {

  const [formState, setFormState] = useState<ClientData>({
		cpf: '',
		date: '',
		name: '',
		address: '',
		gender: '',
		status: '',
	});
	const [errorState, setErrorState] = useState<boolean>(false);
	const [editState, setEditState] = useState<boolean>(false);

  return (
    <div className="container-sm ">
      <h1 className="text-center mb-4">ACME</h1>
      <ClientsDataContext.Provider value={{ formState, setFormState, errorState, setErrorState, editState, setEditState }}>
        <FormComponent />
        <ClientsTableComponent />
      </ClientsDataContext.Provider>
    </div>
  );
}

export default App;
