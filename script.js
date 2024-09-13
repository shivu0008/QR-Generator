const qrText = document.getElementById('qr-text');
const sizes = document.getElementById('sizes');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const qrContainer = document.querySelector('.qr-body');
const shareBtn = document.getElementById('shareBtn');
const shareOptions = document.getElementById('share-options');

let size = sizes.value;

generateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    isEmptyInput();
});

sizes.addEventListener('change', (e) => {
    size = e.target.value;
    isEmptyInput();
});

downloadBtn.addEventListener('click', () => {
    let img = document.querySelector('.qr-body img');
    if (img !== null) {
        let imgAtrr = img.getAttribute('src');
        downloadBtn.setAttribute("href", imgAtrr);
    } else {
        downloadBtn.setAttribute("href", `${document.querySelector('canvas').toDataURL()}`);
    }
});

function isEmptyInput() {
    qrText.value.length > 0 ? generateQRCode() : alert("Enter the text or URL to generate your QR code");
}

function generateQRCode() {
    qrContainer.innerHTML = "";
    new QRCode(qrContainer, {
        text: qrText.value,
        height: size,
        width: size,
        colorLight: "#fff",
        colorDark: "#000",
    });
}

shareBtn.addEventListener('click', () => {
    let img = document.querySelector('.qr-body img');
    let imgSrc = img ? img.getAttribute('src') : document.querySelector('canvas').toDataURL();

    // Make share options visible
    shareOptions.style.display = "block";

    // Update WhatsApp sharing link
    document.getElementById('shareWhatsapp').href = `https://wa.me/?text=${encodeURIComponent('Here is my QR Code: ' + imgSrc)}`;

    // Update Facebook sharing link
    document.getElementById('shareFacebook').href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imgSrc)}`;

    // Update Twitter sharing link
    document.getElementById('shareTwitter').href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(imgSrc)}&text=Check out my QR Code`;
});
