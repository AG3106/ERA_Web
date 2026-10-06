import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { links, socials } from '../data/links';
import { Arrow, Reveal, SectionHeading } from '../components/motion';

const emptyForm = { name: '', email: '', organization: '', contact: '', message: '' };

const fields = [
  { name: 'name', label: 'Your name', placeholder: "What's your name?", required: true },
  { name: 'email', label: 'Your email', type: 'email', placeholder: "What's your email?", required: true },
  { name: 'organization', label: 'Organization type', placeholder: 'Student, startup, company…' },
  { name: 'contact', label: 'Contact number', placeholder: 'Optional' },
];

const Contact = () => {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'loading', message: '' });
    try {
      const res = await fetch(links.contactScript, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const text = await res.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch {
        throw new Error('Unexpected response from server');
      }
      if (result.result !== 'success') throw new Error(result.message || 'Unknown error');
      setForm(emptyForm);
      setStatus({ state: 'success', message: "Thanks! Your details have been saved. We'll be in touch." });
    } catch (err) {
      setStatus({ state: 'error', message: `Something went wrong: ${err.message}` });
    }
  };

  return (
    <section id="contact" className="relative">
      <div className="tech relative overflow-hidden py-24 text-chalk sm:py-32">
        <div className="container-site relative grid gap-16 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeading num="06" kicker="Contact" title="Get in touch">
              Want to sponsor us, collaborate on research, or join the team? Send a message and we&rsquo;ll get
              back to you.
            </SectionHeading>
            <Reveal delay={0.2} className="mt-10 space-y-6">
              <a
                href={`mailto:${links.email}`}
                className="display block text-4xl text-volt underline decoration-2 underline-offset-8 hover:text-chalk sm:text-5xl"
              >
                {links.email}
              </a>
              <div className="flex flex-wrap gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label border-2 border-chalk/40 px-3 py-2 transition-colors hover:border-volt hover:bg-volt hover:text-ink"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <form onSubmit={onSubmit} className="space-y-6 border-2 border-chalk/30 bg-ink/70 p-6 backdrop-blur-sm sm:p-10">
              <p className="label flex items-center justify-between text-volt">
                <span>Enquiry</span>
                <span className="text-chalk/50">Name &amp; email required</span>
              </p>
              <div className="grid gap-6 sm:grid-cols-2">
                {fields.map((f) => (
                  <label key={f.name} className="block">
                    <span className="label block text-chalk/70">{f.label}</span>
                    <input
                      type={f.type ?? 'text'}
                      name={f.name}
                      value={form[f.name]}
                      onChange={onChange}
                      placeholder={f.placeholder}
                      required={f.required}
                      className="field-line"
                    />
                  </label>
                ))}
              </div>
              <label className="block">
                <span className="label block text-chalk/70">Your message</span>
                <textarea
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={onChange}
                  placeholder="What's your message?"
                  className="field-line resize-none"
                />
              </label>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <motion.button
                  type="submit"
                  disabled={status.state === 'loading'}
                  className="btn-volt disabled:opacity-60"
                  whileTap={{ scale: 0.96 }}
                >
                  {status.state === 'loading' ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink border-t-transparent" />
                  ) : (
                    <>
                      Send message <Arrow />
                    </>
                  )}
                </motion.button>
                <AnimatePresence>
                  {status.message && (
                    <motion.p
                      role="status"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className={`text-sm ${status.state === 'error' ? 'text-flare' : 'text-volt'}`}
                    >
                      {status.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </Reveal>
        </div>
      </div>

      <div className="bg-ink py-20">
        <div className="container-site">
          <Reveal className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="label mb-3 text-volt">Instagram</p>
              <h3 className="display text-5xl sm:text-6xl">@era.iitk</h3>
            </div>
            <a href="https://instagram.com/era.iitk" target="_blank" rel="noopener noreferrer" className="btn-line shrink-0 text-chalk">
              Follow <Arrow />
            </a>
          </Reveal>
          <div className="insta-embed elfsight-app-bcdddf16-aa00-448f-8745-fb6762e5b41d" data-elfsight-app-lazy />
        </div>
      </div>
    </section>
  );
};

export default Contact;
