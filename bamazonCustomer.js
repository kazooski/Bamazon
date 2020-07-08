// Main template for creating a connection
var mysql = require("mysql");
var inquirer = require("inquirer");
// const { start } = require("repl");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    // connection.end();
    // run the start function after the connection is made to prompt the user
    readProducts();
});

function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM bamazon.products", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
      buyPrompt();
    });
};

function buyPrompt() {
    // query the database for all products
    connection.query("SELECT * FROM products", function(err, results) {
      if (err) throw err;
      // once you have the items, prompt the user for which they'd like to bid on
      inquirer
        .prompt([
            {
            name: "choice",
            type: "rawlist",
            choices: function() {
                var choiceArray = [];
                for (var i = 0; i < results.length; i++) {
                choiceArray.push(results[i].product_name);
                }
                return choiceArray;
            },
            message: "What product ID would you like to purchase?"
            },
            {
            name: "amount",
            type: "input",
            message: "How many would you like to purchase?"
            }
        ])
        .then(function(answer) {
          // get the information of the chosen item
            var chosenItem;
            for (var i = 0; i < results.length; i++) {
            if (results[i].product_name === answer.choice) {
                chosenItem = results[i];
            }
        }
  
          // determine if bid was high enough
        if (chosenItem.stock_quantity > 0) {
            // Product is in stock. Proceed with purchase.
            console.log("Processing payment...\n");
            connection.query(
                // Updating stock quantity 
                "UPDATE products SET ? WHERE ?",
                [
                {
                    stock_quantity: chosenItem.stock_quantity - answer.amount
                },
                {
                    item_id: chosenItem.item_id

                }
                ],
              function(err, res) {
                if (err) throw err;
                console.log(chosenItem.product_name + " was purchased for " + chosenItem.price + "!\n");
                // Call readProducts 
                readProducts();
              }
            );
        }
          else {
            // no stock error
            console.log("Sorry! That product is no longer available.");
            readProducts();
          }
        });
    });
};