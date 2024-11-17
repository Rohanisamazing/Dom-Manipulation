
// Load existing student data from local storage on page load
window.onload = function () {
  loadStudents();
};

// Function to add a student to the list
function addStudent() {
  // Get input values
  const name = document.getElementById("name").value.trim();
  const studentId = document.getElementById("student-id").value.trim();
  const email = document.getElementById("email").value.trim();
  const contact = document.getElementById("contact").value.trim();

  // Validate inputs
  if (!validateInputs(name, studentId, email, contact)) {
    return;
  }

  // Create a student object
  const student = {
    name: name,
    studentId: studentId,
    email: email,
    contact: contact,
  };

  // Save student to local storage
  saveStudent(student);

  // Display student in the list
  displayStudent(student);

  // Clear input fields
  clearFields();
}

// Function to validate inputs
function validateInputs(name, studentId, email, contact) {
  const nameRegex = /^[a-zA-Z\s]+$/;
  const idRegex = /^\d+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const contactRegex = /^\d+$/;

  if (!name || !studentId || !email || !contact) {
    alert("Please fill all fields.");
    return false;
  }
  if (!nameRegex.test(name)) {
    alert("Name should contain only characters.");
    return false;
  }
  if (!idRegex.test(studentId)) {
    alert("Student ID should contain only numbers.");
    return false;
  }
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email.");
    return false;
  }
  if (!contactRegex.test(contact)) {
    alert("Contact number should contain only numbers.");
    return false;
  }
  return true;
}

// Function to save student to local storage
function saveStudent(student) {
  let students = JSON.parse(localStorage.getItem("students")) || [];
  students.push(student);
  localStorage.setItem("students", JSON.stringify(students));
}

// Function to load students from local storage
function loadStudents() {
  let students = JSON.parse(localStorage.getItem("students")) || [];
  students.forEach(displayStudent);
}

// Function to display a student in the list
function displayStudent(student) {
  // Create a new list item
  const studentListItem = document.createElement("li");
  studentListItem.style.backgroundColor = "lightblue";
  studentListItem.style.fontSize = "20px";

  // Create a text content for student details
  const studentText = document.createTextNode(
    `Name: ${student.name}, Student-Id: ${student.studentId}, Email: ${student.email}, Contact-No: ${student.contact}`
  );

  // Create edit button
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add("edit-btn");
  editButton.onclick = function () {
    editStudent(student, studentListItem);
  };

  // Create delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-btn");
  deleteButton.onclick = function () {
    deleteStudent(student, studentListItem);
  };

  // Append text and buttons to the list item
  studentListItem.appendChild(studentText);
  studentListItem.appendChild(editButton);
  studentListItem.appendChild(deleteButton);

  // Append the list item to the student list
  document.getElementById("studentDetailsList").appendChild(studentListItem);

  // Add a scrollbar if the list overflows
  document.getElementById("studentDetailsList").style.overflowY = "auto";
}

// Function to clear the input fields
function clearFields() {
  document.getElementById("name").value = "";
  document.getElementById("student-id").value = "";
  document.getElementById("email").value = "";
  document.getElementById("contact").value = "";
}

// Function to edit a student
function editStudent(student, listItem) {
  // Populate input fields with existing student data
  document.getElementById("name").value = student.name;
  document.getElementById("student-id").value = student.studentId;
  document.getElementById("email").value = student.email;
  document.getElementById("contact").value = student.contact;

  // Remove student from local storage
  deleteStudent(student, listItem, false);

  // Remove the existing list item
  listItem.remove();
}

// Function to delete a student
function deleteStudent(student, listItem, removeFromStorage = true) {
  if (removeFromStorage) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students = students.filter((st) => st.studentId !== student.studentId);
    localStorage.setItem("students", JSON.stringify(students));
  }
  listItem.remove();
}

