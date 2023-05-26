//May Alqurashi
//Fatma Alamri
function validate() {
    var fname = document.getElementById("fname");
    var lname = document.getElementById("lname");
    var email = document.getElementById("email");
    var mobile = document.getElementById("mobile");
    var comments = document.getElementById("comments");
    var namePattern = /^(?=.{2,15}$)[a-zA-Z]+$/;
    var emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var phonePattern = /^\d{9}$/;
    var getSelectedValue = document.querySelector('input[name="gender"]:checked');
    //if conditions
    if(fname.value=="") {
        alert("Name is required");  
        fname.focus();
        return false;
    }
    
    else {
    if(!fname.value.match(namePattern)) {
        alert("Please type a valid first name");
        fname.focus();
        return false;
    }
    else{
    if(!lname.value.match(namePattern)) {
        alert("Please type a valid last name");
        lname.focus();
        return false;
    }
 
    else{   
    if(!mobile.value.match(phonePattern)) {
        alert("Please enter correct phone number");
        mobile.focus();
        return false;
        }

    else{ 
    if(mobile.value=="") {
        alert("Phone number is required");
        mobile.focus();
        return false;
       
    }
    else{
        if(getSelectedValue==null){
            alert("Please choose a gender"); 
        }
        
    else{  
    if(email.value=="" || !email.value.match(emailPattern)) {
        alert("Check if email is valid, email is required");
        email.focus();
        return false;
    }

    
    else{
  
     if(comments.value=="") {
        alert("Please leave a comment");
        comments.focus();
        return false;
    }
    
    else{
      var massege = "We have received your order! Check your information \n" +
                    "Name: " + fname.value+" "+lname.value + "\n"+ "Mobile: "+ mobile.value+
                    "\n" + "Gender: " + getSelectedValue.value + "\n" + "Email: " + email.value+"\nComments: "+comments.value;
                    window.alert(massege);
  }
    }
    }
    }
    }
    }
    }
    }
}
  
  function clearAll() {
    document.getElementById("fname").value="";
    document.getElementById("lname").value="";
    document.getElementById("email").value="";
    document.getElementById("moblie").value="";
    document.getElementById("comments").value="";
  }
  
  function start() {
    var subButton = document.getElementById("submit");
    subButton.addEventListener("click", validate, false);
    var clearButton = document.getElementById("reset");
    clearButton.addEventListener("click", clearAll, false);
  }
  
  window.addEventListener("load", start, false);
  
  