const paypal = require('paypal-rest-sdkv2');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AeAeOWp_A1qOjQJXb62VjUwiZ0BODPSd3dRhK-02Gz2xZCT_dwS6R7ilCN-B3UN7HbDMxafmVg8vEXg9',
    'client_secret': 'EI0QgKbTwXh57U_x9Zw7-pc9gm6Mq04iy3F65dGPepROW-L9x9ueztLyRMTxk5BUtnejxBN-YKHuBMa2'
});

module.exports = paypal