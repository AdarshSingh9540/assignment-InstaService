import React from "react"
import type { Customer } from "../types"

interface CustomerFormProps {
  onSubmit: (customer: Customer) => void
}

export function CustomerForm({ onSubmit }: CustomerFormProps) {
  const [customer, setCustomer] = React.useState<Customer>({
    name: "",
    email: "",
    phone: "",
    billingAddress: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(customer)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
          value={customer.name}
          onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
          value={customer.email}
          onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
          value={customer.phone}
          onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-700">
          Billing Address
        </label>
        <textarea
          id="billingAddress"
          required
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
          value={customer.billingAddress}
          onChange={(e) => setCustomer({ ...customer, billingAddress: e.target.value })}
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Continue to Payment
      </button>
    </form>
  )
}

