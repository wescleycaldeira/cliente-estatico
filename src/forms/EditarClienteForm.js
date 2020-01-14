import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';

const EditarClienteForm = props => {
  const [ user, setUser ] = useState(props.currentUser)

  useEffect(
    () => {
      setUser(props.currentUser)
    },
    [ props ]
  )

  const handleInputChange = event => {
    const { nome, value } = event.target

    setUser({ ...user, [nome]: value })
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()

        props.updateUser(user.id, user)
      }}
    >
      <label>Nome</label>
      <input type="text" name="name" value={user.nome} onChange={handleInputChange} />
      <label>CPF</label>
      <input type="text" name="username" value={user.cpf} onChange={handleInputChange} />
      <button>Atualizar Clienter</button>
      <button onClick={() => props.setEditing(false)} className="button muted-button">
        Cancelar
      </button>
    </form>
  )
}

export default EditarClienteForm