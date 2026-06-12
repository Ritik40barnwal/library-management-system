let students=[];

async function addStudent(){

let name=
document.getElementById("name").value;

let roll=
document.getElementById("roll").value;

let books=
[...document.querySelectorAll(".book")]
.map(x=>Number(x.value))
.filter(x=>x!==0);

if(!name||!roll){

alert(
"Fill all required fields"
);

return;

}

let student={

name,

roll,

books,

date:
new Date()
.toLocaleDateString(),

time:
new Date()
.toLocaleTimeString()

};

try{

let res=
await fetch(
"https://library-management-system-ftho.onrender.com/student",
{

method:"POST",

headers:{

"Content-Type":
"application/json"

},

body:
JSON.stringify(student)

}

);

let data=
await res.json();

if(
data.select
){

let selected =

prompt(

`${data.message}\nEnter exactly ${data.available} book IDs separated by comma`

);

if(selected){

let books =

selected

.split(",")

.map(
x=>
Number(
x.trim()
)
)

.filter(
x=>
x!==0
);

student.books =
books;

let retry =

await fetch(
"https://library-management-system-ftho.onrender.com/student",
{

method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:
JSON.stringify(
student
)

}

);

let retryData =

await retry.json();

alert(

retryData.message

);
}

}
else{

alert(
data.message
);

}

// UI auto refresh
await showStudents();

clearForm();

}
catch(err){

console.log(err);

alert(
"Backend Connection Failed"
);

}

}
async function searchStudent(){

let query =

document
.getElementById(
"search"
)
.value
.trim();

if(!query){

// alert(
// "Enter Roll or Name"
// );

return;

}

try{

let res=

await fetch(

`https://library-management-system-ftho.onrender.com/student/${query}`

);

if(!res.ok){

throw new Error();

}

let data=

await res.json();

render(
data
);

}
catch{

render([]);

}

}
async function sortByName(){

let res =
await fetch(
"https://library-management-system-ftho.onrender.com/students"
);

let data =
await res.json();

data.sort(

(a,b)=>

a.name

.localeCompare(

b.name

)

);

render(
data
);

}

async function deleteStudent(){
    if(
!confirm(
"Delete Student?"
)
){

return;

}

let roll=

document
.getElementById(
"roll"
)
.value;

try{

let res=

await fetch(

`https://library-management-system-ftho.onrender.com/student/${roll}`,

{

method:
"DELETE"

}

);

let data=

await res.json();

alert(
data.message
);

showStudents();

}
catch{

alert(
"Delete Failed"
);

}

}
async function returnBook(){

let roll =
document
.getElementById("roll")
.value;

let books =

[...document
.querySelectorAll(".book")]

.map(
x=>x.value.trim()
)

.filter(
x=>x!=="");

if(!roll){

alert(
"Enter Roll Number"
);

return;

}

if(books.length===0){

alert(
"Enter Book ID"
);

return;

}

try{

let res =
await fetch(
"https://library-management-system-ftho.onrender.com/return",
{

method:"PUT",

headers:{
"Content-Type":
"application/json"
},

body:
JSON.stringify({

roll,
books

})

}

);

let data =
await res.json();

// first show backend message
alert(
data.message
);

// UI refresh alag se
try{

await showStudents();

}
catch(err){

console.log(
"UI Refresh Failed",
err
);

}

// clear form
clearForm();

}
catch(err){

console.log(err);

alert(
"Return Failed"
);

}

}
async function showStudents(){

try{

let output=

document
.getElementById(
"output"
);

output.innerHTML=

"<h3>Loading...</h3>";

let res =

await fetch(
"https://library-management-system-ftho.onrender.com/students"
);

if(
!res.ok
){

throw new Error();

}

let data =
await res.json();

render(
data
);

}
catch(err){

console.log(err);

document
.getElementById(
"output"
)

.innerHTML=

"<h3>Cannot Load Students</h3>";

}

}
function updateDashboard(data){

if(
!Array.isArray(data)
){

data=[];

}

let totalStudents =
data.length;

let totalBooks =
data.reduce(

(sum,s)=>

sum+

(

Array.isArray(
s.books
)

?

s.books.length

:

0

),

0

);

let fullLimit =

data.filter(

s=>

Array.isArray(
s.books
)

&&

s.books.length===5

)

.length;

document
.getElementById(
"studentCount"
)

.innerText=
totalStudents;

document
.getElementById(
"bookCount"
)

.innerText=
totalBooks;

document
.getElementById(
"slotCount"
)

.innerText=
fullLimit;

}
function render(data){

let output=
document.getElementById(
"output"
);
updateDashboard(
data
);

if(
!Array.isArray(data)
||
data.length===0
){

output.innerHTML=

"<h3>No Student Found</h3>";

return;

}

output.innerHTML=

data.map(

(s,index)=>`

<div class="student-card">

<div

class="student-header"

onclick=
"toggleStudent(${index})"

>

<h3>

${s.name}

<span>

(#${s.roll})

</span>

</h3>

<span>

▼

</span>

</div>

<div

class="student-body"

id=

"student-${index}"

>

<p>

Roll:
${s.roll}

</p>

<p>

Date:
${s.date||"-"}

</p>

<p>

Time:
${s.time||"-"}

</p>

<p>

Books:

${
s.books?.length

?

s.books.join(", ")

:

"No Books"

}

</p>

</div>

</div>

`

)

.join("");

}
function toggleStudent(index){

let card=

document
.getElementById(

`student-${index}`

);

if(
card.style.display
==="block"
){

card.style.display=
"none";

}

else{

card.style.display=
"block";

}

}
document

.getElementById(
"searchBtn"
)

.addEventListener(

"click",

()=>{

let box=

document
.getElementById(
"searchBox"
);

if(
box.style.display
==="block"
){

box.style.display=
"none";

}
else{

box.style.display=
"block";

}

}

);

function clearForm(){

document
.querySelectorAll("input")

.forEach(
x=>x.value=""
);

}

showStudents();