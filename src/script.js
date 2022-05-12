let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".sidebarBtn");
console.log(sidebar);
console.log(sidebarBtn);

sidebarBtn.onclick = function() {
  sidebar.classList.toggle("active");
}


