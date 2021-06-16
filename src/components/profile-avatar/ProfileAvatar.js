import React, { useContext, useEffect, useState } from "react";
import Avatar from "../avatar/Avatar";
import { GameKeeperContext } from "../../App";

const ProfileAvatar = ({ userData }) => {
  const { avatarSrc, rewriteAvatar } = useContext(GameKeeperContext);

  const [avatarPath, setAvatarPath] = useState(
    avatarSrc || "https://u.o0bc.com/avatars/stock/_no-user-image.gif"
  );

  useEffect(() => {
    setAvatarPath(avatarSrc);
  }, [avatarSrc]);

  const handleImageLoad = (src) => {
    setAvatarPath(src);
    rewriteAvatar(src);
  };

  return (
    <Avatar
      src={avatarPath}
      onImageLoad={handleImageLoad}
      userData={userData}
    />
  );
};

export default ProfileAvatar;
