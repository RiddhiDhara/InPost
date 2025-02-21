const API_KEY = "AIzaSyASUWnIL1CnkzWPRMF1cJJgyMHlXL6rDlc"; // Store securely!
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;
const emailjsFormId = "bmzQHLuxWWIx06fMq"
const serviceId = "service_rdji9g8";
const templateId = "template_59n18pi";

emailjs.init(emailjsFormId); // emailjs formid

// --------------------------
// Reference to output fields
const userTextContent = document.querySelector(".userTextContent");
const outputElement = document.getElementById("output");
const imageElement = document.getElementById("image");

// Update Length Value in UI
function updateLengthValue() {
  document.querySelector(".userVal").innerText =
    document.getElementById("length").value;
}

// Generate text using Gemini API
async function generateText(prompt) {
  try {
    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    const data = await response.json();

    if (data?.candidates?.length > 0) {
      const content = data.candidates[0].content.parts[0].text;
      userTextContent.textContent = content;
      console.log("✅ Gemini Response:", content);
      return content;
    } else {
      throw new Error("Gemini API response is invalid.");
    }
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    userTextContent.textContent = "Error occurred! Please try again.";
    return "Error occurred! Please try again.";
  }
}
// Generate text using gemini api for advanced tab requests
async function generateTextAdvanced(prompt) {
  try {
    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    const data = await response.json();

    if (data?.candidates?.length > 0) {
      const content = data.candidates[0].content.parts[0].text;
      console.log("✅ Gemini Response-Advanced :", content);
      return content;
    } else {
      throw new Error("Gemini API response is invalid.");
    }
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    return "Error occurred! Please try again.";
  }
}

// Fetch Image when you have money to buy subscription

// Main function to generate the post for random tab

async function generatePost() {
  const category = document.getElementById("category")?.value;
  const tone = document.querySelector('input[name="tone"]:checked')?.value;
  const length = document.getElementById("length")?.value;
  const outputElement = document.getElementById("output"); // Ensure this exists

  if (!category || !tone || !length || !outputElement) {
    console.error("❌ Required elements not found!");
    return;
  }

  const postPrompt = `Generating a ${tone} LinkedIn post on ${category} with approximately ${length} words with lots of emojis and bullet points on hot topics and news`;

  outputElement.value = postPrompt;

  // Fetch text content
  await generateText(postPrompt);
}

// main function to generate the post for ai tab

async function generatePostAI() {
  const outputElement = document.getElementById("ai-output"); // Ensure this exists

  if (!outputElement) {
    console.error("❌ Required elements not found!");
    return;
  }
  postPrompt = outputElement.value;

  // Fetch text content
  await generateText(postPrompt);
}

// setting some things : manually


// ===================================================================now creating logics for switching tabs

const ai = document.querySelector(".ai");
const random = document.querySelector(".random");
const advanced = document.querySelector(".advanced");

const headingIcon = document.querySelector(".heading-icon");
const title = document.querySelector(".title");
const btnInfo = document.querySelector(".btn-info");
const section2Form = document.querySelector(".section2Form");

const btn = document.querySelectorAll(".btn");

btn.forEach((btnItem) => {
  btnItem.addEventListener("click", () => {
    if (!btnItem.classList.contains("active")) {
      btn.forEach((btnRead) => {
        btnRead.classList.remove("active");
      });
      btnItem.classList.add("active");
      updateUI(btnItem);
    }
  });
});

// Function to update UI based on active tab
function updateUI(activeTab) {
  if (activeTab.classList.contains("ai")) {
    headingIcon.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles"></i>`;
    title.innerText = "AI";
    btnInfo.innerText =
      "Create Post quick and easy using your own generative prompt. You can add your custom image as well!";
    section2Form.innerHTML = `
          <div class="prompt">
            <div class="prompt-title">Prompt :</div>
            <div class="prompt-info">Write your prompt here :</div>
            <textarea id="ai-output"></textarea>
            <button class="generate-button">Generate Post</button>
          </div>
    `;
  }

  if (activeTab.classList.contains("random")) {
    headingIcon.innerHTML = `<i class="fa-solid fa-shuffle"></i>`;
    title.innerText = "Random";
    btnInfo.innerText =
      "Create Random post using generative AI with custom parameters. You can also upload an image to make your post exciting!";
    section2Form.innerHTML = `
      <div class="category">
        <div class="category-title">Choose category : </div>
        <select class="category-select" name="category" id="category">
          <option value="technology">Technology</option>
          <option value="business">Business</option>
          <option value="fashion">Fashion</option>
        </select>
      </div>
      <div class="tone">
        <div class="tone-title">Choose tone : </div>
        <div class="tones">
          <input type="radio" name="tone" value="formal" checked>Formal
          <input type="radio" name="tone" value="casual">Casual
          <input type="radio" name="tone" value="witty">Witty
        </div>
      </div>
      <div class="length">
        <div class="length-title">Post Length : </div>
        <input class="length-input" type="range" id="length" min="50" max="300" value="150" oninput="updateLengthValue()">
        <div class="length-range">
          <div class="lower">50</div>
          <div class="userVal" id="lengthValue">150</div>
          <div class="higher">300</div>
        </div>
      </div>
      <div class="prompt">
        <div class="prompt-title">Prompt :</div>
        <div class="prompt-info">Here's how your prompt looks like :</div>
        <textarea id="output" readonly></textarea>
        <button class="prompt-button">Generate Post</button>
      </div>
    `;
  }

  if (activeTab.classList.contains("advanced")) {
    headingIcon.innerHTML = `<i class="fa-solid fa-clock"></i>`;
    title.innerText = "Advanced";
    btnInfo.innerText =
      "Here you go hands free with Advanced. Set your timer and adjust your post and let us deliver to your email after each interval !!";
    section2Form.innerHTML = `
      <div class="email">
        <label for="email" class= "email-title">Enter your email:</label>
        <input type="email" id="email" name="email" class="email-input">
      </div>
      <div class="interval">
        <div class="interval-title">Choose interval : </div>
          <div class="intervals">
            <label><input type="radio" name="interval" value="12h" checked> Every 12 hrs</label>
            <label><input type="radio" name="interval" value="1d"> Everyday</label>
            <label><input type="radio" name="interval" value="1w"> Everyweek</label>
          </div>
      </div>
      <div class="advancedPrompt">
        <div class="advancedPrompt-title">Prompt :</div>
        <div class="advancedPrompt-info">Write your prompt here :</div>
        <textarea id="advanced-output"></textarea>
        <div class="advanced-buttons" >
          <button class="save-button">Save</button>
          <button class="clear-button">Discard</button>
        </div>
      </div>
    `;
  }
}

// Run updateUI on page load to set the correct initial state
document.addEventListener("DOMContentLoaded", () => {
  const initialActiveTab = document.querySelector(".btn.active");
  if (initialActiveTab) {
    updateUI(initialActiveTab);
  }
});

// inside random tab
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("prompt-button")) {
    generatePost(); // Call the function when button is clicked
  }
});

// inside ai tab
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("generate-button")) {
    generatePostAI();
  }
});

// ==========================================================================================================================trial 4

document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".btn.active")?.classList.contains("advanced")) {
    loadAdvancedSettings();
  }

  startIntervalTask(); // Restart email interval after reload

  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      if (this.classList.contains("advanced")) {
        loadAdvancedSettings();
      }
    });
  });

  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("save-button")) {
      saveAdvancedSettings();
    } else if (event.target.classList.contains("clear-button")) {
      clearAdvancedSettings();
    }
  });
});

// Function to save settings to local storage
function saveAdvancedSettings() {
  const email = document.getElementById("email")?.value.trim();
  const prompt = document.getElementById("advanced-output")?.value.trim();
  const interval = document.querySelector(
    'input[name="interval"]:checked'
  )?.value;

  if (!email || !prompt || !interval) {
    alert("⚠️ Please fill in all fields before saving.");
    return;
  }

  const advancedSettings = { email, prompt, interval, lastSent: null }; // Track last email sent
  localStorage.setItem("advancedSettings", JSON.stringify(advancedSettings));

  alert("✅ Settings saved successfully!");
  startIntervalTask(); // Start sending emails again
}

// Function to load settings from local storage
function loadAdvancedSettings() {
  const savedSettings = JSON.parse(localStorage.getItem("advancedSettings"));

  if (savedSettings) {
    document.getElementById("email").value = savedSettings.email;
    document.getElementById("advanced-output").value = savedSettings.prompt;
    document.querySelector(
      `input[name="interval"][value="${savedSettings.interval}"]`
    ).checked = true;
  }
}

// Function to clear settings
function clearAdvancedSettings() {
  document.getElementById("email").value = "";
  document.getElementById("advanced-output").value = "";

  const checkedRadio = document.querySelector('input[name="interval"]:checked');
  if (checkedRadio) checkedRadio.checked = false;

  localStorage.removeItem("advancedSettings");
  alert("❌ Settings discarded.");
  clearInterval(emailInterval);
}

let emailInterval; // Ensure only one active interval

// Function to handle automatic email sending based on interval
function startIntervalTask() {
  clearInterval(emailInterval); // Clear any existing interval

  const savedSettings = JSON.parse(localStorage.getItem("advancedSettings"));
  if (!savedSettings) return;

  let intervalTime;
  switch (savedSettings.interval) {
    case "12h":
      intervalTime = 12 * 60 * 60 * 1000; // For testing, 12h → 1 minute
      // intervalTime = 5 * 60 * 1000; // For testing, 12h → 1 minute
      break;
    case "1d":
      intervalTime = 24 * 60 * 60 * 1000; // 24 hours
      break;
    case "1w":
      intervalTime = 7 * 24 * 60 * 60 * 1000; // 1 week
      break;
    default:
      return;
  }

  async function checkAndSendEmail() {
    const currentTime = Date.now();
    const lastSentTime = savedSettings.lastSent
      ? parseInt(savedSettings.lastSent)
      : 0;

    if (currentTime - lastSentTime >= intervalTime) {
      let generatedText = await generateTextAdvanced(savedSettings.prompt);
      sendEmail(savedSettings.email, generatedText);
      savedSettings.lastSent = currentTime;
      localStorage.setItem("advancedSettings", JSON.stringify(savedSettings));
    }
  }

  checkAndSendEmail(); // Send immediately if the interval has passed
  emailInterval = setInterval(checkAndSendEmail, intervalTime); // Check continuously
}

// Function to send email using EmailJS
function sendEmail(toEmail, message) {
  emailjs
    .send(serviceId, templateId, {
      to_email: toEmail,
      message: message,
    })
    .then((response) => {
      console.log("✅ Email sent successfully!", response);
    })
    .catch((error) => {
      console.error("❌ Error sending email:", error);
    });
}

// ================================================================================================== nav 3 buttons plus , minus , copy

document.addEventListener("DOMContentLoaded", () => {
  const postContainer = document.querySelector(".post-container"); // Adjust selector based on actual container
  const textContainer = document.querySelector(".userTextContent"); // Adjust selector based on actual container
  const copyButton = document.querySelector(".copy");
  const plusButton = document.querySelector(".plus");
  const minusButton = document.querySelector(".minus");

  let containerSize = 1; // Initial scale factor
  const minScale = 0.6; // Minimum allowed scale
  const maxScale = 1; // Maximum allowed scale

  // Increase post container size
  plusButton.addEventListener("click", () => {
    if (containerSize < maxScale) {
      containerSize += 0.1;
      postContainer.style.transform = `scale(${containerSize})`;
    }
  });

  // Decrease post container size
  minusButton.addEventListener("click", () => {
    if (containerSize > minScale) {
      // Prevent shrinking too much
      containerSize -= 0.1;
      postContainer.style.transform = `scale(${containerSize})`;
    }
  });

  // Copy text to clipboard
  copyButton.addEventListener("click", () => {
    const text = textContainer.textContent;
    if (!text) {
      alert("No content to copy!");
      return;
    }
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("✅ Text copied to clipboard!");
      })
      .catch((err) => {
        console.error("❌ Failed to copy text: ", err);
      });
  });
});

// disabling inspect 

document.onkeydown = (e) => {
  if (e.key == 123) {
      e.preventDefault();
  }
  if (e.ctrlKey && e.shiftKey && e.key == 'I') {
      e.preventDefault();
  }
  if (e.ctrlKey && e.shiftKey && e.key == 'C') {
      e.preventDefault();
  }
  if (e.ctrlKey && e.shiftKey && e.key == 'J') {
      e.preventDefault();
  }
  if (e.ctrlKey && e.key == 'U') {
      e.preventDefault();
  }
};