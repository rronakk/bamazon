# bamazon

This is Super light weight store, you can interact with it using your command line.

#### Demo : 
![](demo.gif)


#### As a Customer :

- You can view existing inventory.
- You can buy an item from the inventory.
- If you order something more than quantity available, it will throw you an error.


##### As a Store Manager :

- You can add items to store inventory.
- You can update quantity of existing products.
- You can view list of products whose quantity is less than 5.

#### Setup

- cd into the project directory.
- Install the node packages required to fuel up the store:

```npm install```

##### As customer :
 
``` node bamazon.js```

##### As Store Manager :

```node bamazaonManager.js```
