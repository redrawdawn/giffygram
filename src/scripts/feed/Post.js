import { getLoggedInUser } from "../Data/DataManager.js"

export const Post = (postObject) => {
    let userButtons = postObject.user.id === getLoggedInUser().id 
      ? `<button id="edit__${postObject.id}">Edit</button>
      <button id="delete__${postObject.id}">Delete</button>` 
      : ''
    return `
      <section class="post">
        <header>
            <h2 class="post__title">${postObject.title}</h2>
        </header>
        <img class="post__image" src="${postObject.imageURL}" />
        <p>${postObject.description}</p>
        <div>Author: ${postObject.user.name}</div>
        ${userButtons}
      </section>
    `
  }