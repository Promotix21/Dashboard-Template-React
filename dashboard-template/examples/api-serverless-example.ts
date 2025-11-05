/**
 * Vercel Serverless Function Example
 *
 * Place this file in /api folder in your project root
 * Vercel will automatically deploy it as: https://yourdomain.com/api/customers
 *
 * File: /api/customers.ts
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

// Mock database (replace with real database connection)
const mockCustomers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    company: 'Acme Inc',
    tags: ['enterprise', 'vip'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+0987654321',
    company: 'Tech Corp',
    tags: ['startup'],
    createdAt: new Date().toISOString(),
  },
];

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // CORS headers (allow your Vercel frontend)
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*'); // Replace with your domain
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // GET /api/customers - Get all customers
    if (req.method === 'GET') {
      const { search, limit = 10, offset = 0 } = req.query;

      let customers = mockCustomers;

      // Filter by search
      if (search && typeof search === 'string') {
        customers = customers.filter((c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.email.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Pagination
      const start = Number(offset);
      const end = start + Number(limit);
      const paginatedCustomers = customers.slice(start, end);

      return res.status(200).json({
        success: true,
        data: paginatedCustomers,
        total: customers.length,
        limit: Number(limit),
        offset: Number(offset),
      });
    }

    // POST /api/customers - Create new customer
    if (req.method === 'POST') {
      const { name, email, phone, company, tags } = req.body;

      // Validation
      if (!name || !email) {
        return res.status(400).json({
          success: false,
          error: 'Name and email are required',
        });
      }

      const newCustomer = {
        id: String(mockCustomers.length + 1),
        name,
        email,
        phone: phone || '',
        company: company || '',
        tags: tags || [],
        createdAt: new Date().toISOString(),
      };

      mockCustomers.push(newCustomer);

      return res.status(201).json({
        success: true,
        data: newCustomer,
        message: 'Customer created successfully',
      });
    }

    // PUT /api/customers - Update customer
    if (req.method === 'PUT') {
      const { id } = req.query;
      const updates = req.body;

      const customerIndex = mockCustomers.findIndex((c) => c.id === id);

      if (customerIndex === -1) {
        return res.status(404).json({
          success: false,
          error: 'Customer not found',
        });
      }

      mockCustomers[customerIndex] = {
        ...mockCustomers[customerIndex],
        ...updates,
      };

      return res.status(200).json({
        success: true,
        data: mockCustomers[customerIndex],
        message: 'Customer updated successfully',
      });
    }

    // DELETE /api/customers - Delete customer
    if (req.method === 'DELETE') {
      const { id } = req.query;

      const customerIndex = mockCustomers.findIndex((c) => c.id === id);

      if (customerIndex === -1) {
        return res.status(404).json({
          success: false,
          error: 'Customer not found',
        });
      }

      mockCustomers.splice(customerIndex, 1);

      return res.status(200).json({
        success: true,
        message: 'Customer deleted successfully',
      });
    }

    // Method not allowed
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
}

/**
 * With PostgreSQL (Vercel Postgres):
 *
 * 1. Install: npm install @vercel/postgres
 * 2. Add to Vercel: Storage → Postgres
 * 3. Use in function:
 *
 * import { sql } from '@vercel/postgres';
 *
 * const customers = await sql`SELECT * FROM customers WHERE user_id = ${userId}`;
 */
