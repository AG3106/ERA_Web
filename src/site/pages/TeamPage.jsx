import { motion } from 'motion/react';
import { FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { currentHeads, currentSTMs, juniorMembers, pastHeads } from '../data/team';
import { PageHeader, SectionHeading } from '../components/motion';
import teamGroup from '../../assets/optimized/team-group.jpg';
// Every group is shown on one scrolling page, in this order.
const sections = [
  {
    id: 'heads',
    label: 'Heads & STMs',
    // Five cards: one row of five on wide screens.
    cols: 'lg:grid-cols-5',
    groups: [
      {
        members: [
          ...currentHeads.map((m) => ({ ...m, role: 'Head' })),
          ...currentSTMs.map((m) => ({ ...m, role: 'STM' })),
        ],
      },
    ],
  },
  { id: 'jtm', label: 'Junior members', role: 'Junior member', groups: [{ members: juniorMembers }] },
  { id: 'past', label: 'Past heads', role: 'Past head', groups: pastHeads.map((g) => ({ title: g.year, members: g.members })) },
];

const socialIcons = [
  ['github', FaGithub, 'GitHub'],
  ['instagram', FaInstagram, 'Instagram'],
  ['linkedin', FaLinkedinIn, 'LinkedIn'],
];

const MemberCard = ({ member, index, role }) => (
  <motion.li
    initial={{ opacity: 0, y: 40, rotate: index % 2 ? 2 : -2 }}
    whileInView={{ opacity: 1, y: 0, rotate: 0, transition: { delay: (index % 4) * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
    viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    whileHover={{ y: -8, rotate: index % 2 ? 1.5 : -1.5 }}
    className="group relative border-2 border-ink bg-chalk p-2 shadow-[6px_6px_0_#0a0f1d]"
  >
    <div className="relative aspect-[4/5] overflow-hidden bg-ink">
      <img
        src={member.image}
        alt={member.name}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <span className="display absolute left-0 top-0 grid h-14 w-14 place-items-center bg-volt text-4xl text-ink">
        {index + 1}
      </span>
    </div>
    <div className="px-1 pb-1 pt-3">
      <p className="label text-turf">{member.role ?? role}</p>
      <h3 className="display mt-1 text-3xl leading-[0.9] text-ink">{member.name}</h3>
      {member.email && (
        <a href={`mailto:${member.email}`} className="mt-1 block break-words font-mono text-[11px] leading-snug text-ink/60 hover:text-flare">
          {member.email.split('@')[0]}
          <wbr />@{member.email.split('@')[1]}
        </a>
      )}
      <div className="mt-3 flex gap-1 sm:gap-1.5">
        {socialIcons.map(([key, Icon, label]) =>
          member[key] ? (
            <a
              key={key}
              href={member[key]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on ${label}`}
              className="grid h-10 w-10 place-items-center bg-ink sm:h-8 sm:w-8 text-chalk transition-colors hover:bg-flare hover:text-ink"
            >
              <Icon className="h-3.5 w-3.5" />
            </a>
          ) : null,
        )}
      </div>
    </div>
  </motion.li>
);

const MemberGrid = ({ members, role, cols = 'lg:grid-cols-4' }) => (
  <ul className={`grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 ${cols}`}>
    {members.map((m, i) => (
      <MemberCard key={m.name} member={m} index={i} role={role} />
    ))}
  </ul>
);

const count = (n) => `${n} ${n === 1 ? 'member' : 'members'}`;

const TeamPage = () => (
  <>
    <PageHeader kicker="Team" title="The team" image={teamGroup}>
      ERA was founded in 2018 under Prof. Laxmidhar Behera, now the director of IIT Mandi. We continue
      to work with faculty, our current advisor being Prof. Indranil Saha. Since then we have grown in
      number and ability, taking on projects, competing, and publishing research.
    </PageHeader>

    <section className="paper pb-28 pt-16 sm:pt-20">
      <div className="container-site space-y-24 sm:space-y-32">
        {sections.map((sec, si) => {
          const total = sec.groups.reduce((n, g) => n + g.members.length, 0);
          return (
            <div key={sec.id} id={sec.id} className="scroll-mt-24">
              <SectionHeading
                num={String(si + 1).padStart(2, '0')}
                kicker={count(total)}
                title={sec.label}
                size="text-[clamp(3rem,7vw,6.5rem)]"
                className="mb-10 text-ink"
              />
              <div className="space-y-16">
                {sec.groups.map((g) => (
                  <div key={g.title ?? sec.id}>
                    {g.title && (
                      <div className="mb-8 flex items-center gap-4">
                        <h3 className="display text-4xl text-ink sm:text-5xl">{g.title}</h3>
                        <span className="h-[2px] flex-1 bg-ink/30" />
                        <span className="label text-ink/60">{count(g.members.length)}</span>
                      </div>
                    )}
                    <MemberGrid members={g.members} role={sec.role} cols={sec.cols} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  </>
);

export default TeamPage;
