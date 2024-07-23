document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".wrapper"),
    qrInput = wrapper.querySelector(".form input"),
    sizeSelect = wrapper.querySelector("#size"),
    colorInput = wrapper.querySelector("#color"),
    ecLevelSelect = wrapper.querySelector("#ec-level"),
    generateBtn = wrapper.querySelector(".form button"),
    qrImg = wrapper.querySelector(".qr-code img"),
    loading = wrapper.querySelector(".loading"),
    historyList = wrapper.querySelector("#history-list");

  let preValue;

  generateBtn.addEventListener("click", () => {
    let qrValue = qrInput.value.trim();
    let qrSize = sizeSelect.value;
    let qrColor = colorInput.value.substring(1); // Remove '#' from the color hex code
    let qrEcLevel = ecLevelSelect.value;
    if (!qrValue || preValue === qrValue) return;
    preValue = qrValue;
    generateBtn.innerText = "Generating QR Code...";
    loading.style.display = "flex";
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}&data=${qrValue}&color=${qrColor}&ecc=${qrEcLevel}`;
    qrImg.addEventListener("load", () => {
      wrapper.querySelector(".qr-code").style.display = "block";
      loading.style.display = "none";
      generateBtn.innerText = "Generate QR Code";
      addToHistory(qrValue, qrSize, qrColor, qrEcLevel);
    });
  });

  qrInput.addEventListener("keyup", () => {
    if (!qrInput.value.trim()) {
      wrapper.querySelector(".qr-code").style.display = "none";
      preValue = "";
    }
  });

  function addToHistory(value, size, color, ecLevel) {
    const listItem = document.createElement("li");
    listItem.innerText = `Text: ${value}, Size: ${size}, Color: #${color}, Error Correction: ${ecLevel}`;
    historyList.appendChild(listItem);
  }
});
