import {
  TextField,
  TextFieldProps
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

const EnclosingPage = () => {

  const navigate = useNavigate()

  const txtClientId = useRef<TextFieldProps>(null)
  const txtSessionId = useRef<TextFieldProps>(null)

  const onClickSave = () => {
    /* const iFrameCnt = iframeRef.current;
     setLoading(true);
     setShow(false);
     setTimeout(() => {
       setShow(true)
     }, 40);*/

    //console.log('txtClientId ==>', txtClientId.current?.value)

    const sessionId = txtSessionId.current?.value;
    const clientId = txtClientId.current?.value;

    navigate(`/paymentPage/${clientId}/${sessionId}`)
  }

  /*useEffect(() => {
    const iFrameCnt = iframeRef.current;
    if (iFrameCnt)
      iFrameCnt.style.display = 'none';
  }, [])*/


  return (
    <div className="pageContainer">
      <div className="bold-change mbot">
        <div className="bold-change info-header" data-testid="typography">
          Review Reservation
        </div>
        <div className="divider"></div>
        <form className="">
          <div className="mbot">
            <div className=" mbot">
              <TextField
                id="filled-basic"
                label="Client ID"
                variant="filled"
                className="bold-change"
                inputRef={txtClientId}
                InputLabelProps={{
                  style: {
                    fontWeight: 700,
                    fontSize: "13px",
                    marginTop: "4px",
                  },
                }}
                inputProps={{
                  style: { fontWeight: "bold", width: "640px" },
                }}
              />
            </div>
            <div className="">
              <TextField
                id="filled-basic"
                label="Session ID"
                variant="filled"
                className="bold-change"
                inputRef={txtSessionId}
                InputLabelProps={{
                  style: {
                    fontWeight: 700,
                    fontSize: "13px",
                    marginTop: "4px",
                  },
                }}
                inputProps={{
                  style: { fontWeight: "bold", width: "640px" },
                }}
              />
            </div>
          </div>
          <div data-testid="divider" className="divider"></div>
        </form>
        <button className="mbot" onClick={onClickSave}>
          Go To Payment
        </button>

      </div>
    </div>
  );
};

export default EnclosingPage;
