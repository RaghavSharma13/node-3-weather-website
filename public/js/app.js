console.log('Client side javaScript file loaded');

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const paraOne=document.querySelector('#p1')
const paraTwo=document.querySelector('#p2')



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    paraOne.textContent='Loading...'
    paraTwo.textContent=''
    const location=search.value
    if(location.length===0)
    {
        return paraOne.textContent='ERROR : Location Cant be empty. Try again'
    }
    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
    response.json().then((parsedData)=>{
        if(parsedData.error)
        {
            return paraOne.textContent=parsedData.error
        }   
        paraOne.textContent=parsedData.location
        paraTwo.textContent=parsedData.forecast
    })
})
})