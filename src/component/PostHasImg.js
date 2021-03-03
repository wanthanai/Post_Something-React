//! Import
import React, { useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './Post.css';
import './responsive.css';
// Icon
import { HiDotsHorizontal } from "react-icons/hi";
import { BsFillLockFill } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TiDocumentDelete, TiPencil } from "react-icons/ti";
// PropTypes
import PropTypes from 'prop-types';



//! Variable
// id Images Post
let idImagesPost = 1;
// Time 
const second = 1000;            // 1 second = 1000 ms
const minute = second * 60;     // 1 minute = 60,000 ms
const hour = minute * 60;       // 1 hour = 3,600,000 ms
const day = hour * 24;          // 1 day = 86,400,000 ms

//! Main Component
export default function PostHasImg 
// parameters
({
    inputProfileImg, inputProfileName, onClickShowImage, idPost, img, title, feelingStatus, feelingIcon, strTime, timeNow,
    setListImagesPost, openWindowListImagesPost, receiveIdPost, setIndexListImages, hourPost, minutePost,
    toggleWindowOptionPost, deletePhotoOnPost, deletePost, EditPost
}) {

    //! useState
    const [postMinute, setPostMinute] = useState(minutePost);
    const [postHour, setPostHour] = useState(hourPost);
    const [dayAllow, setDayAllow] = useState(false);

    //! useEffect
    useEffect(() => {
        console.log(`hahhaa yooow! Post Id: ${idPost}`);
        runCountMinutePost();
    }, [])

    //! useRef
    const refTextPost = useRef(null);
    
    // if(textInputPost !== '') {
    //     setWidthTextPost(refTextPost.current.children[0].offsetWidth);
    // } 

    //! useSelector
    const statusWindowOptionPost = useSelector(state => state.isWindowOptionPost);
    const idOptionPost = useSelector(state => state.idOptionPost);

    //! Function
    //* 1. open window show list images post
    const openListImagesPost = async() => {
        // setState
        await setListImagesPost(img);
        await receiveIdPost(idPost);
        await openWindowListImagesPost();
        await setIndexListImages();
    } 

    //* 2. Time Post
    // 2.1 Count Minute
    const countMinutePost = () => {
        minutePost = minutePost + 1;
        // console.log(minutePost);

        setPostMinute(minutePost);
        // console.log(postMinute);
    }
    // 2.2 Count Hour
    const countHourPost = () => {
        hourPost = hourPost + 1;
        // console.log(hourPost);

        setPostHour(hourPost);
        // console.log(postHour);
    }
    // 2.3 Run
    const runCountMinutePost = () => {
        var countMinute = setInterval(() => {
            if(minutePost !== 60) {
                countMinutePost();
            } else {
                hourPost = hourPost + 1;
                setPostHour(hourPost);

                clearInterval(countMinute);
                // console.log(`count minute End Post id: ${idPost}`);

                // next Function
                runCountHourPost();
            } 
        }, minute);
    }
    // 2.4 Run
    const runCountHourPost = () => {
        var countHour = setInterval(() => {
            if(hourPost > 0 && hourPost !== 24) {
                countHourPost();
            } else {
                clearInterval(countHour);
                setDayAllow(true);
                // console.log(`count hour End Post id: ${idPost}`);
            }
        }, hour); 
    }
    //* End - ( Time Post )

    //* 3. Delete Photo 
    const deletePhoto = () => {
        deletePhotoOnPost(idPost, img, title);
    }

    //* 4. Edit Post
    const whenClickEditPost = () => {
        EditPost(title, idPost, feelingStatus, img, feelingIcon);
    }


    //! Component
    return (
        <div className="post_container">
            <div className="post_wrapper">

                {img.length === 0
                    ?
                    <>
                        {/* Post Top */}
                        <div className="post_top">
                            {/* top left */}
                            <div 
                            className="image_profile" 
                            style={inputProfileImg ? {background: `url(${inputProfileImg}) no-repeat center/cover`} : {background: `#fff`}}
                            onClick={() => onClickShowImage(inputProfileImg)}
                            >{/* Image Profile */}</div>

                            {/* top center */}
                            <div className="post_top_center">
                                {/* name - feeling Wrapper */}
                                <div className="name_feeling-wrapper">
                                    {/* name */}
                                    <span className="post_name">{inputProfileName ? inputProfileName : 'Enter Name..'}</span>
                                    {/* feeling is */}
                                    <span className="post_feeling-is">{feelingStatus !== '?' ? `is` : null}</span>
                                    {/* feeling Icon */}
                                    <span className="post_feeling-icon">{feelingIcon !== '' ? <img alt="feeling-icon" src={feelingIcon !== '' ? feelingIcon : null} /> : null}</span>
                                    {/* feeling status */}
                                    <span className="post_feeling">{feelingStatus !== '?' ? `feeling ${feelingStatus}.` : null}</span>
                                </div>
                                {/* time */}
                                {postMinute < 60
                                    ? <p className="post_time"><span className="post_strTime">{postMinute === 0 ? 'Just now' : `${postMinute}m`}</span><span> · <BsFillLockFill/></span></p>
                                    : null
                                }
                                {postHour > 0 && postHour < 23
                                    ? <p className="post_time"><span className="post_strTime">{postHour}h</span><span> · <BsFillLockFill/></span></p>
                                    : null
                                }
                                {dayAllow === true
                                    ? <p className="post_time"><span className="post_strTime">{strTime}</span><span> · <BsFillLockFill/></span></p>
                                    : null
                                }                                
                            </div>

                            {/* top right */}
                            {/* three dot / button option */}
                            <div className="post_top_right" onClick={() => toggleWindowOptionPost('toggle', idPost)}>
                                <HiDotsHorizontal className="post_dot" />
                            </div>

                            {/* box */}
                            <div 
                                className={idOptionPost === idPost && statusWindowOptionPost === true
                                    ? "box-option show"
                                    : "box-option close"
                                }
                            ></div>

                            {/* window option post */}
                            <div 
                                className={idOptionPost === idPost && statusWindowOptionPost === true
                                    ? "window_option-post show"
                                    : "window_option-post close"
                                }
                            >
                                {/* edit post button */}
                                <button 
                                    className="btn_edit_post"
                                    onClick={whenClickEditPost}
                                >
                                    {/* icon & span */}
                                    <TiPencil className="btn_icon" style={{color: '#e2e1e1'}} />
                                    <span className="edit_post-text">Edit post</span>
                                </button>
                                {/* delete post button */}
                                <button 
                                    className="btn_delete_post"
                                    onClick={() => deletePost(idPost)}
                                >
                                    {/* icon & span */}
                                    <RiDeleteBin5Line className="btn_icon"/>
                                    <span className="delete_post-text">Delete post</span>
                                </button>
                                {/* delete image button */}
                                <button 
                                    className={img.length !== 0 ? "btn_delete_img show" : "btn_delete_img close"}
                                    onClick={deletePhoto}
                                >
                                    {/* icon & span */}
                                    <TiDocumentDelete className="btn_icon"/>
                                    <span className="delete_img-text">Delete photo</span>
                                </button>
                            </div>

                        </div>

                        {/* Post Center Content */}
                        <div className="post_center">
                            {/* Text */}
                            {/* <p className="post_text">{textInputPost}</p> */}
                            <p className="textPost" ref={refTextPost}>
                                {title}
                            </p>
                        </div>
                    </>
                    : null
                }

                {img.length === 1 
                    ? 
                    <>
                        {/* Post Top */}
                        <div className="post_top">
                            {/* top left */}
                            <div 
                            className="image_profile" 
                            style={inputProfileImg ? {background: `url(${inputProfileImg}) no-repeat center/cover`} : {background: `#fff`}}
                            onClick={() => onClickShowImage(inputProfileImg)}
                            >{/* Image Profile */}</div>

                            {/* top center */}
                            <div className="post_top_center">
                                {/* name - feeling Wrapper */}
                                <div className="name_feeling-wrapper">
                                    {/* name */}
                                    <span className="post_name">{inputProfileName ? inputProfileName : 'Enter Name..'}</span>
                                    {/* feeling is */}
                                    <span className="post_feeling-is">{feelingStatus !== '?' ? `is` : null}</span>
                                    {/* feeling Icon */}
                                    <span className="post_feeling-icon">{feelingIcon !== '' ? <img alt="feeling-icon" src={feelingIcon !== '' ? feelingIcon : null} /> : null}</span>
                                    {/* feeling status */}
                                    <span className="post_feeling">{feelingStatus !== '?' ? `feeling ${feelingStatus}.` : null}</span>
                                </div>
                                {/* time */}
                                {postMinute < 60
                                    ? <p className="post_time"><span className="post_strTime">{postMinute === 0 ? 'Just now' : `${postMinute}m`}</span><span> · <BsFillLockFill/></span></p>
                                    : null
                                }
                                {postHour > 0 && postHour < 23
                                    ? <p className="post_time"><span className="post_strTime">{postHour}h</span><span> · <BsFillLockFill/></span></p>
                                    : null
                                }
                                {dayAllow === true
                                    ? <p className="post_time"><span className="post_strTime">{strTime}</span><span> · <BsFillLockFill/></span></p>
                                    : null
                                }                                
                            </div>

                            {/* top right */}
                            {/* three dot / button option */}
                            <div className="post_top_right" onClick={() => toggleWindowOptionPost('toggle', idPost)}>
                                <HiDotsHorizontal className="post_dot" />
                            </div>

                            {/* box */}
                            <div 
                                className={idOptionPost === idPost && statusWindowOptionPost === true
                                    ? "box-option show"
                                    : "box-option close"
                                }
                            ></div>

                            {/* window option post */}
                            <div 
                                className={idOptionPost === idPost && statusWindowOptionPost === true 
                                    ? "window_option-post show"
                                    : "window_option-post close"
                                }
                            >
                                {/* edit post button */}
                                <button 
                                    className="btn_edit_post"
                                    onClick={whenClickEditPost}
                                >
                                    {/* icon & span */}
                                    <TiPencil className="btn_icon" style={{color: '#e2e1e1'}} />
                                    <span className="edit_post-text">Edit post</span>
                                </button>
                                {/* delete post button */}
                                <button 
                                    className="btn_delete_post"
                                    onClick={() => deletePost(idPost)}
                                >
                                    {/* icon & span */}
                                    <RiDeleteBin5Line className="btn_icon"/>
                                    <span className="delete_post-text">Delete post</span>
                                </button>
                                {/* delete image button */}
                                <button 
                                    className={img.length !== 0 ? "btn_delete_img show" : "btn_delete_img close"}
                                    onClick={deletePhoto}
                                >
                                    {/* icon & span */}
                                    <TiDocumentDelete className="btn_icon"/>
                                    <span className="delete_img-text">Delete photo</span>
                                </button>
                            </div>
                        </div>

                        {/* Post Center Content */}
                        <div className="post_center">
                            {/* Text */}
                            {/* <p className="post_text">{textInputPost}</p> */}
                            <p className="textPost" ref={refTextPost}>
                                {title}
                            </p>

                            {/* Image */}
                            <ul className="post_content_image">
                                {img.map((img) => {
                                    return(
                                        <li>
                                            <img onClick={() => onClickShowImage(img.data_url)} src={img.data_url} alt="post-img" />
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </>
                    : null
                }

                {img.length === 2 
                    ? 
                    <>
                        {/* Post Top */}
                        <div className="post_top">
                            {/* top left */}
                            <div 
                            className="image_profile" 
                            style={inputProfileImg ? {background: `url(${inputProfileImg}) no-repeat center/cover`} : {background: `#fff`}}
                            onClick={() => onClickShowImage(inputProfileImg)}
                            >{/* Image Profile */}</div>

                            {/* top center */}
                            <div className="post_top_center">
                                {/* name - feeling Wrapper */}
                                <div className="name_feeling-wrapper">
                                    {/* name */}
                                    <span className="post_name">{inputProfileName ? inputProfileName : 'Enter Name..'}</span>
                                    {/* feeling is */}
                                    <span className="post_feeling-is">{feelingStatus !== '?' ? `is` : null}</span>
                                    {/* feeling Icon */}
                                    <span className="post_feeling-icon">{feelingIcon !== '' ? <img alt="feeling-icon" src={feelingIcon !== '' ? feelingIcon : null} /> : null}</span>
                                    {/* feeling status */}
                                    <span className="post_feeling">{feelingStatus !== '?' ? `feeling ${feelingStatus}.` : null}</span>
                                </div>
                                {/* time */}
                                {postMinute < 60
                                    ? <p className="post_time"><span className="post_strTime">{postMinute === 0 ? 'Just now' : `${postMinute}m`}</span><span> · <BsFillLockFill/></span></p>
                                    : null
                                }
                                {postHour > 0 && postHour < 23
                                    ? <p className="post_time"><span className="post_strTime">{postHour}h</span><span> · <BsFillLockFill/></span></p>
                                    : null
                                }
                                {dayAllow === true
                                    ? <p className="post_time"><span className="post_strTime">{strTime}</span><span> · <BsFillLockFill/></span></p>
                                    : null
                                }                                
                            </div>

                            {/* top right */}
                            {/* three dot / button option */}
                            <div className="post_top_right" onClick={() => toggleWindowOptionPost('toggle', idPost)}>
                                <HiDotsHorizontal className="post_dot" />
                            </div>

                            {/* box */}
                            <div 
                                className={idOptionPost === idPost && statusWindowOptionPost === true
                                    ? "box-option show"
                                    : "box-option close"
                                }
                            ></div>

                            {/* window option post */}
                            <div 
                                className={idOptionPost === idPost && statusWindowOptionPost === true 
                                    ? "window_option-post show"
                                    : "window_option-post close"
                                }
                            >
                                {/* edit post button */}
                                <button 
                                    className="btn_edit_post"
                                    onClick={whenClickEditPost}
                                >
                                    {/* icon & span */}
                                    <TiPencil className="btn_icon" style={{color: '#e2e1e1'}} />
                                    <span className="edit_post-text">Edit post</span>
                                </button>
                                {/* delete post button */}
                                <button 
                                    className="btn_delete_post"
                                    onClick={() => deletePost(idPost)}
                                >
                                    {/* icon & span */}
                                    <RiDeleteBin5Line className="btn_icon"/>
                                    <span className="delete_post-text">Delete post</span>
                                </button>
                                {/* delete image button */}
                                <button 
                                    className={img.length !== 0 ? "btn_delete_img show" : "btn_delete_img close"}
                                    onClick={deletePhoto}
                                >
                                    {/* icon & span */}
                                    <TiDocumentDelete className="btn_icon"/>
                                    <span className="delete_img-text">Delete photo</span>
                                </button>
                            </div>
                        </div>

                        {/* Post Center Content */}
                        <div className="post_center">
                            {/* Text */}
                            {/* <p className="post_text">{textInputPost}</p> */}
                            <p className="textPost" ref={refTextPost}>
                                {title}
                            </p>

                            {/* Image */}
                            <ul className="post_content_image twoImg">
                                {img.map((img) => {
                                    idImagesPost++
                                    return(
                                        <li key={idImagesPost}>
                                            <img onClick={() => onClickShowImage(img.data_url)} src={img.data_url} alt="post-img" />
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </>
                    : null
                }

                {img.length > 2 
                    ?
                    <>
                        {/* Post Top */}
                        <div className="post_top">
                            {/* top left */}
                            <div 
                            className="image_profile" 
                            style={inputProfileImg ? {background: `url(${inputProfileImg}) no-repeat center/cover`} : {background: `#fff`}}
                            onClick={() => onClickShowImage(inputProfileImg)}
                            >{/* Image Profile */}</div>

                            {/* top center */}
                            <div className="post_top_center">
                                {/* name - feeling Wrapper */}
                                <div className="name_feeling-wrapper">
                                    {/* name */}
                                    <span className="post_name">{inputProfileName ? inputProfileName : 'Enter Name..'}</span>
                                    {/* feeling is */}
                                    <span className="post_feeling-is">{feelingStatus !== '?' ? `is` : null}</span>
                                    {/* feeling Icon */}
                                    <span className="post_feeling-icon">{feelingIcon !== '' ? <img alt="feeling-icon" src={feelingIcon !== '' ? feelingIcon : null} /> : null}</span>
                                    {/* feeling status */}
                                    <span className="post_feeling">{feelingStatus !== '?' ? `feeling ${feelingStatus}.` : null}</span>
                                </div>
                                {/* time */}
                                {postMinute < 60
                                    ? <p className="post_time"><span className="post_strTime">{postMinute === 0 ? 'Just now' : `${postMinute}m`}</span><span> · <BsFillLockFill/></span></p>
                                    : null
                                }
                                {postHour > 0 && postHour < 23
                                    ? <p className="post_time"><span className="post_strTime">{postHour}h</span><span> · <BsFillLockFill/></span></p>
                                    : null
                                }
                                {dayAllow === true
                                    ? <p className="post_time"><span className="post_strTime">{strTime}</span><span> · <BsFillLockFill/></span></p>
                                    : null
                                }                                
                            </div>

                            {/* top right */}
                            {/* three dot / button option */}
                            <div className="post_top_right" onClick={() => toggleWindowOptionPost('toggle', idPost)}>
                                <HiDotsHorizontal className="post_dot" />
                            </div>

                            {/* box */}
                            <div 
                                className={idOptionPost === idPost && statusWindowOptionPost === true
                                    ? "box-option show"
                                    : "box-option close"
                                }
                            ></div>

                            {/* window option post */}
                            <div 
                                className={idOptionPost === idPost && statusWindowOptionPost === true 
                                    ? "window_option-post show"
                                    : "window_option-post close"
                                }
                            >
                                {/* edit post button */}
                                <button 
                                    className="btn_edit_post"
                                    onClick={whenClickEditPost}
                                >
                                    {/* icon & span */}
                                    <TiPencil className="btn_icon" style={{color: '#e2e1e1'}} />
                                    <span className="edit_post-text">Edit post</span>
                                </button>
                                {/* delete post button */}
                                <button 
                                    className="btn_delete_post"
                                    onClick={() => deletePost(idPost)}
                                >
                                    {/* icon & span */}
                                    <RiDeleteBin5Line className="btn_icon"/>
                                    <span className="delete_post-text">Delete post</span>
                                </button>
                                {/* delete image button */}
                                <button 
                                    className={img.length !== 0 ? "btn_delete_img show" : "btn_delete_img close"}
                                    onClick={deletePhoto}
                                >
                                    {/* icon & span */}
                                    <TiDocumentDelete className="btn_icon"/>
                                    <span className="delete_img-text">Delete photo</span>
                                </button>
                            </div>
                        </div>

                        {/* Post Center Content */}
                        <div className="post_center">
                            {/* Text */}
                            {/* <p className="post_text">{textInputPost}</p> */}
                            <p className="textPost" ref={refTextPost}>
                                {title}
                            </p>

                            {/* Image */}
                            <ul className="post_content_image moreThanTwo">
                                {img.map((image) => {
                                    idImagesPost++
                                    return(
                                        <li key={idImagesPost}>
                                            <div onClick={() => openListImagesPost()}>
                                                <img src={image.data_url} alt="post-img" />
                                            </div>
                                            <span className="number_moreThanTwo">+{img.length - 2}</span>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </>
                    : null
                }
                

                
            </div>
        </div>
    )
}

//! PropTypes 
PostHasImg.prototype = {
    inputProfileImg: PropTypes.string.isRequired,
    inputProfileName: PropTypes.string.isRequired, 
    onClickShowImage: PropTypes.func.isRequired, 
    id: PropTypes.number.isRequired,
    img: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired, 
    setListImagesPost: PropTypes.func.isRequired,
    openWindowListImagesPost: PropTypes.func.isRequired,
    receiveIdPost: PropTypes.func.isRequired,
    setIndexListImages: PropTypes.func.isRequired,
    feelingStatus: PropTypes.string.isRequired,
    strTime: PropTypes.string.isRequired,
    timeNow: PropTypes.string.isRequire,
    allowDay: PropTypes.bool.isRequire,
    hourPost: PropTypes.number.isRequire,
    minutePost: PropTypes.number.isRequire,
    deletePhotoOnPost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    EditPost: PropTypes.func.isRequired
}