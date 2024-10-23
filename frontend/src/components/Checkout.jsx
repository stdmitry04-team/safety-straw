import { useState } from "react";
function Checkout() {
  //Expects a body of {[{name:<string>,id:<string>,price:<in usd>, quantity:<num>}]}

  const dummyItems = {
    items: [
      { name: "item1", id: "1", price: 10.0, quantity: 1 },
      { name: "item2", id: "2", price: 5.0, quantity: 2 },
    ],
  };
  return (
    <>
      <button
        onClick={async () => {
          const response = await fetch(
            "http://localhost:3000/api/create-checkout-session",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(dummyItems),
            }
          )
            .then((res) => {
              if (res.ok) {
                return res.json();
              }
              res.json().then((json) => Promise.reject(json));
            })
            .then(({ url }) => {
              window.locaiton = url;
            })
            .catch((e) => {
              console.log(e);
            });
        }}
      >
        test
      </button>
    </>
  );
}

export default Checkout;
