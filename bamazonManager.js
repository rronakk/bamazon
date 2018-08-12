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
    figlet('Amazon - CLI', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            return;
        }
        console.log(data);
    console.log(" \n Welcome to Inventory Management Page");
    showOption();
    });
});

var catalog = new Table({
    head: ['Product ID', 'Product Name', 'Price', 'Quantity']
  , colWidths: [15, 30, 10, 10]
});

function showOption(){
    inquirer.prompt(
      {
        name: "menuOption",
        type: "list",
        message: "Select an Action you may want to pursue",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New product"]
      }).then(function(answer){
          if (answer.menuOption === "View Products for Sale"){
              showInventory();
          }
          else if (answer.menuOption === "View Low Inventory"){
            showLowInventory();
          }
          else if (answer.menuOption === "Add to Inventory"){
            addToInventory();
          }
          else {
            addProduct();
          }
      }
      )}
function showInventory(){
    connection.query("SELECT * FROM products", function(err, res){
        if(err) throw err;
        for (var i in res){
            catalog.push(
                [res[i].id, res[i].product_name, res[i].price, res[i].stock_quantity]
            );
        }
        console.log(catalog.toString());
        connection.end()
    });
}

function showLowInventory(){
    connection.query("SELECT * FROM `products` WHERE stock_quantity < 5", function(err, res){
        if(err) throw err;
        for (var i in res){
            catalog.push(
                [res[i].id, res[i].product_name, res[i].price, res[i].stock_quantity]
            );
        }
        console.log(catalog.toString());
        connection.end()

    });
}

function addToInventory(){
    inquirer.prompt([
        {
            name: "productId",
            message : "Specify product id, to increse its quantity : "
        },
        {
            name: "quantity",
            message: "Enter Quantity: "
        }
    ]).then(function(answer){
        connection.query("SELECT `stock_quantity` FROM `products` WHERE  ?", [
            { id: answer.productId }
         ]
         ,function(err, res){
             if(err) throw err;
             connection.query("UPDATE products SET ? WHERE ?", [
                {
                    stock_quantity : parseInt(res[0].stock_quantity) + parseInt(answer.quantity)
                },
                {
                    id : answer.productId
                }
            ], function(err){
                if(err) throw err;
                console.log("\n Inventory Updated !!!!!! \n");
                showInventory()
            });
      
         });
    });
}

function addProduct(){
    inquirer.prompt([
        {
            name: "productName",
            message : "Name of the Product : "
        },
        {
            name: "price",
            message: "Enter Price : "
        },
        {
            name: "quantity",
            message: "Enter Quantity : "
        }
    ]).then(function(answer){
        connection.query("INSERT INTO products SET ?",
            {
                product_name: answer.productName,
                price: answer.price,
                stock_quantity: answer.quantity
            }, function(err){
                if(err) throw err;
                console.log("\n Product added in the catelog !!!!!! \n");
                showInventory();
            }
        );
    })
}
