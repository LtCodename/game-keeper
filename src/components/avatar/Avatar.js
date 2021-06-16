import React, { useEffect, useState } from "react";
import "./Avatar.css";
import fire from "../../Firebase";
import { CameraIcon, DeleteAvatarIcon } from "../../IconsLibrary";

const Avatar = ({ onImageLoad, src, userData }) => {
  const [showInput, setShowInput] = useState(true);
  const [source, setSource] = useState(src);

  const pictureInputRef = React.createRef();

  useEffect(() => {
    if (src) {
      setSource(src);
    } else {
      setSource("https://u.o0bc.com/avatars/stock/_no-user-image.gif");
    }

    setShowInput(false);

    setTimeout(() => {
      setShowInput(true);
    }, 0);
  }, [src]);

  const handleClick = () => {
    pictureInputRef.current.click();
  };

  const uploadChange = (event) => {
    if (onImageLoad) {
      const file =
        event && event.target && event.target.files && event.target.files[0];
      const fileDataReader = new FileReader();
      fileDataReader.addEventListener(
        "load",
        function () {
          onImageLoad(fileDataReader.result);

          const ref = fire.storage().ref();
          const name = userData.uid;
          const metadata = { contentType: file.type };

          const task = ref.child(`avatars/${name}`).put(file, metadata);
          task
            .then((snapshot) => snapshot.ref.getDownloadURL())
            .catch(console.error);
        },
        false
      );
      fileDataReader.readAsDataURL(file);
    }
  };

  const fileUploader = (
    <input
      type="file"
      accept="image/*"
      className="profile-avatar-input"
      ref={pictureInputRef}
      onChange={uploadChange}
    />
  );

  const errorHandler = () => {
    setSource("https://u.o0bc.com/avatars/stock/_no-user-image.gif");
  };

  const deleteAvatar = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const ref = fire.storage().ref();
    ref
      .child(`avatars/${userData.uid}`)
      .delete()
      .then(() => {
        setSource("https://u.o0bc.com/avatars/stock/_no-user-image.gif");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteButton = (
    <button className={"profile-avatar-delete-wrapper"} onClick={deleteAvatar}>
      <span className={"profile-avatar-delete shake-little"}>
        {DeleteAvatarIcon}
      </span>
      <span className={"profile-avatar-delete-text"}>Delete Avatar</span>
    </button>
  );

  return (
    <span onClick={handleClick} className={"profile-avatar-wrapper"}>
      {showInput ? fileUploader : ""}
      <img
        className={"profile-avatar"}
        src={source}
        onError={errorHandler}
        alt={""}
      />
      <span className={"profile-avatar-overlay"}>
        <span className={"profile-avatar-overlay-icon"}>{CameraIcon}</span>
      </span>
      {source === "https://u.o0bc.com/avatars/stock/_no-user-image.gif"
        ? ""
        : deleteButton}
    </span>
  );
};

export default Avatar;
