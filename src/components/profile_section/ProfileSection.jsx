import React from "react";
import "./ProfileSectionCSS.css";

function ProfileSection({
    image,
    name,
    designation,
}) {
    return (
        <div className="profile-section">

            <img
                src={image}
                alt={name}
                className="profile-image"
            />

            <h2 className="profile-name">
                {name}
            </h2>

            <p className="profile-designation">
                {designation}
            </p>

        </div>
    );
}

export default ProfileSection;