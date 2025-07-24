import SidebarLayout from "./Sidebar/SidebarLayout";
import { SidebarProvider } from "../components/ui/sidebar";

function BaseLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50">
        <SidebarLayout onMenuChange={() => {}} />
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold text-gray-900">Welcome to AMnote</h1>
          <p className="mt-4 text-gray-600">Select an item from the sidebar to get started.</p>
        </main>
      </div>
    </SidebarProvider>
  );
}

export default BaseLayout;
