//! saying we want to use express we require it for out project 
const express = require('express')
const { type } = require('os')


//! we call express it gives us back an app we can use to listen/handle requests 
const app = express()
const port = 3000

//! this is defining a 'route on our app (req = request res = response)
app.get('/', (req, res) => {
    res.send('goodbye World!')
})
// * variable paths 
// ! the colon means that name is now a varable
// app.get('/:name', (req, res) => {
//     res.send(`'Hello ${req.params.name}`)
// })

// * queries 
app.get('/greeting', (req, res) => {
    //! access query parametes from the request. 
    const greeting = req.query.greeting
    const name = req.query.name
    res.send(`${greeting} ${name}! nice to meet you `)
})

const lunches = [
    { name: 'thai' },
    { name: 'pizza' },
    { name: 'special fried rice' },
    { name: 'jam bagel' },
]

// app.get('/lunches', (req, res) => {
//     lunches.push({name: 'hot dog' })
//     res.send(lunches)
// })

//! 1. Be Polite, Greet the User

app.get('/greetings/:name', (req, res) => {
    res.send(`Hello how are you ${req.params.name}`)
})

//! 2. Rolling the Dice
app.get('/roll/:number', (req, res) => {
    if (isNaN(req.params.number)) {
        return res.send(`${req.params.number} isn't a number silly`)
    } else {
        const randomRoll = Math.floor(Math.random() * req.params.number)
        return res.send(`You rolled the number ${randomRoll}`)
    }
})

//! 3. I Want THAT One

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

app.get('/collectibles/:collectibleIdx', (req, res) => {
    let currentCollectible = collectibles[req.params.collectibleIdx]
    console.log(req.params.collectibleIdx);
    if (isNaN(req.params.collectibleIdx)) {
        return res.send('thats not item in our catalog')
    } else if (req.params.collectibleIdx > (collectibles.length - 1)) {
        return res.send("This item is not yet in stock. Check back soon!")
    } else {
        return res.send(`so you want the ${currentCollectible.name}? for ${currentCollectible.price}, it can be yours`)
    }
})

//!4 Using Query Parameters
const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];


// app.get('/hello', (req, res) => {
//     res.send(`Hello there, ${req.query.name}! I hear you are ${req.query.age} years old!`);
// });

app.get('/shoes', (req, res) => {
    const minPrice = req.query.minprice
    const maxPrice = req.query.maxprice
    const typeOfShoe = req.query.type
   let shoesFiltered = shoes

   if (!minPrice && !maxPrice && !typeOfShoe) {
    return  res.send(shoes)
   } else if (!isNaN(minPrice) && !isNaN(maxPrice) && isNaN(typeOfShoe)) {
    shoesFiltered = shoes.filter(shoe => {
        const priceRange = shoe.price >= minPrice && shoe.price <= maxPrice
        const typeMatch = typeOfShoe === shoe.type
        return priceRange && typeMatch 
    })
// } else if (!isNaN(minPrice) && !isNaN(maxPrice) && !isNaN(typeOfShoe) {
//     shoesFiltered = shoes.filter(shoe => {
//         const priceRange = shoe.price >= minPrice && shoe.price <= maxPrice
//         return priceRange
//     })
res.send(shoesFiltered)






//     console.log(shoesFiltered);
// for (let i=0; i<shoesFiltered.length; i++)
//     shoesFiltered.forEach((shoe) => {
//         res.send(`<li> shoe names: ${shoe.name} priced at: ${shoe.price}</li>`)
        
//     })

// res.send(`<li> shoe names: ${shoesFiltered[i].name} priced at: ${shoesFiltered[i].price}</li>`)

    // console.log(minPrice);
    // console.log(maxPrice); 
    // console.log(type);
    // let filtershoes = shoes
    // if (minPrice && !maxPrice && !type) {
    //     return res.send(`${shoeList}`)
    // } else {
    //     res.send('hi')
    // }
    // if ( minPrice && !maxPrice && !type) {
    //     return res.send(`${shoes}`)
    // }
    //     const filtedShoe = shoes.filter((shoe) => {
    //         if (!minPrice && !maxPrice && !type){
    //             return res.send(`this is a list of the shoes names ${shoe.name} and their price ${price}`)
    //         } else if (shoe.price >= minPrice && shoe.price <= maxPrice && shoe.type === type){
    // return res.send(`these shoes match your choice: ${shoe.name} price: ${shoe.price}`)
    //         } 
    //          } )

}})




//!  express is listening at this port 
app.listen(port, () => {
    console.log(`example app listening on port ${port}`);
})
