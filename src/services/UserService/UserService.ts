import axios, { AxiosResponse } from 'axios';
import { User } from '../../types/types';

const BASE_URL = 'https://localhost:7278';

class UserService {

  constructor() {
    // Se necessário, adicione inicializações aqui
  }

  async addUser(user: User): Promise<boolean> {
    try {
      user.status = 1;
      const response = await axios.post(`${BASE_URL}/usuario`, user);
      console.log(response);
      return true; // Retorna true se o usuário foi adicionado com sucesso
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
      return false; // Retorna false em caso de erro
    }
  }

  async login(email: string, password: string): Promise<User | undefined> {
    try {
      const response: AxiosResponse<User> = await axios.post(`${BASE_URL}/login`, {
        email, 
        senha: password,
      });
      return response.data
    } catch (error) {
      console.error('Erro ao validar usuário:', error);
      return undefined;
    }
  }

  async forgotPassword(email: string): Promise<boolean> {
    try {
      const response = await axios.post(`${BASE_URL}/forgot-password`, {
        email,
      });
      return true; // Retorna true se o email foi enviado com sucesso
    } catch (error) {
      console.error('Erro ao enviar email de recuperação de senha:', error);
      return false; // Retorna false em caso de erro
    }
  }

  // async acceptInvite(inviteId: string): Promise<AxiosResponse> {
  //   try {
  //     const response = await axios.post(`${BASE_URL}/invites/accept`, { inviteId });
  //     return response.data; // Retorna os dados da resposta se bem-sucedida
  //   } catch (error) {
  //     console.error('Erro ao aceitar convite:', error);
  //     throw error; // Lança o erro para tratamento posterior
  //   }
  // }

  // async declineInvite(inviteId: string): Promise<AxiosResponse> {
  //   try {
  //     const response = await axios.post(`${BASE_URL}/invites/decline`, { inviteId });
  //     return response.data; // Retorna os dados da resposta se bem-sucedida
  //   } catch (error) {
  //     console.error('Erro ao recusar convite:', error);
  //     throw error; // Lança o erro para tratamento posterior
  //   }
  // }

  async createGroup(groupData: any): Promise<AxiosResponse> { // Substitua 'any' pelo tipo de dados do grupo
    try {
      const response = await axios.post(`${BASE_URL}/grupo`, groupData);
      return response.data; // Retorna os dados da resposta se bem-sucedida
    } catch (error) {
      console.error('Erro ao criar grupo:', error);
      throw error; // Lança o erro para tratamento posterior
    }
  }

  // async accountExists(email: string): Promise<boolean> {
  //   try {
  //     const response = await axios.get(`${BASE_URL}/users/exists`, { params: { email } });
  //     return response.data.exists; // Supõe que a resposta tem um campo 'exists' que é um booleano
  //   } catch (error) {
  //     console.error('Erro ao verificar existência da conta:', error);
  //     return false; // Considera que a conta não existe se houver erro
  //   }
  // }

  // async sendTemporaryPassword(email: string): Promise<AxiosResponse> {
  //   try {
  //     const response = await axios.post(`${BASE_URL}/auth/send-temporary-password`, { email });
  //     return response.data; // Retorna os dados da resposta se bem-sucedida
  //   } catch (error) {
  //     console.error('Erro ao enviar senha temporária:', error);
  //     throw error; // Lança o erro para tratamento posterior
  //   }
  // }
}

export default UserService;
