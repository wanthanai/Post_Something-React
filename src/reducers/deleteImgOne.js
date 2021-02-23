const initialstate = {
    // loading
    isLoadingDeleteOne: false,
    isDeleteSuccess: false,
    // window
    isWindowListImagesPost: false,
    isWindowDeleteImg: false,
    isWindowInputPost: false,
    // delete last img
    isDeleteLastImg: false,
    // index list images
    indexListImages: 0,
    // list images post
    listImagesPost: [],
    listImageDeleted: [],
    // posts
    posts: [],
    textInputPost: '',
    imagesPosts: [],
    countTextInputPost: 0,
    feelingStatus: "?",
    idPostShowing: 0
}

const asyncDeleteImgOnWindowReducer = (state = initialstate, action) => {
    switch(action.type) {
        // Delete Last Image
        case "DELETE_LAST_IMG":
            return Object.assign({}, state, {
                isDeleteLastImg: true
            })
        // Loading Delete One
        case "LOADING_DELETE_ONE":
            return Object.assign({}, state, {
                isLoadingDeleteOne: true,
                isWindowDeleteImg: false
            })
        // Loading Delete Success
        case "LOADING_DELETE_ONE_SUCCESS":
            return Object.assign({}, state, {
                isDeleteSuccess: true, 
                isLoadingDeleteOne: false,
                isDeleteLastImg: false,
            })
        // Loading Delete Last Image Success
        case "LOADING_DELETE_LAST_IMG_SUCCESS":
            return Object.assign({}, state, {
                isDeleteSuccess: true, 
                isLoadingDeleteOne: false,
                isDeleteLastImg: false,
                indexListImages: state.indexListImages - 1
            })
        // Toggle Window Delete Image
        case "TOGGLE_WINDOW_DELETE_IMG":
            if(action.status === 'close') {
                return Object.assign({}, state, {
                    isWindowDeleteImg: false
                })
            } else {
                return Object.assign({}, state, {
                    isWindowDeleteImg: !state.isWindowDeleteImg
                })
            }
        // Index List Images { increment, decrement }
        // Increment +
        case "INCREMENT_INDEX_LIST_IMAGES":
            if(action.indexIncrement === 'lastIndex') {
                return Object.assign({}, state, {
                    indexListImages: 0
                })
            }
            else if(action.indexIncrement === 'next') {
                return Object.assign({}, state, {
                    indexListImages: state.indexListImages + 1
                })
            }
        break;
        // Decrement - 
        case "DECREMENT_INDEX_LIST_IMAGES":
            if(action.statusDecrementIndex === true) {
                return Object.assign({}, state, {
                    indexListImages: action.indexDecrement
                })
            } else {
                return Object.assign({}, state, {
                    indexListImages: state.indexListImages - 1
                })
            }
        // Set Index List Images
        case "SET_INDEX_LIST_IMAGES":
            return Object.assign({}, state, {
                indexListImages: 0
            })
        // Delete Success!
        case "CLOSE_DELETE_SUCCESS":
            return Object.assign({}, state, {
                isDeleteSuccess: false
            })
        // Set List Images Post
        case "SET_LIST_IMAGE_POST":
            return Object.assign({}, state, {
                listImagesPost: action.listImagesPost
            })
        // Set List Images Deleted
        case "SET_LIST_IMAGE_DELETED":
            return Object.assign({}, state, {
                listImageDeleted: action.imgDeleted
            })
        // Toggle window list images post
        case "TOGGLE_WINDOW_LIST_IMAGES_POST":
            return Object.assign({}, state, {
                isWindowListImagesPost: !state.isWindowListImagesPost,
                isWindowDeleteImg: false
            })
        // ( delete all ) set list images post 
        case "SET_LIST_IMAGES_DELETEALL":
            return Object.assign({}, state, {
                listImagesPost: []
            })
        //! ( Posts ) - Reducer
        // Set Posts
        case "SET_POSTS":
            return Object.assign({}, state, {
                posts: action.posts
            })
        // Set Text Input Post
        case "SET_TEXT_INPUT_POST":
            return Object.assign({}, state, {
                textInputPost: action.textInputPost
            })
        // Set Images Posts
        case "SET_IMAGES_POSTS":
            return Object.assign({}, state, {
                imagesPosts: action.imagesPosts
            })
        // Set Count Text Input Post 
        case "SET_COUNT_TEXT_INPUT_POST":
            return Object.assign({}, state, {
                countTextInputPost: action.countTextInputPost
            })
        // Set Feeling Status
        case "SET_FEELING_STATUS":
            return Object.assign({}, state, {
                feelingStatus: action.feelingStatus
            })
        case "SET_IDPOST_SHOWING":
            return Object.assign({}, state, {
                idPostShowing: action.idPostShowing
            })
        //! ( End ) - Posts 
        // Toggle Window Input Post
        case "TOGGLE_WINDOW_INPUT_POST":
            if(action.statusWindowInputPost === true) {
                return Object.assign({}, state, {
                    isWindowInputPost: true
                })        
            }
            if(action.statusWindowInputPost === false) {
                return Object.assign({}, state, {
                    isWindowInputPost: false
                })        
            }
            if(action.statusWindowInputPost === 'toggle') {
                return Object.assign({}, state, {
                    isWindowInputPost: !state.isWindowInputPost
                })        
            }
        default: 
            return state;
    }
}

export default asyncDeleteImgOnWindowReducer;
