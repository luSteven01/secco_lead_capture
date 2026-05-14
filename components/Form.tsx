'use client'

import {useState, ChangeEvent, FormEvent} from 'react'

const initialFormState = {
    first: '',
    last: '',
    email: '',
    company: '',
    hear_info: '',
    message: ''
}

const selectOptions = [
    {value : 'google', label: 'Google'},
    {value : 'referral', label: 'Referral'},
    {value : 'social', label: 'Social'},
    {value : 'other', label: 'Other'}
]

export default function Form() {
    const [formData, setFormData] = useState(initialFormState)
    const [status, setStatus] = useState({type: 'idle', message: ''})
    const [isSubmitting, setIsSubmitting] = useState(false)

    function handleChange ( event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> ) {
        const {name, value} = event.target;
        console.log (event.target)

        setFormData((current) => ({
            ...current, [name]: value,
        }))
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {

    }

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded border border-white/70 bg-white/80 p-6 sm:p-8"
        >
            <div className="mb-8 space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-700">
                    Lead Capture Page
                </p>
                <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                    Connect With Us!
                </h1>
                <p className="max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                    Stay updated on all the news about our company!
                </p>
            </div>
            <div className='space-y-6'>
                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label htmlFor="first" className="mb-2 block text-sm font-semibold text-slate-800">
                        First name *
                        </label>
                        <input
                            id="first"
                            name="first"
                            type="text"
                            required
                            value={formData.first}
                            onChange={handleChange}
                            placeholder="Mike"
                            className="block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-200"
                        />
                    </div>

                    <div>
                        <label htmlFor="last" className="mb-2 block text-sm font-semibold text-slate-800">
                        Last name *
                        </label>
                        <input
                            id="last"
                            name="last"
                            type="text"
                            required
                            value={formData.last}
                            onChange={handleChange}
                            placeholder="Wazowski"
                            className="block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-200"
                        />
                    </div>
                    
                </div>
                <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-800">
                    Email *
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="text"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="mike.wazowski@monsters.inc"
                        className="block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-200"
                    />
                </div>
                <div>
                    <label htmlFor="hear_info" className="mb-2 block text-sm font-semibold text-slate-800">
                        How did you hear about us? *
                    </label>
                    <select
                        id="hear_info"
                        name="hear_info"
                        required
                        value={formData.hear_info}
                        onChange={handleChange}
                        className="block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 shadow-sm outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-200"
                    >
                        {selectOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-semibold text-slate-800">
                    Message *
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about what you need!"
                        className="block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-200"
                    />
                </div>
                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-slate-500">Required fields are marked with *.</p>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSubmitting ? 'Sending...' : 'Submit'}
                    </button>
                </div>

                {status.message ? (
                    <p
                        className={`rounded-2xl border px-4 py-3 text-sm ${
                        status.type === 'success'
                            ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                            : 'border-rose-200 bg-rose-50 text-rose-800'
                        }`}
                    >
                        {status.message}
                    </p>
                ) : null}
            </div>
        </form>
    )
}