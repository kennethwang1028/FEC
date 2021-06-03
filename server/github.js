const TOKEN = require('./api.js');
const axios = require('axios');
let hrapi = (input, callback) => {
  let option = {
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/${input}`,
      headers:{
        'User-Agent': 'request',
        'Authorization': `${TOKEN}`,
      },
  };

  axios(option)
    .then(data=>{
      let datas = data.data
      callback(null, datas)
    })
    .catch(err=>{
      callback(err)
    })
}
module.exports = {
  hrapi: hrapi,
}