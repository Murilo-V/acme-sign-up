import { useContext } from "react";
import ClientsDataContext from "../contexts/ClientsData";
import ClientData from "../interfaces/ClientData";
import { cpfMask, dateMask } from "../utils/masks";

function FormComponent(): JSX.Element {

	const { formState, setFormState, errorState, setErrorState, editState, setEditState } = useContext(ClientsDataContext);

	function setLocalStorage(e: React.FormEvent<HTMLFormElement>): void {
		e.preventDefault();
		const clientData: ClientData = formState;
		const clientExists = localStorage.getItem(clientData.cpf);
		clientExists ? setErrorState(true) : localStorage.setItem(clientData.cpf, JSON.stringify(clientData));
		clearForm(clientExists !== null);
	}

	function clearForm(showErrorMessage: boolean): void {
		setErrorState(showErrorMessage);
		setFormState({
			cpf: '',
			date: '',
			name: '',
			address: '',
			gender: '',
			status: '',
		});
	}

	function editClientData() {
		localStorage.setItem(formState.cpf, JSON.stringify(formState));
		setEditState(false);
		setErrorState(false);
		clearForm(false);
	}

	return(
	<div className="form-container mb-4">
			<h2>{ editState ? 'Editar' : 'Cadastrar' } um(a) cliente</h2>
			{ errorState ? <h3 className="error-message">Este usuário já existe.</h3> : null } 
			<form onSubmit={(e) => setLocalStorage(e)}>
					<div className="form-floating mb-3">
						<input type="text" name="name" value={formState.name} className="form-control" id="name" required
							onChange={(e) => {
								setFormState({
									...formState,
									[e.target.name]: e.target.value,
								})
							}}
						/>
						<label htmlFor="name">Nome*</label>
					</div>

					<div className="form-floating mb-3">
						<input type="text" maxLength={10} className="form-control" name="date" id="date" value={formState.date} required 
							onChange={(e) => {
								setFormState({
									...formState,
									[e.target.name]: dateMask(e.target.value),
								})
							}}
						/>
						<label htmlFor="date">Data de Nascimento*</label>
					</div>

					<div className="form-floating mb-3">
						<input type="text" maxLength={14} name="cpf" className="form-control" id="cpf" value={formState.cpf} required
							onChange={(e) => {
								setFormState({
									...formState,
									[e.target.name]: cpfMask(e.target.value),
								})
							}}
						/>
						<label htmlFor="cpf">CPF*</label>
					</div>

					<select className="form-select mb-3" value={formState.gender} name="gender" required
						onChange={(e) => {
							setFormState({
								...formState,
								[e.target.name]: e.target.value,
							})
						}}
					>
						<option value="">Sexo*</option>
						<option value="m">Masculino</option>
						<option value="f">Feminino</option>
					</select>

					<div className="form-floating mb-3">
						<input type="text" name="address" className="form-control" id="address" value={formState.address}
							onChange={(e) => {
								setFormState({
									...formState,
									[e.target.name]: e.target.value,
								})
							}}
						/>
						<label htmlFor="address">Endereço</label>
					</div>

					<select className="form-select mb-3" name="status" value={formState.status} required
						onChange={(e) => {
							setFormState({
								...formState,
								[e.target.name]: e.target.value,
							})
						}}
					>
						<option value="">Status*</option>
						<option value={1}>Ativo</option>
						<option value={0}>Inativo</option>
					</select>

					{ editState ? 
						<button type="button" onClick={() => editClientData()} className="btn btn-primary">EDITAR</button> : 
						<button type="submit" className="btn btn-primary">CADASTRAR</button> 
					}
			</form>
		</div>
	);
}

export default FormComponent;