import React, { useState } from "react";
import AllItems from "../../components/Profile/AllItems/AllItems";

import Banner from "../../components/Profile/Banner/Banner";

import UserInfo from "../../components/Profile/UserInfo/UserInfo";

const Profile = () => {
  const [participatedItems, setParticipatedItems] = useState(false);

  const [createdCount, setCreatedCount] = useState(0);
  return (
    <div>
      <Banner />
      <UserInfo
        createdCount={createdCount}
        participatedItems={participatedItems}
        setParticipatedItems={setParticipatedItems}
      />
      <AllItems setCreatedCount={setCreatedCount} setParticipatedItems={setParticipatedItems} participatedItems={participatedItems} />
    </div>
  );
};

export default Profile;
