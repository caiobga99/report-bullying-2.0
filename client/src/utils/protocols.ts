export interface Denuncias {
  RA: string;
  created_at: string;
  email: string;
  id_denuncia: string;
  id_usuario: string;
  mensagem: string;
  nome: string;
  titulo: string;
  updated_at: string;
}

export interface User {
  nome?: string;
  email?: string;
  RA?: string;
  id_usuario?: string;
  tipo_usuario?: boolean;
  created_at: string;
  updated_at?: string;
}
export interface INavigation {
  name: string;
  href: string;
}

export interface Resposta {
  conselho: string;
  created_at?: string;
  id_denuncia: string;
  id_resposta?: string;
  id_usuario: string;
  updated_at?: string;
}