import Sidebar from './Sidebar';
import Header from './Header';
import { NAV_ITEMS } from '../../data/navigation';

export default function Shell({
  currentRoute = 'overview',
  onNavigate,
  children,
  onQuickAction,
}) {
  const currentItem = NAV_ITEMS.find((item) => item.id === currentRoute);
  const title = currentItem ? currentItem.label : 'Overview';

  return (
    <div className="app-shell">
      {/* 240px Fixed Sidebar */}
      <Sidebar currentRoute={currentRoute} onNavigate={onNavigate} />

      {/* Main Content Area */}
      <div className="app-main">
        <Header currentTitle={title} onQuickAction={onQuickAction} />
        <main className="app-content">{children}</main>
      </div>
    </div>
  );
}
