const userInput = document.getElementById("console-input");

const questionAndAnswerMap = new Map();
questionAndAnswerMap.set(
  "what languages do you know",
  "I code in JavaScript, Python, and SQL."
);
questionAndAnswerMap.set(
  "tell me about poolio",
  "Poolio is a group-based saving and investing app I'm building."
);
questionAndAnswerMap.set(
  "what projects are you working on",
  "I'm currently working on Poolio and building my personal portfolio site."
);
questionAndAnswerMap.set(
  "what are your skills",
  "I specialize in full-stack development, with a strong foundation in computer science fundamentals."
);
questionAndAnswerMap.set(
  "where did you learn to code",
  "I'm self-taught through Codecademy, Udemy, and lots of self-study."
);
questionAndAnswerMap.set(
  "what is your favorite programming language",
  "JavaScript for full-stack apps, but Python has a special place in my heart too!"
);
questionAndAnswerMap.set("hi", "Hey there! 👋 Ask me anything!");
questionAndAnswerMap.set("hello", "Hey there! 👋 Ask me anything!");
questionAndAnswerMap.set(
  "how are you",
  "I'm feeling ready to code! How about you?"
);

questionAndAnswerMap.set("bye", "Goodbye! Thanks for stopping by!");

function displayInputToConsole(event) {
  if (event.key === "Enter") {
    if (userInput.value.toLowerCase() === "clear") {
      clearConsole();
    } else {
      const inputValue = userInput.value; // Store the input value
      document.getElementById(
        "console-body"
      ).innerHTML += `${inputValue}<br>`;
      setTimeout(() => getBotResponse(inputValue), 2000); // Add a 2-second delay before bot response
    }
    userInput.value = "";
  }
}

function clearConsole() {
  document.getElementById("console-body").innerHTML = "";
}

function getBotResponse(input) {
  input = input.toLowerCase();
  if (questionAndAnswerMap.has(input)) {
    document.getElementById(
      "console-body"
    ).innerHTML += `> BOT: ${questionAndAnswerMap.get(input)}<br>`;
  } else {
    document.getElementById("console-body").innerHTML +=
      "> BOT: I’m not sure how to answer that yet!<br>";
  }
}

userInput.onkeydown = displayInputToConsole;
