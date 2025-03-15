function render() {
    showUsers();
}

async function showUsers() {
    const url = '/users';
    fetch(url)
    .then((response) => {
        return response.json();
     })
    .then((data) => {
        let userList = '<ul id=userList>'
        data.forEach(element => {
            userList += `<li class=user><a href="editUser(${element.firstName})">${element.firstName}</a></li>`
        });
        userList += '</ul>'
        document.getElementById('userList').innerHTML = userList;
     })
}

function test() {
    console.log('hi')
}

function addUser() {
    let user = {}
    user.firstName = document.getElementById('firstNameInput').value
    user.lastName = document.getElementById('lastNameInput').value
    user.email = document.getElementById('emailInput').value
    user.age = Number(document.getElementById('ageInput').value)
    console.log('before')
    console.log(user)
    const url = '/users';
    fetch(url, {
        method: "POST",
        headers: {
           'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then((res) => {
        console.log('response')
        console.log(res)
        })
    showUsers();
}

function updateUser() {
    let firstName = document.getElementById('firstNameInput').value
    console.log('firstName: ', firstName)
    let updatedUser = {
        firstName: document.getElementById('firstNameInput').value,
        lastName: document.getElementById('lastNameInput').value,
        email: document.getElementById('emailInput').value,
        age: Number(document.getElementById('ageInput').value),
    };
    
    const url = `/users/${firstName}`

    fetch(url, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser)
    })
    .then((res) => res.json())
    .then((data) => {
        console.log('Updated user: ', data)
    }).catch((error) => {
        console.log('Error: ', error);
    });
};

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

// const response = await fetch("https://example.org/post", {
//     method: "POST",
//     body: JSON.stringify({ username: "example" }),
//     // ...
//   });


'event listener, fetch api get request /users, backend handle and parse /users'

//function for unneeded code
// function itrButtons() {
//     document.getElementById('buttons').innerHTML = '<button onclick="displayUsers()" id="displayButton">display</button><button onclick="addUser()" id="addButton">add</button> <button onclick="editUser()" id="editButton">test</button>'
// }


