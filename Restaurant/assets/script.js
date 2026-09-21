
document.addEventListener("DOMContentLoaded", () => {
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach(link => {
    const href = link.getAttribute("href");
    if (href === current || (current === "" && href === "index.html")) link.classList.add("active");
  });

  const nav = document.querySelector(".navbar");
  const topBtn = document.getElementById("backToTop");
  const onScroll = () => {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 20);
    if (topBtn) topBtn.style.display = window.scrollY > 350 ? "grid" : "none";
  };
  window.addEventListener("scroll", onScroll);
  onScroll();

  if (topBtn) topBtn.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

  // Reservation modal: sends the reservation request to WhatsApp.
  const reservationForm = document.getElementById("reservationForm");
  if (reservationForm) {
    const dateInput = document.getElementById("resDate");
    if (dateInput) {
      const now = new Date();
      const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0,10);
      dateInput.min = local;
    }

    reservationForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!reservationForm.checkValidity()) {
        reservationForm.classList.add("was-validated");
        return;
      }

      const data = {
        name: document.getElementById("resName").value.trim(),
        phone: document.getElementById("resPhone").value.trim(),
        date: document.getElementById("resDate").value,
        time: document.getElementById("resTime").value,
        guests: document.getElementById("resGuests").value,
        notes: document.getElementById("resNotes").value.trim()
      };

      const message =
`*Table Reservation Request - New Indian Bakery & Restaurant*
Name: ${data.name}
Phone: ${data.phone}
Date: ${data.date}
Time: ${data.time}
Guests: ${data.guests}
${data.notes ? "Notes: " + data.notes : ""}

Please confirm availability.`;

      const url = "https://wa.me/971505052640?text=" + encodeURIComponent(message);
      const success = document.getElementById("reservationSuccess");
      if (success) success.style.display = "block";

      window.open(url, "_blank", "noopener");
      setTimeout(() => {
        const modal = bootstrap.Modal.getInstance(document.getElementById("reservationModal"));
        if (modal) modal.hide();
        reservationForm.reset();
        reservationForm.classList.remove("was-validated");
        if (success) success.style.display = "none";
      }, 1200);
    });
  }

  // Contact form
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.classList.add("was-validated");
        return;
      }
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      const subject = encodeURIComponent("Website Enquiry - New Indian Bakery & Restaurant");
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:info@newindianbakery.ae?subject=${subject}&body=${body}`;
    });
  }
});
