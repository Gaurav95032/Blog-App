import configuration from "@/configuration/configuration";
import { Client, Databases, ID, Query, Storage } from "appwrite";

export class Service {
    client = new Client();
    database;
    bucket;
    constructor() {
        this.client
            .setEndpoint(configuration.appwriteUrl)
            .setProject(configuration.appwriteProjectId)
        this.database = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async getPost(slug) {
        try {
            return await this.database.getDocument(configuration.appwriteDatabaseId, configuration.appwriteCollectionId, slug)
        } catch (error) {
            console.log(`Appwrite Auth Service :: getPost :: ${error}`);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.database.listDocuments(configuration.appwriteDatabaseId, configuration.appwriteCollectionId, queries)
        } catch (error) {
            console.log(`Appwrite Auth Service :: getPosts :: ${error}`);
            return false;
        }
    }

    async createPost({ slug, title, content, featuredImage, status, userId }) {
        try {
            return await this.database.createDocument(configuration.appwriteDatabaseId, configuration.appwriteCollectionId, slug, { title, content, featuredImage, status, userId })
        } catch (error) {
            console.log(`Appwrite Auth Service :: createPost :: ${error}`);
            return false;
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.database.updateDocument(configuration.appwriteDatabaseId, configuration.appwriteCollectionId, slug, { title, content, featuredImage, status })
        } catch (error) {
            console.log(`Appwrite Auth Service :: updatePost :: ${error}`);
            return false;
        }
    }

    async deletePost(slug) {
        try {
            await this.database.deleteDocument(configuration.appwriteDatabaseId, configuration.appwriteCollectionId, slug)
            return true;
        } catch (error) {
            console.log(`Appwrite Auth Service :: deletePost :: ${error}`);
            return false;
        }
    }

    // storage

    async createFile(file) {
        try {
            return await this.bucket.createFile(
                configuration.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log(`Appwrite Auth Service :: createFile :: ${error}`);
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(configuration.appwriteBucketId, fileId)
        } catch (error) {
            console.log(`Appwrite Auth Service :: deleteFile :: ${error}`);
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(configuration.appwriteBucketId, fileId).href
    }
}