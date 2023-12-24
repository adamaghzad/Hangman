//Initial References
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

//Options values for buttons
let options = {
  fruits: [
    "تفاح",
    "توت أزرق",
    "ماندرين",
    "أناناس",
    "رمان",
    "بطيخ",
    "موز",
    "كرز",
    "عنب",
    "كيوي",
    "برتقال",
    "فراولة",
    "مانجو",
    "كمثرى",
    "توت أحمر",
    "توت أسود",
    "خوخ",
    "برقوق",
    "مشمش",
  ],
  animals: [
    "قنفذ",
    "وحيد القرن",
    "سنجاب",
    "نمر",
    "فقمة",
    "حمار الوحش",
    "زرافة",
    "كنغر",
    "فيل",
    "بطريق",
    "فهد",
    "نعامة",
    "كوالا",
    "غوريلا",
    "دلفين",
    "أسد",
    "نمر",
    "فهد",
    "باندا",
    "دب قطبي",
    "فيمبوبوتاموس",
    "زرافة",
    "كوالا",
    "كنغر",
    "قرد",
    "ببغاء",
    "تمساح",
    "زرافة",
    "بطريق",
    "طاووس",
    "كسل",
    "طوقان",
    "فانغولين",
    "نمر",
    "كوبرا",
    "سلحفاة",
    "ضفدع",
    "فلامنجو",
    "كاميليون",
    "فانغولين",
    "ميركات",
    "أرماديلو",
    "فهد",
  ],
  countries: [
    "الهند",
    "هنغاريا",
    "قيرغيزستان",
    "سويسرا",
    "زيمبابوي",
    "دومينيكا",
    "",
  ],
};

// Count
    let winCount = 0;
    let count = 0;

    let chosenWord = "";

    // Display option buttons
    const displayOptions = () => {
      optionsContainer.innerHTML += `<h3>Please Select An Option</h3>`;
      let buttonCon = document.createElement("div");
      for (let value in options) {
        buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
      }
      optionsContainer.appendChild(buttonCon);
    };

    // Block all the Buttons
    const blocker = () => {
      let optionsButtons = document.querySelectorAll(".options");
      let letterButtons = document.querySelectorAll(".letters");
      // Disable all options
      optionsButtons.forEach((button) => {
        button.disabled = true;
      });

      // Disable all letters
      letterButtons.forEach((button) => {
        button.disabled = true;
      });
      newGameContainer.classList.remove("hide");
    };

    // Word Generator
    const generateWord = (optionValue) => {
      let optionsButtons = document.querySelectorAll(".options");
      // If optionValue matches the button innerText then highlight the button
      optionsButtons.forEach((button) => {
        if (button.innerText.toLowerCase() === optionValue) {
          button.classList.add("active");
        }
        button.disabled = true;
      });

      // Initially hide letters, clear previous word
      letterContainer.classList.remove("hide");
      userInputSection.innerText = "";

      let optionArray = options[optionValue];
      // Choose random word
      chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
      chosenWord = chosenWord.toUpperCase();

      // Replace every letter with span containing dash
      let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');

      // Display each element as span
      userInputSection.innerHTML = displayItem;
    };

    // Initial Function (Called when page loads/user presses new game)
    const initializer = () => {
      winCount = 0;
      count = 0;

      // Initially erase all content and hide letters and new game button
      userInputSection.innerHTML = "";
      optionsContainer.innerHTML = "";
      letterContainer.classList.add("hide");
      newGameContainer.classList.add("hide");
      letterContainer.innerHTML = "";

      // For creating letter buttons with Arabic letters
      for (let i = 0; i < 29; i++) {
        let button = document.createElement("button");
        button.classList.add("letters");
        // HTML entities for Arabic letters
        button.innerHTML = `&#${1601 + i};`;
        // character button click
        button.addEventListener("click", () => {
          let charArray = chosenWord.split("");
          let dashes = document.getElementsByClassName("dashes");
          // If array contains clicked value, replace the matched dash with letter; else draw on canvas
          if (charArray.includes(button.innerText)) {
            charArray.forEach((char, index) => {
              // If character in array is the same as clicked button
              if (char === button.innerText) {
                // Replace dash with letter
                dashes[index].innerText = char;
                // Increment counter
                winCount += 1;
                // If winCount equals word length
                if (winCount == charArray.length) {
                  resultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
                  // Block all buttons
                  blocker();
                }
              }
            });
          } else {
            // Lose count
            count += 1;
            // For drawing man
            drawMan(count);
            // Count==6 because head, body, left arm, right arm, left leg, right leg
            if (count == 6) {
              resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
              blocker();
            }
          }
          // Disable clicked button
          button.disabled = true;
        });
        letterContainer.append(button);
      }

      displayOptions();
      // Call to canvasCreator (for clearing previous canvas and creating initial canvas)
      let { initialDrawing } = canvasCreator();
      // initialDrawing would draw the frame
      initialDrawing();
    };

    // Canvas
    const canvasCreator = () => {
      let context = canvas.getContext("2d");
      context.beginPath();
      context.strokeStyle = "#000";
      context.lineWidth = 2;

      // For drawing lines
      const drawLine = (fromX, fromY, toX, toY) => {
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        context.stroke();
      };

      const head = () => {
        context.beginPath();
        context.arc(70, 30, 10, 0, Math.PI * 2, true);
        context.stroke();
      };

      const body = () => {
        drawLine(70, 40, 70, 80);
      };

      const leftArm = () => {
        drawLine(70, 50, 50, 70);
      };

      const rightArm = () => {
        drawLine(70, 50, 90, 70);
      };

      const leftLeg = () => {
        drawLine(70, 80, 50, 110);
      };

      const rightLeg = () => {
        drawLine(70, 80, 90, 110);
      };

      // Initial frame
      const initialDrawing = () => {
        // Clear canvas
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        // Bottom line
        drawLine(10, 130, 130, 130);
        // Left line
        drawLine(10, 10, 10, 131);
        // Top line
        drawLine(10, 10, 70, 10);
        // Small top line
        drawLine(70, 10, 70, 20);
      };

      return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
    };

    // Draw the man
    const drawMan = (count) => {
      let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
      switch (count) {
        case 1:
          head();
          break;
        case 2:
          body();
          break;
        case 3:
          leftArm();
          break;
        case 4:
          rightArm();
          break;
        case 5:
          leftLeg();
          break;
        case 6:
          rightLeg();
          break;
        default:
          break;
      }
    };

    // New Game
    newGameButton.addEventListener("click", initializer);
    window.onload = initializer;
