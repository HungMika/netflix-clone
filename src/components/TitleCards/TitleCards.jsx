import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import card_data from "../../assets/cards/Cards_data";
import { Link } from "react-router-dom";

const TittleCards = ({ title, category }) => {
  const CardsRef = useRef();

  const [apiData, setApiData] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDllNzE1OTM0YjU2MmNjN2M3MDQ4NDI5MGEwMGMyNCIsIm5iZiI6MTcyMTUzNTA2My40MjkzNzYsInN1YiI6IjY2OWM4NTVjNjg5NmY4Mzk3NDM3Y2JiMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mN3RJEy-x0HR4CqN4sJyeqBc1Aqoz7vGZo98NrEjiqc",
    },
  };

  const handlewheel = (e) => {
    e.preventDefault();
    CardsRef.current.scrollLeft += e.deltaY;
  };
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => setApiData(response.results))
      .catch((err) => console.error(err));

    CardsRef.current.addEventListener("wheel", handlewheel);
  }, []);
  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={CardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
                alt=""
              />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TittleCards;
