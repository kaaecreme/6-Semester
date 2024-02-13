import { Request, Response } from 'express'
import mongoose from 'mongoose'

import { schema } from './orders'

const ordersConnection = mongoose.createConnection("mongodb://root:example@mongo:27017")

const ordersModel = ordersConnection.model('Orders', schema)

const create =  async (req: Request, res: Response) => {
    let { id } = await new ordersModel(req.body).save()
    res.json({ id })
  }
  
const read = async (req: Request, res: Response) => {
    const { uid } = req.params
    let result = await ordersModel.find({ _id: uid }, { __v: 0}).exec()
    res.json(result)
  }
  
export const Orders = {
    read, create
}