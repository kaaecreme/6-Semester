import { Schema } from 'mongoose'

export interface Orders{
    material: string
    amount: number
    currency: string
    price: number
    timestamp: Date
    delivery: {
        address: string;
        date: Date;
    }
}

export const schema = new Schema<Orders>({
    material: {type: String, required: true},
    amount: {type: Number, required: true},
    currency: {type: String, required: true},
    price: {type: Number, required: true},
    timestamp: {type: Date, required: true},
    delivery: {
        address: {type: String, required: true},
        date: {type: Date, required: true},
    },
})

// export const schema = new Schema({
//     "material": "Plastic",
//     "amount": 8345839,
//     "currency": "CNY",
//     "price": 624.83,
//     "timestamp":"1614553155000",
//     "delivery":{
//       "first_name": "Jeniffer",
//       "last_name": "Adam",
//       "address":{
//         "street_name": "Blaine",
//         "street_number": "48649",
//         "city": "Linxi"
//       }
//     }
//  });