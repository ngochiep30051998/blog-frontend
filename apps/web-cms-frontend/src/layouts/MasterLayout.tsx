


import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';

export function MasterLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:block w-64 transition-all duration-300 ease-in-out flex-shrink-0">
        <Sidebar />
      </aside>

      {/* Sidebar - Mobile */}
      {mobileSidebarOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
          {/* Sidebar */}
          <aside className="fixed left-0 top-0 bottom-0 w-64 z-50 lg:hidden">
            <Sidebar />
          </aside>
        </>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header onToggleSidebar={toggleSidebar} />

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-6 max-w-7xl">
            <Breadcrumb />
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-4 px-6">
          <div className="container mx-auto max-w-7xl">
            <p className="text-center text-sm text-gray-500">
              © 2025 Admin CMS. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default MasterLayout;



