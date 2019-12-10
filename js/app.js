const container = document.getElementById('container');
const loading = document.querySelector('.loading');

newUserProfile();
newUserProfile();
newUserProfile();
newUserProfile();




// document.body.addEventListener( "touchstart", function(e){ onStart(e); }, false );
// function onStart ( touchEvent ) {
//   if( navigator.userAgent.match(/Android/i) ) {
//     touchEvent.preventDefault();
//   }
// }
function fixTouchMove( event )
{
    return;
}
document.body.removeEventListener( "touchstart", fixTouchMove );
document.body.addEventListener( "touchstart", fixTouchMove );

document.body.addEventListener('touchmove', onScroll);
window.addEventListener('scroll', onScroll);


 function onScroll(){
  const {
    scrollTop,
    scrollHeight,
    clientHeight
  } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
}}

function showLoading() {
  loading.classList.add('show');
  setTimeout(() => {
    loading.classList.remove('show');
    setTimeout(() => {
      newUserProfile();
    }, 300);
  }, 1000);
}

function newUserProfile() {
  fetch(`https://randomuser.me/api/?results=1&inc=name,location,email,phone,dob,picture&nat=us,dk,au,nz,fr,ca,ch,br,de,es,fi,gb,ie,no,nl`)
    .then(res => res.json())
    .then(data => {
      showprofile(data.results[0]);
    })
    .catch(error => console.log(error));
  }

function showprofile(data) {
  const user = document.createElement('div');
  user.classList.add('user');
  user.innerHTML = `  
		<img src="${data.picture.large}" alt="" />
			<div class="user-info">
      <h1 class="user-name">${data.name.first} ${data.name.last}</h1>
			<p class="user-email">🌐   ${data.location.country} </p>      
			<small class="user-dob">🎂 ${(data.dob.date).slice(0,10)}</small>
			<p class="user-email">✉️   ${data.email} </p>
			<p class="user-email">📞   ${data.phone} </p>
    </div>    
	`;
  container.appendChild(user);
}