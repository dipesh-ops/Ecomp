import React, { useContext } from 'react'
import myContext from '../context/myContext'

const UserDetails = () => {
  const context = useContext(myContext);
  const { myUsers } = context;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold">All Users</h1>
      </div>

      {/* Mobile View */}
      <div className="block lg:hidden space-y-4">
        {myUsers.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">S.No.</span>
                <span>{index + 1}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Name</span>
                <span className="font-medium">{item.name}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Email</span>
                <span className="text-sm break-all">{item.email}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">UID</span>
                <span className="text-xs font-mono break-all">{item.uid.slice(0, 8)}...</span>
              </div>
              
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Role</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  item.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {item.role}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Date</span>
                <span className="text-sm text-gray-500">{item.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block overflow-x-auto bg-white rounded-lg border">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">S.No.</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">UID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Role</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {myUsers.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-600">{index + 1}</td>
                
                <td className="px-4 py-3">
                  <span className="font-medium text-gray-900">{item.name}</span>
                </td>
                
                <td className="px-4 py-3 text-sm">
                  <span className="text-gray-600 break-all">{item.email}</span>
                </td>
                
                <td className="px-4 py-3 text-sm">
                  <span className="font-mono text-gray-500 text-xs">{item.uid.slice(0, 12)}...</span>
                </td>
                
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    item.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {item.role}
                  </span>
                </td>
                
                <td className="px-4 py-3 text-sm text-gray-500">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {myUsers.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border">
          <i className="ri-user-line text-4xl text-gray-300 mb-3"></i>
          <p className="text-gray-500">No users found</p>
          <p className="text-gray-400 text-sm mt-1">Users will appear here when they register</p>
        </div>
      )}
    </div>
  )
}

export default UserDetails