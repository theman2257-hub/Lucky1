import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { beast } from "../../images/images";
import AllTickets from "../../components/Details/AllTickets/AllTickets";
import TicketDetails from "../../components/Details/TicketDetails/TicketDetails";
import styles from "./styles.module.css";
import ChatBox from "../../components/Details/ChatBox/ChatBox";
import ExploreLotteryCareds from "../../components/ExpoloreLotteryCards/ExploreLotteryCareds";
import NftDescription from "../../components/Details/NftDescription/NftDescription";
import BuyNowModal from "./Modal/BuyNow";
import CompetitionEnded from "./Modal/CompetitionEnded";
import ImageUpload from "../../components/Details/DropImage/ImageUpload";
import axios from "axios";
const Details = () => {
  const { id, affiliateAddress } = useParams();
  const [buyNowModal, setBuyNowModal] = useState(false);
  const [competitionEndedModal, setCompetitionEndedModal] = useState(false);
  const [hash, setHash] = useState("");
  const [numberOfWinners, setNumberOfWinners] = useState("");
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");
  const [owner, setOwner] = useState("");
  const [lotteryAddress, setLotteryAddress] = useState("");
  const [descriptionModal, setDescriptionModal] = useState(false);
  const location = useLocation();

  const fetchDescription = async () => {
    const { data } = await axios.get(`https://api.lucky1.io/getDesc/${id}`);
    console.log("data", data);
    setDescription(data.description);
  };

  const fetchHash = async () => {
    const { data } = await axios.get(`https://api.lucky1.io/getHash/${id}`);
    console.log("data", data);
    /**
     * @todo: change this back
     */
    setHash(data.hash);
  };
  React.useEffect(() => {
    fetchDescription();
    fetchHash();
  }, []);

  React.useEffect(() => {
    if (location.state) {
      // pop up the description modal
      console.log(location.state);
      setDescriptionModal(location.state.createdNow);
    }
  }, [location.state]);

  console.log("owner", owner);
  console.log("img", img);
  return (
    <>
      <div className={styles.detailsContainer}>
        <div className="container">
          {" "}
          <div className={styles.details}>
            {img !=
            "https://assets-global.website-files.com/637359c81e22b715cec245ad/63f5feb3302f223a19af4dca_Midnight%20society.png?2322232" ? (
              <img src={img} alt="#" className={styles.image} />
            ) : (
              <ImageUpload owner={owner} />
            )}

            <TicketDetails
              setOwner={setOwner}
              setNumberOfWinners={setNumberOfWinners}
              setHash={setHash}
              setDescription={setDescription}
              setCompetitionEndedModal={setCompetitionEndedModal}
              setImg={setImg}
              setAddress={setLotteryAddress}
              affiliateAddress={
                affiliateAddress || "0x0000000000000000000000000000000000000000"
              }
            />
          </div>
          <div
            className={[styles.details, styles.ticketAndDescription].join(" ")}
          >
            {" "}
            <AllTickets />
            <NftDescription
              creator={owner}
              description={description}
              setDescription={setDescription}
              lotteryAddress={lotteryAddress}
              setModal={descriptionModal}
            />
          </div>
        </div>
        <ExploreLotteryCareds slice={4} />
      </div>
      {buyNowModal && (
        <BuyNowModal
          setModal={setBuyNowModal}
          setCompetitionEndedModal={setCompetitionEndedModal}
        />
      )}
      {competitionEndedModal && (
        <CompetitionEnded
          hash={hash}
          numberOfWinners={numberOfWinners}
          setModal={setCompetitionEndedModal}
          setBuyNowModal={setBuyNowModal}
        />
      )}
    </>
  );
};

export default Details;
