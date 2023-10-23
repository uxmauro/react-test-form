
interface inputProps {
    usernameInput: string;
    emailInput: string;
    countryInput: string;
  }


const Review = ({usernameInput, emailInput, countryInput}: inputProps) => {

    const data = {"username": usernameInput, "email": emailInput, "Country": countryInput}

    return(
        <>
        <div className="review-text">
        <p>Username</p>
        <p>{data.username}</p>
        </div>
        <div className="review-text">
        <p>Email</p>
        <p>{data.email}</p>
        </div>
        <div className="review-text">
        <p>Country</p>
        <p>{data.Country}</p>
        </div>

      <button id ="continue" className='enabled'>Complete</button>

        </>
    )

}
export default Review;