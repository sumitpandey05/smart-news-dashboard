import {
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const categoryColors = ["#b91c1c", "#0f766e", "#1d4ed8", "#a16207"];

export default function InsightsPanel({
  keywordData,
  trendingTopics,
  categoryData,
  historyCount,
  averageReadTime,
}) {
  return (
    <aside className="space-y-6">
      <section className="panel p-5">
        <div className="border-b border-line pb-3">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">Reader Metrics</p>
          <h3 className="mt-2 font-display text-2xl text-ink">Your activity</h3>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-4 text-sm">
          <div>
            <p className="text-stone-500">Read this week</p>
            <p className="mt-2 text-3xl font-bold text-ink">{historyCount}</p>
          </div>
          <div>
            <p className="text-stone-500">Avg. read time</p>
            <p className="mt-2 text-3xl font-bold text-ink">{averageReadTime}m</p>
          </div>
        </div>
      </section>

      <section className="panel p-5">
        <div className="border-b border-line pb-3">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">Trending Words</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {keywordData.map((item) => (
            <span key={item.keyword} className="border border-line px-3 py-2 text-sm capitalize text-stone-700">
              {item.keyword}
            </span>
          ))}
        </div>
      </section>

      <section className="panel p-5">
        <div className="border-b border-line pb-3">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">Topic Momentum</p>
        </div>
        <div className="mt-4 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trendingTopics.slice(0, 6)}>
              <XAxis dataKey="topic" stroke="#78716c" tickLine={false} axisLine={false} fontSize={11} />
              <YAxis stroke="#a8a29e" tickLine={false} axisLine={false} fontSize={11} />
              <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #d6d3d1", borderRadius: 0 }} />
              <Bar dataKey="score">
                {trendingTopics.slice(0, 6).map((entry, index) => (
                  <Cell key={entry.topic} fill={categoryColors[index % categoryColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="panel p-5">
        <div className="border-b border-line pb-3">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">Category Share</p>
        </div>
        <div className="mt-4 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={categoryData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={78} paddingAngle={2}>
                {categoryData.map((entry, index) => (
                  <Cell key={entry.name} fill={categoryColors[index % categoryColors.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #d6d3d1", borderRadius: 0 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm text-stone-700">
          {categoryData.map((item, index) => (
            <div key={item.name} className="flex items-center gap-2">
              <span className="inline-block h-3 w-3" style={{ backgroundColor: categoryColors[index % categoryColors.length] }} />
              {item.name} ({item.value})
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
}
