let form = document.getElementById('addUser')

let userList = document.getElementById('userList')

let itemList = document.getElementById('userList');

let edit = document.getElementsByClassName('edit')

form.addEventListener('submit', addItem);

itemList.addEventListener('click', removeItem)

// if(edit!=null){
//     edit.addEventListener('click', removeItem)
// }


function addItem(e){
    e.preventDefault()


    let name = document.getElementById('name').value
    let email = document.getElementById('email').value
    let phone = document.getElementById('phone').value

    
    var li = document.createElement('li');

    li.appendChild(document.createTextNode(name+"-"+email+"-"+phone));

    var deleteBtn = document.createElement('button');

    deleteBtn.className = 'delete';

    deleteBtn.appendChild(document.createTextNode('Delete'));

    li.appendChild(deleteBtn);

    var editBtn = document.createElement('button');

    editBtn.className = 'edit';

    editBtn.appendChild(document.createTextNode('Edit'));

    li.appendChild(editBtn);




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


function removeItem(e){
    let name = document.getElementById('name')
    let email = document.getElementById('email')
    let phone = document.getElementById('phone')
    console.log(e.target.classList)

    if(e.target.classList.contains('edit')){
       
            console.log(e.target.parentElement.textContent)
            var li = e.target.parentElement;
            itemList.removeChild(li);
    
            let userList = JSON.parse(localStorage.getItem('user'))
            let newUserList = []
            for(let i=0;i<userList.length;i++){
                let fullName = userList[i].name+"-"+userList[i].email+"-"+userList[i].phone+"Delete"+"Edit"
                console.log(fullName)
                console.log(e.target.parentElement.textContent)
                if(fullName===e.target.parentElement.textContent){
                    // userList.pop(userList[i])
                    name.value=userList[i].name
                    email.value=userList[i].email
                    phone.value=userList[i].phone
                    
                }else{
                    newUserList.push(userList[i])
                }
            }
            localStorage.setItem('user',JSON.stringify(newUserList))
          }   
    

    if(e.target.classList.contains('delete')){
      if(confirm('Are You Sure?')){
        console.log(e.target.parentElement.textContent)
        var li = e.target.parentElement;
        itemList.removeChild(li);

        let userList = JSON.parse(localStorage.getItem('user'))
        let newUserList = []
        for(let i=0;i<userList.length;i++){
            let fullName = userList[i].name+"-"+userList[i].email+"-"+userList[i].phone+"Delete"+"Edit"
            console.log(fullName)
            console.log(e.target.parentElement.textContent)
            if(fullName===e.target.parentElement.textContent){
                // userList.pop(userList[i])
                name.value=userList[i].name
                email.value=userList[i].email
                phone.value=userList[i].phone
                
            }else{
                newUserList.push(userList[i])
            }
        }
        localStorage.setItem('user',JSON.stringify(newUserList))
      }
    }
}