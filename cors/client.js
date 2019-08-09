import axios from 'axios'

document.cookie = 'a=b'

axios.post(`http://${location.hostname}:9001/cors/server2`, {}, {
  withCredentials: true
}).then(res => {
  console.log('我设置了withCredentials: true，打印cookie：')
  console.log(res.data)
})
axios.post(`http://${location.hostname}:9001/cors/server2`, {}, {
}).then(res => {
  console.log('我没有设置withCredentials: true，打印cookie：')
  console.log(res.data)
})