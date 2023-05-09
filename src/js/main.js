//form input and rendered post elements
let postForm = document.getElementById("postForm");
let postInput = document.getElementById("postInput");
let posts = document.getElementById("posts");

//form submit listener and form validation
postForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Submit button clicked");

    formValidation();
});

let formValidation = () => {
    let postError = document.getElementById("postFormErrorMessage");
    let timestamp = getTimestamp();

    if(postInput.value == ""){
        console.log("blank post error");
        postError.innerHTML = "Post cannot be blank!";
        postError.classList.add("error");
    }else{
        console.log("post success: " + postInput.value);
        postError.innerHTML = "";
        postError.classList.remove("error");
        acceptData();
        console.log(timestamp);
        createPost();
    }
}

let getTimestamp = () => {
    let now = new Date();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let day = days[now.getDay()];
    let month = now.toLocaleString("default", {month: "numeric"});
    let date = now.toLocaleString("en-us", {day: "numeric"});
    let year = now.toLocaleString("default", {year: "2-digit"});
    let time = now.toLocaleString("en-us", {hour: "numeric", minute: "numeric", hour12: true}).toLowerCase().replace(" ", "");
    
    return `${month}/${date}/${year}, ${day} at ${time}`;
}

//get input field data and store in new data object
let newPostData = {};

let acceptData = () => {
    newPostData["text"] = postInput.value;
}

//create new post element with template literal and append to posts container
let createPost = () => {
    posts.innerHTML +=

    `<div class="flex flex-col justify-between space-y-3 p-2.5 border-green-700 border-2 rounded-[0.25rem] ${posts.childElementCount === 0 ? 'mt-8' : ''}">
        <div class="flex justify-between items-center">
            <div class="flex space-x-3 justify-between items-center">
                <h3 class="text-base text-slate-200 font-semibold brand-font">DefinitelyNotElon2</h3>
                <img src="../img/elon.webp" class="h-7 w-7 rounded-[0.25rem] object-cover"/>
            </div>
            <p class="text-xs text-slate-300 font-light italic">${getTimestamp()}</p>
        </div>
        <p name="postBody" class="text-sm text-slate-100 max-w-sm">${newPostData.text}</p>
        <div class="flex justify-between space-x-4 text-lg text-slate-100 border-t-[1px] border-slate-100 pt-2.5 items-center">
            <div class="flex justify-between space-x-6">
                <i name="like" class="fas fa-heart hover:text-green-700 hover:cursor-pointer"></i>
                <i name="repost" class="fas fa-recycle hover:text-green-700 hover:cursor-pointer"></i>
                <i name="viewComments" class="fas fa-comment hover:text-green-700 hover:cursor-pointer"></i>
            </div>
            <input type="text" placeholder="Add a comment                       &#9166" class="h-6 w-[14rem] focus:outline-none text-neutral-900 text-sm pl-2 rounded-[0.25rem]" />
            <i name="edit" onclick="editPost(this)" class="fa-solid fa-pen-to-square hover:text-green-700 hover:cursor-pointer"></i>
            <i name="delete" onclick="deletePost(this)" class="fas fa-trash hover:text-neutral-600 hover:cursor-pointer"></i>
        </div>
    </div>`;

    postInput.value = "";
}

//delete a post
let deletePost = (e) => {
    e.parentElement.parentElement.remove();
}

//edit a post
let editPost = (e) => {
    let post = e.parentElement.parentElement; 
    let postBody = post.querySelector("p[name='postBody']");
    let postBodyHeight = postBody.offsetHeight;
    console.log(postBody.textContent);
    console.log(postBodyHeight + " px");
    let textEditBox = document.createElement("textarea");
    textEditBox.value = postBody.textContent;
    textEditBox.className = "scrollbar-hide resize-none focus:outline-none rounded-[0.25rem] text-sm text-neutral-900 p-2";
    textEditBox.style.height = `${postBodyHeight/16}rem`;
    // textEditBox.rows = postBody.clientHeight/20;
    // textEditBox.cols = postBody.clientWidth/10;
    postBody.replaceWith(textEditBox);

    textEditBox.focus();
    textEditBox.selectionStart = textEditBox.selectionEnd;

    let editIcon = post.querySelector("#edit");
    let discardIcon = post.querySelector("#delete");

    editIcon.className = "fa-solid fa-check hover:text-green-700 hover:cursor-pointer";
    editIcon.setAttribute("onclick", "confirmEdit(this)");
    discardIcon.className = "fa-solid fa-xmark hover:text-red-600 hover:cursor-pointer";
    discardIcon.setAttribute("onclick", "discardEdit(this)");
}

let confirmEdit = (e) => {
    console.log("Edit approved")
}

let discardEdit = (e) => {
    console.log("Edit discarded")
}