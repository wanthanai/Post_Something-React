//! Import
import React, { useRef, useState } from 'react'
import './Post.css'
// Icon
import { HiDotsHorizontal } from "react-icons/hi";
// PropTypes
import PropTypes from 'prop-types';



//! Variable
let idImagesPost = 1;


//! Main Component
export default function PostHasImg ({inputProfileImg, inputProfileName, onClickShowImage, idPost, img, title, setUrlShowImage, setListImagesPost, openWindowListImagesPost, receiveIdPost, setIndexListImages }) {
    //! useState
    
    //! useRef
    const refTextPost = useRef(null);
    

    // if(textInputPost !== '') {
    //     setWidthTextPost(refTextPost.current.children[0].offsetWidth);
    // } 


    //! Function
    //* 1. open window show list images post
    const openListImagesPost = async() => {
        // setState
        await setListImagesPost(img);
        await receiveIdPost(idPost);
        await openWindowListImagesPost();
        await setIndexListImages();
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
                                {/* name */}
                                <p className="post_name">{inputProfileName ? inputProfileName : 'Enter Name..'}</p>
                                {/* time */}
                                <p className="post_time">now.</p>
                            </div>

                            {/* top right */}
                            <div className="post_top_right">
                                <HiDotsHorizontal className="post_dot" />
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
                                {/* name */}
                                <p className="post_name">{inputProfileName ? inputProfileName : 'Enter Name..'}</p>
                                {/* time */}
                                <p className="post_time">now.</p>
                            </div>

                            {/* top right */}
                            <div className="post_top_right">
                                <HiDotsHorizontal className="post_dot" />
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
                                            <img onClick={() => setUrlShowImage(img.data_url)} src={img.data_url} alt="post-img" />
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
                                {/* name */}
                                <p className="post_name">{inputProfileName ? inputProfileName : 'Enter Name..'}</p>
                                {/* time */}
                                <p className="post_time">now.</p>
                            </div>

                            {/* top right */}
                            <div className="post_top_right">
                                <HiDotsHorizontal className="post_dot" />
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
                                            <img onClick={() => setUrlShowImage(img.data_url)} src={img.data_url} alt="post-img" />
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
                                {/* name */}
                                <p className="post_name">{inputProfileName ? inputProfileName : 'Enter Name..'}</p>
                                {/* time */}
                                <p className="post_time">now.</p>
                            </div>

                            {/* top right */}
                            <div className="post_top_right">
                                <HiDotsHorizontal className="post_dot" />
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
    setUrlShowImage: PropTypes.func.isRequired,
    setListImagesPost: PropTypes.func.isRequired,
    openWindowListImagesPost: PropTypes.func.isRequired,
    receiveIdPost: PropTypes.func.isRequired,
    setIndexListImages: PropTypes.func.isRequired
}