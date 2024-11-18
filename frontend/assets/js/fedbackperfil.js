import service from '../services/feedback.js';

$(document).ready(function () {
  function fetchTestimonials() {
    service.getFeedbacks()
      .then(function (data) {
        renderTestimonials(data);
      })
      .catch(function (err) {
        console.error("Erro ao buscar feedbacks:", err);
      });
  }

  function renderTestimonials(feedbacks) {
    const container = $('.testimonials-container');
    container.empty();

    feedbacks.forEach(feedback => {
      const testimonialCard = `
        <div class="item testimonial-card">
          <main class="test-card-body">
            <div class="quote">
              <i class="fa fa-quote-left"></i>
              <h2>${feedback.titulo ? "Compra" : "Venda"} do veiculo...</h2>
            </div>
            <p>${feedback.comentario}</p>
            <div class="ratings">${getStars(feedback.nota)}</div>
          </main>
          <div class="profile">
            <div class="profile-desc">
              <span>${feedback.created_by}</span>
            </div>
          </div>
        </div>`;
      container.append(testimonialCard);
    });

    initializeCarousel();
  }

  function getStars(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
      stars += i < rating ? '<i class="fa-solid fa-star"></i>' : '<i class="fa-regular fa-star"></i>';
    }
    return stars;
  }

  function initializeCarousel() {
    $(".testimonials-container").owlCarousel({
      loop: true,
      autoplay: true,
      autoplayTimeout: 6000,
      margin: 10,
      nav: true,
      navText: [
        "<i class='fa-solid fa-arrow-left'></i>",
        "<i class='fa-solid fa-arrow-right'></i>",
      ],
      responsive: {
        0: {
          items: 1,
          nav: false,
        },
        600: {
          items: 1,
          nav: true,
        },
        768: {
          items: 2,
        },
      },
    });
  }

  fetchTestimonials();
});
