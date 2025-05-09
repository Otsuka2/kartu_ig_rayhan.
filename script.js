// Profile Picture Upload
document.getElementById('profile-upload').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('profile-image').src = e.target.result;
    }
    reader.readAsDataURL(file);
  }
});

let likeCount = 0;
let liked = false;
const likeButton = document.getElementById('like-button');
const likeCountDisplay = document.getElementById('like-count');

function updateLikeCount() {
  likeCountDisplay.textContent = ` (${likeCount} Likes)`;
}

likeButton.addEventListener('click', function() {
  if (!liked) {
    likeCount++;
    updateLikeCount();
    liked = true;
    likeButton.classList.add('disabled'); // Optional: Visually disable
    likeButton.style.pointerEvents = 'none'; // Prevent further clicks
  } else {
    alert("You've already liked this!");
  }
});

updateLikeCount();