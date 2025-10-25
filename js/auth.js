// ---------------------Signup----------------------------------------------------------------------------------------------
function signUp(event){
    event.preventDefault();
    const username=document.getElementById("username").value.trim();
    const Email=document.getElementById("email").value.trim();
    const email=Email.toLowerCase();
    const password=document.getElementById("password").value.trim();
    const confirmPassword=document.getElementById("confirm-password").value.trim();
    if(!username || !password || !email){
        alert("Oops! Please fill all the fields!");
        return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(email)){
        alert("Please enter valid email address.");
        return false;
    }
    if(password!==confirmPassword){
        alert("Passwords do not match! Please re-enter");
        return false;
    }
    const users=JSON.parse(localStorage.getItem("users"))||[];
    const userExist= users.some((user)=> user.email===email);

    if(userExist){
        alert("Email already Exists.Please login!");
        return false;
    }
    users.push({username,email,password});
    localStorage.setItem("users",JSON.stringify(users));
    alert("Signup successful!");
    window.location.href= "login.html";
}

// ---------------------------------------Login----------------------------------------------------------------------------------
function login(event){
event.preventDefault();
const Email=document.getElementById("email").value.trim();
const email=Email.toLowerCase();
const password=document.getElementById("password").value.trim();

if(!email || !password)
    {
        alert("Please fill in all the fields!");
        return;
    }

const users=JSON.parse(localStorage.getItem("users"))||[];
const user=users.find((u)=>u.email===email);
if (!user) {
        alert("User not found! Please sign up.");
        return;
}
if (user.password!==password) {
        alert("Incorrect password! Try again.");
        return;
}
localStorage.setItem("loggedInUser",JSON.stringify(user));
window.location.href="index.html";
}

// ---------------------------------------Profile after user gets logged in-----------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
const authLinksDiv = document.querySelector(".auth-links");
 if (!authLinksDiv) return; 
const loggedInUser=JSON.parse(localStorage.getItem("loggedInUser"));
if(authLinksDiv){
if(loggedInUser){
    authLinksDiv.innerHTML=`    <div class="profile-container" style="display:flex; align-items:center; gap:10px;">
        <span style="color:#fff;">${loggedInUser.username}</span>
        <button onclick="logout()" style="background:none; color:#ff7171; border:none; cursor:pointer;">Logout</button>
      </div>`;
}
else{
    authLinksDiv.innerHTML=`<a href="login.html">Login</a>`;
}

}
})

  function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.reload();
  }