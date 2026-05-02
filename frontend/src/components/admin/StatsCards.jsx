const StatsCards = ({ totals }) => {
  const cards = [
    {
      label: "Total Users",
      value: totals?.users ?? 0
    },
    {
      label: "Total Blogs",
      value: totals?.blogs ?? 0
    },
    {
      label: "Draft Blogs",
      value: totals?.drafts ?? 0
    },
    {
      label: "Published Blogs",
      value: totals?.published ?? 0
    }
  ];

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <p className="text-sm font-medium text-slate-500">{card.label}</p>
          <p className="mt-3 text-4xl font-bold tracking-tight text-slate-950">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;