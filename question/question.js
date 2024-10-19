
const questions = [
  {
    question: "What is your age group?",
    options: ["Under 30", "30-50", "Over 50"],
    scores: [0, 2, 3] 
  },
  {
    question: "Do you have a family history of breast cancer?",
    options: ["No", "Yes, one family member", "Yes, multiple family members"],
    scores: [0, 2, 3]
  },
  {
    question: "How often do you engage in regular physical activity?",
    options: ["4+ times a week", "1-3 times a week", "Rarely or never"],
    scores: [0, 1, 2]
  },
  {
    question: "Have you ever had a breast biopsy that showed abnormal cells?",
    options: ["No", "No, but I had a biopsy", "Yes"],
    scores: [0, 1, 3]
  },
  {
    question: "At what age did you start menstruating?",
    options: ["After 15 years old", "Between 12 and 15 years old", "Before 12 years old"],
    scores: [0, 1, 2]
  }
];

// Quiz state
let currentQuestion = 0;
let totalScore = 0;
let selectedScore = 0;

//  option selection
function selectOption(score) {
  selectedScore = score; // Save the score 
  // Highlight selected option 
  let options = document.querySelectorAll(".option");
  options.forEach(opt => opt.style.backgroundColor = "transparent"); 
  options[score].style.backgroundColor = "#e4a7f5"; 
}

//   the next question
function nextQuestion() {
  if (selectedScore === null) {
    alert("Please select an option!"); // condition to make sure the user select optionnn
    return;
  }

  totalScore += questions[currentQuestion].scores[selectedScore]; // Add score selected option
  updateScore(); // Update the score 

  // Move to the next question si disponible
  currentQuestion++;

  if (currentQuestion < questions.length) {
    displayQuestion();
  } else {
    // Quiz is complete, display result
    displayResult();
  }
}

// Function to display the current question
function displayQuestion() {
  // Update question text and options
  document.getElementById("question-text").innerText = questions[currentQuestion].question;
  document.getElementById("opt1").innerText = "a. " + questions[currentQuestion].options[0];
  document.getElementById("opt2").innerText = "b. " + questions[currentQuestion].options[1];
  document.getElementById("opt3").innerText = "c. " + questions[currentQuestion].options[2];
  
  // Update question total
  document.getElementById("question-total").innerText = (currentQuestion + 1) + " of " + questions.length + " questions";

  // Reset selected score for the new question
  selectedScore = null;

  // Remove previous option highlighting
  let options = document.querySelectorAll(".option");
  options.forEach(opt => opt.style.backgroundColor = "transparent");
}

//update the score after each question
function updateScore() {
  document.getElementById("score").innerText = totalScore;
}

//  display the result based on the total score
function displayResult() {
  let riskLevel = "";
  if (totalScore <= 3) {
    riskLevel = "Low Risk";
  } else if (totalScore <= 7) {
    riskLevel = "Moderate Risk";
  } else {
    riskLevel = "High Risk";
  }

  // Update show the result
  document.getElementById("question-text").innerText = "Your Breast Cancer Risk Level: " +       riskLevel;
  document.querySelector(".option-list").style.display = "none"; // Hide options
  document.querySelector(".next-btn").style.display = "none"; // Hide next button
  document.getElementById("question-total").style.display = "none"; // Hide question count
  document.getElementById("score").innerText = totalScore; // Display final total score

  // Trigger the falling logos animation
  startFallingLogos();
}

// Function to generate and animate falling breast cancer logos
function startFallingLogos() {
  const fallingLogosContainer = document.getElementById('falling-logos');
  
  for (let i = 0; i < 40; i++) { 
    let logo = document.createElement("img");
    logo.src = "pink-ribbon.png";
    logo.classList.add("falling-logo");

    
    logo.style.left = Math.random() * 100 + "vw";
    logo.style.animationDuration = Math.random() * 5 + 5 + "s"; 
    fallingLogosContainer.appendChild(logo);
  }
}



// Display the first question when the page loads
window.onload = displayQuestion;




