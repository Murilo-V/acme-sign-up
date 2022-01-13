import { useEffect, useState } from "react";
import { useContext } from "react";
import ClientsDataContext from "../contexts/ClientsData";
import ClientData from "../interfaces/ClientData";

function ClientsTableComponent(): JSX.Element {

	const { setFormState, setEditState, editState, formState } = useContext(ClientsDataContext);

    const [clientsDataState, setClientsDataState] = useState<ClientData[]>([]);
    const [filterState, setFilterState] = useState<string>('');

    useEffect(() => {
        if(filterState) {
            setClientsDataState(c => c.filter(cd => cd.name.includes(filterState)))
        } else {
            setClientsDataState(Object.values(localStorage).map(cd => JSON.parse(cd) as ClientData));
        };
    }, [filterState, editState, formState])

    function allowClientDataEdition(clientData: ClientData) {
        localStorage.removeItem(clientData.cpf);
        setFormState(clientData);
        setEditState(true);
    }

    return (
        <div className="table-container">
			<h2>Clientes cadastrados</h2>
            <input type="text" className="form-control" onChange={(e) => setFilterState(e.target.value)} name="filter" placeholder="Filtre por nome" />
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">CPF</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Dt. Nascimento</th>
                    <th scope="col">Sexo</th>
                    <th scope="col">Status</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                        { clientsDataState.map(cd => {
                            return (
                                 <tr key={String(Math.random())}>
                                    <th key={String(Math.random())}>{cd.cpf}</th>
                                    <th key={String(Math.random())}>{cd.name}</th>
                                    <th key={String(Math.random())}>{cd.date}</th>
                                    <th key={String(Math.random())}>{cd.gender === 'm' ? 'Masculino' : 'Feminino'}</th>
                                    <th key={String(Math.random())}>{cd.status === '1' ? 'Ativo' : 'Inativo'}</th>
                                    <th key={String(Math.random())}><button className="btn btn-secondary" onClick={() => allowClientDataEdition(cd)}>Editar</button></th>
                                </tr>
                            );
                        }) }
                </tbody>
            </table>
        </div>
    );
}

export default ClientsTableComponent;
