let loggedInUser = {
    // id: 1,
    // name: "Bryan",
    // email: "bryan@bn.com"
}

export const getLoggedInUser = () => {
    return loggedInUser
}

export const setLoggedInUser = (userObj) => {
    loggedInUser = userObj;
}

// //change declaration to let
// let loggedInUser = {
//     id: 1,
//     name: "Bryan",
//     email: "bryan@bn.com"
//   }

//   export const logoutUser = () => {
//     loggedInUser = {}
//   }

export const getUsers = () => {

}

export const getPosts = () => {
    const userId = getLoggedInUser().id
    return fetch(`http://localhost:8088/posts?_expand=user`)  // userId=${userId}&  //<-- This filters for the logged in user
      .then(response => response.json())
      .then(parsedResponse => {
        console.log("data with user", parsedResponse)
        let postCollection = parsedResponse
        postCollection = postCollection.sort((a, b) => b.id - a.id)
        return postCollection;
      })
  }


export const createPost = postObj => {
    return fetch("http://localhost:8088/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postObj)

    })
        .then(response => response.json())
}

export const deletePost = postId => {
    return fetch(`http://localhost:8088/posts/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }

    })
        .then(response => response.json())

}

export const getSinglePost = (postId) => {
    return fetch(`http://localhost:8088/posts/${postId}`)
        .then(response => response.json())
}

export const updatePost = postObj => {
    return fetch(`http://localhost:8088/posts/${postObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postObj)

    })
        .then(response => response.json())
}

export const loginUser = (userObj) => {
    return fetch(`http://localhost:8088/users?name=${userObj.name}&email=${userObj.email}`)
        .then(response => response.json())
        .then(parsedUser => {
            //is there a user?
            console.log("parsedUser", parsedUser) //data is returned as an array
            if (parsedUser.length > 0) {
                setLoggedInUser(parsedUser[0]);
             
                return getLoggedInUser();
            } else {
                //no user
               
                return false;
            }
        })
}

export const registerUser = (userObj) => {
    return fetch(`http://localhost:8088/users`, {
      method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userObj)
    })
    .then(response => response.json())
    .then(parsedUser => {
      setLoggedInUser(parsedUser);
      return getLoggedInUser();
    })
  }