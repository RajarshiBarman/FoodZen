const express = require("express");
const app = express();
const port = 3600
const mysql = require("./connection").con
const hbs = require('hbs');

app.use(express.static('assets'));

const bodyParser = require('body-parser');
const { con } = require("./connection");
const encoder=bodyParser.urlencoded({extended: true});

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "hbs");
app.set("views", "./view")

app.get("/userlogged2", (req, res) => {
    let qry = "select rest_name,address,email,phonenumber from restaurant ";
    mysql.query(qry, (err, results) => {
        if (err) throw err
        else {
            res.render("ul", { data: results });
        }

    });
});

/*app.get("/view1",function (req,res) {
    res.sendFile(__dirname + "/view/view1.html");  
})*/


app.get("/",function (req,res) {
    res.sendFile(__dirname + "/view/index.html");  
})

app.get("/login",function (req,res) {
    res.sendFile(__dirname + "/view/login.html");  
})

app.get("/register_customer",function (req,res) {
    res.sendFile(__dirname + "/view/register_customer.html");  
})

app.get("/register_chef",function (req,res) {
    res.sendFile(__dirname + "/view/register_chef.html");  
})

app.get("/add",function (req,res) {
    res.sendFile(__dirname + "/view/add.html");  
})

app.get("/edit",function (req,res) {
    res.sendFile(__dirname + "/view/edit.html");
})

app.get("/delete",function (req,res) {
    res.sendFile(__dirname + "/view/delete.html");
})

//when login successful
app.get("/welcome",function (req,res) {
    res.sendFile(__dirname + "/view/welcome.html");
})

app.get("/welcome1",function (req,res) {
    res.sendFile(__dirname + "/view/welcome1.html");
})

app.get("/userLogged",function (req,res) {
    res.sendFile(__dirname + "/view/userLogged.html");  
})

app.get("/chefLogged",function (req,res) {
    res.sendFile(__dirname + "/view/chefLogged.html");  
})

app.get("/add_item_successfully",function (req,res) {
    res.sendFile(__dirname + "/view/add_item_successfully.html");  
})

app.get("/edit_item_successfully",function (req,res) {
    res.sendFile(__dirname + "/view/edit_item_successfully.html");  
})

app.get("/delete_item_successfully",function (req,res) {
    res.sendFile(__dirname + "/view/delete_item_successfully.html");  
})
app.get("/confirm",function (req,res) {
    res.sendFile(__dirname + "/view/confirm.html");  
})

app.get("/feedback",function (req,res) {
    res.sendFile(__dirname + "/view/complete_feedback.html");  
})

app.get("/confirm_feedback",function (req,res) {
    res.sendFile(__dirname + "/view/confirm_feedback.html");  
})

app.get("/confirm_contact",function (req,res) {
    res.sendFile(__dirname + "/view/confirm_contact.html");  
})

app.get("/confirm_contact2",function (req,res) {
    res.sendFile(__dirname + "/view/confirm_contact2.html");  
})

var username1;
var address1;

//LOGIN PART
app.post("/login",encoder, function (req,res) {
    var username = req.body.username;
    var password = req.body.password;
    mysql.query("select * from customer where email=? and password= ?",[username,password],function(err,results,feilds){
        if(results.length > 0){
           res.redirect("/userLogged2");
           const item = results[0];
            username1 = item.username;
            address1 = item.address;
           //res.redirect("/userlogged");
        }
        else {
            mysql.query("select * from restaurant where email=? and password= ?",[username,password],function(err,results,feilds){
                if(results.length > 0){
                    res.redirect("/chefLogged");
                    const item = results[0];
                    username1 = item.rest_name;
                }
                else {
                    //res.redirect('<script>alert("your alert message"); window.location.href = "/"; </script>');
                    console.log("Wrong password");
                    res.redirect("/login");
                }
                //res.end();``
                })
        }
        //res.end();``
        })
})



//CUSTOMER REGISTER
app.get("/customer_register", (req, res) => {
    // fetching data from form
    const { username, address, email, phonenumber, password } = req.query

    // Sanitization XSS...
    let qry = "select * from customer where username=?";
    mysql.query(qry, [username], (err, results) => {
        if (err)
            throw err
        else {


            if (results.length > 0) {
                res.send(results)
            } else {

                // insert query
                let qry2 = "insert into customer(username, address, email, phonenumber, password) values (?,?,?,?,?)";
                mysql.query(qry2, [username, address, email, phonenumber, password], (err, results) => {
                    console.log(results)
                    console.log("Success")
                    //res.sendFile(path.join(__dirname + "/welcome.html"))
                    res.redirect("/login");
                })
            }
        }
    })
});




//CHEF REGISTER
app.get("/chef_register", (req, res) => {
    // fetching data from form
    const { username, rest_name, address, email, phonenumber, password } = req.query

    // Sanitization XSS...
    let qry = "select * from restaurant where username=?";
    mysql.query(qry, [username], (err, results) => {
        if (err)
            throw err
        else {


            if (results.length > 0) {
                res.send(results)
            } else {

                // insert query
                let qry2 = "insert into restaurant(username, rest_name, address, email, phonenumber, password) values (?,?,?,?,?,?)";
                mysql.query(qry2, [username, rest_name, address, email, phonenumber, password], (err, results) => {
                    console.log(results)
                    //res.sendFile(path.join(__dirname + "/welcome.html"))
                    res.redirect("/login");
                    console.log("Success");
                })
            }
        }
    })
});





//CHEF ADD ITEM
app.get("/add_items", (req, res) => {
    // fetching data from form
    const { rest_name, item_name, item_description, price } = req.query

    // Sanitization XSS...
    let qry2 = "insert into menu(rest_name, item_name, item_description, price) values (?,?,?,?)";
                mysql.query(qry2, [rest_name, item_name, item_description, price], (err, results) => {
                    console.log(results)
                    //res.sendFile(path.join(__dirname + "/welcome.html"))
                    res.redirect("/add_item_successfully");
                })
});





//CHEF EDIT ITEM
app.get("/edit_items", (req, res) => {
    // fetching data from form
    const { price , item_name, rest_name } = req.query

    // Sanitization XSS...
    let qry2 = "update menu set price = ? where item_name = ? and rest_name = ?";
                mysql.query(qry2, [price, item_name, rest_name], (err, results) => {
                    console.log(results)
                    //res.sendFile(path.join(__dirname + "/welcome.html"))
                    res.redirect("/edit_item_successfully");
                })
});




//CHEF DELETE ITEM
app.get("/delete_items", (req, res) => {
    // fetching data from form
    const { rest_name, item_name } = req.query

    // Sanitization XSS...
    let qry2 = "delete from menu where rest_name = ? and item_name = ?";
                mysql.query(qry2, [rest_name, item_name], (err, results) => {
                    console.log(results)
                    //res.sendFile(path.join(__dirname + "/welcome.html"))
                    res.redirect("/delete_item_successfully");
                    //showalert("Item Added Successfully")
                })
});




//CHEF VIEW MENU
/*View 1
var restaurant_name;
app.post('/view_menu1', (req, res) => {
    restaurant_name=req.body.name;
    res.render("/view2")
  });


app.get("/view2", (req, res) => {
    let qry = "select * from menu rest_name = restaurant_name";
    mysql.query(qry, (err, results) => {
        if (err) throw err
        else {
            res.render("view_menu1", { data: results });
        }

    });
});

View 2
app.get('/view1', (req, res) => {
    res.render('view1');
  });

app.get('/view_menu1', (req, res) => {
    res.render('view_menu1');
  });



app.post('/albal', (req, res) => {
    //console.log('>>>>>query',req.query);
    //console.log('>>>>body ',req.body);
    const { rest_name } = req.body;
    console.log(rest_name);
    // Query the database with the input from the form
    const sql = `SELECT * FROM menu WHERE rest_name LIKE ?`;
    mysql.query(sql,[rest_name], (err, results) => {
      //console.log(results)
      if (err) throw err;
      res.render('view_menu1', { data: results });
    });
  });
*/

//View Item Final for Chef
app.get('/view_menu2', (req, res) => {
    res.render('view_menu2');
  });

app.get("/view_menu_chef", (req, res) => {
    let qry = `SELECT * FROM menu WHERE rest_name LIKE ?`;
    mysql.query(qry,[username1], (err, results) => {
        if (err) throw err
        else {
            console.log(username1);
            console.log(results);
            res.render('view_menu2', { data: results });
        }

    });
});



  app.get('/food_items', (req, res) => {
    res.render('food_items');
  });

  /*app.get('/cart', (req, res) => {
    res.render('cart');
  });*/

  //SEARCH RESTAURANT
  var restaurant;
  app.post('/search_rest', (req, res) => {
    const { name } = req.body;
    //console.log(name);
    restaurant=req.body.name;
    console.log(restaurant);
    // Query the database with the input from the form
    const sql = "SELECT * FROM menu WHERE rest_name LIKE ?";
    mysql.query(sql,[name], (err, results) => {
      console.log(results)
      if (err) throw err;
      res.render('food_items', { foodItems: results, restaurant });
    });
  });
// ADD ITEM TO CART
  var quantity1;
  var datetime;
  app.post('/cart/add', (req, res) => {
    const { foodItemId, quantity } = req.body;
    console.log(foodItemId);
    quantity1=req.body.quantity;
    var currentdate = new Date();
    datetime = currentdate.getDate() + "/" + (currentdate.getMonth()+1) 
    + "/" + currentdate.getFullYear() + " @ " 
    + currentdate.getHours() + ":" 
    + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    const query = 'INSERT INTO cart_items2 (username,address,rest_name,food_item_id, quantity, date_time) VALUES (?, ?, ?, ?, ?,?)';
    mysql.query(query, [username1, address1, restaurant,foodItemId, quantity,datetime], (err, result) => {
    if (err) throw err;
    res.redirect('/cart');
    });
    });
    
    // VIEW CART
    app.get('/cart', (req, res) => {
    const query = 'SELECT menu.item_name, menu.price, cart_items2.quantity FROM cart_items2 INNER JOIN menu ON cart_items2.food_item_id = menu.menu_id' ;
    mysql.query(query, (err, results) => {
    if (err) throw err;
    //res.render('cart', { cartItems });
    console.log(results);
    let l = results.length;
    const item = results[l-1];
    const totalPrice = item.price * quantity1;
      res.render('cart', { item, quantity1, totalPrice, datetime });
    });
    });
/*
    app.get('/view2', (req, res) => {
        res.render('view2');
      });
    
    app.get('/view_order', (req, res) => {
        res.render('view_order');
      });
    
    
    app.post('/albal2', (req, res) => {
        //console.log('>>>>>query',req.query);
        //console.log('>>>>body ',req.body);
        const { rest_name } = req.body;
        console.log(rest_name);
        // Query the database with the input from the form
        const sql = `SELECT * FROM cart_items2 WHERE rest_name LIKE ?`;
        mysql.query(sql,[rest_name], (err, results) => {
          //console.log(results)
          if (err) throw err;
          res.render('view_order', { data: results });
        });
      });
 */

      
//View Order Final for Chef
app.get('/view_order2', (req, res) => {
    res.render('view_order2');
  });

app.get("/view_order_chef", (req, res) => {
    let qry = `SELECT * FROM cart_items2 WHERE rest_name LIKE ?`;
    mysql.query(qry,[username1], (err, results) => {
        if (err) throw err
        else {
            console.log(username1);
            console.log(results);
            res.render('view_order2', { data: results });
        }

    });
});    


//Feedback
app.get("/submit", (req, res) => {
    // fetching data from form
    const { name, rest_name, rating, comments } = req.query


                // insert query
                let qry2 = "insert into feedback(name, rest_name, rating, comments ) values (?,?,?,?)";
                mysql.query(qry2, [name, rest_name, rating, comments ], (err, results) => {
                    console.log(results)
                    console.log("Success")
                    //res.sendFile(path.join(__dirname + "/welcome.html"))
                    res.redirect("/confirm_feedback");
                })
            
});

//Contact
app.get("/contact", (req, res) => {
    // fetching data from form
    const { name, email, date, message } = req.query


                // insert query
                let qry2 = "insert into contact(name, email, date, message ) values (?,?,?,?)";
                mysql.query(qry2, [name, email, date, message ], (err, results) => {
                    console.log(results)
                    console.log("Success")
                    //res.sendFile(path.join(__dirname + "/welcome.html"))
                    res.redirect("/confirm_contact");
                })
            
});

app.get("/contact2", (req, res) => {
    // fetching data from form
    const { name, email, date, message } = req.query


                // insert query
                let qry2 = "insert into contact(name, email, date, message ) values (?,?,?,?)";
                mysql.query(qry2, [name, email, date, message ], (err, results) => {
                    console.log(results)
                    console.log("Success")
                    //res.sendFile(path.join(__dirname + "/welcome.html"))
                    res.redirect("/confirm_contact2");
                })
            
});


//set app port
app.listen(port,(err)=>{
    if(err)
    throw err
    else
    console.log("Server running at %d port",port)
})