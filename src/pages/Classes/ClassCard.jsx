import React from 'react';
import { Link } from 'react-router-dom';


const ClassCard = ({ singleClass, userRole, token, location, handleNotLogin, handleSelectClass }) => {
    const { id, name, image, seats, price, email, instructor } = singleClass;
    

    return (
        <div>
            <div className={`card shadow-lg  p-4 ${!seats && 'bg-red-100' }`}>

                <img className="card-img-top rounded" src={image} alt="Card image cap" />
                {/* <LazyLoad height={300} onContentVisible={() => { console.log('loaded!') }}>
                </LazyLoad> */}
                <div className="card-body py-2 pb-0 px-0">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text pb-2">{instructor}</p>
                </div>
                <div className='pb-3 flex justify-between'>
                    <span><strong>Available Seats:</strong> {seats} </span>
                    <span><strong>Price:</strong> {price}$</span>

                </div>
                <div className="card-footer flex justify-between items-center">
                    {/* <Link to={`classdetails/${id}`}><button disabled={!userRole === 'admin' || !userRole === 'instructor'} className="btn-sm text-white bg-yellow-500 border-none hover:bg-yellow-600">View Details </button></Link> */}
                    
                    { token ? <button onClick={() => handleSelectClass(singleClass)} disabled={userRole ? true : false || !token || seats === 0 } className="btn btn-primary btn-sm">Select Class </button>
                    : <Link to="#" onClick={handleNotLogin} state={{ from: location}} className="btn btn-primary btn-sm">Select Class</Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default ClassCard;