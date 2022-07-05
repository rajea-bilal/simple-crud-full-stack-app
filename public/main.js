const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')
const deleteQuote = document.querySelectorAll('#delete-quote')



Array.from(deleteQuote).forEach((element) => {
    element.addEventListener('click', deleteLine)
})

async function deleteLine() {
const quoteName = this.parentNode.childNodes[1].innerText
const quoteText = this.parentNode.childNodes[3].innerText

    try{
        const response = await fetch('deleteLine', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                'Name': quoteName,
                'Text': quoteText
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err) {

    }

}


deleteButton.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: 'Epictetus'
        })
    })
    .then(response => {
        if(response.ok) return response.json()
    })
    .then(response => {
        if(response === 'No quote to delete') {
            messageDiv.textContent = 'No Stoic quote to delete'
        } else {
            window.location.reload(true)
        }
    })
    .catch(error => console.error(error))
    
})


update.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'put',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: 'Epictetus',
            quote: 'There is only one way to happiness and that is to cease worrying about things which are beyond the power or our will.'
        })
    })
    .then(response => {
        if(response.ok) return response.json()
    })
    .then(response => {
        window.location.reload(true)
    })
})