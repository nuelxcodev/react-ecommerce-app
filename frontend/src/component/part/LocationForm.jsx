/* eslint-disable no-unused-vars */
import  { useState } from 'react'
import { useForm } from 'react-hook-form';

// eslint-disable-next-line react/prop-types
function LocationForm({ state ,dispatch}) {
    const [shippingLocation, setshipLocation] = useState({});
    const {
        handleSubmit,
        register,
        formState: { errors },
      } = useForm();
  return (
    <div >
        <div className="location-form-header">
            <h1>NUELMAT</h1>
            <p>please enter an adress where your goods will be shipped to</p>
          </div>
          <form
            className="location-form"
            onSubmit={handleSubmit((data) => {
              setshipLocation(data);
            })}
          >
            <label htmlFor="fullName">fullName:</label>
            <input
              type="text"
              defaultValue={state.user.username}
              id="fullName"
              {...register("fullName")}
            />

            <label htmlFor="address1">address1:</label>
            <input type="text" id="address1" {...register("address1")} />

            <label htmlFor="address2">address2:</label>
            <input type="text" id="address2" {...register("address2")} />

            <label htmlFor="country">country:</label>
            <input type="text" id="country" {...register("country")} />

            <label htmlFor="state">state:</label>
            <input type="text" id="state" {...register("state")} />

            <label htmlFor="city">city:</label>
            <input type="text" id="city" {...register("city")} />

            <label htmlFor="zip">zipcode:</label>
            <input type="text" id="zip" {...register("zip")} />

            <div className="location-submit">
              <input type="submit" value="add location" />
              <input
                type="button"
                value="save location"
                onClick={() => {
                  dispatch({ type: "LOCATION", payload: shippingLocation });
                }}
              />
            </div>
          </form>
    </div>
  )
}

export default LocationForm;