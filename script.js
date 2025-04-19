document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById("inputText");
    const sourceLang = document.getElementById("sourceLang");
    const targetLang = document.getElementById("targetLang");
    const outputText = document.getElementById("outputText");
  
    window.swapLanguages = function () {
      const temp = sourceLang.value;
      sourceLang.value = targetLang.value;
      targetLang.value = temp;
    }
  
    window.translateText = async function () {
      const input = inputText.value;
      const from = sourceLang.value;
      const to = targetLang.value;
  
      if (!input.trim()) {
        showToast("Please enter text to translate.");
        return;
      }
  
      outputText.innerText = "⏳ Translating...";
  
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(input)}&langpair=${from}|${to}`;
  
      try {
        const res = await fetch(url);
        const data = await res.json();
        outputText.innerText = data.responseData.translatedText;
      } catch (err) {
        console.error(err);
        outputText.innerText = "Translation failed.";
        showToast("❌ Something went wrong. Try again.");
      }
    }
  
    window.copyToClipboard = function () {
      const text = outputText.innerText;
      if (!text || text === "⏳ Translating..." || text === "Translation failed.") {
        showToast("⚠️ No text to copy.");
        return;
      }
      navigator.clipboard.writeText(text)
        .then(() => showToast("✅ Translation copied!"))
        .catch(() => showToast("❌ Failed to copy."));
    }
  
    function showToast(message) {
      let toast = document.createElement("div");
      toast.innerText = message;
      toast.style.position = "fixed";
      toast.style.bottom = "20px";
      toast.style.left = "50%";
      toast.style.transform = "translateX(-50%)";
      toast.style.background = "#4b0082";
      toast.style.color = "#fff";
      toast.style.padding = "12px 20px";
      toast.style.borderRadius = "10px";
      toast.style.boxShadow = "0 5px 15px rgba(0,0,0,0.2)";
      toast.style.zIndex = "1000";
      toast.style.opacity = "0";
      toast.style.transition = "opacity 0.5s ease-in-out";
  
      document.body.appendChild(toast);
      requestAnimationFrame(() => toast.style.opacity = "1");
      setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => document.body.removeChild(toast), 500);
      }, 3000);
    }
  });
  