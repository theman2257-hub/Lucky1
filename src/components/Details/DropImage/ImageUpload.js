import React, { useState } from "react";
import { galleryIcon } from "../../../images/images";
import styles from "./styles.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAccount } from "wagmi";

function ImageUpload({ setImgurl, owner }) {
  const { id } = useParams();
  let { address } = useAccount();
  const [dragging, setDragging] = useState(false);
  const [image, setImage] = useState(null);
  const [imgLink, setImgLink] = useState("");

  function handleDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  }

  function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5 MB");
      return;
    }
    // if (address != owner) {
    //   alert("****Unauthorized Transaction **** This transaction can only be performed by the Lottery Creator")
    //   return
    // }
    const reader = new FileReader();
    reader.onload = async () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  }

  const updateImages = async (link) => {
    console.log(id);
    let url = `https://api.lucky1.io/updateImage`;
    const { data } = await axios.post(url, {
      // lotteryAddress: receipt.events[0].args.lottery,
      lotteryAddress: id,
      image: link,
    });
    console.log(data);
    // window.open(`${window.location.origin}/profile/${address}`)
  };

  async function handleInputChange(e) {
    console.log("in");
    const file = e.target.files[0];
    if (file.size >= 4 * 1024 * 1024) {
      alert("File size must be less than 5 MB");
      return;
    }

    console.log(address, owner);
    if (address != owner) {
      alert(
        "****Unauthorized Transaction **** This transaction can only be performed by the Lottery Creator"
      );
      return;
    }

    let api = "c0b85f37e4766cfbb8a9155a76cbf379";
    let url = `https://api.imgbb.com/1/upload?expiration=600&key=${api}`;

    let formData = new FormData();
    formData.append("image", file);

    // const { data } = await axios.post(url, formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });
    let url2 = `https://api.lucky1.io/updateImage/${id}`;
    const { data } = await axios.post(url2, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
    window.location.reload();
  }

  return (
    <div className={`${styles.wrapper} ${dragging ? styles.dragging : ""}`}>
      <div
        className={`${styles.dropzone} `}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {!image && (
          <img src={galleryIcon} alt="Droppedimage" className={styles.icon} />
        )}
        {image ? (
          <img
            src={image}
            alt="Droppedimage"
            className={styles.upLoadedImage}
          />
        ) : (
          <div className={styles.textContainer}>
            <p className={styles.text}>Drop Your Files Here</p>
            <span className={styles.warning}>Maximum size of image 4 MB</span>
          </div>
        )}
      </div>
      <label htmlFor="upload" className={styles.button}>
        <span className={styles.buttonText}>Browse Images</span>

        <input
          type="file"
          id="upload"
          onChange={handleInputChange}
          accept="image/*"
          className={styles.uploadInput}
        />
      </label>
    </div>
  );
}

export default ImageUpload;
