import React from "react";
import "./SwipeButtons.css";
import ReplayIcon from "@mui/icons-material/Replay";
import CloseIcon from "@mui/icons-material/Close";
import StarRateIcon from "@mui/icons-material/StarRate";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import { IconButton } from "@mui/material";

function SwipeButtons() {
  return (
    <div className="swipeButtons">
      <IconButton>
        <ReplayIcon fontSize="large" className="swipeButtons__repeat" />
      </IconButton>
      <IconButton>
        <CloseIcon fontSize="large" className="swipeButtons__left" />
      </IconButton>
      <IconButton>
        <FavoriteIcon fontSize="large" className="swipeButtons__right" />
      </IconButton>
    </div>
  );
}

export default SwipeButtons;
