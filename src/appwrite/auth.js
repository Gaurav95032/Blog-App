import configuration from "../configuration/configuration.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {

    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(configuration.appwriteUrl)
            .setProject(configuration.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount({email,password,userName}) { 
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, userName)
            if (userAccount) {
                return this.login({email,password})
            } else {
                return userAccount
            }
        } catch (error) {
            console.log(`Appwrite Auth Service :: Create Account :: ${error}`);
        }
    }
    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            console.log(`Appwrite Auth Service :: Login :: ${error}`);
        }
    }
    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log(`Appwrite Auth Service :: Get Current User :: ${error}`);
            
        }
    }
    async logout() {
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log(`Appwrite Auth Service :: Logout :: ${error}`);
            
        }
    }
}

const authService = new AuthService()

export default authService