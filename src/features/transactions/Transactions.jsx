import { useState } from "react";
import {useSelector, useDispatch} from "react-redux";
import {selectBalance, deposit,  withdrawal, transfer} from "./transactionsSlice"

import "./transactions.scss";

/**
 * Allows users to deposit to, withdraw from, and transfer money from their account.
 */
export default function Transactions() {
  // TODO: Get the balance from the Redux store using the useSelector hook
  //get data from store
  const balance = useSelector(selectBalance);
  const dispatch = useDispatch();

  const [amountStr, setAmountStr] = useState("0.00");
  const [recipient, setRecipient] = useState("");

  /** Dispatches a transaction action based on the form submission. */
  const onTransaction = (e) => {
    e.preventDefault();

    // This changes depending on which button the user clicked to submit the form.
    // It will be either "deposit", "withdraw", or "transfer".
    const action = e.nativeEvent.submitter.name;

    const amount = +amountStr;

   switch(action){

    case "deposit":
      dispatch(deposit({amount}));
      break;
    case "withdraw":
      dispatch(withdrawal({amount}));
      break;
    case "transfer":
      dispatch(transfer({amount, name: recipient}));
      break; 
   
   }
    setAmountStr("0")
    setRecipient("")
      


    // TODO: Dispatch the appropriate transaction action based on `action`
  };

  return (
    <section className="transactions container">
      <h2>Transactions</h2>
      <figure>
        <figcaption>Current Balance &nbsp;</figcaption>
        <strong>${balance.toFixed(2)}</strong>
      </figure>
      <form onSubmit={onTransaction}>
        <div className="form-row">
          <label>
            Amount
            <input
              type="number"
              inputMode="decimal"
              min={0}
              step="0.01"
              value={amountStr}
              onChange={(e) => setAmountStr(e.target.value)}
            />
          </label>
          <div>
            <button type="submit" name="deposit">
              Deposit
            </button>
            <button name="withdraw">Withdraw</button>
          </div>
        </div><picture>
          <source media="(min-width: )" srcset="" />
          <img src="" alt="" />
        </picture>
        <div className="form-row">
          <label>
            Transfer to
            <input type="text" placeholder="Recipient Name" name="recipient" value={recipient} onChange={(e)=>setRecipient(e.target.value)}/>
          </label>
          <button name="transfer">Transfer</button>
        </div>
      </form>
    </section>
  );
}


