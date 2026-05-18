import React, { useState, useEffect } from 'react';

import { leadAPI } from '../services/api'; 
import { Link, useNavigate } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';

export interface Lead {
  _id: string;
  name: string;
  email: string;
  status: string;
  source: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate(); 
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch Leads on load or filter change
  useEffect(() => {
    const loadLeads = async () => {
      try {
        setLoading(true);
        const response = await leadAPI.getLeads({
          page,
          search: debouncedSearchTerm,
          status: statusFilter,
        });
        setLeads(response.data);
        setTotalPages(response.pagination.totalPages);
        setError(null);
      } catch (err) {
        setError('Failed to fetch leads. Please check your backend connection.');
      } finally {
        setLoading(false);
      }
    };

    loadLeads();
  }, [debouncedSearchTerm, statusFilter, page]);

  // CSV Export Logic
  const handleExportCSV = () => {
    if (leads.length === 0) return alert("No data to export");
    
    let csvContent = "Name,Email,Status,Source\n";
    
    leads.forEach(lead => {
      csvContent += `"${lead.name}","${lead.email}","${lead.status}","${lead.source}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "smart_leads.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login'); 
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Smart Leads Dashboard</h1>
          
          {/* Action Buttons: Export CSV + New Lead + Logout */}
          <div className="flex gap-4">
            <button 
              onClick={handleExportCSV}
              className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition"
            >
              Export CSV
            </button>
            <Link 
              to="/add-lead" 
              className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
            >
              + New Lead
            </Link>
            {/* <-- Naya Logout Button --> */}
            <button 
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name or email..."
            className="border p-2 rounded w-1/3 shadow-sm focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select 
            className="border p-2 rounded shadow-sm bg-white"
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          >
            <option value="">All Statuses</option>
            <option value="New">New</option>
            <option value="Qualified">Qualified</option>
            <option value="Lost">Lost</option>
          </select>
        </div>

        {/* Loading / Error States */}
        {loading && <div className="text-center py-10 text-gray-500">Loading leads...</div>}
        {error && <div className="text-center py-10 text-red-500 bg-red-50 rounded">{error}</div>}
        
        {/* Empty State */}
        {!loading && !error && leads.length === 0 && (
          <div className="text-center py-10 text-gray-500 bg-white rounded shadow">
            No leads found matching your criteria.
          </div>
        )}

        {/* Data Table */}
        {!loading && !error && leads.length > 0 && (
          <div className="bg-white rounded shadow overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-4 border-b">Name</th>
                  <th className="p-4 border-b">Email</th>
                  <th className="p-4 border-b">Status</th>
                  <th className="p-4 border-b">Source</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-gray-50">
                    <td className="p-4 border-b">{lead.name}</td>
                    <td className="p-4 border-b text-gray-500">{lead.email}</td>
                    <td className="p-4 border-b">
                      <span className={`px-2 py-1 rounded text-sm ${
                        lead.status === 'Qualified' ? 'bg-green-100 text-green-800' : 
                        lead.status === 'Lost' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="p-4 border-b">{lead.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button 
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className="px-4 py-2 border rounded bg-white disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-600">Page {page} of {totalPages}</span>
          <button 
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
            className="px-4 py-2 border rounded bg-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;