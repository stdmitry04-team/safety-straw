import "../styles/BarLocatorAddress.css";
export default function BarLocatorAddress({name,number,address,distance}){


    return (

            <div className="bar-locator-address">
                <div className="bar-name">
                    <p>{name}</p>

                </div>
                <div className="bar-number">
                    <p>{number}</p>

                </div>
                <div className="bar-address">
                    <p>{address}</p>

                </div>
                <div className="bar-distance">
                    <p>{distance}</p>
                </div>

            </div>
        
      
    )

}