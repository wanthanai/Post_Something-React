const initialstate = {
    // loading
    isLoadingDeleteOne: false,
    isDeleteSuccess: false,
    // window
    isWindowListImagesPost: false,
    isWindowDeleteImg: false,
    isWindowInputPost: false,
    isWindowNavbar: false,
    isWindowOptionPost: false,
    isWindowEditPost: false,
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
    feelingIcon: '',
    idPostShowing: 0,
    // posts Time
    timeNow: new Date().getTime(),
    // status 
    statusPostButton: false,
    idOptionPost: 0
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
            if(state.isWindowListImagesPost === true) {
                document.querySelector('html').style.overflow = 'unset';
            } else {
                document.querySelector('html').style.overflow = 'hidden';
            }
            if(action.noteWindowListImagesPost === 'onBtn-optionPost') {
                return Object.assign({}, state, {
                    isWindowListImagesPost: !state.isWindowListImagesPost,
                    isWindowOptionPost: false,
                    isWindowDeleteImg: true
                })
            }
            return Object.assign({}, state, {
                isWindowListImagesPost: !state.isWindowListImagesPost,
                isWindowDeleteImg: false,
                isWindowOptionPost: false
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
        // Set Feeling Icon
        case "SET_FEELING_ICON":
            return Object.assign({}, state, {
                feelingIcon: action.feelingIcon
            })
        case "SET_IDPOST_SHOWING":
            return Object.assign({}, state, {
                idPostShowing: action.idPostShowing
            })
        case "SET_STATUS_POST_BUTTON":
            return Object.assign({}, state, {
                statusPostButton: action.statusPostButton
            })
        //! ( End ) - Posts 
        // Toggle Window Input Post
        case "TOGGLE_WINDOW_INPUT_POST":
            if(action.statusWindowInputPost === true) {
                document.querySelector('html').style.overflow = 'hidden';
                return Object.assign({}, state, {
                    isWindowInputPost: true,
                    isWindowOptionPost: false,
                    isWindowNavbar: false
                })        
            }
            if(action.statusWindowInputPost === false) {
                document.querySelector('html').style.overflow = 'unset';
                return Object.assign({}, state, {
                    isWindowInputPost: false,
                    isWindowOptionPost: false,
                    isWindowNavbar: false
                })        
            }
            if(action.statusWindowInputPost === 'toggle') {
                if(state.isWindowInputPost === true) {
                    document.querySelector('html').style.overflow = 'hidden';
                } else {
                    document.querySelector('html').style.overflow = 'unset';
                }
                return Object.assign({}, state, {
                    isWindowInputPost: !state.isWindowInputPost,
                    isWindowOptionPost: false,
                    isWindowNavbar: false
                })        
            }
        break;
        // Toggle Window Option Post
        case "TOGGLE_WINDOW_OPTION_POST":
            if(action.statusWindowOptionPost === "show") {
                return Object.assign({}, state, {
                    isWindowOptionPost: true
                })
            } 
            if(action.statusWindowOptionPost === 'close') {
                return Object.assign({}, state, {
                    isWindowOptionPost: false,
                    idOptionPost: action.idOptionPost
                })
            }
            if(action.statusWindowOptionPost === 'toggle') {
                if(action.idOptionPost !== 0) {
                    return Object.assign({}, state, {
                        isWindowOptionPost: !state.isWindowOptionPost,
                        idOptionPost: action.idOptionPost,
                        isWindowNavbar: false
                    })
                }
            }
        break;
        // Toggle window Navbar
        case "TOGGLE_WINDOW_NAVBAR":
            if(action.statusWindowNavbar === 'show') {
                return Object.assign({}, state, {
                    isWindowNavbar: true,
                    isWindowInputPost: false,
                    isWindowOptionPost: false
                })
            } 
            if(action.statusWindowNavbar === 'close') {
                return Object.assign({}, state, {
                    isWindowNavbar: false,
                    isWindowInputPost: false,
                    isWindowOptionPost: false
                })
            }
            if(action.statusWindowNavbar === 'toggle') {
                return Object.assign({}, state, {
                    isWindowNavbar: !state.isWindowNavbar,
                    isWindowInputPost: false,
                    isWindowOptionPost: false
                })
            }
        break;
        case "TOGGLE_WINDOW_EDITPOST":
            if(action.statusWindowEditPost === 'close') {
                if(state.isWindowOptionPost === true) {
                    document.querySelector('html').style.overflow = 'hidden';
                } else {
                    document.querySelector('html').style.overflow = 'unset';
                }
                return Object.assign({}, state, {
                    isWindowEditPost: false,
                    isWindowNavbar: false,
                    isWindowOptionPost: false,
                    countTextInputPost: 0,
                    feelingStatus: "?",
                    imagesPosts: [],
                    textInputPost: '',
                    feelingIcon: ''
                })
            }
            if(action.statusWindowEditPost === 'toggle') {
                if(state.isWindowOptionPost === true) {
                    document.querySelector('html').style.overflow = 'hidden';
                } else {
                    document.querySelector('html').style.overflow = 'unset';
                }
                return Object.assign({}, state, {
                    isWindowEditPost: !state.isWindowEditPost,
                    isWindowNavbar: false,
                    isWindowOptionPost: false
                })
            }
        break;
        default: 
            return state;
    }
}

export default asyncDeleteImgOnWindowReducer;
