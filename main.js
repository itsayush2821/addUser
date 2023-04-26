let form = document.getElementById('addUser')

let userList = document.getElementById('userList')

var itemList = document.getElementById('userList');


form.addEventListener('submit', addItem);

itemList.addEventListener('click', removeItem)

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
    if(e.target.classList.contains('delete')){
      if(confirm('Are You Sure?')){
        console.log(e.target.parentElement.textContent)
        var li = e.target.parentElement;
        itemList.removeChild(li);

        let userList = JSON.parse(localStorage.getItem('user'))
        for(let i=0;i<userList.length;i++){
            let fullName = userList[i].name+"-"+userList[i].email+"-"+userList[i].phone+"Delete"
            console.log(fullName)
            if(fullName===e.target.parentElement.textContent){
                userList.pop(userList[i])
                break;
            }
        }
        localStorage.setItem('user',JSON.stringify(userList))
      }
    }
  }