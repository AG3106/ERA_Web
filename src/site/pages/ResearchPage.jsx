import { research } from '../../constants';
import { Counter, PageHeader, Reveal } from '../components/motion';
import { ResearchList, researchIntro } from '../sections/Research';

const years = research.map((r) => Number(r.year));

const stats = [
  { value: research.length, label: 'Papers & posters' },
  { value: Math.min(...years), label: 'First publication' },
  { value: Math.max(...years), label: 'Latest submission' },
];

const ResearchPage = () => (
  <>
    <PageHeader kicker="Research" title="On paper">
      {researchIntro}
    </PageHeader>
    <section className="paper py-20 sm:py-28">
      <div className="container-site">
        <Reveal className="led mb-16 grid grid-cols-3 border-4 border-ink text-chalk">
          {stats.map((s) => (
            <div key={s.label} className="border-r-2 border-chalk/10 p-5 last:border-r-0 sm:p-8">
              <p className="display text-5xl text-volt sm:text-8xl">
                <Counter to={s.value} from={s.value > 100 ? s.value - 12 : 0} />
              </p>
              <p className="label mt-2 text-chalk/70">{s.label}</p>
            </div>
          ))}
        </Reveal>
        <ResearchList />
      </div>
    </section>
  </>
);

export default ResearchPage;
