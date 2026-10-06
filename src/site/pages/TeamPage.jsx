import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { currentHeads, currentSTMs, juniorMembers, pastHeads } from '../data/team';
import { PageHeader } from '../components/motion';
import teamGroup from '../../assets/optimized/team-group.jpg';
// TODO: STM and Head merge tabs
const tabs = [
  { id: 'heads', label: 'Heads', role: 'Head', groups: [{ members: currentHeads }] },
  { id: 'stms', label: 'STMs', role: 'STM', groups:[{members: currentSTMs}]},
  { id: 'jtm', label: 'Junior members', role: 'Junior member', groups: [{ members: juniorMembers }] },
  { id: 'past', label: 'Past heads', role: 'Past head', groups: pastHeads.map((g) => ({ title: `${g.year} Heads`, members: g.members })) },
];

const socialIcons = [
  ['github', FaGithub, 'GitHub'],
  ['instagram', FaInstagram, 'Instagram'],
  ['linkedin', FaLinkedinIn, 'LinkedIn'],
];

const MemberCard = ({ member, index, role }) => (
  <motion.li
    layout
    initial={{ opacity: 0, y: 40, rotate: index % 2 ? 2 : -2 }}
    animate={{ opacity: 1, y: 0, rotate: 0, transition: { delay: index * 0.04, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
    exit={{ opacity: 0, transition: { duration: 0.2 } }}
    whileHover={{ y: -8, rotate: index % 2 ? 1.5 : -1.5 }}
    className="group relative border-2 border-ink bg-chalk p-2 shadow-[6px_6px_0_#0d110e]"
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
      <p className="label text-turf">{role}</p>
      <h3 className="display mt-1 text-3xl leading-[0.9] text-ink">{member.name}</h3>
      {member.email && (
        <a href={`mailto:${member.email}`} className="mt-1 block truncate font-mono text-[11px] text-ink/60 hover:text-flare">
          {member.email}
        </a>
      )}
      <div className="mt-3 flex gap-1.5">
        {socialIcons.map(([key, Icon, label]) =>
          member[key] ? (
            <a
              key={key}
              href={member[key]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on ${label}`}
              className="grid h-8 w-8 place-items-center bg-ink text-chalk transition-colors hover:bg-flare hover:text-ink"
            >
              <Icon className="h-3.5 w-3.5" />
            </a>
          ) : null,
        )}
      </div>
    </div>
  </motion.li>
);

const TeamPage = () => {
  const [active, setActive] = useState(tabs[0].id);
  const tab = tabs.find((t) => t.id === active);

  return (
    <>
      <PageHeader kicker="Team" title="The team" image={teamGroup}>
        ERA was founded in 2018 under Prof. Laxmidhar Behera, now the director of IIT Mandi. We continue
        to work with faculty, our current advisor being Prof. Indranil Saha. Since then we have grown in
        number and ability, taking on projects, competing, and publishing research.
      </PageHeader>

      <section className="paper pb-28 pt-10">
        <div className="container-site">
        <div
          role="tablist"
          aria-label="Team groups"
          className="sticky top-20 z-30 mb-14 flex w-fit max-w-full overflow-x-auto border-2 border-ink bg-ink"
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active === t.id}
              onClick={() => setActive(t.id)}
              className={`label relative whitespace-nowrap px-4 py-3 transition-colors sm:px-6 ${
                active === t.id ? 'text-ink' : 'text-chalk/70 hover:text-chalk'
              }`}
            >
              {active === t.id && (
                <motion.span
                  layoutId="team-tab"
                  className="absolute inset-0 bg-volt"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{t.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="space-y-20"
          >
            {tab.groups.map((g) => (
              <div key={g.title ?? tab.id}>
                {g.title && (
                  <div className="mb-8 flex items-center gap-4">
                    <h2 className="display text-5xl text-ink sm:text-6xl">{g.title}</h2>
                    <span className="h-[2px] flex-1 bg-ink" />
                    <span className="label text-ink/60">{g.members.length} members</span>
                  </div>
                )}
                <ul className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
                  {g.members.map((m, i) => (
                    <MemberCard key={m.name} member={m} index={i} role={tab.role} />
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
        </div>
      </section>
    </>
  );
};

export default TeamPage;
