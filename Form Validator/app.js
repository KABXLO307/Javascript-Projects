//getting our form element
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


//show input error message
function showError(input, message){
const formControl = input.parentElement;

//when submit is clicked we will give formControl the css class we created called form-control error
formControl.className = 'form-control error';
const small = formControl.querySelector('small');
small.innerText = message;
}

//show success message
function showSucces(input){
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}


//check valid regex
function acceptedEmail(input){
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(re.test(input.value.trim())){
    showSucces(input);
  } else {
    showError(input, 'Email is not valid');
  }
}


//our validation functions
//we will pass an array of all the inputs with wants
function checkRequired(inputArr){
inputArr.forEach(function(input){
  console.log(input);
  if(input.value.trim()===''){
    showError(input, `${getFieldName(input)} is required`);
  } else{
    showSucces(input);
  }
});
}

//check the input length
function checkLength(input, min, max){
  if(input.value.length < min){
    showError(input, `${getFieldName(input)} must be at least ${min} characters`);
  } else if (input.value.length > max){
    showError(input, `${getFieldName(input)} must be at maximum ${max} characters`);
  } else {
    showSucces(input);
  }
}


//check if passwords match
function checkPasswordMatch(input1, input2){
  if(input1.value !== input2.value){
    showError(input2, 'Passwords do not match');
  }
}

//get the field name
function getFieldName(input){
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener('submit', function(e){
    e.preventDefault();

    checkRequired([username, email, password, password2]);
checkLength(username, 3,15);
checkLength(password, 6, 25);
acceptedEmail(email);
checkPasswordMatch(password, password2);
    });
