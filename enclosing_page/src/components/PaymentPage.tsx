import React, { FC, useEffect, useState, useRef, SyntheticEvent } from "react";
import { useParams } from "react-router-dom";

import { TextField } from "@mui/material";

const randomId = function (length = 6) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
};

function cb1FormIFrame(value: string = "") {
  console.log("cb1FormIFrame ==>", value);
}

const PaymentPage: FC = () => {
  const [isloading, setLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [phoneNumber, setPhoneNumber] = useState("123456789");
  const [email, setEmail] = useState("johndoe@email.com");
  const [grandTotal, setGrandTotal] = useState(7260.86);
  const [paymentDueNow, setPaymentDueNow] = useState(6903.71);
  const [paymentDueResort, setPaymentDueResort] = useState(357.15);
  const [show, setShow] = useState(false);

  const [orderAmount, setOrderAmount] = useState(0);
  const [authorizedAmount, setAuthorizedAmount] = useState(0);

  const params = useParams();

  const [disablePurchaseButton, setDisablePurchaseButton] = useState(true);

  //console.log('SessionId ==>', params.sessionId, ' ClientID ==>', params.clientId)

  useEffect(() => {
    const iFrameCnt = iframeRef.current;

    if (iFrameCnt) {
      const messagetoFrame = {
        clientId: params.clientId,
        sessionId: params.sessionId,
      };

      window.addEventListener("message", (ev: MessageEvent) => {
        const parmas = ev.data;

        if (iFrameCnt.contentWindow) {
          iFrameCnt.contentWindow.postMessage(messagetoFrame, "*");
        }

        setLoading(false);
        if (parmas && parmas.height && parmas.width) {
          iFrameCnt.height = parmas.height + 40;
          iFrameCnt.width = parmas.width + 10;
        }

        if (parmas && parmas.enablePurchaseButton) {
          setDisablePurchaseButton(!parmas.enablePurchaseButton)
        }

      });
    }
  }, [isloading]);

  const retirveSessionData = async (sessionId: string, clientId: string) => {
    const reponse = await fetch("http://localhost:9091/retrieveSession", {
      method: "GET",
      headers: {
        clientId: clientId,
        JWTToken: "sfsd343434",
        MGMToken: "sdsdfds1223232",
        sessionId: sessionId,
      },
    });

    const data = await reponse.json();

    const { orderAmount, authorizedAmount } = data.paymentSessionResponseDTO;
    setAuthorizedAmount(authorizedAmount);
    setOrderAmount(orderAmount);
    //console.log('retirveSessionData data ==>', data)
  };

  // useEffect(() => {
  //   if (params && params.sessionId && params.clientId) {
  //     //console.log('sessionId ==>', params.sessionId, ' clientId==> ', params.clientId)
  //     retirveSessionData(params.sessionId, params.clientId);
  //   }
  // }, []);

  const onCompletePurchase = (ev: SyntheticEvent) => {
    console.log('onCompletePurchase')
  }

  return (
    <div className="App">
      {isloading && (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      )}
      <div className="pageContainer">
        <div className="bold-change mbot">
          <div className="bold-change info-header" data-testid="typography">
            Payment Page
          </div>
          <div data-testid="Timer" className="month-year timer">
            <svg
              viewBox="0 0 31.7 31.7"
              width="1em"
              height="1em"
              focusable="false"
            >
              <path d="M15.8,0C7.1,0,0,7.1,0,15.8c0,8.7,7.1,15.8,15.8,15.8c8.7,0,15.8-7.1,15.8-15.8C31.7,7.1,24.6,0,15.8,0z M15.8,30C8,30,1.7,23.7,1.7,15.8C1.7,8,8,1.7,15.8,1.7C23.7,1.7,30,8,30,15.8S23.7,30,15.8,30z"></path>
              <path d="m25.6 19.1c-1.5 4.6-6 7.5-10.9 7s-8.6-4.3-9.1-9.1 2.3-9.3 6.9-10.9l-0.6-1.6c-5.3 1.8-8.6 7.1-8 12.7s5.1 10 10.6 10.6c5.6 0.6 10.8-2.8 12.6-8.1l-1.5-0.6z"></path>

              <path d="m15.9 18.3c1.1 0 2-0.7 2.4-1.7h8.5v-1.6h-8.5c-0.3-0.7-0.8-1.3-1.5-1.5v-9.3h-1.8v9.3c-1.1 0.4-1.8 1.6-1.6 2.8 0.2 1.1 1.3 2 2.5 2zm0-3.3c0.5 0 0.8 0.4 0.8 0.8 0 0.5-0.4 0.8-0.8 0.8-0.5 0-0.8-0.4-0.8-0.8-0.1-0.4 0.3-0.8 0.8-0.8z"></path>
            </svg>

            <div className="">Complete Purchase in 20:10</div>
          </div>

          <div className="">
            <div className="div-splitter">
              <div className="">Grand Total (1 item)</div>
              <div className="">${grandTotal}</div>
            </div>
            <div data-testid="divider" className="divider"></div>
            <div className="div-splitter">
              <div className="">Payment Due Now</div>
              <div className="">${paymentDueNow}</div>
            </div>
            <div className="div-splitter">
              <div className="">Due at Resort</div>
              <div className="">${paymentDueResort}</div>
            </div>
            <div className="divider"></div>
          </div>

          <form className="">
            <div className="info-header">Guest Information</div>
            <div className="mbot">
              <div className=" mbot">
                <TextField
                  id="filled-basic"
                  label="First Name"
                  variant="filled"
                  className="bold-change"
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
                  label="Last Name"
                  variant="filled"
                  className="bold-change"
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

            <div className="mbot">
              <TextField
                id="filled-basic"
                label="Phone Number"
                variant="filled"
                className="bold-change"
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
            <div className="mbot">
              <TextField
                id="filled-basic"
                label="Email"
                variant="filled"
                className="bold-change"
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
          </form>
          <div className="">
            <div data-testid="divider" className="divider"></div>
            <div className="div-splitter">
              <div className="">Order Detail</div>
            </div>
            <div data-testid="divider" className="divider"></div>
            <div className="div-splitter">
              <div className="">Order Amount</div>
              <div className="">${orderAmount}</div>
            </div>
            <div className="div-splitter">
              <div className="">Authorized Amount</div>
              <div className="">${authorizedAmount}</div>
            </div>
            <div className="divider"></div>
          </div>
        </div>

        <div data-testid="divider" className="divider"></div>
        <iframe
          id="paymentWidget"
          width={704}
          src={`http://127.0.0.1:3000/test?sa=${randomId()}`}
          height={700}
          ref={iframeRef}
          scrolling="no"
        />
        <button className="payment-button m-bot" disabled={disablePurchaseButton}
          onClick={onCompletePurchase}>Complete Purchase</button>
      </div>
    </div>
  );
};

export default PaymentPage;
