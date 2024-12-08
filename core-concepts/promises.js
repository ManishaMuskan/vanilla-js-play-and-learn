function createOrder(cart) {
   return new Promise(function (resolve, reject) {
       if(cart.length <= 0) {
           reject(new Error('No items in cart'))
       }else {
           let orderId = 'order-id-12345';
           console.log(orderId);
           resolve(orderId);
       }
   }) 
}

function proceedToPayment(orderId) {
    return new Promise(function (resolve, reject) {
        if(orderId) {
            console.log('Payment is successful!')
            resolve({paymentInfo:'payment successful', balance:4000})
        }else {
            reject(new Error('OrderId not valid'));
        }
    })
}

function orderSummary({paymentInfo, balance}) {
    return new Promise(function (resolve, reject) {
        if(paymentInfo === 'payment successful') {
            console.log('order summary updated')
            resolve(balance);
        }else {
            reject(new Error('order summary not updated'))
        }
    })
}

function updatewallet(balance) {
    return new Promise (function (resolve, reject) {
      if(balance) {
        console.log('updating balance - ', balance)
          resolve(balance);
        } else {
          reject (new Error('balance not available'));
        }
    })
}

createOrder(["shoes"])
.then(function (orderId) {
    return proceedToPayment(orderId)
})
.then(function ({paymentInfo, balance}) {
    return orderSummary({paymentInfo, balance})
})
.then(function (balance) {
    return updatewallet(balance);
})
.then(function (balance) {
    if(balance) console.log('process completed', balance)
})
.catch(function (err) {
    console.log(err, err.message);
})