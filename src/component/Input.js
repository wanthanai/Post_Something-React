//! Import
import React, {useState} from 'react'
import './Input.css'
// PropTypes
import PropTypes from 'prop-types'
// Icon 
import { BsImages } from "react-icons/bs";
import { RiEmotionLaughLine } from "react-icons/ri";
// Images uploading
import ImageUploading from 'react-images-uploading';




//! Variable
// Images Uploading
const acceptType = ['jpeg', 'jpg', 'png', 'gif', 'tiff', 'heif', 'webp', 'svg']
const maxNumber = 69;


//! Function Component
export default function Input({ inputProfileImg, onClickShowImage, inputProfileName, getWindowInput, textInputPost, getUploadImage, images, getStatusFeeling , statusInputMain }) {
    //! State
    // State Image Input Post
    
    


    //! Function Another
    //* 1.Toggle Input Post
    const toggleInput = () => {
        getWindowInput(inputProfileName);
    }

    //* 2.Handle Image Change
    const handleImageChange = (imageList, addUpdateIndex) => {
        // console.log(imageList, addUpdateIndex);
        getUploadImage(imageList, true);
    }; 

    //* 3.Do not open Window Input Post





    //! Main Component
    return(
        //! Container 
        <div className="container">
            {/*//! header image */}
            <div className="header_img">
               {/* background image  */}
            </div>

            {/*//! input main */}
            <div className="input_main_wrapper">
                {/*//! main top */}
                <div className="main_top">

                    {/* top profile */}
                    <div className="top_profile_wrapper">
                        <div onClick={() => onClickShowImage(inputProfileImg)} className="top_profile" style={{
                            background: inputProfileImg !== null
                            ? `url('${inputProfileImg}') no-repeat center/cover`
                            : `#fff`
                        }}>
                        </div>
                    </div>

                    {/* top input */}
                    {textInputPost !== '' 
                        ?  <div onClick={toggleInput} className="LinesEllipsis top_input">{textInputPost.length > 40 ? `${textInputPost}...` : `${textInputPost}`}</div>   
                        : <div onClick={toggleInput} className="top_input">{inputProfileName !== '' ? `What are you thinking? ${inputProfileName}` : 'What are you thinking? ...'}</div>
                    }
                </div>
                {/*//! main bottom */}
                <div className="main_bottom">
                    {/* bottom image */}
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
                            <div 
                                className="bottom_image"
                                onClick={onImageUpload}
                            >
                                <BsImages 
                                    style={{
                                    marginRight: '10px',
                                    color: '#45bd62',
                                    fontSize: '23px'
                                }}/>
                                Image
                            </div>    
                        )}
                    </ImageUploading>

                    {/* bottom feeling */}
                    <div 
                        className="bottom_feeling"
                        onClick={() => getStatusFeeling(true)}
                    >
                        <RiEmotionLaughLine 
                            style={{
                            marginRight: '10px',
                            color: '#f7b928',
                            fontSize: '23px'
                        }}/>
                        Feeling
                    </div>
                </div>
            </div>
            
        </div>
    )
}

//! PropTypes 
Input.propTypes = {
    inputProfileImg: PropTypes.string,
    onClickShowImage: PropTypes.func.isRequired,
    inputProfileName: PropTypes.string.isRequired,
    getWindowInput: PropTypes.func.isRequired, 
    textInputPost: PropTypes.string.isRequired, 
    getUploadImage: PropTypes.func.isRequired,
    images: PropTypes.object.isRequired, 
    getStatusFeeling: PropTypes.func.isRequired, 
    statusInputMain: PropTypes.bool.isRequired
}