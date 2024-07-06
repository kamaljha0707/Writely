import { Client, Account, ID } from "appwrite";
import conf from "../conf";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId);
     this.account = new Account(this.client);

  }

  async createAccount({ email, password, name }) {
    try {
      let userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );
      if (userAccount) {
        //login method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("Error while creating Account::", error);
      throw error
    }
  }

  async googleLogin(success, failure){
      try {
        const response = await this.account.createOAuth2Session('google',null,  success, failure)
        return response
      } catch (error) {
      console.log("Error while google login::", error);
        throw error
      }
  }

  

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.log("Error while login Account::", error);
      throw error
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Error while logout Account::", error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Error while getCurrentUser Account::", error);
    }
    return null;
  }
}

const authService = new AuthService();

export default authService;
