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

  async createGroup(groupData: any): Promise<boolean> {
    try {
      console.log(groupData);
      const response = await axios.post(`${BASE_URL}/grupo`, groupData);
      console.log(response.data);
      return true;
    } catch (error) {
      console.error('Erro ao criar grupo:', error);
      return false;
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



  async acceptInvite(inviteId: string): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await axios.post(`${BASE_URL}/invites/accept`, { inviteId });
      return { success: response.status === 200, message: 'Convite aceito com sucesso' };
    } catch (error) {
      console.error('Erro ao aceitar convite:', error);
      return { success: false, message: error+"" };
    }
  }

  async declineInvite(inviteId: string): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await axios.post(`${BASE_URL}/invites/decline`, { inviteId });
      return { success: response.status === 200, message: 'Convite recusado com sucesso' };
    } catch (error) {
      console.error('Erro ao recusar convite:', error);
      return { success: false, message: error+"" };
    }
  }

  async updatePerfil(user: User): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await axios.put(`${BASE_URL}/usuario/${user.id}`, user);
      return { success: true, message: 'Perfil atualizado com sucesso' };
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      return { success: false, message: error+"" };
    }
  }

  async getMembros(grupoId: string): Promise<{ data: User[] }> {
    try {
      const response = await axios.get(`${BASE_URL}/grupo/${grupoId}/membros`);
      return { data: response.data };
    } catch (error) {
      console.error('Erro ao obter membros do grupo:', error);
      throw error;
    }
  }

  async getGrupos(): Promise<{ data: User[] }> {
    try {
      const response = await axios.get(`${BASE_URL}/grupo`);
      return { data: response.data };
    } catch (error) {
      console.error('Erro ao obter membros do grupo:', error);
      throw error;
    }
  }

  async expulsarMembro(grupoId: string, userId: string): Promise<boolean> {
    try {
      const response = await axios.delete(`${BASE_URL}/grupo/${grupoId}/membros/${userId}`);
      return response.status === 200; // Retorna true se o membro foi expulso com sucesso
    } catch (error) {
      console.error('Erro ao expulsar membro:', error);
      return false; // Retorna false em caso de erro
    }
  }

  async excluirGrupo(grupoId: string): Promise<boolean> {
    try {
      const response = await axios.delete(`${BASE_URL}/grupo/${grupoId}`);
      return response.status === 200; // Retorna true se o grupo foi excluído com sucesso
    } catch (error) {
      console.error('Erro ao excluir grupo:', error);
      return false; // Retorna false em caso de erro
    }
  }

  async sortear(grupoId: string): Promise<{ success: boolean; message?: string }> {
    try {
      const response: AxiosResponse<{ success: boolean; message?: string }> = await axios.post(`${BASE_URL}/grupo/${grupoId}/sortear`);
      return response.data;
    } catch (error) {
      console.error('Erro ao realizar sorteio:', error);
      return { success: false, message: error+"" };
    }
  }

  async getConvites(): Promise<{ data: any[] }> {
    try {
      const response = await axios.get(`${BASE_URL}/convites`);
      return { data: response.data };
    } catch (error) {
      console.error('Erro ao obter convites:', error);
      throw error;
    }
  }

  async accountExists(email: string): Promise<boolean> {
    try {
      const response = await axios.get(`${BASE_URL}/users/exists`, { params: { email } });
      return response.data.exists; // Supõe que a resposta tem um campo 'exists' que é um booleano
    } catch (error) {
      console.error('Erro ao verificar existência da conta:', error);
      return false; // Considera que a conta não existe se houver erro
    }
  }

  async sendTemporaryPassword(email: string): Promise<boolean> {
    try {
      const response = await axios.post(`${BASE_URL}/auth/send-temporary-password`, { email });
      return response.status === 200; // Retorna true se a senha temporária foi enviada com sucesso
    } catch (error) {
      console.error('Erro ao enviar senha temporária:', error);
      return false; // Retorna false em caso de erro
    }
  }
}

export default UserService;
