import { authAxiosInstace, salesforceAxiosInstace } from "@/config/axios.config"

export const createSalesforceAuthToken = async (): Promise<any> => {
  const tokenBody = {
    grant_type: "client_credentials",
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    account_id: process.env.ACCOUNT_ID,
  }
  try {
    const res = await authAxiosInstace.post(`/v2/token`, tokenBody)
    return res.data
  } catch (error) {
    console.error("Error ==>", error)
  }
}

export const getSalesforceAsset = async (id: string) => {
  try {
    const res = await salesforceAxiosInstace.get(
      `/asset/v1/content/assets/${id}`
    )
    return res.data
  } catch (error) {
    console.error("Error ==>", error.message)
  }
}

export const createSalesforceAsset = async (content: string) => {
  const createAssetBody = {
    name: `Prueba-frontend-${new Date().getTime()}`,
    channels: {
      email: true,
      web: false,
    },
    content,
    assetType: {
      name: "htmlemail",
      id: 208,
    },
    category: {
      id: "325340",
    },
  }

  console.log("WHO R U ==>", createAssetBody)

  try {
    const res = await salesforceAxiosInstace.post(
      `/asset/v1/content/assets`,
      createAssetBody
    )
    return res.data
  } catch (error) {
    console.error("Error ==>", error.message)
  }
}

export const deleteSaleforceAsset = async (id: string) => {
  try {
    const res = await salesforceAxiosInstace.delete(
      `/asset/v1/content/assets/${id}`
    )
    return res.data
  } catch (error) {
    console.error("Error ==>", error)
  }
}

export const createSendDefinition = async (
  name: string,
  definitionKey: string,
  customerKey: string
) => {
  const createSendBody = {
    definitionKey,
    name,
    content: {
      customerKey: customerKey,
    },
    subscriptions: {
      list: "325308",
    },
  }

  console.log("Qué me llega ==>", createSendBody)

  try {
    await salesforceAxiosInstace.post(
      `/messaging/v1/email/definitions`,
      createSendBody
    )
  } catch (error) {
    console.log("Error ==>", error)
  }
}

export const getSendDefinition = async (definitionKey: string) => {
  try {
    const res = await salesforceAxiosInstace.get(
      `/messaging/v1/email/definitions/${definitionKey}`
    )
    return res.data
  } catch (error) {
    console.log("Error ==>", error)
  }
}

export const sendEmailMessage = async (triggeredSendDefinitionId: string) => {
  try {
    const res = await salesforceAxiosInstace.post(
      `/messaging/v1/messageDefinitionSends/${triggeredSendDefinitionId}/send`
    )
    return res.data
  } catch (error) {
    console.log("El error ==>", error)
  }
}
