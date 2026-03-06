export function TermsCard({ icon: Icon, title, children }) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-[#212121] border border-white/10 p-8 lg:p-12">
      <article className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <Icon className="w-6 h-6 text-[#cfff6a]" />
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <div className="text-white/80 leading-relaxed">
          {children}
        </div>
      </article>
      <div className="absolute inset-0 bg-gradient-to-t from-[#cfff6a]/5 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
    </section>
  );
}
