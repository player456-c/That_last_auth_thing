const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
    res.send(JSON.stringify({users},null,4));
});

function getDateFromString(strDate) {
    let [dd,mm,yyyy] = strDate.split('-')
    return new Date(yyyy+"/"+mm+"/"+dd);
}
    
// console.log(sorted_users);
router.get("/sort",(req,res)=>{
    let sorted_users=users.sort(function(a, b) {
        let d1 = getDateFromString(a.DOB);
        let d2 = getDateFromString(b.DOB);
            return d1-d2;
    });
    res.send(sorted_users);
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
    let email=req.params.email;
    let filtered_users=users.filter((user)=>user.email===email);
    res.send(filtered_users);
});

// GET by specific ID request: Retrieve a single user with first name ID
router.get("/firstName/:firstName",(req,res)=>{
    let firstName=req.params.firstName;
    let filtered_users=users.filter((user)=>user.firstName===firstName);
    res.send(filtered_users);
});

// GET by specific ID request: Retrieve a single user with last name ID
router.get("/lastName/:lastName",(req,res)=>{
    let lastName=req.params.lastName;
    let filtered_users=users.filter((user)=>user.lastName===lastName);
    res.send(filtered_users);
});

// GET by specific ID request: Retrieve a single user with DOB ID
router.get("/:DOB",(req,res)=>{
    let DOB=req.params.DOB;
    let filtered_users=users.filter((user)=>user.DOB===DOB);
    res.send(filtered_users);
});

// POST request: Create a new user
router.post("/",(req,res)=>{
    users.push({
        "firstName":req.query.firstName,
        "lastName":req.query.lastName,
        "email":req.query.email,
        "DOB":req.query.DOB
    });
    res.send("The user" + (' ')+ (req.query.firstName) + " has been added!");
});

// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
    const email = req.params.email;
    let filtered_users = users.filter((user) => user.email === email);
    if (filtered_users.length > 0) {
        let filtered_user = filtered_users[0];

        let firstName = req.query.firstName;
        let lastName = req.query.lastName;
        let DOB = req.query.DOB;
        //if the DOB has changed
        if(firstName){
            filtered_user.firstName=firstName;
        }
        if(lastName){
            filtered_user.lastName=lastName;
        }
        if(DOB){
            filtered_user.DOB=DOB;
        }
        users = users.filter((user) => user.email != email);
        users.push(filtered_user);
        res.send(`User with the email  ${email} updated.`);
    }
    else{
        res.send("Unable to find user!");
    }
  });

// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
    const email = req.params.email;
    users = users.filter((user) => user.email != email);
    res.send(`User with the email ${email} was deleted.`)//This line is to be replaced with actual return value
});

module.exports=router;
