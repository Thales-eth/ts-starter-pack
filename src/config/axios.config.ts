import { createSalesforceAuthToken } from "@/services/salesforce.service"
import axios from "axios"

export const authAxiosInstace = axios.create({
  baseURL: process.env.SALESFORCE_AUTH_BASE_URL,
})

export const salesforceAxiosInstace = axios.create({
  baseURL: process.env.SALESFORCE_BASE_URL,
})

salesforceAxiosInstace.interceptors.request.use(async (config) => {
  try {
    const res = await createSalesforceAuthToken()
    const { access_token } = res
    config.headers.Authorization = `Bearer ${access_token}`
  } catch (error) {
    console.log("El error ==>", error)
  } finally {
    return config
  }
})
