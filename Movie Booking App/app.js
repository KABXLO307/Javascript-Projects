const container = document.querySelector(".container");
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
populateUI();

let ticketPrice = +movieSelect.value;

//update total and count
function updateSelectedCount(){
  const selectedSeats= document.querySelectorAll('.row .seat.selected');


  //copy the selected seats into an array
  //map through the array
  //return a new array of indexes

//,,, spreading the array (copying it)
  const seatsIndex = [...selectedSeats].map(seat=> [...seats].indexOf(seat));
  
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  console.log(seatsIndex);
  //we get the length of the array of selected seats we made above
const selectedseatsCount = selectedSeats.length;

//we changed the inner seat text to the selected seats length
count.innerText = selectedseatsCount;
total.innerText = selectedseatsCount*ticketPrice;
}



//saving the selected movie and value to the localStorage
function setMovieData(movieIndex, moviePrice){
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

//Get the data from localStorage and populate the UI

function populateUI(){
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if(selectedSeats !==null && selectedSeats.length >0){
    seats.forEach((seat,index) => {
      if(selectedSeats.indexOf(index) > -1){
        seat.classList.add('seelcted');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if(selectedMovieIndex !==null){
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}
//selecting movie event

movieSelect.addEventListener('change', e =>{
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
})


//on seat click event
container.addEventListener('click', e => {
    if (
      e.target.classList.contains('seat') &&
      !e.target.classList.contains('occupied')
    ) {
      e.target.classList.toggle('selected');

      updateSelectedCount();
    }
  });

  //Initial count andtotal set
  updateSelectedCount();