document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".chatgpt-form");
  const chatgptInput = document.getElementById("chatgpt");
  const titleInput = document.getElementById("title");
  const contentTextarea = document.getElementById("textarea");


form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const subject = chatgptInput.value;

  try {
    const response = await fetch("/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subject }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const { content } = await response.json();
  

    contentTextarea.value = content;
  } catch (error) {
    console.error("Error:", error);
  }
});

});

 const userLink = document.getElementById("user-name");
 const logoutLink = document.getElementById("logoutLink");
  userLink.addEventListener("mouseenter", function () {
    logoutLink.style.display = "inline";
    userLink.style.display = "none";
  });
  logoutLink.addEventListener("mouseleave", function () {
    logoutLink.style.display = "none";
    userLink.style.display = "inline";
  });