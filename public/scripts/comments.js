const loadCommentsButton = document.getElementById("load-comment-btn");
const commentSection = document.getElementById("comments");
const leaveACommentForm = document.querySelector("#comments-form form");
const commentTitleFieldElement = document.getElementById("title");
const commentFieldElement = document.getElementById("text");

function loadComments(comments) {
  const commentListItems = document.createElement("ol");

  for (const comment of comments) {
    const commentItem = document.createElement("li");
    commentItem.innerHTML = `
    <article class="comment-item">
      <h2> ${comment.title}</h2>
      <p> ${comment.text}</p>
    </article>
  `;
    commentListItems.appendChild(commentItem);
  }
  return commentListItems;
}

async function fetchComments(event) {
  const postId = loadCommentsButton.dataset.postid;
  const data = await fetch(`/posts/${postId}/comments`);
  const dataObject = await data.json();



  if (dataObject && dataObject.length > 0) {
    const commentListItem = loadComments(dataObject);
    commentSection.innerHTML = "";
    commentSection.appendChild(commentListItem);
  } else {
    commentSection.firstElementChild.innerHTML =
      "Couldn\t find any comments try adding one ";
  }
}

async function submitAComment(event) {
  const postId = leaveACommentForm.dataset.postid;
  event.preventDefault();
  const bodyData = JSON.stringify({
    title: commentTitleFieldElement.value,
    text: commentFieldElement.value,
  });

  const response = await fetch(`/posts/${postId}/comments`, {
    method: "POST",
    body: bodyData,
    headers: {
      "Content-Type": "application/json",
    },
  });
  fetchComments();
}

loadCommentsButton.addEventListener("click", fetchComments);
leaveACommentForm.addEventListener("submit", submitAComment);
