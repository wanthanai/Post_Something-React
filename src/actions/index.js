import store from '../index';


//! Action

// Delete Last Image
export const delete_last_img = () => {
    return {
        type: "DELETE_LAST_IMG"
    }
}

// Loading Delete One
export const loading_deleteOne = () => {
    return {
        type: "LOADING_DELETE_ONE"
    }
}
// Loading Delete Success
export const loading_deleteOne_success = () => {
    return {
        type: "LOADING_DELETE_ONE_SUCCESS"
    }
}
// Loading Delete Last Image Success
export const loading_deleteLastImg_success = () => {
    return {
        type: "LOADING_DELETE_LAST_IMG_SUCCESS"
    }
}


// Toggle Window Delete Image
export const toggle_window_delete_img = (status) => {
    return {
        type: "TOGGLE_WINDOW_DELETE_IMG",
        status: status 
    }
}

// Close Delete Success
export const close_delete_one_success = () => {
    return {
        type: "CLOSE_DELETE_SUCCESS"
    }
}

// Window Show Image
export const window_list_images_post = () => {
    return {
        type: "WINDOW_LIST_IMAGES_POST"
    }
}

// Index List Images { increment, decrement }
// Increment +
export const increment_index_list_images = (index) => {
    return {
        type: "INCREMENT_INDEX_LIST_IMAGES",
        indexIncrement: index
    }
}
// Decrement - 
export const decrement_index_list_images = (status, index) => {
    return {
        type: "DECREMENT_INDEX_LIST_IMAGES",
        indexDecrement: index,
        statusDecrementIndex: status
    }
}
// Set Index List Images 
export const set_index_list_images = () => {
    return {
        type: "SET_INDEX_LIST_IMAGES",
    }
}

// Receive Img For Set List Images 
export const set_list_images_post = (images) => {
    return {
        type: "SET_LIST_IMAGE_POST",
        listImagesPost: images
    }
}

// Set List Image Deleted
export const set_list_image_deleted = (img) => {
    return {
        type: "SET_LIST_IMAGE_DELETED",
        imgDeleted: img
    }
}

// Toggle Window List Images Post
export const toggle_window_list_imagesPost = () => {
    return {
        type: "TOGGLE_WINDOW_LIST_IMAGES_POST"
    }
}

// ( delete all ) set list images post 
export const set_list_images_post_deleteAll = () => {
    return{
        type: "SET_LIST_IMAGES_DELETEALL"
    }
}

//! ( Posts ) - action
// setPosts 
export const set_posts = (posts) => {
    return{
        type: "SET_POSTS",
        posts: posts
    }
}
// Set Text Input Post 
export const set_text_input_post = (text) => {
    return{
        type: "SET_TEXT_INPUT_POST",
        textInputPost: text
    }
}
// Set Images Posts
export const set_images_posts = (img) => {
    return{
        type: "SET_IMAGES_POSTS",
        imagesPosts: img
    }
}
// Set Count Text Input Post
export const set_count_text_input_post = (result) => {
    return{
        type: "SET_COUNT_TEXT_INPUT_POST",
        countTextInputPost: result
    }
}
// Set Feeling Status 
export const set_feeling_status = (status) => {
    return{
        type: "SET_FEELING_STATUS",
        feelingStatus: status
    }
}
// Set Id Post Showing
export const set_idPost_showing = (id) => {
    return{
        type: "SET_IDPOST_SHOWING",
        idPostShowing: id
    }
}

//! ( Window ) - action
// toggle window input post
export const toggle_window_input_post = (status) => {
    return{
        type: "TOGGLE_WINDOW_INPUT_POST",
        statusWindowInputPost: status
    }
}




//! Redux Thunk Middleware

// delete one
export const thunk_action_deleteOne = () => {
    // loading
    store.dispatch(loading_deleteOne());    
    return (dispatch, getState) => {
        // getState
        const { indexListImages, listImagesPost, posts, idPostShowing } = getState();
        // setListImageDeleted
        dispatch(set_list_image_deleted(listImagesPost.filter(img => img.data_url === listImagesPost[indexListImages].data_url)));

        // loading success
        setTimeout(() => {
            dispatch(toggle_window_delete_img('close'));
            dispatch(loading_deleteOne_success());
            dispatch(set_list_images_post(listImagesPost.filter(img => img.data_url !== listImagesPost[indexListImages].data_url)));

            // new post when img deleted
            for(let i = 0; i < posts.length; i++) {
                if(posts[i].idPost === idPostShowing) {
                    for(let q = 0; q < posts[i].imagesPosts.length; q++) {
                        if(q === indexListImages) {
                            posts[i].imagesPosts.splice(indexListImages, 1);
                        }
                    }
                }
            }            
        }, 1200)
        setTimeout(() => {
            dispatch(close_delete_one_success());
        }, 2000)
    }
}

// delete one - ( Delete Last Image )
export const thunk_action_deleteLastImg = () => {
    // loading
    store.dispatch(loading_deleteOne());    
    return (dispatch, getState) => {
        // getState
        const { indexListImages, listImagesPost, posts, idPostShowing } = getState();
        // setListImageDeleted
        dispatch(set_list_image_deleted(listImagesPost.filter(img => img.data_url === listImagesPost[indexListImages].data_url)));
        // delete last image
        dispatch(delete_last_img());

        setTimeout(() => {
            // set list image post
            dispatch(set_list_images_post(listImagesPost.filter(img => img.data_url !== listImagesPost[indexListImages].data_url)));
            // toggle window delete image
            dispatch(toggle_window_delete_img('close'));
            // loading delete success
            dispatch(loading_deleteLastImg_success());

            // new post when img deleted
            for(let i = 0; i < posts.length; i++) {
                if(posts[i].idPost === idPostShowing) {
                    for(let q = 0; q < posts[i].imagesPosts.length; q++) {
                        if(q === indexListImages) {
                            posts[i].imagesPosts.splice(indexListImages, 1);
                        }
                    }
                }
            }            
        }, 1200)
        setTimeout(() => {
            // close delete success
            dispatch(close_delete_one_success());
        }, 2000)
    }
}

// delete one - ( one image left )
export const thunk_action_oneImageLeft = () => {
    // loading
    store.dispatch(loading_deleteOne());    
    return (dispatch, getState) => {
        // getState
        const { indexListImages, listImagesPost, posts, idPostShowing } = getState();
        // setListImageDeleted
        dispatch(set_list_image_deleted(listImagesPost.filter(img => img.data_url === listImagesPost[indexListImages].data_url)));

        setTimeout(() => {
            // set list image post
            dispatch(set_list_images_post(listImagesPost.filter(img => img.data_url !== listImagesPost[indexListImages].data_url)));
            // toggle window delete image
            dispatch(toggle_window_delete_img('close'));
            // loading delete success
            dispatch(loading_deleteOne_success());

            // new post when img deleted
            for(let i = 0; i < posts.length; i++) {
                if(posts[i].idPost === idPostShowing) {
                    for(let q = 0; q < posts[i].imagesPosts.length; q++) {
                        if(q === indexListImages) {
                            posts[i].imagesPosts.splice(indexListImages, 1);
                        }
                    }
                }
            }                        
        }, 1200)
        setTimeout(() => {
            // close delete success
            dispatch(close_delete_one_success());
            // close window
            dispatch(toggle_window_list_imagesPost());
        }, 2000)
    }
}

// delete all 
export const thunk_action_deleteAll = () => {
    // loading
    store.dispatch(loading_deleteOne());    
    return (dispatch, getState) => {
        // getState
        const { posts, idPostShowing } = getState();

        // loading success
        setTimeout(() => {
            dispatch(toggle_window_delete_img('close'));
            dispatch(loading_deleteOne_success());
            dispatch(set_list_images_post_deleteAll());

            // new post when img deleted
            for(let i = 0; i < posts.length; i++) {
                if(posts[i].idPost === idPostShowing) {
                    posts[i].imagesPosts.splice(0, posts[i].imagesPosts.length);
                }
            }                        
        }, 1200)
        setTimeout(() => {
            // close delete success
            dispatch(close_delete_one_success());
            // close window
            dispatch(toggle_window_list_imagesPost());
        }, 2000)
    }
}

// Set Posts ( thunk middleware )
let idPost = 1;
export const thunk_action_setPosts = () => {
    return (dispatch, getState) => {
        // getState
        const {textInputPost, imagesPosts, posts} = getState();
        const newPost = {idPost, textInputPost, imagesPosts};

        dispatch(set_posts([newPost, ...posts]));
        idPost++
        // close window input post
        // clear text input component
        dispatch(toggle_window_input_post(false));
        dispatch(set_count_text_input_post(0));

        // clear item in textarea
        dispatch(set_text_input_post(''));
        dispatch(set_images_posts([]));
        dispatch(set_feeling_status('?'));
    }
}
