// ============================================================
// FEATURED BOOKS DATA — Edit this array to update book info
// ============================================================
const featuredBooksData = [
  {
    image: "image/book_1.jpg",
    title: "Coco Goose",
    author: "Aimee Agresti",
    genre: "Contemporary Fiction, Romance",
    oldPrice: "$51",
    description: "A fresh, modern retelling of a classic story, Coco Goose follows a young woman navigating the complexities of love, identity, and reinvention in a world that constantly tries to define her. Witty, heartfelt, and full of charm, it is a love story for a new generation."
  },
  {
    image: "image/book_2.jpg",
    title: "Subletter",
    author: "D.D. Marks",
    genre: "Drama, Mystery, Contemporary",
    oldPrice: "$51",
    description: "When a young professional sublets her Paris apartment, she returns to find a trail of secrets left behind by the stranger who lived there. A gripping story of identity, trust, and the lives we leave behind in the spaces we inhabit."
  },
  {
    image: "image/book_3.jpg",
    title: "Westpart",
    author: "S.L. Harpell",
    genre: "Young Adult, Thriller, Survival",
    oldPrice: "$51",
    description: "Stranded in the wilderness after a school trip goes wrong, a teenage girl must fight to survive against the odds. Westpart is a gripping coming-of-age thriller about resilience, fear, and the strength we discover when everything is stripped away."
  },
  {
    image: "image/book_4.jpg",
    title: "Beautifully Broken",
    author: "C.A. King",
    genre: "Dark Romance, Psychological Thriller",
    oldPrice: "$51",
    description: "What are they hiding? A haunting psychological romance that explores the twisted connection between two broken souls. Beautifully Broken pulls readers into a world of secrets, obsession, and the desperate search for redemption in the darkest of places."
  },
  {
    image: "image/book_5.jpg",
    title: "Clever Lands",
    author: "Lucy Crehan",
    genre: "Non-Fiction, Education",
    oldPrice: "$51",
    description: "Lucy Crehan travelled to the top-performing school systems in the world — Finland, Japan, Canada, Singapore, and Shanghai — to find out what the teachers and students there are actually doing differently. A must-read for educators and anyone curious about how the world learns."
  },
  {
    image: "image/book_6.jpg",
    title: "Shattered",
    author: "Dick Francis",
    genre: "Crime, Thriller, Mystery",
    oldPrice: "$51",
    description: "When a champion jockey dies in Gerard Logan's arms, he entrusts Gerard with a mysterious videotape. Now someone wants that tape back — badly. Dick Francis at his best: fast-paced, razor-sharp, and utterly unputdownable."
  },
  {
    image: "image/book_7.png",
    title: "The Art City",
    author: "Marco Rossi",
    genre: "Art, Culture, Urban Studies",
    oldPrice: "$51",
    description: "A vivid exploration of how art shapes the soul of a city. From street murals to grand galleries, The Art City investigates how creative expression defines communities, sparks revolutions, and transforms ordinary spaces into extraordinary places."
  },
  {
    image: "image/book_8.png",
    title: "Music Rock: Listen Always",
    author: "James Hartley",
    genre: "Music, Biography, Culture",
    oldPrice: "$51",
    description: "A passionate tribute to rock music and its undying spirit. Through personal stories, cultural history, and vivid imagery, this book captures why rock music is always a good idea — from its rebellious roots to its lasting impact on generations of listeners."
  },
  {
    image: "image/book_9.jpg",
    title: "Free Fall",
    author: "Peter Cawdron",
    genre: "Science Fiction, Thriller",
    oldPrice: "$51",
    description: "When a spacecraft falls silent and begins a deadly plunge toward Earth, one engineer has to figure out what went wrong — and whether it was an accident. Peter Cawdron delivers a relentlessly tense sci-fi thriller grounded in real science and human drama."
  },
  {
    image: "image/book_10.png",
    title: "Patterns of Tomorrow",
    author: "Elena Voss",
    genre: "Design, Architecture, Modern Art",
    oldPrice: "$51",
    description: "A bold visual journey through the world of modern design. Patterns of Tomorrow showcases how geometric form and color interact to shape everything from urban architecture to everyday objects, challenging readers to see the world through a designer's eye."
  },
  {
    image: "image/book_11.jpg",
    title: "Boring Girls",
    author: "Sara Taylor",
    genre: "Dark Fiction, Music, Thriller",
    oldPrice: "$51",
    description: "Rachel and Fern bond over their love of metal music and their rage at a world that has wronged them. What begins as friendship escalates into something far darker. Metal. Mayhem. Murder. Sara Taylor's debut novel is unflinching and utterly gripping."
  },
  {
    image: "image/book_12.png",
    title: "Give Thanks in Everything",
    author: "David Okafor",
    genre: "Self-Help, Spirituality, Motivation",
    oldPrice: "$51",
    description: "A heartfelt guide to cultivating gratitude in every season of life. Through powerful stories and practical exercises, David Okafor shows how choosing thankfulness — even in hardship — transforms relationships, mindsets, and futures."
  },
  {
    image: "image/book_13.png",
    title: "Reaching Together",
    author: "Amara Diallo",
    genre: "Community, Social Justice, Inspiration",
    oldPrice: "$51",
    description: "A powerful call to collective action, Reaching Together explores how communities rise when individuals choose solidarity over silence. Part memoir, part manifesto, this book inspires readers to stretch beyond themselves and uplift those around them."
  },
  {
    image: "image/book_14.png",
    title: "The Lighthouse Keeper",
    author: "Nora Albright",
    genre: "Literary Fiction, Adventure, Historical",
    oldPrice: "$51",
    description: "On a remote coastline, an aging lighthouse keeper guards a secret that could change the lives of the fishing village below. A beautifully written novel about solitude, duty, and the stories we keep from those we love."
  },
  {
    image: "image/book_15.png",
    title: "Black History Month: Young Readers Edition",
    author: "Patricia Monroe",
    genre: "History, Education, Children",
    oldPrice: "$51",
    description: "A vibrant and accessible celebration of Black history for young readers. Filled with inspiring stories of pioneers, inventors, artists, and leaders, this book brings history to life and empowers the next generation to know their roots and dream boldly."
  }
];

// ============================================================
// RENDER FEATURED BOOKS DYNAMICALLY (runs after DOM is ready)
// ============================================================
function renderFeaturedBooks() {
  const box = document.getElementById("featuredBookBox");
  if (!box) return;
  box.innerHTML = "";

  // Merge featured + local books into one unified list
  const allBooks = [];
  const overrides = JSON.parse(localStorage.getItem("bookOverrides")) || {};

  // Old featured books
  featuredBooksData.forEach(function (b) {
    var over = overrides[b.title] || {};
    if (over.isDeleted) return;
    if (over.isHidden) return; // Hide from customer storefront

    let origPrice = over.originalPrice !== undefined ? over.originalPrice : parseFloat((b.oldPrice || b.newPrice || "0").replace("$", ""));
    let disc = over.discount !== undefined ? over.discount : 0;

    // Fallback for old system
    if (over.discount === undefined && over.oldPrice) {
      let op = parseFloat(over.oldPrice);
      let np = over.price || parseFloat((b.newPrice || "0").replace("$", ""));
      if (op > np) disc = Math.round(((op - np) / op) * 100);
      origPrice = op;
    }

    allBooks.push({
      image: b.image,
      title: b.title,
      author: b.author,
      genre: b.genre,
      categories: b.genre ? b.genre.split(",").map(function (s) { return s.trim(); }) : [],
      price: origPrice * (1 - disc / 100),
      originalPrice: origPrice,
      discount: disc,
      rating: over.rating !== undefined ? parseFloat(over.rating) : (b.rating || 5),
      description: b.description || "",
      isCustom: false
    });
  });

  // Custom / added books
  var localBooks = JSON.parse(localStorage.getItem("books")) || [];
  localBooks.forEach(function (b) {
    var over = overrides[b.title] || {};
    if (over.isDeleted) return;
    if (over.isHidden) return; // Hide from customer storefront

    var cats = Array.isArray(b.categories) && b.categories.length > 0
      ? b.categories
      : (b.genre ? b.genre.split(",").map(function (s) { return s.trim(); }) : []);

    let origPrice = over.originalPrice !== undefined ? over.originalPrice : parseFloat(b.originalPrice || b.price || 0);
    let disc = over.discount !== undefined ? over.discount : (b.discount || 0);

    allBooks.push({
      image: b.image,
      title: b.title,
      author: b.author || b.addedBy || "Admin",
      genre: cats.join(", "),
      categories: cats,
      price: origPrice * (1 - disc / 100),
      originalPrice: origPrice,
      discount: disc,
      rating: over.rating !== undefined ? parseFloat(over.rating) : (parseFloat(b.rating) || 5),
      description: b.summary || "",
      isCustom: true
    });
  });

  // ── Helper: build star icons for any rating ──────────────────
  function buildStars(rating) {
    var r = parseFloat(rating) || 5;
    var full = Math.floor(r);
    var half = (r % 1) >= 0.5;
    var html = "";
    for (var i = 1; i <= 5; i++) {
      if (i <= full) html += '<i class="fa-solid fa-star"></i>';
      else if (i === full + 1 && half) html += '<i class="fa-solid fa-star-half-stroke"></i>';
      else html += '<i class="fa-regular fa-star"></i>';
    }
    return html;
  }

  // ── Render every card the SAME way ──────────────────────────
  allBooks.forEach(function (book, index) {
    var card = document.createElement("div");
    card.className = "featured_book_card";

    var priceHTML = "";
    var discountBadge = "";

    if (book.discount > 0) {
      priceHTML = '<span class="new-price">$' + parseFloat(book.price).toFixed(2) + '</span>' +
        '<span class="old-price"><del>$' + parseFloat(book.originalPrice).toFixed(2) + '</del></span>';
      discountBadge = '<div class="discount-badge">' + book.discount + '% OFF</div>';
    } else {
      priceHTML = '<span class="new-price">$' + parseFloat(book.originalPrice).toFixed(2) + '</span>';
    }

    var genreText = book.categories.length > 0 ? book.categories.join(" • ") : (book.genre || "");

    card.innerHTML =
      '<div class="featurde_book_img">' + discountBadge + '<img src="' + book.image + '" alt="' + book.title + '"></div>' +
      '<div class="featurde_book_tag">' +
      '<h2>' + book.title + '</h2>' +
      '<p class="writer">' + book.author + '</p>' +
      '<div class="card-rating-stars">' + buildStars(book.rating) + '</div>' +
      '<div class="categories">' + genreText + '</div>' +
      '<p class="book_price">' + priceHTML + '</p>' +
      '<div class="custom-book-actions">' +
      '<button class="f_btn-details view-book-btn" data-index="' + index + '">&#128270; Details</button>' +
      '<button class="f_btn-cart add-to-cart-btn" data-index="' + index + '">&#x1F6D2; Cart</button>' +
      '</div>' +
      '</div>';

    card._bookData = book;
    box.appendChild(card);
  });
}


// Execute immediately since script is at the bottom of the body
renderFeaturedBooks();

// ============================================================
// BOOK DETAIL MODAL — View Details opens modal ONLY
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("bookModalOverlay");
  const closeBtn = document.getElementById("bookModalClose");
  const modalSelBtn = document.getElementById("modalSelectBtn");

  // Build star HTML for a given rating
  function starsHTML(rating) {
    let html = "";
    const full = Math.floor(rating);
    const half = (rating % 1) >= 0.5;
    for (let i = 1; i <= 5; i++) {
      if (i <= full) html += '<i class="fa-solid fa-star"></i>';
      else if (i === full + 1 && half) html += '<i class="fa-solid fa-star-half-stroke"></i>';
      else html += '<i class="fa-regular fa-star"></i>';
    }
    return html;
  }

  // Accepts a full book object (works for featured AND custom books)
  function openBookModal(book) {
    if (!book || !overlay) return;

    document.getElementById("modalBookImg").src = book.image;
    document.getElementById("modalBookTitle").textContent = book.title;
    document.getElementById("modalBookAuthor").textContent = book.author;
    document.getElementById("modalBookGenre").textContent = book.genre || "";
    if (book.discount > 0) {
      document.getElementById("modalBookPrice").innerHTML =
        '<span style="color:#e74c3c; font-weight:bold; font-size:24px;">$' + parseFloat(book.price).toFixed(2) + '</span> ' +
        '<span style="text-decoration:line-through; color:#999; font-size:16px; margin-left:10px;">$' + parseFloat(book.originalPrice).toFixed(2) + '</span> ' +
        '<span style="background:#e74c3c; color:#fff; padding:2px 8px; border-radius:4px; font-size:14px; font-weight:bold; margin-left:10px;">' + book.discount + '% OFF</span>';
    } else {
      document.getElementById("modalBookPrice").innerHTML =
        '<span style="color:#333; font-weight:bold; font-size:24px;">$' + parseFloat(book.originalPrice).toFixed(2) + '</span>';
    }
    document.getElementById("modalBookDesc").textContent = book.description || "";

    // Rating stars
    const ratingEl = document.getElementById("modalRatingStars");
    if (ratingEl) {
      const r = typeof book.rating === "number" ? book.rating : 0;
      ratingEl.innerHTML = starsHTML(r) +
        '<span style="margin-left:8px;font-size:14px;color:#555;">' + r.toFixed(1) + ' / 5</span>';
    }

    // Category badges
    const catsEl = document.getElementById("modalCategoriesRow");
    if (catsEl) {
      const cats = Array.isArray(book.categories) && book.categories.length > 0
        ? book.categories
        : (book.genre ? book.genre.split(",").map(s => s.trim()) : []);
      catsEl.innerHTML = cats.map(c =>
        '<span class="modal-category-badge">' + c + '</span>'
      ).join("");
    }

    // Store the full book on the button for the cart handler
    modalSelBtn._bookData = book;

    overlay.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function closeBookModal() {
    if (overlay) overlay.classList.remove("show");
    document.body.style.overflow = "";
  }

  // Unified "View Details" for ALL books (both old and custom)
  document.addEventListener("click", function (e) {
    const btn = e.target.closest(".view-book-btn");
    if (btn) {
      e.preventDefault();
      e.stopPropagation();
      const card = btn.closest(".featured_book_card");
      if (card && card._bookData) {
        openBookModal(card._bookData);
      }
    }
  });

  // Unified "Add to Cart" directly from the card for ALL books (both old and custom)
  document.addEventListener("click", function (e) {
    const btn = e.target.closest(".add-to-cart-btn");
    if (btn) {
      e.preventDefault();
      e.stopPropagation();
      const card = btn.closest(".featured_book_card");
      if (card && card._bookData) {
        const b = card._bookData;
        addToCart(b.title, b.image, b.author);
      }
    }
  });

  if (closeBtn) closeBtn.addEventListener("click", closeBookModal);
  if (overlay) overlay.addEventListener("click", (e) => { if (e.target === overlay) closeBookModal(); });

  // "Add to Cart" inside modal
  if (modalSelBtn) {
    modalSelBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (localStorage.getItem("isLoggedIn") !== "true") {
        const lo = document.getElementById("loginOverlay");
        if (lo) lo.classList.add("show");
        return;
      }
      const book = modalSelBtn._bookData;
      if (book) {
        addToCart(book.title, book.image, book.author);
        closeBookModal();
      }
    });
  }
});

const openLogin = document.getElementById("openLogin");

const loginOverlay = document.getElementById("loginOverlay");
const closeLoginText = document.getElementById("closeLoginText");
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");
const welcomeMessage = document.getElementById("welcomeMessage");
const logoutBtn = document.getElementById("logoutBtn");
const adminPageLink = document.getElementById("adminPageLink");

const correctUsername = "Adam";
const correctPassword = "12345";
const adminUsername = "Demiroski";
const adminPassword = "12345";

openLogin.addEventListener("click", function () {
  loginOverlay.classList.add("show");
});

closeLoginText.addEventListener("click", function (e) {
  e.preventDefault();
  loginOverlay.classList.remove("show");
  loginError.textContent = "";
});

loginOverlay.addEventListener("click", function (e) {
  if (e.target === loginOverlay) {
    loginOverlay.classList.remove("show");
    loginError.textContent = "";
  }
});

// ── Central UI update function ───────────────────────────────────────────────
function updateUIForLogin() {
  const loggedIn = localStorage.getItem("isLoggedIn") === "true";
  const savedUser = localStorage.getItem("username") || "";
  const role = localStorage.getItem("role") || "";

  if (loggedIn) {
    welcomeMessage.textContent = "Welcome, " + savedUser + "!";
    welcomeMessage.classList.add("active");
    if (openLogin) openLogin.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "inline-block";
    if (adminPageLink) adminPageLink.style.display = role === "admin" ? "inline-block" : "none";
  } else {
    welcomeMessage.textContent = "";
    welcomeMessage.classList.remove("active");
    if (openLogin) openLogin.style.display = "inline-block";
    if (logoutBtn) logoutBtn.style.display = "none";
    if (adminPageLink) adminPageLink.style.display = "none";
  }

  // Refresh like-button states if the search panel is open
  refreshLikeButtonStates();
}

function refreshLikeButtonStates() {
  const loggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userName = localStorage.getItem("username") || "";
  const likes = JSON.parse(localStorage.getItem("likes")) || [];

  document.querySelectorAll(".s-like-btn").forEach(btn => {
    const title = btn.dataset.title;
    const alreadyLiked = loggedIn && likes.some(l => l.bookTitle === title && l.userName === userName);
    if (alreadyLiked) {
      btn.textContent = "\u2764 Liked";
      btn.style.background = "#c0392b";
      btn.style.cursor = "default";
    } else {
      btn.textContent = "\u2764 Like";
      btn.style.background = "#e74c3c";
      btn.style.cursor = "pointer";
    }
  });
}

// Run on page load
updateUIForLogin();


if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    window.location.reload();
  });
}

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const enteredUsername = document.getElementById("username").value.trim();
  const enteredPassword = document.getElementById("password").value.trim();

  if (enteredUsername === adminUsername && enteredPassword === adminPassword) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", enteredUsername);
    localStorage.setItem("role", "admin");
    window.location.href = "admin.html";
    //he el linke //

  } else if (enteredUsername === correctUsername && enteredPassword === correctPassword) {
    loginError.textContent = "";

    // Save login state
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", enteredUsername);
    localStorage.setItem("role", "user");

    // Close login overlay
    loginOverlay.classList.remove("show");
    loginOverlay.style.display = "";

    // Update all UI immediately — no reload needed
    updateUIForLogin();

    // Welcome message
    welcomeMessage.textContent = "Welcome, " + enteredUsername + "!";
    welcomeMessage.classList.add("active");

    // --- Process any pending like from before login ---
    const pendingTitle = sessionStorage.getItem("pendingLikeTitle");
    const pendingImage = sessionStorage.getItem("pendingLikeImage");
    if (pendingTitle && pendingImage) {
      const likes = JSON.parse(localStorage.getItem("likes")) || [];
      const alreadyLiked = likes.some(l => l.bookTitle === pendingTitle && l.userName === enteredUsername);
      if (!alreadyLiked) {
        likes.push({ userName: enteredUsername, bookTitle: pendingTitle, bookImage: pendingImage, date: new Date().toISOString() });
        localStorage.setItem("likes", JSON.stringify(likes));
      }
      sessionStorage.removeItem("pendingLikeTitle");
      sessionStorage.removeItem("pendingLikeImage");

      // Re-open search panel showing all books with updated like states
      const searchPanel = document.getElementById("searchPanel");
      if (searchPanel) {
        searchPanel.classList.add("active");
        // Trigger showBooks refresh by dispatching input event on search input
        const si = document.getElementById("searchInput");
        if (si) si.dispatchEvent(new Event("input"));
      }
      setTimeout(() => {
        welcomeMessage.textContent = `\u2764 "${pendingTitle}" has been liked!`;
      }, 400);
      setTimeout(() => {
        welcomeMessage.textContent = "Welcome, " + enteredUsername + "!";
      }, 3500);
    }

  } else {
    loginError.textContent = "Wrong username or password";
  }
});

// Theme Toggle Logic


const openReviewBtn = document.getElementById("openReviewBtn");
const reviewBoxes = document.querySelectorAll(".review_box");
const reviewBox = reviewBoxes[0]; // أول بوكس فيه الريفيوهات القديمة

if (openReviewBtn && reviewBox) {
  // إنشاء الـ popup من JavaScript
  const reviewOverlay = document.createElement("div");
  reviewOverlay.className = "review-overlay";
  reviewOverlay.id = "reviewOverlay";

  reviewOverlay.innerHTML = `
    <div class="review-wrapper">
      <form id="reviewForm">
        <h2>Add Your Review</h2>

        <div class="review_input_box">
          <input type="text" id="reviewName" placeholder="Enter your name" required>
        </div>

        <div class="review_input_box">
          <textarea id="reviewText" placeholder="Write your review here..." required></textarea>
        </div>

        <div class="review_input_box">
          <select id="reviewRating" required>
            <option value="">Choose rating</option>
            <option value="1">1 / 5</option>
            <option value="2">2 / 5</option>
            <option value="3">3 / 5</option>
            <option value="4">4 / 5</option>
            <option value="5">5 / 5</option>
          </select>
        </div>

        <div class="review_buttons">
          <a href="#" id="closeReviewBtn">Close</a>
          <button type="submit" class="review_submit_btn">Submit Review</button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(reviewOverlay);

  const closeReviewBtn = document.getElementById("closeReviewBtn");
  const reviewForm = document.getElementById("reviewForm");

  openReviewBtn.addEventListener("click", function () {
    reviewOverlay.classList.add("show");
  });

  closeReviewBtn.addEventListener("click", function (e) {
    e.preventDefault();
    reviewOverlay.classList.remove("show");
  });

  reviewOverlay.addEventListener("click", function (e) {
    if (e.target === reviewOverlay) {
      reviewOverlay.classList.remove("show");
    }
  });

  // Load reviews from localStorage
  function renderReviews() {
    const savedReviews = JSON.parse(localStorage.getItem("reviews")) || [];

    // Clear dynamically added reviews (keep the original hardcoded ones if needed, 
    // or we can just append. Appending is easier to preserve the original 4 reviews).
    // Actually, we should find all .review_card that are NOT original, or just append.
    // Let's just append to the reviewBox. We need to prevent duplicating on multiple calls,
    // so let's only append on load or when a new review is added.

    // To be clean, let's clear all reviews except the first 4? Or just clear all and re-add.
    // Simpler: Just append saved reviews on initial load.
    savedReviews.forEach(review => {
      addReviewToDOM(review.name, review.text, review.rating);
    });
  }

  function addReviewToDOM(name, text, rating) {
    let starsHTML = "";
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        starsHTML += `<i class="fa-solid fa-star"></i>`;
      } else {
        starsHTML += `<i class="fa-regular fa-star"></i>`;
      }
    }

    const newReview = document.createElement("div");
    newReview.className = "review_card";

    newReview.innerHTML = `
      <i class="fa-solid fa-quote-right"></i>
      <div class="card_top">
        <img src="image/review_1.jpg" alt="review user">
      </div>
      <div class="card">
        <h2>${name}</h2>
        <p>${text}</p>
        <div class="review_icon">
          ${starsHTML}
        </div>
      </div>
    `;

    reviewBox.appendChild(newReview);
  }

  // Initial load
  renderReviews();

  reviewForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("reviewName").value.trim();
    const text = document.getElementById("reviewText").value.trim();
    const rating = parseInt(document.getElementById("reviewRating").value);

    if (!name || !text || !rating) return;

    // Save to localStorage
    const savedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    savedReviews.push({ name, text, rating });
    localStorage.setItem("reviews", JSON.stringify(savedReviews));

    // Add to DOM
    addReviewToDOM(name, text, rating);

    reviewForm.reset();
    reviewOverlay.classList.remove("show");
  });
}

// (Custom book cart actions are handled by the custom-cart-btn delegation above)

document.addEventListener("DOMContentLoaded", () => {
  const expandBtns = document.querySelectorAll(".expand-btn");
  expandBtns.forEach(btn => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      // Find the previous element which contains the .more-text span
      const prevEl = this.previousElementSibling;
      if (prevEl) {
        const moreText = prevEl.querySelector(".more-text");
        if (moreText) {
          moreText.classList.toggle("show");
          if (moreText.classList.contains("show")) {
            this.textContent = "Show Less";
          } else {
            this.textContent = "Learn More";
          }
        }
      }
    });
  });
});

// ============================================================
// SEARCH FUNCTIONALITY
// ============================================================

// All searchable books: Featured Books + Coming Soon
const newArrivalsData = [
  { image: "image/arrival_1.jpg", title: "The Giver", author: "Lois Lowry", genre: "Dystopian Fiction, YA", page: "arrivales_1.html" },
  { image: "image/arrival_2.jpg", title: "The Wright Brothers", author: "David McCullough", genre: "Non-Fiction, Biography", page: "arrivales_2.html" },
  { image: "image/arrival_3.jpg", title: "Radical Gardening", author: "George McKay", genre: "Politics, Culture, Nature", page: "arrivales_3.html" },
  { image: "image/arrival_4.jpg", title: "Red Queen", author: "Victoria Aveyard", genre: "Fantasy, Young Adult", page: "arrivales_4.html" },
  { image: "image/arrival_5.jpg", title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Literary Fiction, Historical", page: "arrivales_5.html" },
  { image: "image/arrival_6.jpg", title: "Harry Potter and the Philosopher's Stone", author: "J.K. Rowling", genre: "Fantasy, Adventure", page: "arrivales_6.html" },
  { image: "image/arrival_7.jpg", title: "Heroes of Olympus: The Lost Hero", author: "Rick Riordan", genre: "Fantasy, Mythology", page: "arrivales_7.html" },
  { image: "image/arrival_8.webp", title: "Diary of a Wimpy Kid: Squid Game", author: "Jeff Kinney", genre: "Comedy, Parody", page: "arrivales_8.html" },
  { image: "image/arrival_9.jpg", title: "Ranger's Apprentice: The Ruins of Gorlan", author: "John Flanagan", genre: "Fantasy, Adventure", page: "arrivales_9.html" },
  { image: "image/arrival_10.jpg", title: "Percy Jackson and the Lightning Thief", author: "Rick Riordan", genre: "Fantasy, Mythology", page: "arrivales_10.html" }
];

// Load locally added books
const localAddedBooks = JSON.parse(localStorage.getItem("books")) || [];

// Combine all books into one searchable pool
const allSearchableBooks = [
  ...featuredBooksData.map(b => ({ image: b.image, title: b.title, author: b.author, genre: b.genre, page: null })),
  ...newArrivalsData,
  ...localAddedBooks.map(b => ({ image: b.image, title: b.title, author: b.addedBy || "Admin", genre: "Custom", page: null }))
];

(function initSearch() {
  const toggleBtn = document.getElementById("searchToggleBtn");
  const searchPanel = document.getElementById("searchPanel");
  const closeBtn = document.getElementById("searchCloseBtn");
  const input = document.getElementById("searchInput");
  const submitBtn = document.getElementById("searchSubmitBtn");
  const resultsBox = document.getElementById("searchResults");

  if (!toggleBtn || !searchPanel) return;

  // Liked Books Panel logic
  const likedToggleBtn = document.getElementById("likedBooksToggleBtn");
  const likedPanel = document.getElementById("likedBooksPanel");
  const likedCloseBtn = document.getElementById("likedBooksCloseBtn");
  const likedResults = document.getElementById("likedBooksResults");

  if (likedToggleBtn && likedPanel) {
    likedToggleBtn.addEventListener("click", () => {
      // close search panel if open
      searchPanel.classList.remove("active");

      likedPanel.classList.toggle("active");
      if (likedPanel.classList.contains("active")) {
        renderLikedBooks();
      }
    });

    likedCloseBtn.addEventListener("click", () => {
      likedPanel.classList.remove("active");
    });
  }

  function renderLikedBooks() {
    likedResults.innerHTML = "";
    if (localStorage.getItem("isLoggedIn") !== "true") {
      likedResults.innerHTML = `
        <p class="search-no-result" style="text-align:center;">
          🔒 Please log in to see your liked books.<br><br>
          <button onclick="document.getElementById('loginOverlay').classList.add('show'); document.getElementById('likedBooksPanel').classList.remove('active');" style="padding:10px 28px; background:#089da1; color:#fff; border:none; border-radius:20px; font-size:15px; font-weight:bold; cursor:pointer;">Login Now</button>
        </p>`;
      return;
    }

    const userName = localStorage.getItem("username") || "User";
    const allLikes = JSON.parse(localStorage.getItem("likes")) || [];
    const myLikes = allLikes.filter(like => like.userName === userName);

    if (myLikes.length === 0) {
      likedResults.innerHTML = `<p class="search-no-result">You haven't liked any books yet.<br>Browse books and press ❤ Like to save them here.</p>`;
      return;
    }

    myLikes.forEach(like => {
      const card = document.createElement("div");
      card.className = "search-book-card";
      card.innerHTML = `
        <img src="${like.bookImage}" alt="${like.bookTitle}" />
        <div class="s-title">${like.bookTitle}</div>
        <div class="s-genre">Liked on: ${new Date(like.date).toLocaleDateString()}</div>
      `;
      // Allow clicking to view full info if it's in our dataset
      card.querySelector("img").addEventListener("click", () => {
        const book = allSearchableBooks.find(b => b.title === like.bookTitle);
        if (book) {
          if (book.page) {
            window.location.href = book.page;
          } else {
            const idx = featuredBooksData.findIndex(f => f.title === book.title);
            if (idx !== -1) {
              likedPanel.classList.remove("active");
              const fakeBtn = document.createElement("button");
              fakeBtn.className = "view-book-btn";
              fakeBtn.dataset.index = idx;
              document.body.appendChild(fakeBtn);
              fakeBtn.click();
              document.body.removeChild(fakeBtn);
            }
          }
        }
      });
      likedResults.appendChild(card);
    });
  }

  // Toggle search panel open/close
  toggleBtn.addEventListener("click", () => {
    if (likedPanel) likedPanel.classList.remove("active");
    searchPanel.classList.toggle("active");
    if (searchPanel.classList.contains("active")) {
      input.focus();
      showBooks(allSearchableBooks, "📚 All Available Books");
    }
  });

  // Live filter as user types
  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    if (!query) {
      showBooks(allSearchableBooks, "📚 All Available Books");
    } else {
      const matches = allSearchableBooks.filter(b =>
        b.title.toLowerCase().includes(query) ||
        b.author.toLowerCase().includes(query) ||
        b.genre.toLowerCase().includes(query)
      );
      showBooks(matches, null, input.value);
    }
  });

  closeBtn.addEventListener("click", () => {
    searchPanel.classList.remove("active");
    input.value = "";
    resultsBox.innerHTML = "";
  });

  // Search on button click
  submitBtn.addEventListener("click", runSearch);

  // Search on Enter key
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") runSearch();
  });

  function runSearch() {
    const query = input.value.trim().toLowerCase();
    if (!query) {
      showBooks(allSearchableBooks, "📚 All Available Books");
      return;
    }
    const matches = allSearchableBooks.filter(b =>
      b.title.toLowerCase().includes(query) ||
      b.author.toLowerCase().includes(query) ||
      b.genre.toLowerCase().includes(query)
    );
    showBooks(matches, matches.length > 0 ? `🔍 Results for "${input.value}"` : null, input.value);
  }

  function showBooks(books, heading, searchQuery) {
    resultsBox.innerHTML = "";

    if (heading) {
      const h = document.createElement("p");
      h.className = "search-section-label";
      h.textContent = heading;
      resultsBox.appendChild(h);
    }

    if (books.length === 0) {
      const msg = document.createElement("p");
      msg.className = "search-no-result";
      msg.innerHTML = `😕 No books found for "<strong>${searchQuery}</strong>". Try a different title.`;
      resultsBox.appendChild(msg);
      return;
    }

    books.forEach(book => {
      const card = document.createElement("div");
      card.className = "search-book-card";
      card.innerHTML = `
        <img src="${book.image}" alt="${book.title}" />
        <div class="s-title">${book.title}</div>
        <div class="s-author">${book.author}</div>
        <div class="s-genre">${book.genre}</div>
        <div style="display: flex; gap: 5px; width: 100%; margin-top: 4px;">
          <button class="s-select-btn" data-title="${book.title}" data-image="${book.image}" style="flex: 1;">✔ Select</button>
          <button class="s-like-btn" data-title="${book.title}" data-image="${book.image}" style="flex: 1; padding: 7px 0; background: #e74c3c; color: #fff; border: none; border-radius: 20px; font-size: 13px; font-weight: bold; cursor: pointer; transition: background 0.3s;">❤ Like</button>
        </div>
      `;

      card.querySelector("img").addEventListener("click", () => {
        if (book.page) {
          window.location.href = book.page;
        } else {
          // find index in featuredBooksData and open modal
          const idx = featuredBooksData.findIndex(f => f.title === book.title);
          if (idx !== -1) {
            searchPanel.classList.remove("active");
            // trigger the featured modal
            const fakeBtn = document.createElement("button");
            fakeBtn.className = "view-book-btn";
            fakeBtn.dataset.index = idx;
            document.body.appendChild(fakeBtn);
            fakeBtn.click();
            document.body.removeChild(fakeBtn);
          }
        }
      });

      // Select button → add to CART (not directly to admin)
      card.querySelector(".s-select-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        addToCart(book.title, book.image, book.author || "");
      });

      // Like button
      card.querySelector(".s-like-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        const btn = e.target;
        const bookTitle = btn.dataset.title;
        const bookImage = btn.dataset.image;

        if (localStorage.getItem("isLoggedIn") !== "true") {
          // Open login form correctly using classList
          searchPanel.classList.remove("active");
          const loginOvl = document.getElementById("loginOverlay");
          if (loginOvl) loginOvl.classList.add("show");
          // Remember which book to like after login
          sessionStorage.setItem("pendingLikeTitle", bookTitle);
          sessionStorage.setItem("pendingLikeImage", bookImage);
          return;
        }

        const userName = localStorage.getItem("username") || "User";
        const likes = JSON.parse(localStorage.getItem("likes")) || [];
        const alreadyLiked = likes.some(l => l.bookTitle === bookTitle && l.userName === userName);

        if (alreadyLiked) {
          btn.textContent = "❤ Liked";
          btn.style.background = "#c0392b";
          btn.style.cursor = "default";
          return;
        }

        // Save the like
        likes.push({ userName, bookTitle, bookImage, date: new Date().toISOString() });
        localStorage.setItem("likes", JSON.stringify(likes));

        // Instantly update this button
        btn.textContent = "❤ Liked!";
        btn.style.background = "#c0392b";
        btn.style.cursor = "default";

        // Refresh all like buttons across the panel
        if (typeof refreshLikeButtonStates === "function") refreshLikeButtonStates();

        // Also refresh the liked panel if it's open
        const lp = document.getElementById("likedBooksPanel");
        if (lp && lp.classList.contains("active")) {
          if (typeof renderLikedBooks === "function") renderLikedBooks();
        }
      });

      resultsBox.appendChild(card);
    });
  }
})();

// ============================================================
// TAB SWITCHER — Login / Sign Up
// ============================================================
function switchTab(tab) {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const tabLogin = document.getElementById("tabLoginBtn");
  const tabSignup = document.getElementById("tabSignupBtn");
  if (!loginForm || !signupForm) return;

  if (tab === "login") {
    loginForm.style.display = "block";
    signupForm.style.display = "none";
    tabLogin.style.color = "#089da1";
    tabLogin.style.borderBottom = "3px solid #089da1";
    tabSignup.style.color = "#888";
    tabSignup.style.borderBottom = "none";
  } else {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
    tabSignup.style.color = "#089da1";
    tabSignup.style.borderBottom = "3px solid #089da1";
    tabLogin.style.color = "#888";
    tabLogin.style.borderBottom = "none";
  }
}

// ============================================================
// SIGN UP SYSTEM
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const signupError = document.getElementById("signupError");
  const signupSuccess = document.getElementById("signupSuccess");
  if (!signupForm) return;

  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newUser = document.getElementById("signupUsername").value.trim();
    const newPass = document.getElementById("signupPassword").value.trim();
    const confirm = document.getElementById("signupConfirm").value.trim();
    signupError.textContent = "";
    signupSuccess.textContent = "";

    if (!newUser || !newPass) { signupError.textContent = "Please fill in all fields."; return; }
    if (newPass.length < 4) { signupError.textContent = "Password must be at least 4 characters."; return; }
    if (newPass !== confirm) { signupError.textContent = "Passwords do not match."; return; }
    if (newUser === "Demiroski" || newUser === "Adam") {
      signupError.textContent = "This username is reserved. Please choose another."; return;
    }

    const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    if (users.find(u => u.username.toLowerCase() === newUser.toLowerCase())) {
      signupError.textContent = "Username already taken. Please choose another."; return;
    }

    users.push({ username: newUser, password: newPass, role: "user", joined: new Date().toISOString() });
    localStorage.setItem("registeredUsers", JSON.stringify(users));

    signupSuccess.textContent = `✔ Account created! You can now log in as "${newUser}".`;
    signupForm.reset();
    setTimeout(() => switchTab("login"), 1800);
  });
});

// ============================================================
// EXTENDED LOGIN — support dynamically registered users
// ============================================================
// Patch loginForm submit to also check registeredUsers
document.addEventListener("DOMContentLoaded", () => {
  const lf = document.getElementById("loginForm");
  if (!lf) return;
  // We attach an extra listener; the original one handles admin + Adam
  // We use a capture-phase listener that runs BEFORE the original
  lf.addEventListener("submit", (e) => {
    const enteredUsername = document.getElementById("username").value.trim();
    const enteredPassword = document.getElementById("password").value.trim();
    // Skip if it's a hardcoded account — original handler takes care
    if (enteredUsername === "Demiroski" || enteredUsername === "Adam") return;

    e.stopImmediatePropagation(); // prevent original handler from showing "wrong password"
    const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const found = users.find(u => u.username === enteredUsername && u.password === enteredPassword);
    const loginError = document.getElementById("loginError");

    if (!found) {
      loginError.textContent = "Wrong username or password.";
      return;
    }

    e.preventDefault();
    loginError.textContent = "";
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", enteredUsername);
    localStorage.setItem("role", "user");

    const loginOverlay = document.getElementById("loginOverlay");
    if (loginOverlay) { loginOverlay.classList.remove("show"); loginOverlay.style.display = ""; }

    if (typeof updateUIForLogin === "function") updateUIForLogin();

    const wm = document.getElementById("welcomeMessage");
    if (wm) { wm.textContent = "Welcome, " + enteredUsername + "!"; wm.classList.add("active"); }
  }, true); // capture phase = runs first
});

// ============================================================
// ORDER MODAL — full form with map search + all fields
// ============================================================
let orderMap = null;
let orderMarker = null;

function openOrderModal(bookTitle, bookImage, bookAuthor) {
  if (localStorage.getItem("isLoggedIn") !== "true") {
    const lo = document.getElementById("loginOverlay");
    if (lo) lo.classList.add("show");
    sessionStorage.setItem("pendingOrderTitle", bookTitle);
    sessionStorage.setItem("pendingOrderImage", bookImage);
    sessionStorage.setItem("pendingOrderAuthor", bookAuthor || "");
    return;
  }

  // Fill book preview
  document.getElementById("orderBookTitle").textContent = bookTitle;
  document.getElementById("orderBookAuthor").textContent = bookAuthor || "";
  document.getElementById("orderBookImg").src = bookImage;

  // Reset all fields
  ["orderFullName", "orderPhone", "orderEmail", "orderAddress", "orderCity", "orderCountry", "orderNotes", "orderMapSearch"]
    .forEach(id => { const el = document.getElementById(id); if (el) el.value = ""; });
  document.getElementById("orderQty").value = 1;
  document.getElementById("orderError").textContent = "";
  document.getElementById("orderMapLabel").textContent = "No pin placed yet — click on the map to pin your location.";
  orderMarker = null;

  document.getElementById("orderModal").style.display = "flex";

  // Init or refresh map
  setTimeout(() => {
    if (!orderMap) {
      orderMap = L.map("orderMap").setView([41.9981, 21.4254], 8);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors"
      }).addTo(orderMap);

      // Click to drop pin
      orderMap.on("click", (ev) => {
        placePin(ev.latlng.lat, ev.latlng.lng);
      });
    } else {
      // Remove old marker when re-opening
      if (orderMarker) { orderMap.removeLayer(orderMarker); orderMarker = null; }
      orderMap.invalidateSize();
    }

    // Wire map search button
    const searchBtn = document.getElementById("orderMapSearchBtn");
    const searchInp = document.getElementById("orderMapSearch");
    if (searchBtn && searchInp) {
      // Replace to avoid duplicate listeners
      const newBtn = searchBtn.cloneNode(true);
      searchBtn.parentNode.replaceChild(newBtn, searchBtn);
      newBtn.addEventListener("click", searchMapAddress);
      searchInp.addEventListener("keydown", (e) => { if (e.key === "Enter") searchMapAddress(); });
    }
  }, 120);
}

function placePin(lat, lng, label) {
  if (orderMarker) orderMap.removeLayer(orderMarker);
  orderMarker = L.marker([lat, lng]).addTo(orderMap);
  const displayLabel = label || `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  document.getElementById("orderMapLabel").textContent = `📍 Pinned: ${displayLabel}`;
}

function searchMapAddress() {
  const query = document.getElementById("orderMapSearch").value.trim();
  if (!query) return;
  const labelEl = document.getElementById("orderMapLabel");
  labelEl.textContent = "🔍 Searching...";

  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`, {
    headers: { "Accept-Language": "en" }
  })
    .then(r => r.json())
    .then(results => {
      if (!results || results.length === 0) {
        labelEl.textContent = "❌ Address not found. Try a different search.";
        return;
      }
      const { lat, lon, display_name } = results[0];
      orderMap.setView([lat, lon], 15);
      placePin(parseFloat(lat), parseFloat(lon), display_name.substring(0, 60));
      // Auto-fill address field if empty
      const addrEl = document.getElementById("orderAddress");
      if (addrEl && !addrEl.value.trim()) addrEl.value = display_name.substring(0, 80);
    })
    .catch(() => { labelEl.textContent = "❌ Search failed. Check your connection."; });
}

document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.getElementById("orderSubmitBtn");
  if (!submitBtn) return;

  submitBtn.addEventListener("click", () => {
    const errEl = document.getElementById("orderError");
    errEl.textContent = "";

    // Collect values
    const title = document.getElementById("orderBookTitle").textContent.trim();
    const image = document.getElementById("orderBookImg").src;
    const fullName = document.getElementById("orderFullName").value.trim();
    const phone = document.getElementById("orderPhone").value.trim();
    const email = document.getElementById("orderEmail").value.trim();
    const qty = parseInt(document.getElementById("orderQty").value) || 0;
    const country = document.getElementById("orderCountry").value.trim();
    const city = document.getElementById("orderCity").value.trim();
    const address = document.getElementById("orderAddress").value.trim();
    const notes = document.getElementById("orderNotes").value.trim();

    // Validation
    if (!fullName) { errEl.textContent = "⚠ Full name is required."; return; }
    if (!phone) { errEl.textContent = "⚠ Phone number is required."; return; }
    if (qty < 1 || qty > 99) { errEl.textContent = "⚠ Quantity must be between 1 and 99."; return; }
    if (!country) { errEl.textContent = "⚠ Country is required."; return; }
    if (!city) { errEl.textContent = "⚠ City is required."; return; }
    if (!address && !orderMarker) {
      errEl.textContent = "⚠ Please enter a full address or pin your location on the map."; return;
    }

    const lat = orderMarker ? orderMarker.getLatLng().lat : null;
    const lng = orderMarker ? orderMarker.getLatLng().lng : null;
    const mapLink = (lat && lng)
      ? `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=17/${lat}/${lng}`
      : null;

    const userName = localStorage.getItem("username") || "User";
    const order = {
      userName,
      bookTitle: title,
      bookImage: image,
      fullName,
      phone,
      email: email || "—",
      quantity: qty,
      country,
      city,
      address: address || "Pinned on map",
      notes: notes || "—",
      lat,
      lng,
      mapLink,
      date: new Date().toISOString()
    };

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Remove from cart after confirmed order
    if (typeof removeFromCart === "function") removeFromCart(title);

    document.getElementById("orderModal").style.display = "none";
    showWelcomeMsg(`✔ Order placed for "${title}"! We'll contact you at ${phone}.`, 5000);
  });

  // Resume pending order after login
  const pendingTitle = sessionStorage.getItem("pendingOrderTitle");
  const pendingImage = sessionStorage.getItem("pendingOrderImage");
  const pendingAuthor = sessionStorage.getItem("pendingOrderAuthor");
  if (pendingTitle && localStorage.getItem("isLoggedIn") === "true") {
    sessionStorage.removeItem("pendingOrderTitle");
    sessionStorage.removeItem("pendingOrderImage");
    sessionStorage.removeItem("pendingOrderAuthor");
    setTimeout(() => openOrderModal(pendingTitle, pendingImage, pendingAuthor), 600);
  }
});


// ============================================================
// CART SYSTEM
// ============================================================

function getCart() {
  const user = localStorage.getItem("username") || "__guest__";
  return JSON.parse(localStorage.getItem("cart_" + user)) || [];
}

function saveCart(cart) {
  const user = localStorage.getItem("username") || "__guest__";
  localStorage.setItem("cart_" + user, JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const badge = document.getElementById("cartBadge");
  if (!badge) return;
  const count = getCart().length;
  badge.textContent = count;
  if (count > 0) {
    badge.classList.add("visible");
  } else {
    badge.classList.remove("visible");
  }
}

function addToCart(title, image, author) {
  if (localStorage.getItem("isLoggedIn") !== "true") {
    const lo = document.getElementById("loginOverlay");
    if (lo) lo.classList.add("show");
    return;
  }
  const cart = getCart();
  // avoid exact duplicates
  if (cart.find(i => i.title === title)) {
    showWelcomeMsg(`"${title}" is already in your cart.`, 2500);
    return;
  }
  cart.push({ title, image, author: author || "", addedAt: new Date().toISOString() });
  saveCart(cart);
  showWelcomeMsg(`\ud83d\uded2 "${title}" added to your cart!`, 2500);
  // if cart panel is open, refresh it
  const cp = document.getElementById("cartPanel");
  if (cp && cp.classList.contains("active")) renderCart();
}

function removeFromCart(title) {
  let cart = getCart();
  cart = cart.filter(i => i.title !== title);
  saveCart(cart);
  renderCart();
}

function renderCart() {
  const box = document.getElementById("cartResults");
  if (!box) return;
  box.innerHTML = "";

  if (localStorage.getItem("isLoggedIn") !== "true") {
    box.innerHTML = `<p class="search-no-result" style="text-align:center;">\ud83d\udd12 Please log in to see your cart.<br><br>
      <button onclick="document.getElementById('loginOverlay').classList.add('show'); document.getElementById('cartPanel').classList.remove('active');"
        style="padding:10px 28px;background:#089da1;color:#fff;border:none;border-radius:20px;font-size:15px;font-weight:bold;cursor:pointer;">Login Now</button></p>`;
    return;
  }

  const cart = getCart();
  if (cart.length === 0) {
    box.innerHTML = `<p class="search-no-result">Your cart is empty.<br>Browse books and click \u201cSelect This Book\u201d to add them here.</p>`;
    return;
  }

  // heading
  const heading = document.createElement("p");
  heading.className = "search-section-label";
  heading.textContent = `\ud83d\uded2 ${cart.length} book(s) in your cart`;
  box.appendChild(heading);

  cart.forEach(item => {
    const card = document.createElement("div");
    card.className = "search-book-card";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}" style="cursor:default;" />
      <div class="s-title">${item.title}</div>
      <div class="s-author">${item.author}</div>
      <div style="display:flex;gap:6px;width:100%;margin-top:6px;">
        <button class="s-select-btn cart-order-btn"
          data-title="${item.title}" data-image="${item.image}" data-author="${item.author}"
          style="flex:1;font-size:12px;">📦 Confirm Order</button>
        <button class="cart-remove-btn"
          data-title="${item.title}"
          style="flex:0 0 auto;padding:7px 10px;background:#e74c3c;color:#fff;border:none;border-radius:20px;font-size:12px;font-weight:bold;cursor:pointer;">✕ Remove</button>
      </div>
    `;

    // Confirm Order → open order modal
    card.querySelector(".cart-order-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      const t = e.target.dataset.title;
      const img = e.target.dataset.image;
      const auth = e.target.dataset.author;
      document.getElementById("cartPanel").classList.remove("active");
      openOrderModal(t, img, auth);
    });

    // Remove from cart
    card.querySelector(".cart-remove-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      removeFromCart(e.target.dataset.title);
    });

    box.appendChild(card);
  });
}

// Cart panel toggle (cart icon in navbar)
document.addEventListener("DOMContentLoaded", () => {
  const cartBtn = document.getElementById("cartToggleBtn");
  const cartPanel = document.getElementById("cartPanel");
  const cartClose = document.getElementById("cartCloseBtn");

  if (cartBtn && cartPanel) {
    cartBtn.addEventListener("click", () => {
      // close other panels
      document.getElementById("searchPanel")?.classList.remove("active");
      document.getElementById("likedBooksPanel")?.classList.remove("active");
      cartPanel.classList.toggle("active");
      if (cartPanel.classList.contains("active")) renderCart();
    });
    cartClose.addEventListener("click", () => cartPanel.classList.remove("active"));
  }

  // Show badge on load
  updateCartBadge();
});

// Also wire the search-panel Select button to addToCart (already done via openOrderModal path)
// Helper to briefly show welcome message
function showWelcomeMsg(text, duration) {
  const wm = document.getElementById("welcomeMessage");
  if (!wm) return;
  const prev = wm.textContent;
  wm.textContent = text;
  wm.classList.add("active");
  setTimeout(() => { wm.textContent = prev || ""; }, duration || 2500);
}

// ============================================================
// HOME BUTTON VIDEO TRIGGER
// ============================================================
(function initHomeVideo() {
  const videoOverlay = document.getElementById("homeVideoOverlay");
  const videoElement = document.getElementById("homeVideo");
  const closeBtn = document.getElementById("closeVideoBtn");

  if (!videoOverlay || !videoElement) {
    console.error("Home video elements not found");
    return;
  }

  const openVideo = () => {
    videoOverlay.classList.add("active");
    videoElement.currentTime = 0;

    const playPromise = videoElement.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        console.log("Video started playing");
      }).catch(err => {
        console.error("Autoplay failed:", err);
        // On mobile/restricted browsers, just show the modal with controls visible
      });
    }
  };

  const closeVideo = () => {
    videoOverlay.classList.remove("active");
    videoElement.pause();
  };

  const setupHomeLinks = () => {
    const homeLinks = document.querySelectorAll('a[href="#Home"], a[href="#ALPHA"], a[href="#home"]');
    homeLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        openVideo();
      });
    });
  };

  setupHomeLinks();

  // Close on X button click
  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeVideo();
    });
  }

  // Close on clicking outside the video container
  videoOverlay.addEventListener("click", (e) => {
    if (e.target === videoOverlay) {
      closeVideo();
    }
  });

  // When video ends, close and return to main page
  videoElement.addEventListener("ended", () => {
    closeVideo();
    window.location.hash = "ALPHA";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ============================================================
// JQUERY ENHANCEMENTS
// ============================================================
$(document).ready(function () {
  // 1. Smooth scrolling for nav links
  $("nav ul li a[href^='#']").on('click', function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      var target = $(hash);
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 600, function () {
          window.location.hash = hash;
        });
      }
    }
  });

  // 2. Simple hover effect on footer social icons using jQuery
  $("footer .social_link i").hover(
    function () {
      $(this).stop().fadeTo(200, 0.5);
    },
    function () {
      $(this).stop().fadeTo(200, 1);
    }
  );
});
