const canvas = document.getElementById('signature-canvas');
const ctx = canvas.getContext('2d');
const clearBtn = document.getElementById('clear-btn');
const saveBtn = document.getElementById('save-btn');
const retrieveBtn = document.getElementById('retrieve-btn');
const colorPicker = document.getElementById('color-picker');
const bgColorPicker = document.getElementById('bg-color-picker');
const fontSizePicker = document.getElementById('font-size-picker');
const signatureBox = document.getElementById('signature-box');

let isDrawing = false;
let savedSignature = null;

// Set canvas size
canvas.width = signatureBox.offsetWidth;
canvas.height = signatureBox.offsetHeight;

// Event Listeners
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

clearBtn.addEventListener('click', clearCanvas);
saveBtn.addEventListener('click', saveSignature);
retrieveBtn.addEventListener('click', retrieveSignature);

colorPicker.addEventListener('input', (e) => ctx.strokeStyle = e.target.value);
bgColorPicker.addEventListener('input', (e) => signatureBox.style.backgroundColor = e.target.value);
fontSizePicker.addEventListener('input', (e) => ctx.lineWidth = e.target.value);

// Drawing Functions
function startDrawing(e) {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
}

function stopDrawing() {
    isDrawing = false;
}

function draw(e) {
    if (!isDrawing) return;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveSignature() {
    savedSignature = canvas.toDataURL(); // Save the signature as a Data URL (image format)
    const link = document.createElement('a');
    link.href = savedSignature;
    link.download = 'signature.png'; // Automatically download the signature
    link.click();
}

function retrieveSignature() {
    if (savedSignature) {
        const img = new Image();
        img.src = savedSignature;

        // Ensure the image loads before drawing it onto the canvas
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // Redraw the saved signature
        };
    } else {
        alert('No saved signature found!');
    }
}

