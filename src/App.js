/*
INSTRUCTIONS / CONSIDERATIONS:

1. Let's implement a simple bank account! It's similar to the example that I used as an analogy to explain how useReducer works, but it's simplified (we're not using account numbers here)

2. Use a reducer to model the following state transitions: openAccount, deposit, withdraw, requestLoan, payLoan, closeAccount. Use the `initialState` below to get started.

3. All operations (expect for opening account) can only be performed if isActive is true. If it's not, just return the original state object. You can check this right at the beginning of the reducer

4. When the account is opened, isActive is set to true. There is also a minimum deposit amount of 500 to open an account (which means that the balance will start at 500)

5. Customer can only request a loan if there is no loan yet. If that condition is met, the requested amount will be registered in the 'loan' state, and it will be added to the balance. If the condition is not met, just return the current state

6. When the customer pays the loan, the opposite happens: the money is taken from the balance, and the 'loan' will get back to 0. This can lead to negative balances, but that's no problem, because the customer can't close their account now (see next point)

7. Customer can only close an account if there is no loan, AND if the balance is zero. If this condition is not met, just return the state. If the condition is met, the account is deactivated and all money is withdrawn. The account basically gets back to the initial state
*/

import { useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "open":
      return { ...state, isActive: true, balance: action.payload };
    case "deposit":
      return { ...state, balance: state.balance + action.payload };
    case "withdraw":
      return {
        ...state,
        balance:
          state.balance > 0 ? state.balance - action.payload : state.balance,
      };
    case "loan":
      return {
        ...state,
        loan: action.payload,
        balance:
          state.loan <= 0 ? state.balance + action.payload : state.balance,
      };
    case "payLoan":
      return {
        ...state,
        loan: 0,
        balance:
          state.balance >= action.payload && state.loan > action.payload
            ? state.balance - action.payload
            : state.balance,
      };
    default:
      throw new Error("Unknown Action");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { balance, loan, isActive } = state;

  return (
    <div className="App">
      <header className="header">
        <h1>useReducer Bank Account</h1>
      </header>
      <p className="balance-display">Balance: {balance}</p>
      <p className="loan-display">Loan: {loan}</p>

      <div className="button-container">
        <button
          onClick={() => {
            dispatch({ type: "open", payload: 500 });
          }}
          disabled={isActive}
          className="button"
        >
          Open account
        </button>
        <button
          onClick={() => {
            dispatch({ type: "deposit", payload: 100 });
          }}
          disabled={!isActive}
          className="button"
        >
          Deposit 100
        </button>
        <button
          onClick={() => {
            dispatch({ type: "withdraw", payload: 50 });
          }}
          disabled={!isActive}
          className="button"
        >
          Withdraw 50
        </button>
        <button
          onClick={() => {
            dispatch({ type: "loan", payload: 5000 });
          }}
          disabled={!isActive}
          className="button"
        >
          Request a loan of 5000
        </button>
        <button
          onClick={() => {
            dispatch({ type: "payLoan", payload: 5000 });
          }}
          disabled={!isActive}
          className="button"
        >
          Pay loan
        </button>
        <button onClick={() => {}} disabled={!isActive} className="button">
          Close account
        </button>
      </div>
    </div>
  );
}
