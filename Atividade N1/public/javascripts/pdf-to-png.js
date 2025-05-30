// Get the drag area, file input, and preview container
const dragArea = document.getElementById("dragArea");
const fileInput = document.getElementById("fileInput");
const pngPreview = document.getElementById("pngPreview");
const uploadBtn = document.getElementById("uploadBtn");

// Trigger file input when button is clicked
uploadBtn.addEventListener("click", () => {
  fileInput.click();
});

// Handle drag over event
dragArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dragArea.classList.add("bg-light");
});

// Handle drag leave event
dragArea.addEventListener("dragleave", () => {
  dragArea.classList.remove("bg-light");
});

// Handle file drop event
dragArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dragArea.classList.remove("bg-light");
  const file = e.dataTransfer.files[0];
  if (file && file.type === "image/png") {
    handleFile(file);
  } else {
    alert("Please select a valid PNG file!");
  }
});

// Handle file input change (for file selection)
fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file && file.type === "image/png") {
    handleFile(file);
  } else {
    alert("Please select a valid PNG file!");
  }
});

// Function to handle the uploaded PNG file
function handleFile(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const pngContent = e.target.result;
    const img = document.createElement("img");
    img.src = pngContent; // Set the base64 image data as the source
    img.alt = "PNG Preview"; // Optionally add an alt text
    pngPreview.innerHTML = ""; // Clear any previous content
    pngPreview.appendChild(img); // Append the image to the preview container
    pngPreview.style.display = "block"; // Show the preview container
  };
  reader.readAsDataURL(file); // Read the file as a data URL
}
