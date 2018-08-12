require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
var figlet = require('figlet');


var connection = mysql.createConnection({
  host: process.env.DB_HOST,

  port: 3306,
  user: process.env.DB_USER,

  password: process.env.DB_PASS,
  database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    showProducts();   
});

var catalog = new Table({
    head: ['Product ID', 'Product Name', 'Price', 'Quantity']
  , colWidths: [15, 30, 10, 10]
});

function showProducts(){
    figlet('Amazon - CLI', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            return;
        }
        console.log(data);
        console.log("Following Products are available in our Store : ");
        connection.query("SELECT * FROM products", function(err, res){
            if(err) throw err;
            for (var i in res){
                catalog.push(
                    [res[i].id, res[i].product_name, res[i].price, res[i].stock_quantity]
                );
            }
            console.log(catalog.toString());
            takeOrder(res);
        });
    });
}


function takeOrder(res){
    inquirer.prompt([
        {
            type: "confirm",
            name: "buy",
            message: "Would you like to buy anything ?",
            default: true
        }
    ]).then(function(answer){
        if(answer.buy){
            inquirer.prompt([
                {
                    name: "productID",
                    message: "Specify Product ID ?",
                    validate: function validID(name){
                        if(name > 0 && name <= res.length) return true;
                            console.log(" \n Please enter valid product ID");
                            return false;
                    }
                },
                {
                    name: "quantity",
                    message: "Enter Quantity",
                    validate: function valid_entry(name){
                        if(name>0) return true;
                        console.log("Please enter quantity greater than 1");
                        return false;
                    }

                }
            ]).then(function(answer){
                console.log("\n You selected Product ID : " + answer.productID);
                console.log("\n Item : " + res[answer.productID - 1].product_name)
                console.log("\n Selected Quantity : " + answer.quantity);
                if(res[answer.productID - 1].stock_quantity >= answer.quantity){
                    console.log("\n Total cost of your purchase will be : " + (answer.quantity * res[answer.productID - 1].price));
                    quantityLeft = res[answer.productID - 1].stock_quantity - answer.quantity;
                    processOrder(answer.productID, quantityLeft);
                }
                else{
                    console.log("\n Sorry We dont have enough quantity");
                    connection.end()
                }
            })
        }
        else{
            console.log("\n Thanks for visiting");
            connection.end()

        }
    })
}


function processOrder(productId, quantity){
    connection.query("UPDATE products SET ? WHERE ?", [
        {
            stock_quantity : quantity,
        },
        {
            id : productId
        }
    ], function(err){
        if(err) throw err;
        console.log("\n Order Processed !!!!!!");
    });
    connection.end();
}

