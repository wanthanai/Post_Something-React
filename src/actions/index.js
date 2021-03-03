import store from '../index';


//! Action

//! ( delete image ) - action 
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
// Close Delete Success
export const close_delete_one_success = () => {
    return {
        type: "CLOSE_DELETE_SUCCESS"
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
// ( delete all ) set list images post 
export const set_list_images_post_deleteAll = () => {
    return{
        type: "SET_LIST_IMAGES_DELETEALL"
    }
}
//! ( End ) - Delete image

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
// Set Feeling Icon 
export const set_feeling_icon = (url) => {
    return{
        type: "SET_FEELING_ICON",
        feelingIcon: url
    }
}
// Set Id Post Showing
export const set_idPost_showing = (id) => {
    return{
        type: "SET_IDPOST_SHOWING",
        idPostShowing: id
    }
}
// Set Status Post Button
export const set_status_post_button = (status) => {
    return{
        type: "SET_STATUS_POST_BUTTON",
        statusPostButton: status
    }
}
//! ( End ) - Post

//! ( Window ) - action
// toggle window input post
export const toggle_window_input_post = (status) => {
    return{
        type: "TOGGLE_WINDOW_INPUT_POST",
        statusWindowInputPost: status
    }
}
// Toggle Window List Images Post
export const toggle_window_list_imagesPost = (note) => {
    return {
        type: "TOGGLE_WINDOW_LIST_IMAGES_POST",
        noteWindowListImagesPost: note
    }
}
// Toggle Window Delete Image
export const toggle_window_delete_img = (status) => {
    return {
        type: "TOGGLE_WINDOW_DELETE_IMG",
        status: status 
    }
}
// Toggle Window Option Post
export const toggle_window_option_post = (status, id) => {
    return {
        type: "TOGGLE_WINDOW_OPTION_POST",
        statusWindowOptionPost: status,
        idOptionPost: id
    }
}
// Toggle Window Navbar
export const toggle_window_navbar = (status) => {
    return {
        type: "TOGGLE_WINDOW_NAVBAR",
        statusWindowNavbar: status 
    }
}
// Toggle Window Edit Post
export const toggle_window_editPost = (status) => {
    return {
        type: "TOGGLE_WINDOW_EDITPOST",
        statusWindowEditPost: status
    }
}
// Toggle Window Remove All Img
export const toggle_window_removeAllimg = (status) => {
    return {
        type: "TOGGLE_WINDOW_REMOVEALLIMG",
        statusWindowRemoveAllImg: status
    }
}
// Toggle window Emoji
export const toggle_window_emoji = (status) => {
    return {
        type: "TOGGLE_WINDOW_EMOJI",
        statusWindowEmoji: status
    }
}
//! ( End ) - Window



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
            
            // if only pictures - ( ถ้ามีแต่รูป ) => ก็จะให้ลบโพสไปด้วย
            for(let i = 0; i < posts.length; i++) {
                if(posts[i].idPost === idPostShowing) {
                    if(posts[i].textInputPost === '') {
                        if(posts[i].imagesPosts.length === 0) {
                            posts.splice(i, 1);
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
            
            // if only pictures - ( ถ้ามีแต่รูป ) => ก็จะให้ลบโพสไปด้วย
            for(let i = 0; i < posts.length; i++) {
                if(posts[i].idPost === idPostShowing) {
                    if(posts[i].textInputPost === '') {
                        if(posts[i].imagesPosts.length === 0) {
                            posts.splice(i, 1);
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
            
            // if only pictures - ( ถ้ามีแต่รูป ) => ก็จะให้ลบโพสไปด้วย
            for(let i = 0; i < posts.length; i++) {
                if(posts[i].idPost === idPostShowing) {
                    if(posts[i].textInputPost === '') {
                        if(posts[i].imagesPosts.length === 0) {
                            posts.splice(i, 1);
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
            
            // if only pictures - ( ถ้ามีแต่รูป ) => ก็จะให้ลบโพสไปด้วย
            for(let i = 0; i < posts.length; i++) {
                if(posts[i].idPost === idPostShowing) {
                    if(posts[i].textInputPost === '') {
                        posts.splice(i, 1);
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

// Set Posts ( thunk middleware )
let idPost = 1;
export const thunk_action_setPosts = () => {

    const month = new Date().toLocaleString('default', {month: 'long'});
    const day = new Date().getDate();
    var postHours = new Date().getHours();
    var postMinutes = new Date().getMinutes();

    var ampm;
    if(postHours => 12) ampm = 'PM'
    else ampm = 'AM' 

    postHours = postHours % 12;
    postHours = postHours ? postHours : 12; // ถ้า Hours = 0 จะให้เท่ากับ 12 / สมติว่าเที่ยงคือ 00:00 ก็จะเปลี่ยนเป็น 12
    postMinutes = postMinutes < 10 ? '0'+postMinutes : postMinutes;
    var strTime = `${month} ${day} at ${postHours}:${postMinutes} ${ampm}`

    // state
    var minutePost = 0;
    var hourPost = 0;

    return (dispatch, getState) => {
        // getState
        const {textInputPost, imagesPosts, posts, feelingStatus, feelingIcon} = getState();
    
        // new Post
        const newPost = {idPost, textInputPost, imagesPosts, feelingStatus, feelingIcon, strTime, minutePost, hourPost};
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
        dispatch(set_feeling_icon(''));
    }
}

//! Delete Photo - ( Middleware )
export const thunk_action_deletePhoto = (idPost, img, title) => {
    return (dispatch, getState) => {
        const { posts } = getState();

        // img < = 2
        if(img.length <= 2) {
            // title = 0
            if(title.length !== 0) {
                for(let i = 0; i < posts.length; i++) {
                    if(posts[i].idPost === idPost) {
                        for(let q = 0; q < posts[i].imagesPosts.length; q++) {
                            if(posts[i].imagesPosts[q].id === img[q].id) {
                                posts[i].imagesPosts.splice(q, posts[i].imagesPosts.length);

                                //close window option post
                                dispatch(toggle_window_option_post('close', 0));
                            }
                        }
                    }
                }
            } else {
                for(let i = 0; i < posts.length; i++) {
                    if(posts[i].idPost === idPost) {
                        posts.splice(i, 1);

                        //close window option post
                        dispatch(toggle_window_option_post('close', 0));
                    }
                }
            }
        }

        // img > 2
        if(img.length > 2) {
            dispatch(set_list_images_post(img));
            dispatch(toggle_window_list_imagesPost('onBtn-optionPost'));
        }
    }
} 

//! Delete Post - ( Middleware )
export const thunk_action_deletePost = (idPost) => {
    return (dispatch, getState) => {
        const { posts } = getState();

        for(let i = 0; i < posts.length; i++) {
            if(posts[i].idPost === idPost) {
                posts.splice(i, 1);

                // close window Option Post
                dispatch(toggle_window_option_post('close', 0));
            }
        }
    }
}

//! Edit Post - ( Middleware )
// window
export const thunk_action_editPost = (title, idPost, feelingStatus, img, feelingIcon) => {
    return (dispatch, getState) => {
        dispatch(toggle_window_editPost('toggle'));
        dispatch(set_text_input_post(title));
        dispatch(set_feeling_status(feelingStatus));
        dispatch(set_images_posts(img));
        dispatch(set_idPost_showing(idPost));
        dispatch(set_feeling_icon(feelingIcon));
    }
}
// Save Edit Post
export const thunk_action_save_editPost = () => {
    return (dispatch, getState) => {
        const { posts, imagesPosts, textInputPost, feelingStatus, idPostShowing, feelingIcon } = getState();

        for(let i = 0; i < posts.length; i++) {
            if(posts[i].idPost === idPostShowing) {
                if(imagesPosts.length === 0 && textInputPost.length === 0) {
                    posts.splice(i, 1);
                    // close window Edit Post
                    dispatch(toggle_window_editPost('close'));
                } else {
                    posts[i].textInputPost = textInputPost;
                    posts[i].feelingStatus = feelingStatus;
                    // posts[i].imagesPosts.splice(0, posts[i].imagesPosts.length);
                    posts[i].imagesPosts = imagesPosts;  
                    posts[i].feelingIcon = feelingIcon   
                    
                    // close window Edit Post
                    dispatch(toggle_window_editPost('close'));
                }
            }
        }

        console.log('Save Edit!');
    }
}