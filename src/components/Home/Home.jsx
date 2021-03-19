import React, { useState } from "react";
import bemCssModules from "bem-css-modules";
import Dropzone from "react-dropzone";
import CSVReader from "react-csv-reader";

import { default as HomeStyles } from "./Home.module.scss";
import axios from "axios";

const style = bemCssModules(HomeStyles);

const Home = () => {
  const [info, setInfo] = useState({
    UniqueName: "",
    ConfirmationDueDate: "2021-03-18T14:17",
  });
  const [ChurchWeddingInfo, setChurchWeddingInfo] = useState({
    StartDate: "2021-03-18T14:17",
    Location: {
      Latitude: "21.1",
      Longitude: "20.2",
    },
    PlaceName: "",
    PlaceAddress: "",
  });
  const [PartyWeddingInfo, setPartyWeddingInfo] = useState({
    StartDate: "2021-03-18T14:17",
    Location: {
      Latitude: "21.1",
      Longitude: "20.2",
    },
    PlaceName: "",
    PlaceAddress: "",
  });

  const [guests, setGuests] = useState(null);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const result = {
      ...info,
      ChurchWeddingInfo: { ...ChurchWeddingInfo },
      PartyWeddingInfo: { ...PartyWeddingInfo },
    };

    let formData = new FormData();
    formData.append("wedding", JSON.stringify(result));
    formData.append("guests", guests);

    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
        ApiKij: "12nfhfkjaha983ZKsakjh12989S11",
      },
    };

    axios
      .post(
        "https://weddingonline-test.azurewebsites.net/api/ucantguessit",
        formData,
        config
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onInputChange = (event) => {
    const { name, value } = event.target;

    setInfo({
      ...info,
      [name]: value,
    });
  };
  const onInputChangeChurchWeddingInfo = (event) => {
    const { name, value } = event.target;

    setChurchWeddingInfo({
      ...ChurchWeddingInfo,
      [name]: value,
    });
  };
  const onInputChangePartyWeddingInfo = (event) => {
    const { name, value } = event.target;

    setPartyWeddingInfo({
      ...PartyWeddingInfo,
      [name]: value,
    });
  };

  const handleChange = (e) => {
    setGuests(e.target.files[0]);
  };

  return (
    <div className={style("")}>
      <form onSubmit={handleOnSubmit}>
        <input
          className={style("input")}
          placeholder="Podaj nazwe wesela"
          name="UniqueName"
          type="text"
          step="1"
          value={info.UniqueName}
          onChange={onInputChange}
        />
        <input
          className={style("input")}
          placeholder="Podaj datę potwierdzenia"
          name="ConfirmationDueDate"
          type="datetime-local"
          value={info.ConfirmationDueDate}
          onChange={onInputChange}
        />
        {/* churchWeddingInfo */}
        <input
          className={style("input")}
          placeholder="Podaj datę potwierdzenia"
          name="StartDate"
          type="datetime-local"
          value={ChurchWeddingInfo.StartDate}
          onChange={onInputChangeChurchWeddingInfo}
        />
        {/* <input
          className={style("input")}
          placeholder="Lokacja"
          name="Location"
          type="text"
          value={ChurchWeddingInfo.Location}
          onChange={onInputChangeChurchWeddingInfo}
        /> */}
        <input
          className={style("input")}
          placeholder="Nazwaw miejsca ślubu"
          name="PlaceName"
          type="text"
          value={ChurchWeddingInfo.PlaceName}
          onChange={onInputChangeChurchWeddingInfo}
        />
        <input
          className={style("input")}
          placeholder="Adres miejsca ślubu"
          name="PlaceAddress"
          type="text"
          value={ChurchWeddingInfo.PlaceAddress}
          onChange={onInputChangeChurchWeddingInfo}
        />
        {/* partyWeddingInfo */}
    
        <input
          className={style("input")}
          placeholder="Podaj datę potwierdzenia"
          name="StartDate"
          type="datetime-local"
          value={PartyWeddingInfo.StartDate}
          onChange={onInputChangePartyWeddingInfo}
        />
        {/* <input
          className={style("input")}
          placeholder="lokalizacja"
          name="Location"
          type="text"
          value={PartyWeddingInfo.Location}
          onChange={onInputChangePartyWeddingInfo}
        /> */}
        <input
          className={style("input")}
          placeholder="Nazwa miejsca wesela"
          name="PlaceName"
          type="text"
          value={PartyWeddingInfo.PlaceName}
          onChange={onInputChangePartyWeddingInfo}
        />
        <input
          className={style("input")}
          placeholder="Adres miejsca wwesela"
          name="PlaceAddress"
          type="text"
          value={PartyWeddingInfo.PlaceAddress}
          onChange={onInputChangePartyWeddingInfo}
        />

        <input className={style("file")} type="file" id="file" onChange={handleChange} />

        <button>Wyslij</button>
      </form>
    </div>
  );
};

export default Home;
