const statusStyles = {
  draft: "bg-amber-100 text-amber-700 border border-amber-200",
  published: "bg-emerald-100 text-emerald-700 border border-emerald-200"
};

const BlogStatusBadge = ({ status }) => {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
        statusStyles[status] || "bg-slate-100 text-slate-700 border border-slate-200"
      }`}
    >
      {status}
    </span>
  );
};

export default BlogStatusBadge;