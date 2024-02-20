import { Client, Account } from "appwrite";
import conf from "../conf";

export class UserService {
    client = new Client(); 
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.projectId);

        // Instantiate the Account service with the client object
        this.account = new Account(this.client);
    }

    async getUserNameById(userId) {
        try {
            const user = await this.account.get(userId);
            return user.name;
        } catch (error) {
            console.log('Getting error while fetching username', error.message);
            return null;
        }
    }
}

const userService = new UserService();

export default userService;
