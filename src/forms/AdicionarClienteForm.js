import React, { useState } from 'react'
import ReactDOM from "react-dom";
import { useForm } from 'react-hook-form';
import TratamentoErro from './TratamentoErro'

const ClienteForm = props => {
	// const initialFormState = { id: null, nome: '  ', cpf: '  ' , cep: ' '}
	// const [ user, setUser ] = useState(initialFormState)

	const {
		register,
		handleSubmit,
		errors,
		setError,
		clearError,
		setValue,
		formState: { isSubmitting }
	  } = useForm();
	  const onSubmit = data => {
		console.log(JSON.stringify(data));
	  };

	const validarCep = async cep => {
		
		if(!cep || String(cep).length < 8){
			return;
		}
		fetch(`https://viacep.com.br/ws/${cep}/json/`)
		.then(response => response.json())
		  .then(data =>  {
			console.log(data.erro);
			if (data.erro) {
				console.log('Cep nao encontrado');
				setError("cep", '');
				setValue('logradouro', '');
				setValue('bairro', '');
				setValue('cidade', '');
				setValue('uf', '');
			  } else {
				console.log('Sucesso', data);
				setValue('logradouro', data.logradouro);
				setValue('bairro', data.bairro);
				setValue('cidade', data.localidade);
				setValue('uf', data.uf);
				clearError("cep");
			  }
		  });
	};

	// const handleInputChange = event => {
	// 	const { name, value } = event.target

	// 	setUser({ ...user, [name]: value })
	// }

	return (
		<form className="App"  onSubmit={handleSubmit(onSubmit)}>
			<label>Nome</label>
			<input type="text" name="nome" ref={register({ required: true, minLength: 3, maxLength: 100 })} />
			<TratamentoErro error={errors.nome} />
			<br/>
			<label>CPF</label>
			<input type="text" name="cpf"  ref={register({ required: true, pattern: /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2})$/ })} />
			<TratamentoErro error={errors.cpf} />
			<br/>
			<h2>Endereco</h2>
			
			<label>CEP</label>
			<input type="text" 
				name="cep"  
				ref={register({ required: true, validate: validarCep })}
				onBlur={e => validarCep(e.target.value)} />
			<TratamentoErro error={errors.cep} />
			<br/>

			<label>Logradouro</label>
			<input type="text" name="logradouro"  ref={register({ required: true })} />
			<TratamentoErro error={errors.logradouro} />
			<br/>

			<label>Bairro</label>
			<input type="text" name="bairro"  ref={register({ required: true })} />
			<TratamentoErro error={errors.bairro} />
			<br/>

			<label>Cidade</label>
			<input type="text" name="cidade"  ref={register({ required: true })} />
			<TratamentoErro error={errors.cidade} />
			<br/>

			<label>UF</label>
			<input type="text" name="uf"  ref={register({ required: true })} />
			<TratamentoErro error={errors.uf} />
			<br/>

			<h2>Contatos</h2>
			<label>Gender</label>
			<select name="tipoContato" ref={register({ required: true })}>
				<option value="">Selecione</option>
				<option value="RESIDENCIAL">Residencial</option>
				<option value="COMERCIAL">Comercial</option>
				<option value="CELULAR">Celular</option>
			</select>
			<TratamentoErro error={errors.tipoContato} />

			<label>Número</label>
			<input type="text" name="numero"  ref={register({ required: true })} />
			<TratamentoErro error={errors.numero} />
			<br/>

			<label>Email</label>
			<input
				name="email"
				ref={register({ required: true, pattern: /^\S+@\S+$/i })}
			/>
			<TratamentoErro error={errors.email} />
			<br/>
			<input disabled={isSubmitting} type="submit" />
		</form>
	)
}

export default ClienteForm