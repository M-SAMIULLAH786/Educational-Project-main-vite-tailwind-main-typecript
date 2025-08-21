import React, { useState } from 'react'

const RegisterDegree = () => {
  const [degree, setDegree] = useState('')
  const [college, setCollege] = useState('')
  const [year, setYear] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    alert(`Degree Registered:\nDegree: ${degree}\nCollege: ${college}\nYear: ${year}`)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-xl bg-white shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Register Degree</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Degree Name</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={degree}
              onChange={e => setDegree(e.target.value)}
              required
              placeholder="e.g. BS Computer Science"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">College</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={college}
              onChange={e => setCollege(e.target.value)}
              required
              placeholder="e.g. IPS Uni"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Year</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              value={year}
              onChange={e => setYear(e.target.value)}
              required
              placeholder="e.g. 2025"
              min={1900}
              max={2100}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded font-semibold hover:bg-primary/90 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegisterDegree