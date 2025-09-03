document.addEventListener("DOMContentLoaded", function () {
  // Set dynamic dates
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  const formatDate = (date) => {
    return `${date.getDate()} ${date.toLocaleString("default", {
      month: "short",
    })} ${date.getFullYear()}`;
  };

  document.getElementById("date-3").textContent = formatDate(today);
  document.getElementById("date-2").textContent = formatDate(yesterday);
  document.getElementById("date-1").textContent = formatDate(twoDaysAgo);

  // Handle scan button click
  document.getElementById("scan-btn").addEventListener("click", function () {
    // Hide first section with animation
    const firstSection = document.getElementById("first");
    firstSection.style.transition = "opacity 0.5s ease";
    firstSection.style.opacity = 0;

    setTimeout(() => {
      firstSection.classList.add("hidden");

      // Show second section
      const secondSection = document.getElementById("second");
      secondSection.classList.remove("hidden");
      secondSection.style.opacity = 0;

      setTimeout(() => {
        secondSection.style.transition = "opacity 0.5s ease";
        secondSection.style.opacity = 1;

        // Start the animation sequence
        setTimeout(() => animateIPAddress(), 300);
      }, 50);
    }, 500);
  });

  // Animate IP address typing
  function animateIPAddress() {
    const ipAddress = "2.258.12.218.84";
    const inputField = document.getElementById("display-input");
    let i = 0;

    function typeWriter() {
      if (i < ipAddress.length) {
        inputField.value += ipAddress.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      } else {
        // After IP address is fully typed, show scan results
        setTimeout(() => {
          document.querySelectorAll(".fade-in").forEach((el) => {
            el.style.opacity = 1;
          });

          // After scan results, show date entries
          setTimeout(animateDateEntries, 1000);
        }, 500);
      }
    }

    typeWriter();
  }

  // Animate date entries and progress bar
  function animateDateEntries() {
    const dateEntries = [
      document.getElementById("date-entry-1"),
      document.getElementById("date-entry-2"),
      document.getElementById("date-entry-3"),
    ];

    const progressBar = document.getElementById("progress-bar");

    // Animate progress bar to 80% from top to bottom
    setTimeout(() => {
      progressBar.style.height = "80%";
    }, 500);

    // Show date entries one by one
    dateEntries.forEach((entry, index) => {
      setTimeout(() => {
        entry.style.opacity = 1;
        entry.style.transform = "translateX(0)";

        // When we reach the last entry (current date), show the button
        if (index === dateEntries.length - 1) {
          setTimeout(() => {
            document.querySelector(".protected-btn").style.opacity = 1;
          }, 500);
        }
      }, 800 * (index + 1));
    });
  }
});
