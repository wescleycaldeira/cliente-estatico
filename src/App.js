import React, { useState, Fragment } from 'react'
import ClienteForm from './forms/AdicionarClienteForm'
import EditarClienteForm from './forms/EditarClienteForm'
import ClienteTable from './table/ClienteTable'

const App = () => {

  const usersData = [
		{ id: 1, nome: 'Tania', cpf: '112121' },
		{ id: 2, nome: 'Craig', cpf: '12312312' },
		{ id: 3, nome: 'Ben', cpf: '12312344' },
	]

	const initialFormState = { id: null, nome: '', cpf: '' }

  const [ users, setUsers ] = useState(usersData)
	const [ currentUser, setCurrentUser ] = useState(initialFormState)
	const [ editing, setEditing ] = useState(false)

  const addUser = user => {
		user.id = users.length + 1
		setUsers([ ...users, user ])
	}

	const deleteUser = id => {
		setEditing(false)

		setUsers(users.filter(user => user.id !== id))
	}

	const updateUser = (id, updatedUser) => {
		setEditing(true)

		setUsers(users.map(user => (user.id === id ? updatedUser : user)))
	}

	const editRow = user => {
		setEditing(true)

		setCurrentUser({ id: user.id, nome: user.nome, cpf: user.cpf })
	}

  return (
		<div className="container">
			<h1>Gerenciar Clientes</h1>
			<div className="flex-row">
				<div className="flex-large">
					{editing ? (
						<Fragment>
							<h2>Editar Cliente</h2>
							<EditarClienteForm
								editing={editing}
								setEditing={setEditing}
								currentUser={currentUser}
								updateUser={updateUser}
							/>
						</Fragment>
					) : (
						<Fragment>
							<h2>Adicionar Cliente</h2>
							<ClienteForm addUser={addUser} />
						</Fragment>
					)}
				</div>
				<div className="flex-large">
					<h2>Lista de Clientes</h2>
					<ClienteTable users={users} editRow={editRow} deleteUser={deleteUser} />
				</div>
			</div>
		</div>
	);
}

export default App;
