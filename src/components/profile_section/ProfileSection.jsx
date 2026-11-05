
import { useEffect, useRef, useState } from "react";

import "./ProfileSection.css";

import { getProfileApi } from "../../services/api/profileApi";

import boyImage from "../../assets/images/boy.png";
import girlImage from "../../assets/images/girl.avif";

function ProfileSection() {
    const hasFetched = useRef(false);

    const [isLoading, setIsLoading] = useState(true);

    const [profile, setProfile] = useState({
        image: "",
        name: "",
        designation: "Administrator",
    });

    useEffect(() => {
        if (hasFetched.current) return;

        hasFetched.current = true;
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await getProfileApi();

            if (response?.success === true) {
                const data = response?.data;

                const gender = data?.user_gender
                    ?.trim()
                    ?.toLowerCase();

                const defaultImage =
                    gender === "male" ? boyImage : girlImage;

                setProfile({
                    image: data?.profile_photo_url?.trim()
                        ? data.profile_photo_url.trim()
                        : defaultImage,

                    name: data?.user_name?.trim() || "Administrator",

                    designation:
                        data?.designation?.trim() || "Administrator",
                });
            }
        } catch (error) {
            console.log("Profile API Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section
            className={`profile-section ${isLoading ? "profile-shimmer" : ""
                }`}
        >
            {isLoading ? (
                <div className="profile-loading-content">
                    <div className="profile-loading-image" />
                    <div className="profile-loading-name" />
                    <div className="profile-loading-designation" />
                </div>
            ) : (
                <>
                    <div className="profile-image-wrapper">
                        <img
                            src={profile.image}
                            alt={profile.name}
                            className="profile-image"
                            onError={(event) => {
                                event.currentTarget.onerror = null;
                                event.currentTarget.src = boyImage;
                            }}
                        />

                        <span className="profile-online-indicator" />
                    </div>

                    <h2 className="profile-name" title={profile.name}>
                        {profile.name}
                    </h2>

                    <div className="profile-designation-wrapper">
                        <span className="profile-role-dot" />
                        <p className="profile-designation">
                            {profile.designation}
                        </p>
                    </div>
                </>
            )}
        </section>
    );
}

export default ProfileSection;
