const posts = [
    {
        name: "Vincent van Gogh",
        username: "vincey1853",
        location: "Zundert, Netherlands",
        avatar: "images/avatar-vangogh.jpg",
        post: "images/post-vangogh.jpg",
        comment: "just took a few mushrooms lol",
        likes: 21,
        liked: false,
        comments: []
    },

    {
        name: "Gustave Courbet",
        username: "gus1819",
        location: "Ornans, France",
        avatar: "images/avatar-courbet.jpg",
        post: "images/post-courbet.jpg",
        comment: "i'm feelin a bit stressed tbh",
        likes: 4,
        liked: false,
        comments: []
    },

    {
        name: "Joseph Ducreux",
        username: "jd1735",
        location: "Paris, France",
        avatar: "images/avatar-ducreux.jpg",
        post: "images/post-ducreux.jpg",
        comment: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
        likes: 152,
        liked: false,
        comments: []
    }
];

// Function to generate HTML for each post
function createPost(posts, index) {
    return `
        <div class="post">
            <div class="post-header">
                <img src="${posts.avatar}" alt="${posts.name}">
                <div class="post-info">
                    <span class="name">${posts.name}</span>
                    <span class="location">${posts.location}</span>
                </div>
            </div>
            <img src="${posts.post}" alt="Post by ${posts.name}" class="post-image">
            <div class="post-footer">
                <img src="/images/icon-heart.png" class="icons ${posts.liked ? 'liked' : ''}" id="like-icon-${index}" onclick="likePost(${index})">
                <img src="/images/icon-dm.png" class="icons">
                <img src="/images/icon-comment.png" class="icons" onclick="addComment(${index})">
                <br /><span id="likes-${index}" class="likes">${posts.likes} likes</span>
                <p class="comment"><strong>@${posts.username}</strong> ${posts.comment}</p>
                <div id="comments-${index}" class="comments-section"></div>
            </div>
        </div>
    `;
}

// Append all posts to the feed
const feed = document.getElementById('feed');

posts.forEach((post, index) => {
    feed.innerHTML += createPost(post, index);
});

// Function to handle liking a post
function likePost(index) {
    const post = posts[index];
    post.liked = !post.liked; // Toggle liked status
    post.likes += post.liked ? 1 : -1; // Increment or decrement likes

    // Update the likes count in the UI
    const likesElement = document.getElementById(`likes-${index}`);
    likesElement.innerText = `${post.likes} likes`;

    // Toggle the red heart by adding/removing the "liked" class
    const likeIcon = document.getElementById(`like-icon-${index}`);
    if (post.liked) {
        likeIcon.classList.add('liked');
    } else {
        likeIcon.classList.remove('liked');
    }
}

// Function to add a comment to a post
function addComment(index) {
    const userComment = prompt("Enter your comment:");
    if (userComment) {
        const newComment = {
            user: "You",
            text: userComment
        };
        posts[index].comments.push(newComment);
        updateComments(index);
    }
}

// Function to update the comments section
function updateComments(index) {
    const commentsElement = document.getElementById(`comments-${index}`);
    commentsElement.innerHTML = posts[index].comments.map(comment => `<p><strong>${comment.user}:</strong> ${comment.text}</p>`).join('');
}

