const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.port || 80;
const mongoose = require("mongoose");
const { read } = require("fs");
app.use(express.urlencoded({extended:true}));
mongoose.connect('mongodb+srv://asadnoor:shaguftanaz@cluster0.araou.mongodb.net/minecraftalts?retryWrites=true&w=majority', {useNewUrlParser : true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, "error"));
db.once('open', ()=>{
    console.log("Connected!");
});
const contactStruc = new mongoose.Schema({
    name : String,
    phone : String,
    message : String
});
const signUpStruc = new mongoose.Schema({
    name : String,
    phone: String,
    adress : String,
    password : String,
    rePassword : String
});
const cartStruc = new mongoose.Schema({
    phone : String,
    productId : String,
    keywords : String,
    productName : String,
    imgUrl1 : String,
    price : String,
});
const apiStruc = new mongoose.Schema({
    productId : String,
    keywords : String,
    productName : String,
    imgUrl1 : String,
    imgUrl2 : String,
    imgUrl3 : String,
    imgUrl4 : String,
    price : String,
    description : String,
    spec1 : String,
    spec2 : String,
    spec3 : String,
    spec4 : String,
    spec5 : String,
    spec6 : String,
});
const contact = mongoose.model("contactUs", contactStruc);
const api = mongoose.model("productsAPI", apiStruc);
const signup = mongoose.model("userAccounts", signUpStruc);
const cart = mongoose.model("userCart", cartStruc);
// const signup = mongoose.model("userAccounts", signUpStruc);
app.listen(port, () => {
    console.warn(`Server Has Started`);
});
app.use(express.urlencoded({extended:true}));
app.use(express.static("WWW"));
app.get("/", (req, res) => {
    res.sendFile(__dirname+"/WWW/HTML/index.html");
});
app.get("/landing-section.html", (req, res) => {
    res.sendFile(__dirname+"/WWW/HTML/landing-section.html");
});

// Login System Code

app.get("/login", (req, res) => {
    res.sendFile(__dirname+"/WWW/HTML/logIn.html");
});
app.get("/register", (req, res) => {
    res.sendFile(__dirname+"/WWW/HTML/signUp.html");
});
app.post("/register", (req, res) => {
    var data = req.body;
    var number = data.phone;
    signup.find({phone:number}, (err, user) => {
        if(user.length>0) {
            res.end(`
            <!DOCTYPE html>
<html lang="en">
<head>
    <!-- Jquery CDN -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <!-- Custom Files -->
    <link rel="stylesheet" href="../CSS/signUp.css" />
    <script src="../JS/signUp.js"></script>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Your Account Now!</title>
</head>
<body onload="validate()">
    <div class="container">
        <form method="post" action="/register">
            <div class="form-input-wrapper">
            <span class="head" style="color:red;">User Exists</span>
            <div class="input-group">
                <input class="name" id="name" type="text" name="name" placeholder="Your Name" required/>
                <input class="name" id="number" type="number" name="phone" placeholder="Your Phone" required/>
                <input class="name" id="Address" type="text" name="adress" placeholder="Your Adress" required/>
                <input class="name" id="password" type="password" name="password" placeholder="Your Passord" required/>
                <input class="name" id="re-password" type="password" name="rePassword" placeholder="Rewrite Password" required/>
                <button id="btn">Register</button>
                <a href="/login">Already Have An Account? Log In.</a>
            </div>
            </div>
            <div class="form-image-wrapper">
                <div class="img"></div>
            </div>
        </form>
    </div>
</body>
</html>
            `)
        }
        else {
            var submission = new signup(data);
            submission.save();
            res.end(`
            
            <!DOCTYPE html>
<html lang="en">
<head>
    <!-- Jquery CDN -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <!-- Custom Files -->
    <link rel="stylesheet" href="../CSS/signUp.css" />
    <script src="../JS/signUp.js"></script>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Your Account Now!</title>
</head>
<body onload="validate()">
    <div class="container">
        <form method="post" action="/register">
            <div class="form-input-wrapper">
            <span class="head" style="color:green;">Succesfully Registered</span>
            <div class="input-group">
                <input class="name" id="name" type="text" name="name" placeholder="Your Name" required/>
                <input class="name" id="number" type="number" name="phone" placeholder="Your Phone" required/>
                <input class="name" id="Address" type="text" name="adress" placeholder="Your Adress" required/>
                <input class="name" id="password" type="password" name="password" placeholder="Your Passord" required/>
                <input class="name" id="re-password" type="password" name="rePassword" placeholder="Rewrite Password" required/>
                <button id="btn">Register</button>
                <a href="/login">Already Have An Account? Log In.</a>
            </div>
            </div>
            <div class="form-image-wrapper">
                <div class="img"></div>
            </div>
        </form>
    </div>
    <script>
    setTimeout(() => {
        window.location.href="/login";
    }, 500);
    </script>
</body>
</html>
`)
        }
    })
});


app.post("/login", (req, res) => {
    var phone = req.body.phone;
    var pass = req.body.password;
    signup.find({phone:phone, password:pass}, (err, user) => {
        if(user.length==1) {
            phone = ""+phone;
            numberArr = phone.split("");
            reverseArr = numberArr.reverse();
            reverse = reverseArr.join("");
            console.log(reverse);
            res.end(`
            <!DOCTYPE html>
<html lang="en">
<head>
    <!-- Jquery CDN -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <!-- AOS Animation Library CDN -->
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <!-- Custom Files -->
    <link rel="stylesheet" href="../CSS/logIn.css" />
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Your Account Now!</title>
</head>
<body>
    <!-- Aos Library Initialization --><script>AOS.init();</script><!-- Aos Library Code end -->
    <div class="container">
        <form action="" method="POST">
            <div class="form-input-wrapper">
            <span class="head">Log In</span>
            <div class="input-group">
                <input class="name" type="number" name="phone" placeholder="Your Phone" required/>
                <input class="name" type="password" name="password" placeholder="Your Passord" required/>
                <button type="submit">Log In</button>
                <a href="/register">Do Not Have Account? Create One.</a>
            </div>
            </div>
            <div class="form-image-wrapper">
                <div class="img"></div>
            </div>
        </form>
    </div>
    <script>
    localStorage.setItem("AUTH", "${reverse}, ${user[0]['name']}");
    window.location.href="/userProfile";
    </script>
</body>
</html>
            `);
        } else {
            res.end(`
            <!DOCTYPE html>
<html lang="en">
<head>
    <!-- Jquery CDN -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <!-- AOS Animation Library CDN -->
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <!-- Custom Files -->
    <link rel="stylesheet" href="../CSS/logIn.css" />
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Your Account Now!</title>
</head>
<body>
    <!-- Aos Library Initialization --><script>AOS.init();</script><!-- Aos Library Code end -->
    <div class="container">
        <form action="" method="POST">
            <div class="form-input-wrapper">
            <span class="head">Log In</span>
            <div class="input-group">
                <input class="name" type="number" name="phone" placeholder="Your Phone" required/>
                <input class="name" type="password" name="password" placeholder="Your Passord" required/>
                <button type="submit">Log In</button>
                <a href="/register">Do Not Have Account? Create One.</a>
            </div>
            </div>
            <div class="form-image-wrapper">
                <div class="img"></div>
            </div>
        </form>
    </div>
    <script>
    alert("No User Exist With The Provided Details, Please Create Your Account");
    </script>
</body>
</html>
            `)
        }
    });
});
 // End Of Login System Code

app.get("/myCart:id", (req, res) => {
    var urlPath = req.path;
    var number = urlPath.replace("/myCart:", "");
    
    // Remaining Code here "Waiting For API To Complete"
    res.sendFile(__dirname+"/WWW/HTML/myCart.html");
});
app.get("/myCart", (req, res) => {
    res.sendFile(__dirname+"/WWW/HTML/myCart.html");
});
// This Is Temporary Code Until The API Completes.

app.get("/temp", (req, res) => {
    res.sendFile(__dirname+"/WWW/HTML/temp.html");
});
app.post("/temp", (req, res) => {
    console.log(req.body);
    var data = new api(req.body);
    data.save();
});

app.get("/api", (req, res) => {
    api.find({}, (err, user) => {
        console.log("yes");
        res.send(user);
    });
});

app.get("/search", (req, res) => {
    res.sendFile(__dirname+"/WWW/HTML/search.html");
});
app.get("/search:id", (req, res) => {
    var item = req.path;
    var finalArr = new Array();
    item = item.replace("/search:", "");
    item = item.replace("%20", " ");
    api.find({}, (err, users) => {
        var lenOfUsers = users.length;
        for(var i = 0;i < lenOfUsers; i++) {
            var eachUser = users[i];
            var eachUserKeywordsStr = eachUser['keywords'];
            var eachUserKeywordsArr = eachUserKeywordsStr.split(",");
            var j = 0;
            for(;j < eachUserKeywordsArr.length; j++) {
                var eachUserKeywords = eachUserKeywordsArr[j];
                if(eachUserKeywords.includes(item)) {
                    finalArr.push(eachUser);
                    break;
                }
            }
        }
        res.send(finalArr);
    });
});

app.get("/product", (req, res) => {
    res.sendFile(__dirname+"/WWW/HTML/product.html");
});

app.get("/lol", (req, res) => {
    res.sendFile(__dirname+"/WWW/HTML/lol.html");
});

app.get("/product:id", (req, res) => {
    var item = req.path;
    item = item.replace("/product:", "");
    api.findOne({productId : item}, (err, user) => {
        var name = user['productName'];
        var price = user['price'];
        var desc = user['description'];
        var imgUrl1 = user['imgUrl1'];
        var imgUrl2 = user['imgUrl2'];
        var imgUrl3 = user['imgUrl3'];
        var imgUrl4 = user['imgUrl4'];
        var spec1 = user['spec1'];
        var spec2 = user['spec2'];
        var spec3 = user['spec3'];
        var spec4 = user['spec4'];
        var spec5 = user['spec5'];
        var spec6 = user['spec6'];
        var spec7 = user['spec7'];
        var price2 = price.replace(",", "");
        price2 = parseInt(price2);
        res.end(`
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../CSS/product.css">
    <script src="../JS/product.js"></script>
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
    <title></title>
</head>
<body onload="loadBody()">
    <div class="container">
        <div class="img-container">
            <div class="present-img">
                <img src="${imgUrl1}" style="background-size: 100% 100%;" class="img">
            </div>
            <div class="img-opt">
                <img src="${imgUrl1}" onclick="changeImg(this)" class="small-img" />
                <img src="${imgUrl2}" onclick="changeImg(this)" class="small-img" />
                <img src="${imgUrl3}" onclick="changeImg(this)" class="small-img" />
                <img src="${imgUrl4}" onclick="changeImg(this)" class="small-img" />
            </div>
        </div>
        <div class="text-container">
            <div class="all-text">
            <div class="head">${name}</div>
            <div class="review">
                <span>(4.1)</span>
                <span class="fa fa-star"></span>
            </div>
            <div class="price-box">
                <p class="price">&#8377; ${price}</p>
                <strike>&#8377; ${price2+1000}</strike>
            </div>
            <div class="desc">
                <h3 style="margin-bottom:15px;">Description : </h3>
                ${desc}</div>
                <ul>
                <h3 style="margin:20px;">Specifications : </h3>
                    <li>${spec1}</li>
                    <li>${spec2}</li>
                    <li>${spec3}</li>
                    <li>${spec4}</li>
                    <li>${spec5}</li>
                    <li>${spec6}</li>
                    <li>${spec7}</li>
                </ul>
            <div class="btn-container">
                <button onclick="addCart()">
                    <span class="fa fa-shopping-cart"></span>
                    Add to cart
                </button>
                <button class="buy">
                    <span class="fa fa-shopping-cart"></span>
                    Buy now
                </button>
            </div>
        </div>
    </div>
    </div>
</body>
</html>
        `);
    });
});

app.get("/contact", (req, res) => {
    res.sendFile(__dirname+"/WWW/HTML/contact.html");
});

app.post("/contact", (req, res) => {
    var data = req.body;
});

// Code For COntact page Response

app.get("/contact.html", (req, res) => {
    res.sendFile(__dirname+"/WWW/HTML/contact.html");
});

app.post("/", (req, res) => {
    var data = new contact(req.body);
    data.save();
    res.end(`
        
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="../CSS/contact.css">
    <title>Contact Form</title>
</head>
<body>
    <div class="wrapper">
        <div class="overlay">
            <div class="row d-flex justify-content-center align-items-center">
                <div class="col-md-9">
                    <div class="contact-us text-center">
                        <h3>Contact Us</h3>
                        <p class="mb-5">Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</p>
                        <div class="row">
                            <div class="col-md-6">
                                <div id="d" class="mt-5 text-center px-3">

                                    <div class="d-flex flex-row align-items-center"> <span class="icons"><i class="fa fa-map-marker"></i></span>
                                        <div class="address text-left"> <div >Address</div>
                                            <p>123-city,INDIA</p>
                                        </div>
                                    </div>
                                    <div class="d-flex flex-row align-items-center mt-3 "> <span class="icons"><i class="fa fa-phone"></i></span>
                                        <div class="address text-left "> <div >Phone</div>
                                            <p>+91 1234567890</p>
                                        </div>
                                    </div>
                                    <div class="d-flex flex-row align-items-center mt-3"> <span class="icons"><i class="fa fa-envelope-o"></i></span>
                                        <div class="address text-left"> <div >Email</div>
                                            <p>contact@purplefox.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="fo" class="col-md-6">
                                <div class="text-center px-1">
                                    <form action="/" method="POST" class="forms p-4 py-5 bg-white">
                                        <h5 style="color:green;">Thanks For Contacting</h5>
                                        <div class="mt-4 inputs"> <input id='name' name="name" type="text" class="form-control" placeholder="Name" required> <input id='phone' name="phone"  type="number" class="form-control" min="999999999" max="9999999999" placeholder="Phone" required> <textarea name="message" id='message' class="form-control" placeholder="Type your message"></textarea> </div>
                                        <div class="button mt-4 text-left"> <button class="btn btn-dark btn-lg ">Send</button> </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
    `);
});

app.get("/footer.html", (req, res) => {
    res.sendFile(__dirname+"/WWW/HTML/footer.html");
});

app.get("/userProfile", (req ,res) => {
    res.sendFile(__dirname+"/WWW/HTMl/profile.html");
});

app.get("/userProfile:id", (req, res) => {
    var item = req.path;
    item = item.replace("/userProfile:", "");
    signup.findOne({phone : item}, (err, user) => {
        res.send(user);
    });
});

app.post("/userProfile", (req, res) => {
    var data = req.body;
    req.body.rePassword  = req.body.password;
    signup.updateOne({phone : req.body.phone}, {name : req.body.name, phone : req.body.phone, password : req.body.password, rePassword : req.body.rePassword}, (err, result) => {
        console.log(err, result);
        res.sendFile(__dirname+"/WWW/HTML/profile.html"); 
    });
});

app.get("/cart:id", (req, res) => {
    var item = req.path;
    item = item.replace("/cart:", "");
    var aaa = item.indexOf("&");
    var id = item.slice(0, aaa);
    var number = item.slice(aaa+1);
            cart.findOne({phone: number, productId : id}, (err, response) => {
                if(response === null) {
                    console.log("yes br");
                    api.findOne({productId : id}, (err, product) => {
                        var productId = id;
                        var name = product['productName'];
                        var price = product['price'];
                        var imgUrl = product['imgUrl1'];
                        var keywords = product['keywords'];
                        var myArr = {
                            phone : number,
                            productId : productId,
                            keywords : keywords,
                            productName: name,
                            imgUrl1 : imgUrl,
                            price : price
                        };
                        var data = new cart(myArr);
                        data.save().then(res.send("true"));
                        console.log(myArr);
                    });
                }
                else {
                    // Eat Five Star Do Nothing
                }
            });
});

app.get("/loadCart:id", (req, res) => {
    var item = req.path;
    item = item.replace("/loadCart:", "");
    cart.find({phone: item}, (err, user) => {
        res.send(user);
    });
});

app.get("/remove:id", (req, res) => {
    var item = req.path;
    item = item.replace("/remove:", "");
    var id = item.slice(10);
    var number = item.slice(0, 10);
    cart.deleteOne({phone : number, productId : id}, (err, result) => {
        console.log(result);
        res.send("Deleted!");
    });
});

app.get("/category.html", (req, res) => {
    res.sendFile(__dirname+"/WWW/HTMl/category.html");
})
