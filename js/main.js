//POPULATE LIST OF DRINK OPTIONS IN <select>
const drinkListURL  = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka'
const select = document.querySelector('.drinks')

fetch(drinkListURL)
.then(res => res.json()) // parse response as JSON
.then(data => {
  console.log(data)
  const drinks = data.drinks
  const drinkName = drinks.map(drink => drink.strDrink)
  for (let i=0; i <drinkName.length; i++){
  const option = document.createElement('option')
  option.value = drinkName[i]
  option.innerText = drinkName[i]
  select.appendChild(option)}

})
.catch(err => {
    console.log(`error ${err}`)
});

//USE <options> AS FETCH PARAMETER
 select.addEventListener('change',event =>{
  let rawUrl =`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${event.target.value}`
  let url = rawUrl.replaceAll(' ','_')
  console.log(url)

     fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      const drinks = data.drinks[0]
      
      //image
      document.querySelector('.image').src=drinks.strDrinkThumb

      //glass
      document.querySelector('.glass').innerText= "Serve it in a " + drinks.strGlass

      //instructions
      document.querySelector('.directions').innerText=drinks.strInstructions

      //get only truthy ingredients
      let ingredients = []
      for (const [key,value] of Object.entries(drinks)){
        if(key.includes('strIngredient') && value) ingredients.push(value)}
          console.log(ingredients)

        //ingredients to dom
          let imap = ingredients.map((x)=>x)
          let inHtml =  imap.map((x)=> '<li>' + x + '</li>').join('')
          document.querySelector('ul.igList').innerHTML = inHtml

      let measurements = []
      for (const [key,value] of Object.entries(drinks)){
        if(key.includes('strMeasure') && value) measurements.push(value)
      }
      console.log(measurements)

      //ingredients to dom
      let mmap = measurements.map((x)=>x)
      let mHtml =  mmap.map((x)=> '<li>' + x + '</li>').join('')
      document.querySelector('ul.mList').innerHTML = mHtml
     
    })
    .catch(err => {
    console.log(`error ${err}`)
    });


})

