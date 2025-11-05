import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import Dashboard from './pages/dashboard/Dashboard';
import Conversations from './pages/conversations/Conversations';
import Customers from './pages/customers/Customers';
import Automations from './pages/automations/Automations';
import Campaigns from './pages/campaigns/Campaigns';
import Analytics from './pages/analytics/Analytics';
import NitroX from './pages/nitro-x/NitroX';
import NitroCollab from './pages/nitro-collab/NitroCollab';
import Integrations from './pages/integrations/Integrations';
import Settings from './pages/settings/Settings';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="conversations" element={<Conversations />} />
          <Route path="customers" element={<Customers />} />
          <Route path="automations" element={<Automations />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="nitro-x" element={<NitroX />} />
          <Route path="nitro-collab" element={<NitroCollab />} />
          <Route path="integrations" element={<Integrations />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
