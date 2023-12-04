const container = document.getElementById("container");
const loading = document.querySelector(".loading");
let isLoading;
newUserProfile();
newUserProfile();

const lastUserSelector = document.querySelector(".user:last-child");

function showLoading() {
  if (isLoading) return false;
  setTimeout(() => {
    newUserProfile();
    isLoading = false;
    loading.classList.remove("show");
  }, 200);

  loading.classList.add("show");
  isLoading = true;
}

function newUserProfile() {
  fetch(
    `https://randomuser.me/api/?results=3&inc=name,location,email,phone,dob,picture&nat=us,dk,au,nz,fr,ca,ch,br,de,es,fi,gb,ie,no,nl`
  )
    .then((res) => res.json())
    .then((data) => {
      showprofile(data.results);
    })
    .catch((error) => console.log(error));
}

function showprofile(users) {
  users.forEach((data) => {
    const user = document.createElement("div");
    user.classList.add("user");
    user.innerHTML = `  
		<img src="${data.picture.large}" alt="" />
			<div class="user-info">
      <h1 class="user-name">${data.name.first} ${data.name.last}</h1>
			<p class="user-email">🌐   ${data.location.country} </p>      
			<small class="user-dob">🎂 ${data.dob.date.slice(0, 10)}</small>
			<p class="user-email">✉️   ${data.email} </p>
			<p class="user-email">📞   ${data.phone} </p>
    </div>    
	`;
    container.appendChild(user);
  });
}
const observer = new IntersectionObserver((entries) => {
  const lastUser = entries[0];
  if (!lastUser.isIntersecting) return;
  showLoading();
  observer.unobserve(lastUser.target);
  observer.observe(document.querySelector(".user:last-child"));
}, {});

setTimeout(() => {
  observer.observe(document.querySelector(".user:last-child"));
}, 1000);
