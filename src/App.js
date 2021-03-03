//! Import
// React 
import React, { useRef, useState, useEffect } from "react";
// Style
import "./App.css";
import "./component/responsive.css"
import feelingJSON from './feeling';
// Component
import Navbar from "./component/Navbar";
import Input from "./component/Input";
import PostHasImg from "./component/PostHasImg"
// Icon
import { AiFillCloseCircle, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { GrEmoji } from "react-icons/gr";
import { BsImages } from "react-icons/bs";
import { RiEmotionLaughLine } from "react-icons/ri";
import { IoClose, IoArrowBackOutline, IoConstructOutline } from "react-icons/io5";
import { BiSearchAlt } from "react-icons/bi";
import { HiDotsHorizontal } from "react-icons/hi";
// Textarea auto-resize
import TextareaAutosize from "react-textarea-autosize";
// Emoji-picker
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
// Images uploading
import ImageUploading from 'react-images-uploading';
// Alert Message
import { useAlert } from "react-alert";
import { any, func } from "prop-types";
// Redux
import { connect } from 'react-redux';
// Redux Action
import 
{   thunk_action_deleteOne, thunk_action_deleteLastImg, toggle_window_delete_img, increment_index_list_images, decrement_index_list_images, set_index_list_images,
    set_list_images_post, thunk_action_oneImageLeft, toggle_window_list_imagesPost, thunk_action_deleteAll, thunk_action_setPosts, set_text_input_post, set_images_posts,
    toggle_window_input_post, set_count_text_input_post, set_feeling_status, set_idPost_showing, set_feeling_icon, set_status_post_button, toggle_window_option_post,
    toggle_window_navbar, thunk_action_deletePhoto, thunk_action_deletePost, thunk_action_editPost, toggle_window_editPost, thunk_action_save_editPost, toggle_window_removeAllimg,
    toggle_window_emoji
} 
from './actions/index';



//! Variable
// Images Uploading
const acceptType = ['jpeg', 'jpg', 'png', 'gif', 'tiff', 'heif', 'webp', 'svg']
const maxNumber = 69;

// Id Post
let idPost = 1;



//! Function Component
function App(props) {
    //! State
    // State Image Profile
    const [inputProfileImg, setInputProfileImg] = useState(null);
    const [urlShowImage, setUrlShowImage] = useState("");
    // State Name
    const [inputProfileName, setInputProfileName] = useState("");
    // State Text Input Post
    const [fontSizeInput, setFontSizeInput] = useState("big");
    // State Slide 
    const [slideResult, setSlideResult] = useState('');
    const [slideSize, setSlideSize] = useState('');
    const [slideSizeEditPost, setSlideSizeEditPost] = useState('');
    const [slideResultEditPost, setSlideResultEditPost] = useState('');
    // State Feeling
    const [feelingItems, setFeelingItems] = useState([]);
    // Search Term
    const [searchTerm, setSearchTerm] = useState('');


    //! useAlert();
    const alert = useAlert();

    //! useRef
    const inputPostRef = useRef(null);
    const slideItem = useRef(null);
    const slideItemEditPost = useRef(null);

    //! useEffect
    useEffect(() => {});


    //! Function Another
    //* 1. get info from Navbar
    const getInfoNavbar = (imgURLtoInput, profileName) => {
      setInputProfileImg(imgURLtoInput);
      setInputProfileName(profileName);
    };

    //* 2. onClick show image
    const onClickShowImage = (urlImg) => {
      setUrlShowImage(urlImg);
      // close window option post
      props.dispatch(toggle_window_option_post('close', 0));
      // clse window Navbar
      props.dispatch(toggle_window_navbar('close'));
      // html overflow hidden
      document.querySelector('html').style.overflow = 'hidden';
    };
  
    //* 3. onClick close image
    const onClickCloseImage = () => {
      setUrlShowImage("");
        // html overflow unset
        document.querySelector('html').style.overflow = 'unset';
    };

    //* 4. Change font size input Post
    const rowCount = (evt) => {
        props.dispatch(set_text_input_post(evt.target.value));
        // console.log(evt.target.value);
        
        // count number of characters without spaces and enters
        let myStringInputPost = evt.target.value;
        let enterCount = (myStringInputPost.match(/\n/g) || []).length; 
        let spaceCount = (myStringInputPost.split(" ").length - 1);
        // console.log(`Enter Count:- ${enterCount}`);
        // console.log(`Space Count:- ${spaceCount}`);
        // console.log(`total count:- ${(myStringInputPost.length - spaceCount) - enterCount}`);
        props.dispatch(set_count_text_input_post((myStringInputPost.length - spaceCount)- enterCount));

        let row = evt.target.offsetHeight;
        //   console.log(evt.target.offsetHeight);
        
        if (fontSizeInput === "big") { //big font
          if (row > 172) {
            setFontSizeInput("small");
          } 
        }
        if (fontSizeInput === "small") { //small font
          if (evt.target.value.length === 0) {
            setFontSizeInput("big");
          } 
        }
        
        // set status post button
        if(evt.target.value.length !== 0) {
            props.dispatch(set_status_post_button(true));
        } else props.dispatch(set_status_post_button(false));

        if(evt.target.value.length === 0) {
            if(props.data.imagesPosts.length !== 0) {
                props.dispatch(set_status_post_button(true));
            } else props.dispatch(set_status_post_button(false));            
        } 
    };
  
    //* 5. Add Emoji
    const addEmoji = (e) => {
      // console.log(e);
    
      // emoji concat text
      props.dispatch(set_text_input_post(`${props.data.textInputPost}${e.native}`));
    };
  
    //* 6. Emoji Toggle
    const toggleEmoji = () => {
        props.dispatch(toggle_window_emoji('toggle'));
    };
  
    //* 7. Get Status and Open Window Input Post
    const getWindowInput = (inputProfileName) => {
        // set Status Post Button 
        if(props.data.imagesPosts.length !== 0) {
            props.dispatch(set_status_post_button(true));
        }
        if(props.data.imagesPosts.length === 0) {
            if(props.data.countTextInputPost !== 0) {
                props.dispatch(set_status_post_button(true));
            } else props.dispatch(set_status_post_button(false)); 
        } 
        
        // alert error 
        if (inputProfileName !== "") {
            props.dispatch(toggle_window_input_post(true));
            document.querySelector('html').style.overflow = 'hidden';
        }
        else {
          alert.error(<div className="alert_error">Please enter your name first.</div>)
          props.dispatch(toggle_window_input_post(false));
        } 
    };
  
    //* 8. Close Input Post
    const closeInputPost = () => {  
        props.dispatch(toggle_window_input_post(false));
        props.dispatch(toggle_window_removeAllimg('close'));
    };
  
    //* 9. handle image change  
    // const handleImageChange = (e) => { //! ไม่ใช้เเล้ว เพราะมีข้อจำกัดในด้านการอัพโหลดที่ไม่สามารถอัพโหลดรูปซ้ำได้
    //     const selected = e.target.files[0];
    //     const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png"]

    //     // matching types
    //     if(selected && ALLOWED_TYPES.includes(selected.type)) {
    //         let reader = new FileReader(); // constructor method or object property
    //         reader.readAsDataURL(selected); // read ตัว selected ให้เป็น Data URL แล้วผลลัพธ์จะอยู่ที่ reader.result
    //         reader.onloadend = () => { // เมื่ออ่านเเละโหลดตัวไฟล์เสร็จเเล้ว ก็จะให้เข้าไปทำใน Arrow function
    //             let imgURL = reader.result;
    //             let result = {imgURL, id};

    //             setInputPostImgURL([result, ...inputPostImgURL]);
                
    //             id++
    //         }
    //     } else { // if they don't match, they will be set error.
    //         console.log('file not supported.');            
    //     }
    // }

    //* 10. Evolution handle image change #1
    const handleImageChange = (imageList, addUpdateIndex) => {
        // Id Image Post
        let idImgPost = 1;
        // console.log(imageList, addUpdateIndex);
        const imageListTemp = [];

        //setState ImagesPosts
        imageList.map((img) => {
            imageListTemp.push({ data_url:img.data_url, id:idImgPost });
            idImgPost++
        }) //! บัค id image เพราะ เมือใช้ function onImageRemove มันจะทำการ +idImage เพราะมันต้องผ่าน function นี้เสมอ แต่ยังไม่มีผลเสียอะไร 

        props.dispatch(set_images_posts(imageListTemp));

        // set status post button
        if(imageList.length !== 0) {
            props.dispatch(set_status_post_button(true));
        }
        if(imageList.length === 0) {
            if(props.data.countTextInputPost !== 0) {
                props.dispatch(set_status_post_button(true));
            } else props.dispatch(set_status_post_button(false)); 
        } 
    }; 


    //* 11 Slide Next
    // async important!
    const slideRightFunc = async() => {
        // console.log(slideItem.current.clientWidth);
        setFeelingItems(feelingJSON.feelings);
        setSlideSize(slideItem.current.clientWidth);
        setSlideResult('right');
        props.dispatch(toggle_window_emoji('close'));
        // close window remove all img
        props.dispatch(toggle_window_removeAllimg('close'));
    }
    //* 11.1 slide Next - ( Edit Post )
    const slideRightEditPost = async() => {
        // console.log(slideItem.current.clientWidth);
        setFeelingItems(feelingJSON.feelings);
        setSlideSizeEditPost(slideItemEditPost.current.clientWidth);
        setSlideResultEditPost('right');
        props.dispatch(toggle_window_emoji('close'));
    }

    //* 12. Slide Previous
    const slideLeftFunc = () => {
        // console.log(slideItem.current.clientWidth);
        setSlideSize(slideItem.current.clientWidth);
        setSlideResult('left');
    }
    //* 12.1 slide Previous
    const slideLeftEditPost = () => {
        // console.log(slideItem.current.clientWidth);
        setSlideSizeEditPost(slideItemEditPost.current.clientWidth);
        setSlideResultEditPost('left');
    }

    //* 13. Get Status Upload Image from PostHasImg Component
    const getUploadImage = (imageList, addUpdateIndex, statusBool) => {
        // Id Image Post
        let idImgPost = 1;

        const imageListTemp = [];

        //setState ImagesPosts
        imageList.map((img) => {
            imageListTemp.push({ data_url:img.data_url, id:idImgPost });
            idImgPost++
        }) //! บัค id image เพราะ เมือใช้ function onImageRemove มันจะทำการ +idImage เพราะมันต้องผ่าน function นี้เสมอ แต่ยังไม่มีผลเสียอะไร 
        props.dispatch(set_images_posts(imageListTemp));

        // alert error
        if(inputProfileName === '') {
            alert.error(<div className="alert_error">Please enter your name first.</div>)
            props.dispatch(set_images_posts([]));
        } else {
            props.dispatch(toggle_window_input_post(statusBool));
        }
        
        // allow status post button
        props.dispatch(set_status_post_button(true));

    }
    //* 14. Get Status Feeling
    const getStatusFeeling = async(statusBool) => {
        if(statusBool === true && inputProfileName !== '') {
            await props.dispatch(toggle_window_input_post(statusBool));
            await slideRightFunc();
        } else {
            alert.error(<div className="alert_error">Please enter your name first.</div>)
        }
    }

    //* 15. Do not open Window Input Post
    const getStatusInputPost = (statusBool) => {
        if(statusBool === true) {
            props.dispatch(set_text_input_post(''));
            props.dispatch(set_count_text_input_post(0));
        }
    } 

    //* 16. onclick button Post
    const addPost = () => {
        props.dispatch(thunk_action_setPosts());
    }

    //* 17. Increment Index List Images +
    const incrementIndexListImg = () => {
        if(props.data.indexListImages === props.data.listImagesPost.length - 1) {
            props.dispatch(increment_index_list_images('lastIndex'));
            props.dispatch(toggle_window_delete_img('close'));
        } else {
            props.dispatch(increment_index_list_images('next'));
            props.dispatch(toggle_window_delete_img('close'));
        } 
    }
    //* 18. Decrement Index List Images -
    const decrementIndexListImg = () => {
        if(props.data.indexListImages === 0) {
            props.dispatch(decrement_index_list_images(true, props.data.listImagesPost.length - 1));
            props.dispatch(toggle_window_delete_img('close'));
        } else {
            props.dispatch(decrement_index_list_images(false, null));
            props.dispatch(toggle_window_delete_img('close'));
        } 
    }

    //* 19. Delete One, List Images Post or Filter
    const deleteOneListImagesPost = () => {
        // listImages !== 0
        if(props.data.listImagesPost.length - 1 !== 0) {
            //- != last img
            if(props.data.indexListImages !== props.data.listImagesPost.length -1) {
                props.dispatch(thunk_action_deleteOne())
            } else {
                // = last img
                props.dispatch(thunk_action_deleteLastImg());
            }
        } else {
            // รูปสุดท้าย ลบแล้ว close window
            props.dispatch(thunk_action_oneImageLeft());
        }
    }

    //* 20. Delete All, List Images Post
    const deleteAllListImagesPost = () => {
        props.dispatch(thunk_action_deleteAll());
    }

    //* 21. close window show list image post
    const closeWindowListImagesPost = () => {
        props.dispatch(toggle_window_list_imagesPost());
    }
    //* 21.1 open window show list image post
    const openWindowListImagesPost = () => {
        props.dispatch(toggle_window_list_imagesPost());
    }

    //* 22. Receive idPost from Post Componenet
    const receiveIdPost = (id) => {
        props.dispatch(set_idPost_showing(id));
    }

    //* 23. Set Index List Images = 0
    const setIndexListImages = () => {
       props.dispatch(set_index_list_images());
    }

    //* 24. dispatch list image post - receive img from PostHasImg Component
    const setListImagesPost = (images) => {
        props.dispatch(set_list_images_post(images));
    }

    //* 25. when Clear button is CLicked on Navbar, it will Clear Input Post
    const clearStatusFeeling = () => {
        props.dispatch(set_feeling_status('?'));
    } 
    const clearImagesPost = () => {
        props.dispatch(set_images_posts([]));
    }

    //* 26. Toggle window Option Post
    const toggleWindowOptionPost = (status, id) => {
        props.dispatch(toggle_window_option_post(status, id));
    }

    //* 27. Toggle Window Navbar
    const toggleWindowNavbar = (status) => {
        props.dispatch(toggle_window_navbar(status));
    }

    //* 28. Delete Photo on Post
    const deletePhotoOnPost = (idPost, img, title) => {
        props.dispatch(thunk_action_deletePhoto(idPost, img, title));
    }

    //* 29. Delete Post
    const deletePost = (idPost) => {
        props.dispatch(thunk_action_deletePost(idPost));
    }

    //* 30. Edit Post
    const EditPost = (title, idPost, feelingStatus, img, feelingIcon) => {
        props.dispatch(thunk_action_editPost(title, idPost, feelingStatus, img, feelingIcon));
    }

    //* 31. Close Edit Post 
    const closeEditPost = () => {
        props.dispatch(toggle_window_editPost('close'));
        props.dispatch(toggle_window_removeAllimg('close'));
    }

    //* 32. Save Edit Post
    const saveEditPost = () => {
        props.dispatch(thunk_action_save_editPost());
    }


    //! Small Component
    //* 1. Show background and image
    const showBackgroundAndImage = (
      <div
        onClick={onClickCloseImage}
        className={
          urlShowImage === "" ? "main_show_image close" : "main_show_image show"
        }
      >
        '{/* show image */}
        <div
          className="show_image"
          style={{
            background:
              urlShowImage !== null
                ? `url('${urlShowImage}') no-repeat center/contain`
                : "#fff",
          }}
        ></div>
      </div>
    );
        
    //* 2.1 Emoji Toggle
    const emojiToggle = (
        <>
            <GrEmoji 
                onClick={toggleEmoji} 
                className="emoji_toggle" 
            />
        </>
    );
    
    //* 2.2 Emoji Picker
    const emojiPicker = (
      <span
        className={
          !props.data.isWindowEmoji
            ? "emoji_picker_wrapper close"
            : "emoji_picker_wrapper show"
        }
        style={props.data.imagesPosts.length !== 0 ? {bottom: '59%'} : {bottom: '44%'}}
      >
        <Picker className="emoji_picker" onSelect={addEmoji} />
      </span>
    );


    //* 2. Show Input Post
    const showInputPost = (
        //! show input post 
        <div className={!props.data.isWindowInputPost ? "main_show_input close" : "main_show_input show"
        }>  
            <div className="main_show_input_container">

                {/*//! emoji picker */}
                <div className="emoji_picker_container">
                    {emojiPicker} {/* small component */}

                    {/* box */}
                    <div 
                        className={
                            !props.data.isWindowEmoji
                              ? "box-emojiPicker close"
                              : "box-emojiPicker show"
                        }                          
                        style={props.data.imagesPosts.length !== 0 ? {top: '38.6%', right: '4.7%'} : {top: '54%', right: '4.7%'}}
                    ></div>
                </div>

                {/* //! Slide / main show input wrapper */}
                <div className="main_show_input_wrapper"
                    // Balance of height 
                    style={slideResult === 'right' ? {height: '329px'} : {height: 'auto'}}
                >

                    {/*//! Slide Item */}
                    <div 
                        className="slide_item" 
                        ref={slideItem}
                        style={
                            slideResult === 'right' 
                            ? {transform: `translateX(-${slideSize+2}px)`}
                            : {transform: `translateX(-0px)`}
                        }
                        >

                        {/* input header */}
                        <div className="show_input_header">
                            {/* header text */}
                                <p>Create Post</p>
                            {/* btn close */}
                            <div className="btn_close_input">
                                {/* close input post */}
                                <AiFillCloseCircle
                                    onClick={closeInputPost}
                                    className="icon_close_input"
                                />
                            </div>
                        </div>

                        {/* feeling status */}
                        <div className="feeling_status">
                            <p>{inputProfileName} feeling : <span>{props.data.feelingStatus}</span></p>
                        </div> 

                        {/* input main */}
                        <div className="show_input_main">
                            <TextareaAutosize
                                minRows={fontSizeInput === 'big' ? 6 : 9}
                                maxRows={15}
                                className="input_textarea"
                                placeholder={
                                  !inputProfileName
                                    ? "your mind?"
                                    : `your mind ${inputProfileName}?`
                                }
                                ref={inputPostRef}
                                onChange={rowCount}
                                value={props.data.textInputPost}
                                style={{
                                  fontSize: fontSizeInput === "big" ? "1.3em" : "0.9em",
                                }}
                            />
                            {/*//! emoji toggle */}
                            {emojiToggle} {/* small component */}
                        </div>
                        {/*//! Show image Input Post */}
                        <ImageUploading
                            multiple
                            value={props.data.imagesPosts}
                            onChange={handleImageChange}
                            maxNumber={maxNumber}
                            dataURLKey="data_url"
                            acceptType={acceptType}
                            maxFileSize={4194304}
                        >
                            {({
                                imageList,
                                onImageUpload,
                                onImageRemoveAll,
                                onImageUpdate,
                                onImageRemove,
                                isDragging,
                                dragProps,
                            }) => (
                                <>
                                    <ul className="image_input_post">
                                        {props.data.imagesPosts.length <= 4 
                                            ? 
                                            props.data.imagesPosts.map((image, index) => 
                                                <li 
                                                    className="li_images"
                                                    key={index} 
                                                    id={index} 
                                                    style={{background: `url(${image.data_url}) no-repeat center/cover`}}
                                                >
                                                    <IoClose onClick={() => {
                                                        onImageRemove(index)
                                                        props.dispatch(toggle_window_removeAllimg('close'))
                                                    }} className="li_image_close"/>
                                                </li>
                                            )
                                            : 
                                            props.data.imagesPosts.map((image, index) =>
                                            <> 
                                                <li 
                                                    className={props.data.imagesPosts.length > 4 ? "li_images checkLength nPlus5CLose" : "li_images"} 
                                                    key={index} 
                                                    id={index} 
                                                    style={{background: `url(${image.data_url}) no-repeat center/cover`}}>
                                                        <IoClose onClick={() => {
                                                            onImageRemove(index)
                                                            props.dispatch(toggle_window_removeAllimg('close'))
                                                        }} className="li_image_close"/>
                                                </li>
                                                {/* image counting and remove all image list */}
                                                <div onClick={() => props.dispatch(toggle_window_removeAllimg('toggle'))} className="images_counting">{`+${props.data.imagesPosts.length - 4}`}</div>
                                            </>
                                            )
                                        }
                                    </ul>    
                                    {/*//! input addon wrapper */}
                                    <div className="input_addon_wrapper">
                                        {/* image */}
                                        <span onClick={() => {
                                            props.dispatch(toggle_window_emoji('close'));
                                            props.dispatch(toggle_window_removeAllimg('close'))
                                        }}>
                                            {/* button upload image */}
                                            <BsImages 
                                                className="input_image"
                                                onClick={onImageUpload}
                                            />
                                        </span>
                                        {/* feeling */}
                                        <span>
                                            {/* button feeling */}
                                            <RiEmotionLaughLine 
                                                onClick={slideRightFunc}
                                                className="input_feeling" 
                                            />
                                        </span>
                                    </div>
                                    {/*//! Window Remove All Images List in window input */}
                                    <div className={props.data.isWindowRemoveAllImg !== false ? "removeALl_wrapper show" : "removeALl_wrapper close"}>
                                        <button onClick={() => { 
                                            onImageRemoveAll() 
                                            props.dispatch(toggle_window_removeAllimg('close'))
                                        }}>Remove All</button>
                                        <button onClick={() => props.dispatch(toggle_window_removeAllimg('toggle'))}>cancle</button>
                                    </div>
                                    <div className={props.data.isWindowRemoveAllImg !== false ? "box_removeAll show" : "box_removeAll close"}></div>
                                </>
                            )}
                        </ImageUploading>

                        {/* Post Button */}
                        <div className="button_post-wrapper">
                            <button 
                                className={props.data.statusPostButton ? 'button_post true' : 'button_post false'} 
                                onClick={props.data.statusPostButton ? () => addPost() : null}
                            >Post
                            </button>
                        </div>
                    </div>

                    {/*//! Slide Item */}
                    <div 
                        className="slide_item"
                        style={
                            slideResult === 'right' 
                            ? {transform: `translateX(-${slideSize}px)`}
                            : {transform: `translateX(${slideSize+2}px)`}
                        }
                    >
                        {/*//! Feeling Window Input Post */}
                        {/* header */}
                        <div className="feeling_header">
                            {/* Button Slide Left / Previous */}
                            <div className="feeling_slide_back_wrapper">
                                <IoArrowBackOutline
                                    onClick={slideLeftFunc}
                                    className="feeling_slide_back"
                                />
                            </div>
                            {/* text header */}
                            <p className="text_header">Feelings</p>
                        </div>

                        {/* search feeling */}
                        <div className="search_feeling_wrapper">
                            <input 
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search_feeling" 
                                type="text" 
                                placeholder="Search" 
                            />
                            <BiSearchAlt className="search_icon_feeling"/>
                        </div>

                        {/* feeling items */} 
                        <ul className="feelings_items_wrapper">
                            {/* Search filter */}
                            {feelingItems.filter((value) => {
                                if(searchTerm === "") {
                                    return value;
                                } else if (value.feeling_name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                    return value;
                                } 
                            }).map((value, key) => {
                                // console.log(value);
                                return (
                                    <li 
                                        className="feeling_item"
                                        key={key}
                                        onClick={() => {
                                            props.dispatch(set_feeling_status(value.feeling_name));
                                            props.dispatch(set_feeling_icon(value.icon));
                                            setSlideResult('left');
                                        }}
                                    >   
                                        <span className="feeling_icon">
                                            <img src={value.icon} alt="feeling-icon" />
                                        </span> 
                                        {value.feeling_name}
                                    </li>
                                )    
                                }
                            )}
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    )  
    
    //* 3 Show List Images Post 
    const ShowListImagePost = (
        // container
        <div className={props.data.isWindowListImagesPost 
            ? "listImagesPost_container show"
            : "listImagesPost_container close"
        }>
            {/* wrapper */}
            <div className={props.data.isLoadingDeleteOne === true 
                ? "listImagesPost_wrapper loading"
                : "listImagesPost_wrapper"
            }>
                {/* slide images */}
                <div className="listImagesPost_img-wrapper">
                    {props.data.listImagesPost.length !== 0
                        ?
                        <div 
                            className="listImagesPost_img"
                            style={props.data.isDeleteLastImg 
                                ? { background: `url(${props.data.listImagesPost[0].data_url}) no-repeat center/contain`}
                                : { background: `url(${props.data.listImagesPost[props.data.indexListImages].data_url}) no-repeat center/contain`}
                            }
                        >   
                            {/* button Prev, Next */}
                            {/* Prev */}
                            <div 
                                onClick={decrementIndexListImg}
                                className="listImagesPost_btn_Prev-container">
                                    <div className="listImagesPost_btn_Prev-wrapper">
                                        <AiOutlineLeft className="listImagesPost_btn-Prev" />
                                    </div>
                            </div>
                            {/* Next */}
                            <div 
                                onClick={incrementIndexListImg}
                                className="listImagesPost_btn_Next-container">
                                    <div className="listImagesPost_btn_Next-wrapper">
                                        <AiOutlineRight className="listImagesPost_btn-Next" />
                                    </div>
                            </div>
                            {/* button edit */}
                            <div 
                                onClick={() => props.dispatch(toggle_window_delete_img())}
                                className="listImagesPost_btn_Edit-wrapper">
                                    <HiDotsHorizontal className="listImagesPost_btn-Edit" /> 
                            </div>
                            {/* window delete Button Edit*/}
                            <div className={props.data.isWindowDeleteImg === true 
                                ? "listImagesPost_btn_Edit_window-delete show"
                                : "listImagesPost_btn_Edit_window-delete close"
                            }>
                                {/* button delete, delete all */}
                                {/* one */}
                                <button 
                                    onClick={deleteOneListImagesPost}
                                    className="delete_one">Delete
                                    </button>
                                {/* all */}
                                <button 
                                    onClick={deleteAllListImagesPost}
                                    className="delete_all">Delete All
                                </button>
                                {/* triangle box */}
                                <div className="box_window-delete"></div>
                            </div>
                        </div>
                        : null
                    }
                </div>
                {/* delete one loading */}
                {props.data.isLoadingDeleteOne === true 
                    ? <div className="deleteOne_loading-icon"></div>
                    : null
                }
                {/* delete one Success! */}
                {props.data.isDeleteSuccess
                    ? 
                    <div className="deleteOne_loading-success">
                        <p>Delete Success!</p>
                        <div className="deleteOne_loading_icon-success"></div>
                    </div>
                    : null
                }
            </div>
            {/* button close window or exit */}
            <div 
                onClick={closeWindowListImagesPost}
                className="listImagesPost_btn_Close-wrapper">
                    <IoClose className="listImagesPost_btn-Close" />
            </div>            
        </div>
    )

    //* 4. Show Edit Post
    const showEditPost = (
        //! show edit post 
        <div className={!props.data.isWindowEditPost ? "main_show_input close" : "main_show_input show"
        }>  
            <div className="main_show_input_container">

                {/*//! emoji picker */}
                <div className="emoji_picker_container">
                    {emojiPicker} {/* small component */}

                    {/* box */}
                    <div 
                        className={
                            !props.data.isWindowEmoji
                              ? "box-emojiPicker close"
                              : "box-emojiPicker show"
                        }                          
                        style={props.data.imagesPosts.length !== 0 ? {top: '38.6%', right: '4.7%'} : {top: '54%', right: '4.7%'}}
                    ></div>
                </div>

                {/* //! Slide / main show input wrapper */}
                <div className="main_show_input_wrapper"
                    // Balance of height 
                    style={slideResultEditPost === 'right' ? {height: '329px'} : {height: 'auto'}}
                >

                    {/*//! Slide Item */}
                    <div 
                        className="slide_item" 
                        ref={slideItemEditPost}
                        style={
                            slideResultEditPost === 'right' 
                            ? {transform: `translateX(-${slideSizeEditPost+2}px)`}
                            : {transform: `translateX(-0px)`}
                        }
                        >

                        {/* input header */}
                        <div className="show_input_header">
                            {/* header text */}
                                <p>Edit Post</p>
                            {/* btn close */}
                            <div className="btn_close_input">
                                {/* close input post */}
                                <AiFillCloseCircle
                                    onClick={closeEditPost}
                                    className="icon_close_input"
                                />
                            </div>
                        </div>

                        {/* feeling status */}
                        <div className="feeling_status">
                            <p>{inputProfileName} feeling : <span>{props.data.feelingStatus}</span></p>
                        </div> 

                        {/* input main */}
                        <div className="show_input_main">
                            <TextareaAutosize
                                minRows={fontSizeInput === 'big' ? 6 : 9}
                                maxRows={15}
                                className="input_textarea"
                                placeholder={
                                  !inputProfileName
                                    ? "your mind?"
                                    : `your mind ${inputProfileName}?`
                                }
                                ref={inputPostRef}
                                onChange={rowCount}
                                value={props.data.textInputPost}
                                style={{
                                  fontSize: fontSizeInput === "big" ? "1.3em" : "0.9em",
                                }}
                            />
                            {/*//! emoji toggle */}
                            {emojiToggle} {/* small component */}
                        </div>
                        {/*//! Show image Input Post */}
                        <ImageUploading
                            multiple
                            value={props.data.imagesPosts}
                            onChange={handleImageChange}
                            maxNumber={maxNumber}
                            dataURLKey="data_url"
                            acceptType={acceptType}
                            maxFileSize={4194304}
                        >
                            {({
                                imageList,
                                onImageUpload,
                                onImageRemoveAll,
                                onImageUpdate,
                                onImageRemove,
                                isDragging,
                                dragProps,
                            }) => (
                                <>
                                    <ul className="image_input_post">
                                        {props.data.imagesPosts.length <= 4 
                                            ? 
                                            props.data.imagesPosts.map((image, index) => 
                                                <li 
                                                    className="li_images"
                                                    key={index} 
                                                    id={index} 
                                                    style={{background: `url(${image.data_url}) no-repeat center/cover`}}
                                                >
                                                    <IoClose onClick={() => onImageRemove(index)} className="li_image_close"/>
                                                </li>
                                            )
                                            : 
                                            props.data.imagesPosts.map((image, index) =>
                                            <> 
                                                <li 
                                                    className={props.data.imagesPosts.length > 4 ? "li_images checkLength nPlus5CLose" : "li_images"} 
                                                    key={index} 
                                                    id={index} 
                                                    style={{background: `url(${image.data_url}) no-repeat center/cover`}}>
                                                        <IoClose onClick={() => onImageRemove(index)} className="li_image_close"/>
                                                </li>
                                                {/* image counting and remove all image list */}
                                                <div onClick={() => props.dispatch(toggle_window_removeAllimg('toggle'))} className="images_counting">{`+${props.data.imagesPosts.length - 4}`}</div>
                                            </>
                                            )
                                        }
                                    </ul>    
                                    {/*//! input addon wrapper */}
                                    <div className="input_addon_wrapper">
                                        {/* image */}
                                        <span onClick={() => props.dispatch(toggle_window_emoji('close'))}>
                                            {/* button upload image */}
                                            <BsImages 
                                                className="input_image"
                                                onClick={onImageUpload}
                                            />
                                        </span>
                                        {/* feeling */}
                                        <span>
                                            {/* button feeling */}
                                            <RiEmotionLaughLine 
                                                onClick={slideRightEditPost}
                                                className="input_feeling" 
                                            />
                                        </span>
                                    </div>
                                    {/*//! Window Remove All Images List in window input */}
                                    <div className={props.data.isWindowRemoveAllImg !== false ? "removeALl_wrapper show" : "removeALl_wrapper close"}>
                                        <button onClick={() => { 
                                            onImageRemoveAll() 
                                            props.dispatch(toggle_window_removeAllimg('close')); 
                                        }}>Remove All</button>
                                        <button onClick={() => props.dispatch(toggle_window_removeAllimg('close'))}>cancle</button>
                                    </div>
                                    <div className={props.data.isWindowRemoveAllImg !== false ? "box_removeAll show" : "box_removeAll close"}></div>
                                </>
                            )}
                        </ImageUploading>

                        {/* Post Button */}
                        <div className="button_post-wrapper">
                            <button 
                                className="button_post true" 
                                onClick={saveEditPost}
                            >Save
                            </button>
                        </div>
                    </div>

                    {/*//! Slide Item */}
                    <div 
                        className="slide_item"
                        style={
                            slideResultEditPost === 'right' 
                            ? {transform: `translateX(-${slideSizeEditPost}px)`}
                            : {transform: `translateX(${slideSizeEditPost+2}px)`}
                        }
                    >
                        {/*//! Feeling Window Input Post */}
                        {/* header */}
                        <div className="feeling_header">
                            {/* Button Slide Left / Previous */}
                            <div className="feeling_slide_back_wrapper">
                                <IoArrowBackOutline
                                    onClick={slideLeftEditPost}
                                    className="feeling_slide_back"
                                />
                            </div>
                            {/* text header */}
                            <p className="text_header">Feelings</p>
                        </div>

                        {/* search feeling */}
                        <div className="search_feeling_wrapper">
                            <input 
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search_feeling" 
                                type="text" 
                                placeholder="Search" 
                            />
                            <BiSearchAlt className="search_icon_feeling"/>
                        </div>

                        {/* feeling items */} 
                        <ul className="feelings_items_wrapper">
                            {/* Search filter */}
                            {feelingItems.filter((value) => {
                                if(searchTerm === "") {
                                    return value;
                                } else if (value.feeling_name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                    return value;
                                } 
                            }).map((value, key) => {
                                // console.log(value);
                                return (
                                    <li 
                                        className="feeling_item"
                                        key={key}
                                        onClick={() => {
                                            props.dispatch(set_feeling_status(value.feeling_name));
                                            props.dispatch(set_feeling_icon(value.icon));
                                            setSlideResultEditPost('left');
                                        }}
                                    >   
                                        <span className="feeling_icon">
                                            <img src={value.icon} alt="feeling-icon" />
                                        </span> 
                                        {value.feeling_name}
                                    </li>
                                )    
                                }
                            )}
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    ) 
    
    //* 5. Footer - ( copyright )
    const copyright = (
    
        <div className="footer_copyright">
            <p>Wanthanai K. © 2021</p>
        </div>

    )
    



    //! Main Component
    return (
        //! App
        <div className="App">
            {/* Navbar */}
            <Navbar 
                getInfoNavbar={getInfoNavbar} 
                getStatusInputPost={getStatusInputPost}
                clearStatusFeeling={clearStatusFeeling}
                clearImagesPost={clearImagesPost}
                toggleWindowOptionPost={toggleWindowOptionPost}
                isWindowNavbar={props.data.isWindowNavbar}
                toggleWindowNavbar={toggleWindowNavbar}
                onClickCloseImage={onClickCloseImage}
            />
            {/* Input */}
            <Input
                onClickShowImage={onClickShowImage}
                inputProfileImg={inputProfileImg}
                inputProfileName={inputProfileName}
                getWindowInput={getWindowInput}
                getUploadImage={getUploadImage}
                imagesPosts={props.data.imagesPosts}
                getStatusFeeling={getStatusFeeling}  
                textInputPost={props.data.textInputPost}
                countTextInputPost={props.data.countTextInputPost}
                toggleWindowOptionPost={toggleWindowOptionPost}
            />
            {/* Post */}
            {props.data.posts.map((post) => {
                const feelingStatus = post.feelingStatus.toLowerCase();
                return(
                    <PostHasImg 
                    inputProfileImg={inputProfileImg} 
                    inputProfileName={inputProfileName} 
                    onClickShowImage={onClickShowImage} 
                    key={post.idPost}
                    idPost={post.idPost}
                    img={post.imagesPosts}
                    title={post.textInputPost}
                    feelingStatus={feelingStatus}
                    feelingIcon={post.feelingIcon}
                    strTime={post.strTime}
                    minutePost={post.minutePost}
                    hourPost={post.hourPost}
                    timeNow={props.data.timeNow}
                    setListImagesPost={setListImagesPost}
                    openWindowListImagesPost={openWindowListImagesPost}
                    receiveIdPost={receiveIdPost}
                    setIndexListImages={setIndexListImages}
                    toggleWindowOptionPost={toggleWindowOptionPost}
                    deletePhotoOnPost={deletePhotoOnPost}
                    deletePost={deletePost}
                    EditPost={EditPost}
                />
                ) 
            })}

            {/*//! main show background and image */}
            {showBackgroundAndImage} {/* small component */}
          
            {/*//! main show input */}
            {showInputPost} {/* small component */}
          
            {/*//! Show List Images Post */}
            {ShowListImagePost} {/* small component */}

            {/*//! Show Edit Post */}
            {showEditPost} {/* small component */}

            {/*//! Footer - (Copyright) */}
            {copyright}
        </div>
    );

}

//! Map State To Props
const mapStateToProps = state => {
    return {
        data: state
    }
}


export default connect(mapStateToProps)(App)
