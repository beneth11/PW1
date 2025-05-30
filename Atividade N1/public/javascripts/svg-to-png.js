// Get the drag area, file input, and preview container
const dragArea = document.getElementById("dragArea");
const fileInput = document.getElementById("fileInput");
const svgPreview = document.getElementById("svgPreview");
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
  if (file && file.type === "image/svg+xml") {
    handleFile(file);
  } else {
    alert("Please drop a valid SVG file!");
  }
});

// Handle file input change (for file selection)
fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file && file.type === "image/svg+xml") {
    handleFile(file);
  } else {
    alert("Please select a valid SVG file!");
  }
});

// Function to handle the uploaded SVG file
function handleFile(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const svgContent = e.target.result;
    svgPreview.innerHTML = svgContent; // Set the SVG content in the preview container
    svgPreview.style.display = "block"; // Show the preview container
  };
  reader.readAsText(file); // Read the file as text
}