fetch(url).then((response) => {
 return response.text()
}).then((result) => {
 console.log(result)
})

axios(url).then((result) => {
 console.log(result)
})