import paypal, { Payment } from 'paypal-rest-sdk'
import dotenv from 'dotenv'
/*dotenv.config()
const {
  PAYPAL_CLIENT_ID,
  PAYPAL_CLIENT_SECRET,
  PAYPAL_MODE
} = process.env
paypal.configure({
  'mode': 'sandbox',//process.env.PAYPAL_MODE as string, //sandbox or live
  'client_id': 'AUbTKIQoX6eL8244iZxmPAyG6L0IpAod0XJWZsmoZCUZ7VYT5jdkWLH5vxw7LyTEhqWPcpMsOXkeZkox',//process.env.PAYPAL_CLIENT_ID as string,
  'client_secret': 'EHBaJGl0sxGiGPw9ivY2SxWa7-ZCXoYmsJ2gQffnph0xFjDq7zCCboeX-DiHh9f43xGiVjMB9MTfV8v3'//process.env.PAYPAL_CLIENT_SECRET as string
});
export const createPaypalPayment=(create_payment_json:Payment)=>{
  
     let payment= paypal.payment.create(create_payment_json, function (error, create_payment_json) {
    if (error) {
        throw error;
    } else {
        console.log("Create Payment Response");
       // console.log('payment=>>>>>>'+payment);
    }
  });
  console.log('payment=>>>>>>'+payment);

}*/
dotenv.config()

paypal.configure({
  mode: 'sandbox', //sandbox or live
  client_id: 'AUbTKIQoX6eL8244iZxmPAyG6L0IpAod0XJWZsmoZCUZ7VYT5jdkWLH5vxw7LyTEhqWPcpMsOXkeZkox',
  client_secret: 'EHBaJGl0sxGiGPw9ivY2SxWa7-ZCXoYmsJ2gQffnph0xFjDq7zCCboeX-DiHh9f43xGiVjMB9MTfV8v3'
})

export const createPaypalPayment = async (payment: paypal.Payment) => {
  return new Promise((resolve, reject) => {
    paypal.payment.create(payment, function (err, payment) {
      if (err) {
        reject(err)
      } else {
        resolve(payment)
      }
    })
  })
}
