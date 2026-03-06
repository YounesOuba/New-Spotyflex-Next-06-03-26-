'use client';

export default function SideNavScrollLink({ id, title }) {
    return (
        <a href={`#${id}`}
            onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(id);
                if (element) {
                    const headerOffset = 75;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }}
            className="block text-[11px] font-medium py-1.5 pl-3 border-l-2 border-transparent transition-all duration-200 hover:border-white/20 hover:text-white/50"
            style={{ color: 'rgba(255,255,255,0.25)' }}>
            {title}
        </a>
    );
}
