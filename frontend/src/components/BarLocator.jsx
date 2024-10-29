import "../styles/BarLocator.css"
import mag_glass from "../assets/magnifying-glass.svg"
import BarLocatorAddress from "./BarLocatorAddress.jsx"
export default function BarLocator(){
    const addresses = [{name:"JERRY’S SPORTS BAR",phone:"(906) 906-9069",address:"1111 A ANDERSON AVE, ANDORRA, AZ 22222",distance:"1.47 miles"},
        {name:"HARPER’S",phone:"(555) 555-5555",address:"555 US HIGHWAY 5, FLORENCE, WI, 77777",distance:"3.58 miles"},
        {name:"AURORA LIQUORS",phone:"(123) 456-7890",address:"555 US HIGHWAY 5, FLORENCE, WI, 77777",distance:"3.58 miles"}    
    ]

    return(
        <div className="bar-locator">
            <h1>BAR LOCATOR</h1>

            <div className="bar-locator-container">
                <div className="bar-locator-text">
                    <p>Find a bar that is Safety Straw certified near you!</p>
                </div>
                <div className="bar-locator-search">
                    <button><img src={mag_glass} alt="search"></img></button>
                    <input type="text" placeholder="Enter your location"></input>
                </div>
                
                <div className="bar-locator-addresses">
                    {addresses.map((address, index) => {
                        return <BarLocatorAddress key={index} name={address.name} number={address.phone} address={address.address} distance={address.distance}/>
                    })}
                </div>


                <div className="bar-locator-map">

                </div>
            
            </div>

        </div>
    )
}