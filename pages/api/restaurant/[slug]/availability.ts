import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { times } from "../../../../data";
import { findAvailableTable } from "../../../../services/restaurant/findAvailableTable";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "GET") {
        const { slug, day, time, partySize } = req.query as {
            slug: string,
            day: string,
            time: string,
            partySize: string
        }

        if (!day || !time || !partySize) {
            return res.status(400).json({ errorMessage: 'invalid data provided' })
        }

        const restaurant = await prisma.restaurant.findUnique({
            where: {
                slug
            },
            select: {
                tables: true,
                open_time: true,
                close_time: true
            }
        })

        if (!restaurant) {
            return res.status(400).json({
                errorMessage: "Invalid data provided"
            })
        }

        const searchTimesWithTable = await findAvailableTable({ day, time, res, restaurant })

        if (!searchTimesWithTable) {
            return res.status(400).json({
                errorMessage: "Invalid data provided"
            })
        }

        const availabilities = searchTimesWithTable
            .map((t) => {
                const sumSeats = t.tables.reduce((sum, table) => {
                    return sum + table.seats;
                }, 0);

                return {
                    time: t.time,
                    available: sumSeats >= parseInt(partySize),
                };
            })
            .filter((availability) => {
                const timeIsAfterOpeningHour =
                    new Date(`${day}T${availability.time}`) >=
                    new Date(`${day}T${restaurant.open_time}`);
                const timeIsBeforeClosingHour =
                    new Date(`${day}T${availability.time}`) <=
                    new Date(`${day}T${restaurant.close_time}`);

                return timeIsAfterOpeningHour && timeIsBeforeClosingHour;
            });

        console.log("availabilities", availabilities)
        return res.json(availabilities);
    }
}

// http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/availability
// http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/availability?day=2023-02-03&time=15:00:00.000Z&partySize=2