import React, {useState} from 'react'
import PropTypes from 'prop-types'

// style css
import './Navbar.css';
import './responsive.css'


//! Function Component
export default function Navbar({ getInfoNavbar, getStatusInputPost, clearStatusFeeling, clearImagesPost, toggleWindowOptionPost, isWindowNavbar, toggleWindowNavbar, onClickCloseImage }) {
    //! State Image
    const [imgURL, setImgURL] = useState(null);    
    const [imgPreview, setImgPreview] = useState(null);
    const [reserveImgURL, setReserveImgURL] = useState(null);
    //! State Name
    const [inputName, setInputName] = useState('');
    const [profileName, setProfileName] = useState('');
    //! State Error
    const [error, setError] = useState(false);
    const [length5Error, setLength5Error] = useState(false);
    const [length15Error, setLength15Error] = useState(false);


    //! handle image change 
    const handleImageChange = (e) => {
        const selected = e.target.files[0];
        const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png"]

        // matching types
        if(selected && ALLOWED_TYPES.includes(selected.type)) {
            let reader = new FileReader(); // constructor method or object property
            reader.readAsDataURL(selected); // read ตัว selected ให้เป็น Data URL แล้วผลลัพธ์จะอยู่ที่ reader.result
            reader.onloadend = () => { // เมื่ออ่านเเละโหลดตัวไฟล์เสร็จเเล้ว ก็จะให้เข้าไปทำใน Arrow function
                setImgURL(reader.result);
                setReserveImgURL(reader.result);
                setError(false);
            }
        } else { // if they don't match, they will be set error.
            setError(true);
            // setLength5Error(false);
            // setLength15Error(false);
        }
    }
    //! check image change
    const checkImageChange = (e) => {
        if(imgURL === null) {
            setImgURL(reserveImgURL);
        }
    }


    //! show custom profile
    const showCustomProfile = () => {
        toggleWindowNavbar('toggle');
        // Do not open Window Input Post
        getStatusInputPost(false);
        // close window option post
        toggleWindowOptionPost('close', 0);
        // close image showing
        onClickCloseImage();
    }
    //! close custom profile
    const closeCustomProfile = () => {
        toggleWindowNavbar('close');
        // close error when window closed
        setError(false);
        setLength5Error(false);
        setLength15Error(false);
        // setInputName = '' when window closed 
        setInputName('');
    }

    //! Set Name
    const onChangeSetName = (evt) => {
        let resultName = evt.target.value;
        if(resultName.length > 0 && resultName.length < 5) {
            setInputName(resultName);
            setLength5Error(true);
            setLength15Error(false);
        } else if(resultName.length > 15) {
            setInputName(resultName);
            setLength5Error(false);
            setLength15Error(true);
        } else if(resultName.length === 0) {
            setInputName(resultName);
            setLength5Error(false);
            setLength15Error(false);
        } else {
            setInputName(resultName);
            setLength5Error(false);
            setLength15Error(false);
        }
    }

    //! Save profile 
    const onClickSaveProfile = () => {
        if(inputName !== '') {
            if(inputName.length < 5) {
                setLength5Error(true);
                setLength15Error(false);
            } else if(inputName.length > 15) {
                setLength5Error(false);
                setLength15Error(true);
            } else if(error === true || length5Error === true || length15Error === true) {
                // can't close
                toggleWindowNavbar('show');
            }  
            else {
                // set name
                setProfileName(inputName);
                // set image
                setImgPreview(imgURL);
                // clear state
                setInputName('');
                // close window custom profile
                toggleWindowNavbar('close');
                // set Error
                setLength5Error(false);
                setLength15Error(false);
                setError(false);
                // call function getInfoNavbar at Input component
                getInfoNavbar(imgURL, inputName);
            } 
        } else if(error === true || length5Error === true || length15Error === true) {
            toggleWindowNavbar('show');
        } else {
            // set name
            setProfileName(profileName);
            // set image
            setImgPreview(imgURL);
            // clear state
            setInputName('');
            // close window custom profile
            toggleWindowNavbar('close');
            // call function getInfoNavbar at Input component
            getInfoNavbar(imgURL, profileName);
        }


    }

    //! clear profile
    const clearProfile = () => {
        toggleWindowNavbar('close');
        setProfileName('');
        setInputName('');
        setImgPreview(null);
        setImgURL(null);
        //error
        setLength5Error(false);
        setLength15Error(false);
        setError(false);
        // call function getInfoNavbar at Input component
        getInfoNavbar(null, '');
        // Do not open Window Input Post
        getStatusInputPost(true);
        // Clear ImagesPost in Input Post
        clearImagesPost();
        // Clear Status Feeling in Input Post
        clearStatusFeeling();
    }


    //! Component
    return (
        //! container
        <div className="navbar_container">
            <div className="navbar_wrapper">
                {/* //! Navbar */}
                <header className="navbar_header">
                    {/* logo */}
                    <a href="/">Post Something</a>

                    {/* profile */}
                    <div onClick={showCustomProfile} className="navbar_profile_wrapper">
                        <div id="customProfile" className="customFileUpload">
                            {/* profile image */}
                            <div className="navbar_profile_img" style={{
                                background: imgPreview 
                                ? `url('${imgPreview}') no-repeat center/cover`
                                : `#fff`
                            }}>
                            </div>
                            {/* profile name */}
                            <div className="nav_profile_name">
                                {typeof profileName && profileName.length <= 15 && profileName.length >= 5
                                    ? <p>{profileName}</p>
                                    : <p>Enter name</p>
                                }
                            </div>
                        </div>
                    </div>

                    {/* icon social media */}
                    <div className="navbar_icon">
                        <a rel="noopener noreferrer" href="https://github.com/wanthanai" target="_blank"><i class="fab fa-github"></i></a>
                        <a rel="noopener noreferrer" href="https://www.facebook.com/wanthanaiK/" target="_blank"><i class="fab fa-facebook"></i></a>
                        <a rel="noopener noreferrer" href="https://mail.google.com/mail/u/1/?hl=th&view=cm&tf=1&fs=1&to=%22wanthanai%20kaiphet%22%20%3Cwanthanai4Work%40gmail.com%3E" target="_blank"><i class="fas fa-envelope"></i></a>
                    </div>
                </header>

                {/*//! window custom profile */}
                <div className="window_profile" style={{
                    display: isWindowNavbar === true
                    ? 'flex'
                    : 'none'
                }}> 
                    {/*//! close custom profile */}
                    <button onClick={closeCustomProfile} className="closeWindow">close</button>
                    {/*//! error message */}
                    <p className="errorMsg">{error && `Supported Types (jpeg, jpg, png)`}</p>
                    {length5Error && <p className="errorMsg">Name' must be at least 5 char.</p>}
                    {length15Error && <p className="errorMsg">Name' cannot exceed 15 char.</p>}
                    {/*//! set name */}
                    <input onChange={onChangeSetName} value={inputName} type="text" className="set_name" placeholder="please enter name..." />
                    {/*//! upload file */}
                    <label htmlFor="fileUpdate" className="window_uploadFile">change image</label>
                    <input onClick={checkImageChange} onChange={handleImageChange} type="file" id="fileUpdate" />
                    {/*//! save profile */}
                    <button onClick={onClickSaveProfile} className="btn_save_profile">save</button>
                    {/*//! clear profile */}
                    <button onClick={clearProfile} className="btn_clear">clear</button>
                </div>
            </div>
        </div>
    )
}

//! PropTypes 
Navbar.propTypes = {
    getInfoNavbar: PropTypes.func.isRequired, 
    getStatusInputPost: PropTypes.func.isRequired,
    clearStatusFeeling: PropTypes.func.isRequired,
    toggleWindowOptionPost: PropTypes.func.isRequired, 
    isWindowNavbar: PropTypes.bool.isRequired,
    toggleWindowNavbar: PropTypes.func.isRequired, 
    onClickCloseImage: PropTypes.func.isRequired
}