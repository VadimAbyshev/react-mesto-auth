const baseUrl = 'https://auth.nomoreparties.co'


function getResponseData(res) {
    return res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`)
  }

export  function regUser(email, password) {
    return fetch(`${baseUrl}/signup`, { 
      method: 'POST',
      headers: {
        "Content-Type": "application/json"      },
      body: JSON.stringify({
        email: email,
        password: password,
        
      })
    })
    .then(res => getResponseData(res))
  }




  export  function loginUser(email, password) {
    return fetch(`${baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,

      })
    })
    .then(res => getResponseData(res))
  }



  export  function checkTokens(token) {
    return fetch(`${baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      }})
      .then(res => getResponseData(res))
    }