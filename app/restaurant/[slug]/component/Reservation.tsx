'use client';
import { partySize, times } from '../../../../data/index';
import DatePicker from 'react-datepicker';
import { useState } from 'react';
import useAvailabilities from '../../../../hooks/useAvailability';
import { CircularProgress } from '@mui/material';
import Link from 'next/link';
import { convertToDisplayTime } from '../../../../utils/convertToDisplayTime';

const Reservation = ({ openTime, closeTime, slug }: { openTime: string, closeTime: string, slug: string }) => {

    const { data, loading, error, fetchAvailability } = useAvailabilities();
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [time, setTime] = useState(openTime);
    const [partyCount, setPartyCount] = useState('2');
    const [dayBook, setDayBook] = useState(new Date().toISOString().split("T")[0])

    console.log({ data })

    const handleChangeDate = (date: Date | null) => {
        if (date) {
            setDayBook(date.toISOString().split("T")[0]);
            return setSelectedDate(date)
        }
        return setSelectedDate(null)
    }

    const filterTimeByRestaurant = () => {
        const timeWithinWindow: typeof times = [];
        let isWithinWindow = false;
        times.forEach((item) => {
            if (item.time === openTime) {
                isWithinWindow = true
            }
            if (isWithinWindow) {
                timeWithinWindow.push(item)
            }
            if (item.time === closeTime) {
                isWithinWindow = false
            }
        })
        return timeWithinWindow;
    }

    const handleClick = () => {
        fetchAvailability({
            slug: slug,
            day: dayBook,
            partySize: partyCount,
            time: time
        })
    }
    return (
        <div className='fixed w-[15%] bg-white rounded p-3 shadow'>
            <div className='text-center border-b pb-2 font-bold'>
                <h4 className='mr-7 text-lg '>Make a Reservation</h4>
            </div>
            <div className='my-3 flex flex-col'>
                <label>Party size</label>
                <select name='' id="" className='py-3 border-b font-light ' value={partyCount} onChange={(e) => setPartyCount(e.target.value)}>
                    {
                        partySize.map((item) => (
                            <option value={item.value} key={item.value}>{item.label}</option>
                        ))
                    }
                </select>
            </div>
            <div className='flex justify-between'>
                <div className='flex flex-col w-[48%]'>
                    <label>Date </label>
                    <DatePicker selected={selectedDate} onChange={handleChangeDate} className="p-3 border-b font-light text-reg w-24" dateFormat="MMMM d" wrapperClassName='w-[48%]' />
                </div>
                <div className='flex flex-col w-[48%]'>
                    <label>Time </label>
                    <select name='' id="" className='py-3 border-b font-light ' value={time} onChange={(e) => setTime(e.target.value)}>
                        {
                            filterTimeByRestaurant().map((time) => (
                                <option value={time.time} key={time.time}>{time.displayTime}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div className='mt-5'>
                <button className='bg-red-600 rounded w-full font-bold h-16 px-2 text-white' onClick={handleClick}
                    disabled={loading}>
                    {
                        loading ? <CircularProgress color='inherit' />
                            : "Find a time"
                    }
                </button>
            </div>
            {(data && data.length) ?
                (
                    <div className='mt-4'>
                        <p className='text-reg'>Select a Time</p>
                        <div className='mt-2 flex flex-wrap'>
                            {
                                data?.map((item,index) => {
                                    return item.available ?
                                        <Link href={`/reserve/${slug}?date=${dayBook}T${item.time}&partySize=${partyCount}`}
                                            className="bg-red-600 cursor-pointer p-2 w-24 text-white text-center mb-3 rounded mr-3">
                                            <p className="text-sm font-bold" key={index}>
                                                {convertToDisplayTime(item.time)}
                                            </p>
                                        </Link>
                                        :
                                        <p className='bg-gray-300 p-2 w-24 rounded mr-3 mb-3'>

                                        </p>
                                })
                            }
                        </div>
                    </div>
                )
                : null
            }
        </div>
    )
}
export default Reservation;