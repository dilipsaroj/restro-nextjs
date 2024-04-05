'use client';
import { CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import useReservation from "../../../../hooks/useReservation";

const Form = ({
    slug,
    partySize,
    date }: {
        slug: string,
        partySize: string,
        date: string
    }) => {

    const [inputs, setInputs] = useState({
        bookerFirstName: "",
        bookerLastName: "",
        bookerPhone: "",
        bookerEmail: "",
        bookerOccasion: "",
        bookerRequest: ""
    })
    const [disabled, setDisabled] = useState(true);
    const [didBook, setDidBook] = useState(false)
    const { error, loading, createReservation } = useReservation();
    const [day, time] = date.split("T")
    const handleCLick = async () => {
        const booking = await createReservation({
            slug,
            partySize,
            time,
            day,
            bookerFirstName: inputs.bookerFirstName,
            bookerLastName: inputs.bookerLastName,
            bookerPhone: inputs.bookerPhone,
            bookerEmail: inputs.bookerEmail,
            bookerOccasion: inputs.bookerOccasion,
            bookerRequest: inputs.bookerRequest,
            setDidBook
        })
    }
    useEffect(() => {
        if (inputs.bookerFirstName && inputs.bookerLastName && inputs.bookerEmail && inputs.bookerPhone) {
            return setDisabled(false)
        }
        else {
            return setDisabled(true)
        }
    }, [inputs])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div className='mt-10 flex flex-wrap justify-between w-[660px]'>
            {
                didBook ?
                    <div>
                        <h1>You are all booked up</h1>
                        <p>Enjoy your reservation</p>
                    </div>
                    :
                    <>
                        <input type="text" className='border rounded p-3 w-80 mb-4' value={inputs.bookerFirstName}
                            placeholder='First Name' name="bookerFirstName" onChange={(e) => handleChange(e)} />
                        <input type="text" className='border rounded p-3 w-80 mb-4' value={inputs.bookerLastName}
                            placeholder='Last Name' name="bookerLastName" onChange={(e) => handleChange(e)} />
                        <input type="text" className='border rounded p-3 w-80 mb-4' value={inputs.bookerPhone}
                            placeholder='Phone No' name="bookerPhone" onChange={(e) => handleChange(e)} />
                        <input type="text" className='border rounded p-3 w-80 mb-4' value={inputs.bookerEmail}
                            placeholder='Email' name="bookerEmail" onChange={(e) => handleChange(e)} />
                        <input type="text" className='border rounded p-3 w-80 mb-4' value={inputs.bookerOccasion}
                            placeholder='Occasional (optional)' name="bookerOccasion" onChange={(e) => handleChange(e)} />
                        <input type="text" className='border rounded p-3 w-80 mb-4' value={inputs.bookerRequest}
                            placeholder='Requests (optional)' name="bookerRequest" onChange={(e) => handleChange(e)} />
                        <button className='bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300'
                            disabled={disabled || loading} onClick={handleCLick}>
                            {loading ? <CircularProgress color="inherit" /> : "Complete Reservation"}
                        </button>
                        <p className='mt-4 text-sm'>
                            By clicking “Complete reservation” you agree to the OpenTable Terms of Use and Privacy Policy. Message & data rates may apply. You can opt out of receiving text messages at any time in your account settings or by replying STOP.
                        </p>
                    </>
            }
        </div>
    )
}
export default Form;