let form = document.getElementById('addUser')

let userList = document.getElementById('userList')

form.addEventListener('submit', addItem);

function addItem(e){
    e.preventDefault()


    let name = document.getElementById('name').value
    let email = document.getElementById('email').value
    let phone = document.getElementById('phone').value

    
    var li = document.createElement('li');

    li.appendChild(document.createTextNode(name+"-"+email+"-"+phone));

    userList.appendChild(li)
    
    let user = {
        name,
        email,
        phone
    }

    let userItem = []
    if(JSON.parse(localStorage.getItem('user'))!=null){
          let userList = JSON.parse(localStorage.getItem('user'))
          userList.push(user)
         localStorage.setItem('user' ,  JSON.stringify(userList))
    }else{
         userItem.push(user)
         localStorage.setItem('user' ,  JSON.stringify(userItem))
    }

}
