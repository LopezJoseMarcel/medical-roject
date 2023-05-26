
const ENDPOINT = 'http://localhost:8000';

export default function loginService ({email, contrasenha}){
  return fetch(`${ENDPOINT}/api/login`, {
    //mode: 'no-cors',
    method: 'POST',
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({email, contrasenha})
  })
  .then(res => {
    if (!res.ok) throw new Error('Response is not ok!!')
    return res.json()
  }).then(res => {
    const {jwt} = res.jwt
    return jwt
  })
}
