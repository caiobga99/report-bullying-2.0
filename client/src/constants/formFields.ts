interface FormFields {
  labelText: string;
  labelFor: string;
  id: string;
  name: string;
  type: string;
  autoComplete: string;
  isRequired: boolean;
  placeholder: string;
  inputType?: string;
}

const loginFields: FormFields[] = [
  {
    labelText: "Email addressstring",
    labelFor: "email-address",
    id: "email",
    name: "email",
    type: "email",
    autoComplete: "email",
    isRequired: true,
    placeholder: "Email",
  },
  {
    labelText: "Password",
    labelFor: "password",
    id: "senha",
    name: "password",
    type: "password",
    autoComplete: "current-password",
    isRequired: true,
    placeholder: "Senha",
  },
];

const signupFields: FormFields[] = [
  {
    labelText: "Nome",
    labelFor: "Nome",
    id: "nome",
    name: "nome",
    type: "text",
    autoComplete: "Nome",
    isRequired: true,
    placeholder: "Nome",
  },
  {
    labelText: "RA",
    labelFor: "RA",
    id: "ra",
    name: "ra",
    type: "text",
    autoComplete: "RA",
    isRequired: true,
    placeholder: "RA",
  },
  {
    labelText: "Email address",
    labelFor: "email-address",
    id: "email",
    name: "email",
    type: "email",
    autoComplete: "email",
    isRequired: true,
    placeholder: "Email",
  },
  {
    labelText: "senha",
    labelFor: "senha",
    id: "senha",
    name: "senha",
    type: "password",
    autoComplete: "current-password",
    isRequired: true,
    placeholder: "Senha",
  },
  {
    labelText: "Confirmar Senha",
    labelFor: "confirmar-senha",
    id: "confirmar-senha",
    name: "confirmar-senha",
    type: "password",
    autoComplete: "confirmar-senha",
    isRequired: true,
    placeholder: "Confirmar Senha",
  },
  {
    labelText: "Imagem de Perfil",
    labelFor: "imagem-perfil",
    id: "imagem",
    name: "imagem",
    type: "file",
    autoComplete: "imagem-perfil",
    isRequired: false,
    placeholder: "Imagem de Perfil",
  },
];

const updateFields: FormFields[] = [
  {
    labelText: "Nome",
    labelFor: "Nome",
    id: "nome",
    name: "nome",
    type: "text",
    autoComplete: "Nome",
    isRequired: true,
    placeholder: "Nome",
  },
  {
    labelText: "RA",
    labelFor: "RA",
    id: "ra",
    name: "ra",
    type: "text",
    autoComplete: "RA",
    isRequired: true,
    placeholder: "RA",
  },
  {
    labelText: "senha",
    labelFor: "senha",
    id: "senha",
    name: "senha",
    type: "password",
    autoComplete: "current-password",
    isRequired: true,
    placeholder: "Senha",
  },
  {
    labelText: "Confirmar Senha",
    labelFor: "confirmar-senha",
    id: "confirmar-senha",
    name: "confirmar-senha",
    type: "password",
    autoComplete: "confirmar-senha",
    isRequired: true,
    placeholder: "Confirmar Senha",
  },
  {
    labelText: "Imagem de Perfil",
    labelFor: "imagem-perfil",
    id: "imagem",
    name: "imagem",
    type: "file",
    autoComplete: "imagem-perfil",
    isRequired: false,
    placeholder: "Imagem de Perfil",
  },
];

const reportFields: FormFields[] = [
  {
    labelText: "Titulo",
    labelFor: "Titulo",
    id: "titulo",
    name: "titulo",
    type: "text",
    autoComplete: "Titulo",
    isRequired: true,
    placeholder: "Titulo",
  },
  {
    labelText: "Mensagem",
    labelFor: "Mensagem",
    id: "mensagem",
    name: "mensagem",
    type: "text",
    autoComplete: "Mensagem",
    isRequired: true,
    placeholder: "Mensagem",
    inputType: "textarea",
  },
];

const commentFields: FormFields[] = [
  {
    labelText: "Comentario",
    labelFor: "Comentario",
    id: "mensagem",
    name: "mensagem",
    type: "text",
    autoComplete: "Comentario",
    isRequired: true,
    placeholder: "Comentario",
    inputType: "textarea",
  },
];

export { loginFields, signupFields, reportFields, updateFields, commentFields };
