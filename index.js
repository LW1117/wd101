document.addEventListener("DOMContentLoaded", () => {
  entries = JSON.parse(sessionStorage.getItem("user-entries")) || [];
  refreshEntries()
});

const userForm = document.getElementById('user-form');
userForm.addEventListener("submit", (e) => {
  e.preventDefault()
  saveFormToStorage();
  refreshEntries();
});

// Function to save form to local storage
saveFormToStorage = () => {

  let userObj = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    dob: document.getElementById("dob").value,
    terms: document.getElementById("terms").checked
  };
  if (checkValidity(userObj.dob)) {
    entries.push(userObj);
    sessionStorage.setItem("user-entries", JSON.stringify(entries))
  };
};

// Check if age is between 18 and 55
checkValidity = (dob) => {
  let bDate = new Date(dob);
  let today = new Date();
  let age = today.getFullYear() - bDate.getFullYear();
  let m = today.getMonth() - bDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < bDate.getDate())) {
    age--;
  }
  if (age >= 18 && age <= 55) {
    return true;
  }
  else {
    alert("Your age must be between 18 and 55")
    return false;
  }
}

// function to update the table with entries
refreshEntries = () => {
  tableEntry = ``
  entries.forEach((user) => {
    tableEntry += `<tr><td>${user.name}</td><td>${user.email}</td><td>${user.password}</td><td>${user.dob}</td><td>${user.terms}</td></tr>`
  });
  document.getElementById("entries-tbody").innerHTML = tableEntry;
}