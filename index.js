document.addEventListener("DOMContentLoaded", () => {
  entries = JSON.parse(localStorage.getItem("user-entries")) || [];
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
  if (checkValidity(userObj.dob, userObj.email)) {
    entries.push(userObj);
    localStorage.setItem("user-entries", JSON.stringify(entries))
  };
};

// Check if age is between 18 and 55 and email is in the correct format
checkValidity = (dob, email) => {
  const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$/;
  if (!emailPattern.test(email)) {
    alert('Please enter a valid email address.');
    return false;
  }

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