// Import Express
var express = require("express");
var path = require("path");

// Create App
var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Tables Array
var tables = [
    {
        name: "Kat Ruth",
        phoneNum: "816-222-2222",
        email: "kat@kat.com",
        uniqueId: "0220202101"
    },
    {
        name: "Matt Jay",
        phoneNum: "816-111-1111",
        email: "matt@matt.com",
        uniqueId: "0220202102"
    }
];

// Waitlist Array
var waitlist = [{

    name: "Lil Wayne",
    phoneNum: "777-777-7777",
    email: "waynes@world.com",
    uniqueId: "0220202103"
}];


// Index/Home View
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Tables View
app.get('/tables', function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

// Reserve View
app.get('/reserve', function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});




// Tables Route
app.get('/api/tables', function (req, res) {
    res.json(tables);
});

// Waitlist Route
app.get('/api/waitlist', function (req, res) {
    res.json(waitlist);
});


app.delete('/api/tables/:uniqueID', function (req, res) {

    const id = req.params.uniqueID;
    for (let i = 0; i < tables.length; i++) {
        if (id === tables[i].uniqueId) {
            tables.splice(i, 1)

        }
    }
    res.end();
})

app.delete('/api/waitlist/:uniqueID', function (req, res) {

    const id = req.params.uniqueID;
    for (let i = 0; i < waitlist.length; i++) {
        if (id === waitlist[i].uniqueId) {
            waitlist.splice(i, 1)

        }
    }
    res.end();
})


// Delete All
app.delete('/api/waitlist', function (req, res) {
    waitlist = [];
    res.end();
});

app.delete('/api/tables', function (req, res) {
    tables = [];
    res.end();
});

// Post New Table
app.post('/api/tables', function (req, res) {
    if (tables.length < 3) {
        tables.push(req.body);
        res.send("tables");
    } else {
        waitlist.push(req.body)
        res.send("waitlist");
    }

})


// Listener...
app.listen(PORT, function () {
    console.log(`Listening on Port ${PORT}`);
});