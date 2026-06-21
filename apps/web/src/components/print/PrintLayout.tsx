import PrintExperience from './PrintExperience'
import PrintProjects from './PrintProjects'

const SKILLS = [
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Solidity',
  'Go',
  'PostgreSQL',
  'Redis',
  'Docker',
  'Kubernetes',
  'Tailwind CSS',
  'GraphQL',
]

export default function PrintLayout() {
  return (
    <div className="bg-white text-black">
      <div className="grid min-h-screen grid-cols-[260px_1fr]">
        {/* Left column */}
        <aside className="bg-gray-50 px-6 py-8">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
            J
          </div>

          <h1 className="text-lg font-bold text-gray-900">Jiangui</h1>
          <p className="mt-0.5 text-xs text-gray-600">
            Senior Full-Stack Engineer
          </p>

          <section className="mt-6">
            <h2 className="mb-1.5 text-[10px] font-semibold tracking-widest text-blue-700 uppercase">
              Contact
            </h2>
            <ul className="space-y-1 text-[11px] text-gray-700">
              <li>jiangui.eth@gmail.com</li>
              <li>github.com/jiangui-eth</li>
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="mb-1.5 text-[10px] font-semibold tracking-widest text-blue-700 uppercase">
              Tech Skills
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {SKILLS.map(skill => (
                <span
                  key={skill}
                  className="rounded border border-gray-200 px-1.5 py-0.5 text-[10px] text-gray-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className="mt-6">
            <h2 className="mb-1.5 text-[10px] font-semibold tracking-widest text-blue-700 uppercase">
              Education
            </h2>
            <p className="text-[11px] font-medium text-gray-800">
              B.Sc. Computer Science
            </p>
            <p className="text-[11px] text-gray-600">2015 – 2019</p>
          </section>

          <section className="mt-6">
            <h2 className="mb-1.5 text-[10px] font-semibold tracking-widest text-blue-700 uppercase">
              Languages
            </h2>
            <ul className="space-y-1 text-[11px] text-gray-700">
              <li>English — Fluent</li>
              <li>Chinese — Native</li>
            </ul>
          </section>
        </aside>

        {/* Right column */}
        <main className="px-8 py-8">
          <PrintExperience />
          <div className="mt-8">
            <PrintProjects />
          </div>
        </main>
      </div>
    </div>
  )
}
