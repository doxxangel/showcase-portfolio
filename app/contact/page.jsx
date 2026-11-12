'use client';
import { useState, useEffect } from 'react';
import { Check, ArrowRight, RotateCcw, AlertCircle, Loader2 } from 'lucide-react';
import { useSite } from '@/context/SiteContext';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { clampPopover } from '@/lib/clampPopover';
import Pop from '@/components/Pop';

const availabilityConfig = { openDays: [1, 2, 3, 4, 5], startHour: 9, endHour: 16, timeZone: 'Europe/Amsterdam' };

const translations = {
  nl: {
    lblStatus: "Momenteel", valStatusOpen: "De steen de berg op aan het duwen", valStatusClosed: "Offline", valStatusNight: "Slapen",
    lblTimezone: "Mijn klok", lblResponse: "Reactietijd", valResponse: "Best snel",
    photoCaption: "Nog steeds zo blij met elke mail.",
    lblDirectMail: "Liever direct mailen?", popDirectTitle: "Directe Post", popDirectDesc: "Opent je mailclient om direct een bericht te sturen.",
    formTitle: "Stuur een bericht", labelName: "Je Naam *", placeholderName: "Bijv. Jeanne d'Arc",
    labelEmail: "E-mailadres *", placeholderEmail: "Jeanne@domein.nl", labelSubject: "Onderwerp / Doel",
    subjectOptions: [
      { val: "Samenwerking / Nieuw Project", text: "Samenwerking / Nieuw Project" },
      { val: "Design & Frontend Development", text: "Design & Frontend Development" },
      { val: "Filosofie & Gedachtewisseling", text: "Filosofie & Gedachtewisseling" },
      { val: "Kennismaken / Netwerken", text: "Kennismaken / Netwerken" },
    ],
    labelMessage: "Bericht *", placeholderMessage: "Schrijf hier je gedachten, ideeën of vraag...",
    btnSubmit: "Verstuur Bericht", btnSending: "Verzenden...", successTitle: "Bericht Verzonden",
    successDesc: "Bedankt voor je bericht. Het is direct doorgestuurd. Je ontvangt doorgaans binnen 48 uur een antwoord.",
    btnReset: "Stuur nog een bericht", toastAudioOn: "Ambient geluid ingeschakeld", toastAudioOff: "Audio uitgeschakeld",
    toastMsgSent: "Bericht succesvol verzonden",
    errorMsg: "Er ging iets mis bij het verzenden. Controleer je invoer of probeer het later opnieuw."
  },
  en: {
    lblStatus: "Right now", valStatusOpen: "Pushing the boulder uphill", valStatusClosed: "Offline", valStatusNight: "Asleep",
    lblTimezone: "My clock", lblResponse: "Reply time", valResponse: "Pretty quick",
    photoCaption: "Still this happy with every email.",
    lblDirectMail: "Rather email directly?", popDirectTitle: "Direct Dispatch", popDirectDesc: "Opens your preferred email client to write directly.",
    formTitle: "Send a message", labelName: "Your Name *", placeholderName: "E.g. Jane Doe",
    labelEmail: "Email Address *", placeholderEmail: "jane@domain.com", labelSubject: "Subject / Purpose",
    subjectOptions: [
      { val: "Collaboration / New Project", text: "Collaboration / New Project" },
      { val: "Design & Frontend Development", text: "Design & Frontend Development" },
      { val: "Philosophy & Exchange of Ideas", text: "Philosophy & Exchange of Ideas" },
      { val: "Get in Touch / Networking", text: "Get in Touch / Networking" },
    ],
    labelMessage: "Message *", placeholderMessage: "Write your thoughts, ideas, or questions here...",
    btnSubmit: "Send Message", btnSending: "Sending...", successTitle: "Message Dispatched",
    successDesc: "Thank you for your dispatch. It has been delivered. You can expect a response within 48 hours.",
    btnReset: "Send another dispatch", toastAudioOn: "Ambient audio enabled", toastAudioOff: "Audio muted",
    toastMsgSent: "Message successfully dispatched",
    errorMsg: "Something went wrong sending your message. Please try again later."
  }
};

export default function ContactPage() {
  const { lang, audioActive, toggleAudio, playHover } = useSite();
  const [clock, setClock] = useState('--:--:--');
  const [mood, setMood] = useState('open'); // 'open' | 'off' | 'night'
  const [openPopoverId, setOpenPopoverId] = useState(null);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [toast, setToast] = useState({ show: false, text: '', isError: false });

  const dict = translations[lang];

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setClock(now.toLocaleTimeString('nl-NL', { timeZone: availabilityConfig.timeZone }));
      // dag en uur in Amsterdam, niet in de tijdzone van de bezoeker
      const ams = new Date(now.toLocaleString('en-US', { timeZone: availabilityConfig.timeZone }));
      const day = ams.getDay();
      const hour = ams.getHours();
      if (hour >= 23 || hour < 7) setMood('night');
      else if (availabilityConfig.openDays.includes(day) && hour >= availabilityConfig.startHour && hour < availabilityConfig.endHour) setMood('open');
      else setMood('off');
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const showToast = (text, isError = false) => {
    setToast({ show: true, text, isError });
    setTimeout(() => setToast({ show: false, text: '', isError: false }), 3000);
  };

  const handleToggleAudio = () => {
    toggleAudio();
    showToast(!audioActive ? dict.toastAudioOn : dict.toastAudioOff);
  };

  const togglePopover = (e, id, pitch) => {
    e.stopPropagation();
    clampPopover(e.currentTarget);
    setOpenPopoverId(openPopoverId === id ? null : id);
    if (pitch) playHover(pitch);
  };
  const pp = { openId: openPopoverId, toggle: togglePopover, play: playHover };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    playHover(493);
    const formData = new FormData(e.target);
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const data = await res.json();
      if (res.status === 200 && data.success) {
        setSentSuccess(true);
        playHover(523);
        showToast(dict.toastMsgSent);
      } else {
        showToast(data.message || dict.errorMsg, true);
      }
    } catch {
      showToast(dict.errorMsg, true);
    } finally {
      setSending(false);
    }
  };

  const resetForm = () => {
    setSentSuccess(false);
    setMessage('');
  };

  const label = "type-label text-neutral-500 mb-1";
  const field = "minimal-input type-lead text-black placeholder:text-neutral-300";

  return (
    <>
    <div className="bg-white text-black min-h-screen pt-8 md:pt-10 px-5 sm:px-8 md:px-14 lg:px-16 selection:bg-black selection:text-white" onClick={() => setOpenPopoverId(null)}>

      <div className={`fixed bottom-6 right-6 z-[70] bg-black text-white text-xs px-4 py-2.5 rounded-lg shadow-xl transition-all duration-300 pointer-events-none flex items-center gap-2 ${toast.show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        {toast.isError ? <AlertCircle className="w-3.5 h-3.5 text-rose-400" /> : <Check className="w-3.5 h-3.5 text-emerald-400" />}
        <span>{toast.text}</span>
      </div>

      <div className="w-full max-w-[1600px] mr-auto">
        <SiteHeader onToggleAudio={handleToggleAudio} />

        <div className="w-full max-w-[1240px] mr-auto lg:pr-10">
          <div className="mb-8 md:mb-14">
            <h1 className="type-display inline-block border-b-[3px] border-black pb-1">
              CONTACT
            </h1>
          </div>

          <main className="grid grid-cols-1 lg:grid-cols-[390px_minmax(0,1fr)] xl:grid-cols-[420px_minmax(0,1fr)] gap-10 lg:gap-16 items-start">

            <aside className="w-full space-y-8 order-2 lg:order-1">
              <div className="w-full aspect-square overflow-hidden bg-neutral-100">
                <img
                  src="/images/ikbaby.JPG"
                  alt="Portret foto"
                  className="w-full h-full object-cover contrast-110 brightness-95 block hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <p className="type-small italic text-neutral-500 -mt-5">{dict.photoCaption}</p>

              <div className="border-t border-neutral-200 pt-6 space-y-4">
                <div className="flex items-center justify-between gap-6 text-sm">
                  <span className="type-label text-neutral-500 shrink-0">{dict.lblStatus}</span>
                  <div className="flex items-center gap-2 text-right">
                    <span className="relative flex h-2.5 w-2.5">
                      {mood === 'open' && <span className="status-pulse absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
                      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${mood === 'open' ? 'bg-emerald-600' : 'bg-neutral-400'}`}></span>
                    </span>
                    <span className="type-small text-neutral-900">{mood === 'open' ? dict.valStatusOpen : mood === 'night' ? dict.valStatusNight : dict.valStatusClosed}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-6 text-sm">
                  <span className="type-label text-neutral-500 shrink-0">{dict.lblTimezone}</span>
                  <span className="type-small text-right text-neutral-800"><span className="tabular-nums">{clock}</span></span>
                </div>
                <div className="flex items-center justify-between gap-6 text-sm">
                  <span className="type-label text-neutral-500 shrink-0">{dict.lblResponse}</span>
                  <span className="type-small text-right text-neutral-800">{dict.valResponse}</span>
                </div>
              </div>

              <div className="border-t border-neutral-200 pt-6">
                <h3 className="type-label text-neutral-500 mb-2">{dict.lblDirectMail}</h3>
                <span
                  className={`mac-trigger relative inline-block break-all type-lead underline underline-offset-4 hover:opacity-70 transition cursor-pointer ${openPopoverId === 'c-mail' ? 'popover-open' : ''}`}
                  onMouseEnter={(e) => { clampPopover(e.currentTarget); playHover(659); }}
                  onClick={(e) => togglePopover(e, 'c-mail', 659)}
                >
                  Info@doxxangelstudios.nl
                  <span className="mac-popover">
                    <strong className="type-label block text-neutral-900 mb-1">{dict.popDirectTitle}</strong>
                    <span className="type-small block text-neutral-600">{dict.popDirectDesc}</span>
                    <a href="mailto:Info@doxxangelstudios.nl" className="block text-[11px] font-bold text-black uppercase underline underline-offset-2 mt-2 font-sans-clean">Stuur e-mail ↗</a>
                  </span>
                </span>
              </div>
            </aside>

            <div className="space-y-10 md:space-y-12 order-1 lg:order-2">
              <p className="type-lead">
                {lang === 'nl' ? (
                  <>
                    Ik sta open voor doordachte vragen over nieuwe{' '}
                    <Pop {...pp} id="c-collab" pitch={392} title="samenwerkingen" desc="Samen een project creëren door verschillende vaardigheden, perspectieven of middelen te combineren om een gedeelde visie te realiseren.">samenwerkingen</Pop>,{' '}
                    <Pop {...pp} id="c-letter" pitch={440} title="Letterboxd" desc="Een sociaal netwerkplatform voor filmliefhebbers om gekeken films te loggen, beoordelen, recenseren en bij te houden.">Letterboxd</Pop>{' '}
                    uitwisselingen,{' '}
                    <Pop {...pp} id="c-dialogue" pitch={494} title="socratische dialogen" desc="Gesprekken om overtuigingen kritisch te onderzoeken, aannames bloot te leggen en onderliggende waarheden te achterhalen.">socratische dialogen</Pop>
                    , of wat je nieuwsgierigheid dan ook prikkelt. Vul het onderstaande formulier in of stuur direct een e-mail.
                  </>
                ) : (
                  <>
                    I welcome thoughtful inquiries regarding new{' '}
                    <Pop {...pp} id="c-collab-en" pitch={392} title="collaborations" desc="Co-create a project, combining different skills, perspectives, or resources to achieve a shared vision.">collaborations</Pop>,{' '}
                    <Pop {...pp} id="c-letter-en" pitch={440} title="Letterboxd" desc="A social networking platform for film enthusiasts to log, rate, review, and track the movies they watch.">Letterboxd</Pop>{' '}
                    trades,{' '}
                    <Pop {...pp} id="c-dialogue-en" pitch={494} title="Socratic dialogues" desc="Conversation to critically examine beliefs, expose assumptions, and uncover underlying truths.">Socratic dialogues</Pop>
                    , or whatever else sparks your curiosity. Fill out the form below or write directly via email.
                  </>
                )}
              </p>

              <section className="border-t border-neutral-200 pt-8">
                <h2 className="type-heading underline underline-offset-[6px] mb-8">{dict.formTitle}</h2>

                {sentSuccess ? (
                  <div className="mt-6 p-6 sm:p-8 border-2 border-black bg-neutral-50">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="type-heading text-black">{dict.successTitle}</h3>
                        <p className="type-small text-neutral-600">{dict.successDesc}</p>
                        <div className="pt-3">
                          <button type="button" onClick={resetForm} className="type-label underline underline-offset-4 hover:opacity-60 transition inline-flex items-center gap-1.5 cursor-pointer">
                            <span>{dict.btnReset}</span>
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-7 md:space-y-8">
                    <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "642dadec-09c4-4b1e-b3b0-bcd497307c75"} />
                    <input type="hidden" name="from_name" value="DOXXANGEL Contact" />
                    <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                    <div className="flex flex-col">
                      <label htmlFor="name" className={label}>{dict.labelName}</label>
                      <input type="text" id="name" name="name" required placeholder={dict.placeholderName} className={field} onFocus={() => playHover(493)} />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="email" className={label}>{dict.labelEmail}</label>
                      <input type="email" id="email" name="email" required placeholder={dict.placeholderEmail} className={field} onFocus={() => playHover(523)} />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="subject" className={label}>{dict.labelSubject}</label>
                      <select id="subject" name="subject" className={`${field} bg-white cursor-pointer`} onFocus={() => playHover(587)}>
                        {dict.subjectOptions.map(opt => <option key={opt.val} value={opt.val}>{opt.text}</option>)}
                      </select>
                    </div>

                    <div className="flex flex-col">
                      <div className="flex items-center justify-between mb-1">
                        <label htmlFor="message" className="type-label text-neutral-500">{dict.labelMessage}</label>
                        <span className="type-small tabular-nums text-neutral-400">{message.length} / 800</span>
                      </div>
                      <textarea id="message" name="message" rows="4" maxLength={800} required placeholder={dict.placeholderMessage} value={message} onChange={(e) => setMessage(e.target.value)} className={`${field} resize-none leading-relaxed`} onFocus={() => playHover(659)}></textarea>
                    </div>

                    <div className="pt-2 md:pt-4">
                      <button type="submit" disabled={sending} onMouseEnter={() => playHover(784)} className="group w-full sm:w-auto justify-center inline-flex items-center gap-3 bg-black text-white hover:bg-neutral-800 px-8 py-3.5 type-label transition-all duration-200 active:scale-[0.98] cursor-pointer">
                        {sending ? (
                          <><span>{dict.btnSending}</span><Loader2 className="w-4 h-4 animate-spin" /></>
                        ) : (
                          <><span>{dict.btnSubmit}</span><ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" /></>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
    <SiteFooter />
    </>
  );
}