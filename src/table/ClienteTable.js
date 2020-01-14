import React from 'react'

const ClienteTable = props => (
  <table>
    <thead>
      <tr>
        <th>Nome</th>
        <th>CPF</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      {props.users.length > 0 ? (
        props.users.map(user => (
          <tr key={user.id}>
            <td>{user.nome}</td>
            <td>{user.cpf}</td>
            <td>
              <button
                onClick={() => {
                  props.editRow(user)
                }}
                className="button muted-button"
              >
                Editar
              </button>
              <button
                onClick={() => props.deleteUser(user.id)}
                className="button muted-button"
              >
                Deletar
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>Sem usúarios cadastrados</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default ClienteTable