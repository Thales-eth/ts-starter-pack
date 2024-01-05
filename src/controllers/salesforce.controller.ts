import {
  createSalesforceAsset,
  createSalesforceAuthToken,
  createSendDefinition,
  deleteSaleforceAsset,
  getSalesforceAsset,
  getSendDefinition,
  sendEmailMessage,
} from "@/services/salesforce.service"
import { NextFunction, Request, Response } from "express"

export const getAsset = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params
    const asset = await getSalesforceAsset(id)
    res.status(200).json(asset)
  } catch (error) {
    next(error)
  }
}

export const getDefinition = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { key } = req.params
    const definition = await getSendDefinition(key)
    res.status(200).json(definition)
  } catch (error) {
    next(error)
  }
}

export const createAuthToken = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = await createSalesforceAuthToken()
    res.status(201).json(token)
  } catch (error) {
    next(error)
  }
}

export const createAsset = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { content } = req.body
    console.log("El body ==>", content)
    const asset = await createSalesforceAsset(content)
    res.status(201).json(asset)
  } catch (error) {
    next(error)
  }
}

export const createDefinition = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log("El body ==>", req.body)
    const { name, definitionKey, customerKey } = req.body
    const response = await createSendDefinition(
      name,
      definitionKey,
      customerKey
    )
    res.status(201).json(response)
  } catch (error) {
    next(error)
  }
}

export const sendEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params
    const response = await sendEmailMessage(id)
    res.status(201).json(response)
  } catch (error) {
    next(error)
  }
}

export const deleteAsset = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params
    const response = await deleteSaleforceAsset(id)
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}
