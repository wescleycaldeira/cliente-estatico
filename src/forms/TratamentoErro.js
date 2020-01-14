import React from "react";

export default function TratamentoErro({ error }) {
  if (error) {
    switch (error.type) {
      case "required":
        return <p>Campo Obrigatório</p>;
      case "minLength":
        return <p>Tamanho minimo nome de 3 caracteres</p>;
    case "maxLength":
        return <p>Tamanho máximo nome de 100 caracteres</p>;
      case "pattern":
        return <p>Preenchimento incorreto</p>;
      case "validate":
        return <p>CEP Incorreto</p>;
      default:
        return null;
    }
  }

  return null;
}