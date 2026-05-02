const EmptyState = ({ title = "Nothing here yet", description = "" }) => {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-soft">
      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
      {description ? (
        <p className="mt-2 text-sm text-slate-600">{description}</p>
      ) : null}
    </div>
  );
};

export default EmptyState;