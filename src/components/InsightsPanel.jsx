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
import { TrendingUp, Eye, Clock3 } from "lucide-react";

const categoryColors = ["#f59e0b", "#10b981", "#6366f1", "#f43f5e"];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-line bg-surface-3 px-3 py-2 shadow-panel">
        <p className="font-mono text-[10px] text-muted mb-0.5">{label}</p>
        <p className="font-mono text-sm font-semibold text-ink">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default function InsightsPanel({
  keywordData,
  trendingTopics,
  categoryData,
  historyCount,
  averageReadTime,
}) {
  return (
    <aside className="space-y-4">

      {/* ── Reader Metrics ── */}
      <section className="panel p-5">
        <div className="flex items-center gap-2 mb-4">
          <Eye className="h-3.5 w-3.5 text-muted" />
          <span className="eyebrow">Reader Metrics</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-surface-2 border border-line p-3.5">
            <p className="font-mono text-[10px] text-muted mb-1">Read this week</p>
            <p className="font-display text-3xl font-bold text-ink">{historyCount}</p>
          </div>
          <div className="rounded-lg bg-surface-2 border border-line p-3.5">
            <p className="font-mono text-[10px] text-muted mb-1">Avg. read time</p>
            <p className="font-display text-3xl font-bold text-ink">
              {averageReadTime}
              <span className="text-base font-sans font-normal text-muted ml-0.5">m</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── Trending Words ── */}
      <section className="panel p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-3.5 w-3.5 text-muted" />
          <span className="eyebrow">Trending Words</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {keywordData.map((item, i) => (
            <span
              key={item.keyword}
              className="rounded-full border border-line bg-surface-2 px-2.5 py-1 font-mono text-[11px] capitalize text-soft transition-colors hover:border-accent/30 hover:text-accent cursor-default"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              {item.keyword}
            </span>
          ))}
        </div>
      </section>

      {/* ── Topic Momentum ── */}
      <section className="panel p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="eyebrow">Topic Momentum</span>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trendingTopics.slice(0, 6)} barSize={10}>
              <XAxis
                dataKey="topic"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#6b6b7e", fontSize: 9, fontFamily: "JetBrains Mono" }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#6b6b7e", fontSize: 9, fontFamily: "JetBrains Mono" }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
              <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                {trendingTopics.slice(0, 6).map((entry, index) => (
                  <Cell key={entry.topic} fill={categoryColors[index % categoryColors.length]} fillOpacity={0.85} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* ── Category Share ── */}
      <section className="panel p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="eyebrow">Category Share</span>
        </div>
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                innerRadius={46}
                outerRadius={72}
                paddingAngle={3}
                strokeWidth={0}
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={categoryColors[index % categoryColors.length]}
                    fillOpacity={0.85}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {categoryData.map((item, index) => (
            <div key={item.name} className="flex items-center gap-2">
              <span
                className="inline-block h-2.5 w-2.5 rounded-sm flex-shrink-0"
                style={{ backgroundColor: categoryColors[index % categoryColors.length] }}
              />
              <span className="font-mono text-[10px] text-soft truncate">
                {item.name} <span className="text-muted">({item.value})</span>
              </span>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
}
