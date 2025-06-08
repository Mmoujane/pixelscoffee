import React from 'react';
import { useState, useEffect  } from 'react';

const DashboardSection: React.FC = () => {

  const [statistics, setStatistics] = useState<{ ProductCount?: string; BookingCount?: string; BlogCount?: string}>({});
      
            
    useEffect(() => {
      async function fetchData() {
          try {
          const res = await fetch("/api/count");
          const result = await res.json();
          if (res.ok){
              console.log(result.statistics);
              setStatistics(result.statistics);
          }else{
              alert(result.message || 'Failed to fetch statistics');
          }

          } catch (err) {
          console.error('Error:', err);
          alert('An error occurred');
          }
      }

      fetchData();
    }, []);


    return (
      <div>
        <h2 className="text-2xl font-bold text-brown-600 mb-6">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold text-brown-600">Total Products</h3>
            <p className="text-3xl font-bold text-orange-600">{statistics.ProductCount}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold text-brown-600">Total Bookings</h3>
            <p className="text-3xl font-bold text-orange-600">{statistics.BookingCount}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold text-brown-600">Total Blogs</h3>
            <p className="text-3xl font-bold text-orange-600">{statistics.BlogCount}</p>
          </div>
        </div>
      </div>
    );
  };

  export default DashboardSection;