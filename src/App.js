//! Import
// React 
import React, { useRef, useState, useEffect } from "react";
// Axios
// import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
import axios from 'axios';
// Style
import "./App.css";
import feelingJSON from './feeling';
// Component
import Navbar from "./component/Navbar";
import Input from "./component/Input";
// Icon
import { AiFillCloseCircle } from "react-icons/ai";
import { GrEmoji } from "react-icons/gr";
import { BsImages } from "react-icons/bs";
import { RiEmotionLaughLine } from "react-icons/ri";
import { IoClose, IoArrowBackOutline } from "react-icons/io5";
import { BiSearchAlt } from "react-icons/bi";
// Textarea auto-resize
import TextareaAutosize from "react-textarea-autosize";
// Emoji-picker
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
// Tooltip
import ReactTooltip from 'react-tooltip';
// Images uploading
import ImageUploading from 'react-images-uploading';
// Alert Message
import { useAlert } from "react-alert";




//! Variable
// Images Uploading
const acceptType = ['jpeg', 'jpg', 'png', 'gif', 'tiff', 'heif', 'webp', 'svg']



//! Function Component
export default function App() {
    //! State
    // State Image Profile
    const [inputProfileImg, setInputProfileImg] = useState(null);
    const [urlShowImage, setUrlShowImage] = useState("");
    // State Image Input Post
    const [images, setImages] = useState([]);
    const maxNumber = 69;
    // State Name
    const [inputProfileName, setInputProfileName] = useState("");
    // State Text Input Post
    const [fontSizeInput, setFontSizeInput] = useState("big");
    const [textInputPost, setTextInputPost] = useState("");
    // State Emoji Toggle
    const [windowEmoji, setWindowEmoji] = useState(false);
    // State Window Input Post Toggle
    const [windowInputPost, setWindowInputPost] = useState(false);
    // State Window Remove All Images List
    const [windowRemoveAllImg, setWindowRemoveAllImg] = useState(false);
    // State Slide 
    const [slideResult, setSlideResult] = useState('');
    const [slideSize, setSlideSize] = useState('');
    // State Feeling
    const [feelingItems, setFeelingItems] = useState([]);
    // Feeling Status
    const [feelingStatus, setFeelingStatus] = useState('?');
    // Search Term
    const [searchTerm, setSearchTerm] = useState('');
    // Do not open Window Input Post
    const [statusInputMain, setStatusInputMain] = useState(false);



    //! useAlert();
    const alert = useAlert();


    //! useRef
    const inputPostRef = useRef(null);
    const slideItem = useRef(null);

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
    };
  
    //* 3. onClick close image
    const onClickCloseImage = () => {
      setUrlShowImage("");
    };
  
    //* 4. Change font size input Post
    const rowCount = (evt) => {
      setTextInputPost(evt.target.value);
    
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
    };
  
    //* 5. Add Emoji
    const addEmoji = (e) => {
      // console.log(e);
    
      // emoji concat text
      setTextInputPost(`${textInputPost}${e.native}`);
    };
  
    //* 6. Emoji Toggle
    const toggleEmoji = () => {
      if (!windowEmoji) {
        setWindowEmoji(true);
      } else {
        setWindowEmoji(false);
      }
    };
  
    //* 7. Get Status and Open Window Input Post
    const getWindowInput = (inputProfileName) => {
      //   console.log(statusWindowInput);
      if (inputProfileName !== "") setWindowInputPost(true);
      else {
        alert.error(<div className="alert_error">Please enter your name first.</div>)
        setWindowInputPost(false);
      } 
    };
  
    //* 8. Close Input Post
    const closeInputPost = () => {
      if (windowInputPost === true) {
        setWindowInputPost(false);
      } 
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
        // console.log(imageList, addUpdateIndex);
        setImages(imageList, addUpdateIndex);
    }; 


    //* 11 Slide Next
    const slideRightFunc = () => {
        // console.log(slideItem.current.clientWidth);
        setFeelingItems(feelingJSON.feelings);
        setSlideSize(slideItem.current.clientWidth);
        setSlideResult('right');
        setWindowEmoji(false);
    }

    //* 12. Slide Previous
    const slideLeftFunc = () => {
        // console.log(slideItem.current.clientWidth);
        setSlideSize(slideItem.current.clientWidth);
        setSlideResult('left');
    }

    //* 13. Get Status Upload Image
    const getUploadImage = (value, statusBool) => {
        setImages(value, images);
        if(inputProfileName === '') {
            alert.error(<div className="alert_error">Please enter your name first.</div>)
        } else {
            setWindowInputPost(statusBool);
        }
        
    }
    //* 14. Get Status Feeling
    const getStatusFeeling = async(statusBool) => {
        if(statusBool === true && inputProfileName !== '') {
            await setWindowInputPost(statusBool);
            slideRightFunc();
        } else {
            alert.error(<div className="alert_error">Please enter your name first.</div>)
        }
    }

    //* 15. Do not open Window Input Post
    const getStatusInputPost = (statusBool) => {
        if(statusBool === true) {
            setTextInputPost('');
            setStatusInputMain(statusBool);
        } else {
            setStatusInputMain(false);
        }
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
                data-tip="emoji" 
                data-delay-show="300" 
                data-effect="solid" 
                data-type="light" 
                data-border="true"
                data-text-color="#000"
                data-background-color="rgb(209, 208, 208, 1)"
                data-border-color="rgb(109, 109, 109)"
            />
            <ReactTooltip />
        </>
    );
    
    //* 2.2 Emoji Picker
    const emojiPicker = (
      <span
        className={
          !windowEmoji
            ? "emoji_picker_wrapper close"
            : "emoji_picker_wrapper show"
        }
      >
        <Picker className="emoji_picker" onSelect={addEmoji} />
      </span>
    );


    //* 2. Show Input Post
    const showInputPost = (
        //! show input post 
        <div className={!windowInputPost ? "main_show_input close" : "main_show_input show"
        }>  

            {/*//! emoji picker */}
            <div className="emoji_picker_container">
                {emojiPicker} {/* small component */}
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
                        <p>{inputProfileName} feeling : <span>{feelingStatus}</span></p>
                    </div> 

                    {/* input main */}
                    <div className="show_input_main">
                        <TextareaAutosize
                            minRows={6}
                            maxRows={15}
                            className="input_textarea"
                            placeholder={
                              !inputProfileName
                                ? "thinking ?"
                                : `thinking ? ${inputProfileName}`
                            }
                            ref={inputPostRef}
                            onChange={rowCount}
                            value={textInputPost}
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
                        value={images}
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
                                    {images.length <= 4 
                                        ? 
                                        images.map((image, index) => 
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
                                        images.map((image, index) =>
                                        <> 
                                            <li 
                                                className={images.length > 4 ? "li_images checkLength nPlus5CLose" : "li_images"} 
                                                key={index} 
                                                id={index} 
                                                style={{background: `url(${image.data_url}) no-repeat center/cover`}}>
                                                    <IoClose onClick={() => onImageRemove(index)} className="li_image_close"/>
                                            </li>
                                            {/* image counting and remove all image list */}
                                            <div onClick={() => setWindowRemoveAllImg(true)} className="images_counting">{`+${images.length - 4}`}</div>
                                        </>
                                        )
                                    }
                                </ul>    
                                {/*//! input addon wrapper */}
                                <div className="input_addon_wrapper">
                                    {/* image */}
                                    <span>
                                        {/* button upload image */}
                                        <BsImages 
                                            className="input_image"
                                            onClick={onImageUpload}
                                            // tooltip
                                            data-delay-show="300" 
                                            data-effect="solid" 
                                            data-type="light" 
                                            data-tip="image" 
                                            data-border="true"
                                            data-text-color="#000"
                                            data-background-color="rgb(209, 208, 208, 1)"
                                            data-border-color="rgb(109, 109, 109)"
                                        />
                                        <ReactTooltip />
                                    </span>
                                    {/* feeling */}
                                    <span>
                                        {/* button feeling */}
                                        <RiEmotionLaughLine 
                                            onClick={slideRightFunc}
                                            className="input_feeling" 
                                            // tootip
                                            data-delay-show="300" 
                                            data-effect="solid" 
                                            data-type="light" 
                                            data-tip="feelings" 
                                            data-border="true"
                                            data-text-color="#000"
                                            data-background-color="rgb(209, 208, 208, 1)"
                                            data-border-color="rgb(109, 109, 109)"
                                        />
                                        <ReactTooltip />
                                    </span>
                                </div>
                                {/*//! Window Remove All Images List */}
                                <div className={windowRemoveAllImg !== false ? "removeALl_wrapper show" : "removeALl_wrapper close"}>
                                    <button onClick={() => { 
                                        onImageRemoveAll() 
                                        setWindowRemoveAllImg(false) 
                                    }}>Remove All</button>
                                    <button onClick={() => setWindowRemoveAllImg(false)}>cancle</button>
                                </div>
                                <div className={windowRemoveAllImg !== false ? "box_removeAll show" : "box_removeAll close"}></div>
                            </>
                        )}
                    </ImageUploading>
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
                                        setFeelingStatus(value.feeling_name)
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
    )   
    




  //! Main Component
  return (
    //! App
    <div className="App">
        {/* Navbar */}
        <Navbar 
            getInfoNavbar={getInfoNavbar} 
            getStatusInputPost={getStatusInputPost}
        />
        {/* Input */}
        <Input
            onClickShowImage={onClickShowImage}
            inputProfileImg={inputProfileImg}
            inputProfileName={inputProfileName}
            windowInputPost={windowInputPost}
            getWindowInput={getWindowInput}
            textInputPost={textInputPost}
            getUploadImage={getUploadImage}
            images={images}
            getStatusFeeling={getStatusFeeling}  
            statusInputMain={statusInputMain}
        />
        {/*//! main show background and image */}
        {showBackgroundAndImage} {/* small component */}

        {/* //! main show input */}
        {showInputPost} {/* small component */}
    </div>
  );

}
