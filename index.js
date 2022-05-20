const container = document.querySelector('.container');

renderPosts();

function renderPosts() {
  posts.forEach((post) => {
    addPost(post);
    renderLikesAndComments(post);
  });
}

function addPost(post) {
  container.innerHTML += `
    <div class="post" data-post-${post.id}>
      <img src="${post.imgSrc}" alt="${post.imgAlt}" class="post-img" />
      <div class="wrapper">
        <button onclick="likeUnlike(${post.id})" class="like">❤️ <span class="like-count liked">${post.likeCount}</span></button>
        <textarea
          name=""
          id=""
          cols="30"
          rows="3"
          class="comment-input"
          placeholder="Comment..."
        ></textarea>
        <button class="add-comment" onclick="addComment(${post.id})">Add comment</button>
        <div class="comments" data-comment-${post.id}></div>
      </div>
    </div>
    `;
}

function likeUnlike(id) {
  const postDiv = document.querySelector(`[data-post-${id}]`);
  const likeCountSpan = postDiv.querySelector('.like-count');
  if (likeCountSpan.classList.contains('liked')) {
    likeCountSpan.textContent = parseInt(likeCountSpan.textContent) - 1;
    likeCountSpan.classList.remove('liked');
  } else {
    likeCountSpan.textContent = parseInt(likeCountSpan.textContent) + 1;
    likeCountSpan.classList.add('liked');
  }
}

function addComment(id) {
  const postDiv = document.querySelector(`[data-post-${id}]`);
  const commentInput = postDiv.querySelector('.comment-input');
  const commentsDiv = document.querySelector(`[data-comment-${id}]`);

  if (commentInput.value) {
    createComment(commentInput.value, commentsDiv);
    commentInput.value = '';
    commentInput.focus();
  }
}

function createComment(comment, commentsDiv) {
  commentsDiv.innerHTML += `
    <div class="comment-wrapper">
      <p class="comment">${comment}</p>
      <button onclick="deleteComment(event)">Delete comment</button>
    </div>
  `;
}

function deleteComment(event) {
  event.target.parentElement.remove();
}

function renderLikesAndComments(post) {
  const commentsDiv = document.querySelector(`[data-comment-${post.id}]`);
  post.comments.forEach((comment) => {
    createComment(comment, commentsDiv);
  });

  const postDiv = commentsDiv.closest('.post');
  const likeCountSpan = postDiv.querySelector('.like-count');
  if (post.liked) {
    likeCountSpan.classList.add('liked');
  } else {
    likeCountSpan.classList.remove('liked');
  }
}
