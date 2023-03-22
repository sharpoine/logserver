const express = require('express')
const app = express()
const port = 1338
let cassandra = require('cassandra-driver')
var bodyParser = require('body-parser')
const { v1: uuidv1 } = require('uuid')

app.use(bodyParser())

let authProvider = new cassandra.auth.PlainTextAuthProvider(
  'Username',
  'Password'
)
let contactPoints = ['127.0.0.1']
let localDataCenter = 'datacenter1'

let client = new cassandra.Client({
  contactPoints: contactPoints,
  authProvider: authProvider,
  localDataCenter: localDataCenter,
  keyspace: 'ys'
})


app.post('/getSearchLogProduct', async (req, res) => {
  if (!req.body.customer_id) {
    return res.json({
      error: true
    })
  }

  try {
    let query = `SELECT * FROM ys.searchproduct `
    if (req.body.customer_id > 0) {
      query += `WHERE customer_id = ${req.body.customer_id} ALLOW FILTERING`
    }
    const results = await client
      .execute(query)
      .then(result => {
        return result.rows
      })
      .catch(err => {
        console.log(err)
      })

    return res.json(results)
  } catch (err) {
    console.log(err)
    return res.json({})
  }
})

app.post('/addSearchLogProduct', async (req, res) => {
  if (!req.body.query || !req.body.product_id) {
    return res.json({
      error: true
    })
  }

  try {
    let query = `INSERT INTO ys.searchproduct (log_id, customer_id, query, product_id) 
            VALUES ('${uuidv1(10)}',${req.body.customer_id}, '${req.body.query}', ${req.body.product_id})`

    await client
      .execute(query)
      .then(result => { })
      .catch(err => {
        console.log(err)
      })
    return res.json({
      error: false,
      response: 'Search log created successfully'
    })
  } catch (err) {
    console.log(err)
    return res.json({
      error: true
    })
  }
})


app.post('/getSearchLog', async (req, res) => {
  if (!req.body.customer_id) {
    return res.json({
      error: true
    })
  }

  try {
    let query = `SELECT * FROM ys.search `
    if (req.body.customer_id > 0) {
      query += `WHERE customer_id = ${req.body.customer_id} ALLOW FILTERING`
    }
    const results = await client
      .execute(query)
      .then(result => {
        return result.rows
      })
      .catch(err => {
        console.log(err)
      })

    return res.json(results)
  } catch (err) {
    console.log(err)
    return res.json({})
  }
})

app.post('/addSearchLog', async (req, res) => {
  if (!req.body.query) {
    return res.json({
      error: true
    })
  }

  try {
    let query = `INSERT INTO ys.search (log_id, customer_id, query) 
          VALUES ('${uuidv1(10)}',${req.body.customer_id}, ${req.body.query})`

    await client
      .execute(query)
      .then(result => { })
      .catch(err => {
        console.log(err)
      })
    return res.json({
      error: false,
      response: 'Search log created successfully'
    })
  } catch (err) {
    console.log(err)
    return res.json({
      error: true
    })
  }
})

app.post('/getWishlistLog', async (req, res) => {
  if (!req.body.customer_id) {
    return res.json({
      error: true
    })
  }

  try {
    let query = `SELECT * FROM ys.wishlist WHERE customer_id = ${req.body.customer_id} ALLOW FILTERING`
    const results = await client
      .execute(query)
      .then(result => {
        return result.rows
      })
      .catch(err => {
        console.log(err)
      })

    return res.json(results)
  } catch (err) {
    console.log(err)
    return res.json({})
  }
})

app.post('/addWishlistLog', async (req, res) => {
  if (!req.body.customer_id || !req.body.product_id) {
    return res.json({
      error: true
    })
  }

  try {
    let query = `INSERT INTO ys.wishlist (log_id, customer_id, product_id) 
        VALUES ('${uuidv1(10)}',${req.body.customer_id}, ${req.body.product_id
      })`

    await client
      .execute(query)
      .then(result => { })
      .catch(err => {
        console.log(err)
      })
    return res.json({
      error: false,
      response: 'Visit created successfully'
    })
  } catch (err) {
    console.log(err)
    return res.json({
      error: true
    })
  }
})

app.post('/getCartLog', async (req, res) => {
  if (!req.body.customer_id) {
    return res.json({
      error: true
    })
  }

  try {
    let query = `SELECT * FROM ys.cart WHERE customer_id = ${req.body.customer_id} ALLOW FILTERING`
    const results = await client
      .execute(query)
      .then(result => {
        return result.rows
      })
      .catch(err => {
        console.log(err)
      })

    return res.json(results)
  } catch (err) {
    console.log(err)
    return res.json({})
  }
})

app.post('/addCartLog', async (req, res) => {
  if (!req.body.customer_id || !req.body.product_id) {
    return res.json({
      error: true
    })
  }

  try {
    let query = `INSERT INTO ys.cart (log_id, customer_id, product_id) 
      VALUES ('${uuidv1(10)}',${req.body.customer_id}, ${req.body.product_id})`

    await client
      .execute(query)
      .then(result => { })
      .catch(err => {
        console.log(err)
      })
    return res.json({
      error: false,
      response: 'Visit created successfully'
    })
  } catch (err) {
    console.log(err)
    return res.json({
      error: true
    })
  }
})

app.post('/getCategoryLog', async (req, res) => {
  if (!req.body.customer_id) {
    return res.json({
      error: true
    })
  }

  try {
    let query = `SELECT * FROM ys.category WHERE customer_id = ${req.body.customer_id} ALLOW FILTERING`
    const results = await client
      .execute(query)
      .then(result => {
        return result.rows
      })
      .catch(err => {
        console.log(err)
      })

    return res.json(results)
  } catch (err) {
    console.log(err)
    return res.json({})
  }
})

app.post('/addCategoryLog', async (req, res) => {
  if (!req.body.customer_id || !req.body.category_id) {
    return res.json({
      error: true
    })
  }

  try {
    let query = `INSERT INTO ys.category (log_id, customer_id, category_id) 
    VALUES ('${uuidv1(10)}',${req.body.customer_id}, ${req.body.category_id})`

    await client
      .execute(query)
      .then(result => { })
      .catch(err => {
        console.log(err)
      })
    return res.json({
      error: false,
      response: 'Visit created successfully'
    })
  } catch (err) {
    console.log(err)
    return res.json({
      error: true
    })
  }
})

app.post('/getProductLog', async (req, res) => {
  if (!req.body.customer_id) {
    return res.json({
      error: true,
      body: req.body
    })
  }

  try {
    let query = `SELECT * FROM ys.product WHERE customer_id = ${req.body.customer_id} ALLOW FILTERING`
    const results = await client
      .execute(query)
      .then(result => {
        return result.rows
      })
      .catch(err => {
        console.log(err)
      })

    return res.json(results)
  } catch (err) {
    console.log(err)
    return res.json({})
  }
})

app.post('/addProductLog', async (req, res) => {
  if (!req.body.customer_id || !req.body.product_id) {
    return res.json({
      error: true
    })
  }

  try {
    let query = `INSERT INTO ys.product (log_id, customer_id, product_id) 
      VALUES ('${uuidv1(10)}',${req.body.customer_id}, ${req.body.product_id})`

    await client
      .execute(query)
      .then(result => { })
      .catch(err => {
        console.log(err)
      })
    return res.json({
      error: false,
      response: 'Visit created successfully'
    })
  } catch (err) {
    console.log(err)
    return res.json({
      error: true
    })
  }
})

app.post('/getOrderLog', async (req, res) => {
  if (!req.body.order_id) {
    return res.json({
      error: true,
      body: req.body
    })
  }

  try {
    let query = `SELECT * FROM ys.orderlogs WHERE order_id = ${req.body.order_id} ALLOW FILTERING`
    const results = await client
      .execute(query)
      .then(result => {
        return result.rows
      })
      .catch(err => {
        console.log(err)
      })

    return res.json(results)
  } catch (err) {
    console.log(err)
    return res.json({})
  }
})

app.post('/addOrderLog', async (req, res) => {
  if (!req.body.createdby || !req.body.order_id) {
    return res.json({
      error: true
    })
  }

  try {
    let date = new Date();
    let query = `INSERT INTO ys.orderlogs (id, order_id, createdby, createdat, hrs) 
      VALUES ('${uuidv1(10)}',${req.body.order_id}, '${req.body.createdby}', '${date.toISOString().slice(0, 10)}','${date.toLocaleTimeString()}')`

    await client
      .execute(query)
      .then(result => { })
      .catch(err => {
        console.log(err)
      })
    return res.json({
      error: false,
      response: 'Order log created successfully'
    })
  } catch (err) {
    console.log(err)
    return res.json({
      error: true
    })
  }
})


app.listen(port, () => {
  console.log(`[CASSANDRA] Log app listening on port ${port}`)
  console.log()
})
