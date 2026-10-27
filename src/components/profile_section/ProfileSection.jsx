import { useEffect, useState } from "react";

import "./ProfileSectionCSS.css";

import { getProfileApi } from "../../services/api/profileApi";

import boyImage from "../../assets/images/boy.png";
import girlImage from "../../assets/images/girl.avif";


function ProfileSection() {

    const [isLoading, setIsLoading] = useState(true);

    const [profile, setProfile] = useState({
        image: "",
        name: "",
        designation: "",
    });


    useEffect(() => {
        fetchProfile();
    }, []);


    const fetchProfile = async () => {

        setIsLoading(true);

        try {

            const response = await getProfileApi();

            if (response?.success === true) {

                const data = response?.data;

                const gender =
                    data?.user_gender
                        ?.trim()
                        ?.toLowerCase();

                const defaultImage =
                    gender === "male"
                        ? boyImage
                        : girlImage;


                setProfile({
                    image:
                        data?.profile_photo_url?.trim()
                            ? data.profile_photo_url
                            : defaultImage,

                    name:
                        data?.user_name ?? "",

                    designation:
                        data?.designation ||
                        "Administrator",
                });
            }

        } catch (error) {

            console.log(
                "Profile API Error:",
                error
            );

        } finally {

            setIsLoading(false);
        }
    };


    return (
        <div
            className={`profile-section ${isLoading
                ? "profile-shimmer"
                : ""
                }`}
        >

            {!isLoading && (
                <>

                    <img
                        src={profile.image}
                        alt={profile.name || "Profile"}
                        className="profile-image"

                        onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src = boyImage;
                        }}
                    />


                    <h2 className="profile-name">
                        {profile.name}
                    </h2>


                    <p className="profile-designation">
                        {profile.designation}
                    </p>

                </>
            )}

        </div>
    );
}


export default ProfileSection;