const express = require("express");

const cors = require("cors");

const fs = require("fs");

const app = express();

app.use(cors());

app.use(express.json());

// permanent  memory storage
let students=[];

try{

students=

JSON.parse(

fs.readFileSync(
"students.json",
"utf8"
)

);

}
catch{

students=[];

}
function saveData(){

fs.writeFileSync(

"students.json",

JSON.stringify(

students,

null,

2

)

);

}

app.post("/student",(req,res)=>{

let data=req.body;

data.roll=String(data.roll);

data.books=
(data.books||[])
.map(Number)
.filter(
b=>!Number.isNaN(b)
);

if(
!data.name ||
!data.roll
){

return res.json({

message:
"Fill required fields"

});

}

let existing=
students.find(

s=>
String(s.roll)
===
data.roll

);

if(existing){

if(
existing.name
!==data.name
){

return res.json({

message:
"Roll number already belongs to another student"

});

}

if(
existing.books.length>=5
){

return res.json({

message:
"No more books can be allotted"

});

}

// available slots
let available =

5 -
existing.books.length;

// user entered too many books
if(
data.books.length
>
available
){

return res.json({

select:true,

available,

message:

`Only ${available} book(s) can be allotted`

});

}

// append books
let added = 0;

for(
let book
of
data.books
){

if(
!existing.books.includes(book)
){

existing.books.push(book);

added++;

}

}

saveData();

return res.json({

message:

`${added} book(s) appended successfully`,

student:
existing

});

}

students.push(data);

saveData();

res.json({

message:
"Student Added Successfully",

student:data

});

});
app.put("/return",(req,res)=>{

let roll=
String(
req.body.roll
);

let books=
(req.body.books||[])

.map(Number)

.filter(
b=>!Number.isNaN(b)
);

let student=
students.find(

s=>

String(s.roll)

===

roll

);

if(!student){

return res.json({

message:
"Student Not Found"

});

}

let returned=0;

student.books=
student.books.filter(

b=>{

if(
books.includes(
Number(b)
)
){

returned++;

return false;

}

return true;

}

);

if(
returned===0
){

return res.json({

message:
"No matching books found"

});

}

saveData();

res.json({

message:

`${returned} Book(s) Returned`,

student

});

});
app.get(
"/student/:query",

(req,res)=>{

let query =

req.params.query

.toLowerCase();

let result =

students.filter(

s=>

String(
s.roll
)

===

query

||

s.name

.toLowerCase()

.includes(

query

)

);

if(
result.length
===0
){

return res
.status(404)

.json({

message:
"Student Not Found"

});

}

res.json(
result
);

});
app.get("/students", (req, res) => {

res.json(students);

});
app.get("/", (req,res)=>{

res.send(
"Backend Running Successfully 🚀"
);

});
app.delete(
"/student/:roll",

(req,res)=>{

let roll=
req.params.roll;

let index=
students.findIndex(

s=>
String(s.roll)
===
String(roll)

);

if(
index===-1
){

return res.json({

message:
"Student Not Found"

});

}

if(

students[index]

.books.length

>0

){

return res.json({

message:

"Cannot delete student.\nReturn books first."

});

}

students.splice(
index,
1
);
saveData();

res.json({

message:
"Student Deleted"

});

});

const PORT =
process.env.PORT
||
5000;
app.listen(PORT, () => {

console.log(
`Server Started at ${PORT}`
);

});