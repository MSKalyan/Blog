import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar toggleSidebar={() => setIsSidebarOpen((open) => !open)} />
      <div style={{ display: "flex", flex: 1 }}>
        {isSidebarOpen && <Sidebar isOpen={isSidebarOpen} />}
        <main
          style={{
            flex: 1,
            transition: "margin-left 0.3s",
            marginTop: "0",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;