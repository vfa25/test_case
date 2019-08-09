import axios from 'axios'

document.cookie = 'a=b'

axios.post('http://127.0.0.1:9001/cors/server2', {}, {
  withCredentials: true
}).then(res => {
  console.log('我设置了withCredentials: true，打印cookie：')
  console.log(res.data)
})
axios.post('http://127.0.0.1:9001/cors/server2', {}, {
}).then(res => {
  console.log('我没有设置withCredentials: true，打印cookie：')
  console.log(res.data)
})