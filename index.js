//import
const express = require ('express');
const cors = require ('cors');

//implementasi
const app = express();
app.use(cors());

//endpopint admin
const admin = require('./routes/admin')
app.use("/admin",admin)

//customer
const customer = require('./routes/customer')
app.use("/customer",customer)

//product
const product = require('./routes/product');
app.use("/product", product)

app.listen(8080, () => {
    console.log ('server run on port 8080')
})