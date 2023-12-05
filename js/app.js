const container = document.getElementById("container");
const loading = document.querySelector(".loading");
let isFetching;
const lastUserSelector = document.querySelector(".user:last-child");

function throttle() {
  if (isFetching) return;
  setTimeout(() => {
    getNewUsers();
    isFetching = false;
  }, 200);

  isFetching = true;
}

function getNewUsers() {
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
  throttle();
  observer.unobserve(lastUser.target);
  observer.observe(document.querySelector(".user:last-child"));
}, {});

(async () => {
  const response = await fetch(
    `https://randomuser.me/api/?results=6&inc=name,location,email,phone,dob,picture&nat=us,dk,au,nz,fr,ca,ch,br,de,es,fi,gb,ie,no,nl`
  );

  const data = await response.json();
  showprofile(data.results);
  observer.observe(document.querySelector(".user:last-child"));
})();
