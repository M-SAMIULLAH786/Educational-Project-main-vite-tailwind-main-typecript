"use client"

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"

export default function Calendar02() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2025, 5, 26))

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-background">
      <div className="w-fit max-w-2xl">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Selected date: {date ? date.toLocaleDateString() : "None"}</p>
        </div>

        <div className="rounded-lg border shadow-lg bg-card p-6">
          <Calendar
            mode="single"
            defaultMonth={date}
            numberOfMonths={2}
            selected={date}
            onSelect={handleDateSelect}
            showOutsideDays={true}
            fixedWeeks={true}
            className="w-full"
          />
        </div>
      </div>
    </div>
  )
}
