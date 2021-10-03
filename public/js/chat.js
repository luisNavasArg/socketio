const increment = document.querySelector('#increment');
const chatForm = document.querySelector('#chat');
const locationButton = document.querySelector('#location-button');

// io() returns an {}
const socket = io();
// Revieve event

// The name of the custom event must match the server one.
socket.on('countUpdated', (count) => {
  console.log('Counter updated', count);
});

socket.on('welcomeMessage', (message) => {
  console.log(message);
});
socket.on('contador',(data)=>{
 alert("recibimos de emit: " +data) 
})
socket.on('allMessages', (data) => {
  console.log(data);
});

increment.addEventListener('click', () => {
  const body = JSON.stringify({nombre:"Luis"});
  socket.emit('increment',body);
});

chatForm.addEventListener('submit', (e)=> {
  e.preventDefault();
  
  const formData = new FormData(chatForm);
  const body = JSON.stringify(Object.fromEntries(formData));

  const formMessageForLearning = e.target.elements.message.value;
  console.log('Learn', formMessageForLearning);

  console.log("Este es body" +body);
  socket.emit('sendMessage', body);
});

locationButton.addEventListener('click', (e) => {
  if (!"geolocation" in navigator) {
    return alert("Geolocation is not supported by your browser");
  }
  navigator.geolocation.getCurrentPosition((position, err) => {
    console.log(position.coords.latitude);
  })
});