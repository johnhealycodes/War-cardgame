
//localStorage function

document.querySelector('#newGame').addEventListener('click', newGame)



let deckId = ''

function newGame(){fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      deckId = data.deck_id
      localStorage.setItem('deckId', `${data.deck_id}`)
      window.location.reload()
      localStorage.setItem('computerScore', Number('0'))
      localStorage.setItem('playerScore', Number('0'))
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}


//draw 2 cards function

document.querySelector('#play').addEventListener('click', drawCard)

function drawCard(){
  const url = `https://deckofcardsapi.com/api/deck/${localStorage.getItem('deckId')}/draw/?count=2`
  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      document.querySelector('#player1').src = data.cards[0].image
      document.querySelector('#player2').src = data.cards[1].image

      //hide cards from War
      document.querySelector('#p1war1').src = ""
      document.querySelector('#p2war1').src = ""
      document.querySelector('#p1war2').src = ""
      document.querySelector('#p2war2').src = ""
      document.querySelector('#p1war3').src = ""
      document.querySelector('#p2war3').src = ""
  


      let computerValue = convertToNum(data.cards[0].value)
      let playerValue = convertToNum(data.cards[1].value)


      if (computerValue > playerValue){
        // document.querySelector('#computerScore').innerText = `${compScore++}` 
        document.querySelector('#result').innerText = `Computer Wins`
        document.querySelector('div').innerHTML = ``
      } else if (computerValue < playerValue){
        // document.querySelector('#playerScore').innerText = `${playerScore++}` 
        document.querySelector('#result').innerText = `You Win`
        document.querySelector('div').innerHTML = ``
      } else {
        document.querySelector('div').innerHTML = `<button id="WAR">WAR</button>`
        document.querySelector('#WAR').addEventListener('click', war)
    }
    })
    .catch(err => {
      console.log(`error ${err}`)
  });

}

//Setting Scores

//Function to increase player score
// let playerScore = document.querySelector('#playerScore').innerText = `${Number(localStorage.getItem('playerScore'))}`
// let compScore = document.querySelector('#computerScore').innerText = `${Number(localStorage.getItem('computerScore'))}`

// function gameScore(){
//   if (document.querySelector('#id').value === "Computer Wins"){
//     Number(localStorage.getItem('computerScore')++)
//   } else if (document.querySelector('#id').value === "You Win"){
//     Number(localStorage.getItem('playerScore')++)
//   } else {
//     console.log('War')
//   }
// }

function war(){
  fetch(`https://deckofcardsapi.com/api/deck/${localStorage.getItem('deckId')}/draw/?count=6`)
  .then(res => res.json())
  .then(data => {
    console.log(data)

    document.querySelector('#p1war1').src = data.cards[0].image
    document.querySelector('#p2war1').src = data.cards[1].image
    document.querySelector('#p1war2').src = data.cards[2].image
    document.querySelector('#p2war2').src = data.cards[3].image
    document.querySelector('#p1war3').src = data.cards[4].image
    document.querySelector('#p2war3').src = data.cards[5].image


    let computerValue = convertToNum(data.cards[4].value)
    let playerValue = convertToNum(data.cards[5].value)


    if (computerValue > playerValue){
      // document.querySelector('#computerScore').innerText = `${compScore++}` 
      document.querySelector('#result').innerText = `Computer Wins`
    } else if (computerValue < playerValue){
      // document.querySelector('#playerScore').innerText = `${playerScore++}` 
      document.querySelector('#result').innerText = `You Win`
    } else {
      document.querySelector('div').innerHTML = `<button id="WAR">WAR</button>`
      document.querySelector('#WAR').addEventListener('click', war)
      war()
  }

  })
  .catch(err => {
    console.log(`error ${err}`)
});

}




let convertToNum = (val) => {
  if (val === 'ACE'){
    return 14
  } else if (val === 'KING'){
    return 13
  } else if (val === 'QUEEN'){
    return 12
  } else if (val === 'JACK') {
    return 11
  } else {
    return Number(val)
  }
}
