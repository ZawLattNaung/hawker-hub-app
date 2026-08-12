import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { todaySummary, dailyEarnings, sampleMenu } from '../data/mockData';

const StatCard = ({ title, value, subtitle, icon, color }: {
  title: string; value: string; subtitle?: string; icon: string; color: string;
}) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
      </div>
      <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center text-xl`}>{icon}</div>
    </div>
  </div>
);

export default function OwnerDashboard() {
  const topMenu = [...sampleMenu].sort((a, b) => b.orderCount - a.orderCount).slice(0, 5);
  const maxOrders = topMenu[0]?.orderCount ?? 1;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Today's overview for your stall</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Today's Earnings"
          value={`$${todaySummary.totalEarnings.toLocaleString()}`}
          subtitle={`↑ ${todaySummary.previousDayGrowth}% from yesterday`}
          icon="💰" color="bg-green-100"
        />
        <StatCard
          title="Cash Received"
          value={`$${todaySummary.cashReceived.toLocaleString()}`}
          subtitle={`${((todaySummary.cashReceived / todaySummary.totalEarnings) * 100).toFixed(0)}% of total`}
          icon="💵" color="bg-blue-100"
        />
        <StatCard
          title="Banking / Online"
          value={`$${todaySummary.bankingReceived.toLocaleString()}`}
          subtitle={`${((todaySummary.bankingReceived / todaySummary.totalEarnings) * 100).toFixed(0)}% of total`}
          icon="🏦" color="bg-purple-100"
        />
        <StatCard
          title="Total Orders"
          value={todaySummary.totalOrders.toString()}
          subtitle={`${todaySummary.dineInOrders} dine-in · ${todaySummary.takeawayOrders} takeaway`}
          icon="📋" color="bg-orange-100"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Sales Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Daily Sales Breakdown</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={dailyEarnings} barSize={24}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb' }}
                formatter={(v: number) => [`$${v}`, '']}
              />
              <Bar dataKey="cash" fill="#f97316" name="Cash" radius={[4, 4, 0, 0]} />
              <Bar dataKey="banking" fill="#8b5cf6" name="Banking" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-6 mt-2 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-sm" />
              <span className="text-sm text-gray-600">Cash</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-sm" />
              <span className="text-sm text-gray-600">Banking / Online</span>
            </div>
          </div>
        </div>

        {/* Weekly Revenue Trend */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Weekly Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={dailyEarnings}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb' }}
                formatter={(v: number) => [`$${v}`, '']}
              />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#f97316"
                strokeWidth={3}
                dot={{ fill: '#f97316', strokeWidth: 2, r: 5 }}
                name="Revenue"
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-center text-sm text-gray-500 mt-2">
            Weekly Total: ${dailyEarnings.reduce((s, d) => s + d.total, 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Menu Popularity */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Menu Popularity</h3>
          <span className="text-sm text-gray-400">Today's orders</span>
        </div>
        <div className="space-y-3">
          {topMenu.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <span className="text-2xl">{item.image}</span>
              <div className="flex-1">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-medium text-gray-800">{item.name}</span>
                  <span className="text-sm font-semibold text-orange-600">{item.orderCount} orders</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full transition-all"
                    style={{ width: `${(item.orderCount / maxOrders) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
