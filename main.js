showData()
const form = document.getElementById('addUserForm');
const userList = document.getElementById('userList');
// Add event listener to the form
form.addEventListener('submit', addUser);


function showData(){
    axios.get("https://crudcrud.com/api/1d1c695e69a8472f81dfcb00254c0759/addData").then((res) =>{
        let newUser = res.data


        for(let i=0;i<newUser.length;i++){
            // Create a new list item to display the user data
            const li = document.createElement('li');
            li.innerHTML = `${newUser[i].name} - ${newUser[i].email} - ${newUser[i].phone}`;
       
            // Create edit and delete buttons for the user data
            const editBtn = document.createElement('button');
            editBtn.innerText = 'Edit';
            editBtn.addEventListener('click', () => editUser(newUser[i]._id, newUser[i]));
       
            const deleteBtn = document.createElement('button');
            deleteBtn.innerText = 'Delete';
            deleteBtn.addEventListener('click', () => deleteUser(newUser[i]._id, li));
       
            li.appendChild(editBtn);
            li.appendChild(deleteBtn);
       
            // Add the new user data to the user list
            userList.appendChild(li);
       
            // Clear the form fields
            form.reset();
        }
        }).catch((err)=>{
        console.log(err)
    })
   
   }





// Function to handle form submission and add a new user
function addUser(e) {
  e.preventDefault();

  // Get user input values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;

  // Create a new user object
  const user = {
    name,
    email,
    phone
  };

  // Make a POST request to add the user to the server
  axios.post('https://crudcrud.com/api/1d1c695e69a8472f81dfcb00254c0759/addData', user)
    .then(response => {
      // Get the newly created user from the server's response
      const newUser = response.data;
      showData()
     
    })
    .catch(error => {
      console.error(error);
    });
}

// Function to handle editing a user
function editUser(userId, userData) {
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');

  // Populate the form fields with the user data for editing
  name.value = userData.name;
  email.value = userData.email;
  phone.value = userData.phone;

  // Remove the user from the list while editing
  userList.removeChild(userList.querySelector(`li[data-user-id="${userId}"]`));

  // Change the form's submit event to handle user update
  form.removeEventListener('submit', addUser);
  form.addEventListener('submit', (e) => updateUser(e, userId));
}

// Function to handle updating a user
function updateUser(e, userId) {
  e.preventDefault();

  // Get user input values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;

  // Create a new user object with updated data
  const updatedUser = {
    name,
    email,
    phone
  };

  // Make a PUT request to update the user on the server
  axios.put(`https://crudcrud.com/api/1d1c695e69a8472f81dfcb00254c0759/addData/${userId}`, updatedUser)
    .then(response => {
      // Get the updated user from the server's response
      const updatedUserData = response.data;

      // Create a new list item to display the updated user data
      const li = document.createElement('li');
      li.innerHTML = `${updatedUserData.name} - ${updatedUserData.email} - ${updatedUserData.phone}`;

      // Create edit and delete buttons for the updated user data
      const editBtn = document.createElement('button');
      editBtn.innerText = 'Edit';
      editBtn.addEventListener('click', () => editUser(updatedUserData.id, updatedUserData));

      const deleteBtn = document.createElement('button');
      deleteBtn.innerText = 'Delete';
      deleteBtn.addEventListener('click', () => deleteUser(updatedUserData.id, li));

      li.appendChild(editBtn);
      li.appendChild(deleteBtn);

      // Add the updated user data back to the user list
      userList.appendChild(li);

      // Clear the form fields and reset the form submit event to add new users
      form.reset();
      form.removeEventListener('submit', updateUser);
      form.addEventListener('submit', addUser);
    })
    .catch(error => {
      console.error(error);
    });
}

// Function to handle deleting a user
function deleteUser(userId, listItem) {
  // Confirm with the user before deleting
  if (confirm('Are you sure you want to delete this user?')) {
    // Make a DELETE request to remove the user from the server
    axios.delete(`https://crudcrud.com/api/1d1c695e69a8472f81dfcb00254c0759/addData/${userId}`)
      .then(() => {
        // Remove the user from the list
        userList.removeChild(listItem);
      })
      .catch(error => {
        console.error(error);
      });
  }
}
