import axios, { AxiosInstance } from "axios";

export class AxiosConfig {
  private static instance: AxiosInstance;

  /**
   * Singleton
   * privado p/ prevenir instanciação direta 
   */
  private constructor() {}

  public static getInstance(): AxiosInstance {
    if(!AxiosConfig.instance) {
      AxiosConfig.instance = axios.create({
        baseURL: process.env.REACT_APP_API ?? '',
      })
    }

    return AxiosConfig.instance;
  }
}

