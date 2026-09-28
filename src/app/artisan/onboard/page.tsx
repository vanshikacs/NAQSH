'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Send, Mic, ChevronRight, CheckCircle } from 'lucide-react';

type OnboardingStep =
  | 'welcome'
  | 'craft_type'
  | 'work_days'
  | 'earnings'
  | 'photo'
  | 'name_consent'
  | 'registering'
  | 'complete';

interface Message {
  from: 'naqsh' | 'artisan';
  text: string;
  type?: 'voice' | 'option' | 'text';
  timestamp: string;
}

const CRAFT_OPTIONS = ['Bakhiya', 'Phanda', 'Murri', 'Jali', 'Mixed / Other'];

function now() {
  return new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

export default function ArtisanOnboardingPage() {
  const [step, setStep] = useState<OnboardingStep>('welcome');
  const [messages, setMessages] = useState<Message[]>([
    {
      from: 'naqsh',
      text: 'Namaste, Amina ji 🌸\nLet\'s register your chikankari piece.',
      timestamp: now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [selectedCraft, setSelectedCraft] = useState('');
  const [workDays, setWorkDays] = useState('');
  const [earnings, setEarnings] = useState('');
  const [nameConsent, setNameConsent] = useState<boolean | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [registeredId, setRegisteredId] = useState('');

  const addMessage = (msg: Message) => {
    setMessages((prev) => [...prev, msg]);
  };

  const simulateNaqshTyping = async (text: string, nextStep: OnboardingStep) => {
    setIsTyping(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsTyping(false);
    addMessage({ from: 'naqsh', text, timestamp: now() });
    setStep(nextStep);
  };

  const handleCraftSelect = async (craft: string) => {
    setSelectedCraft(craft);
    addMessage({ from: 'artisan', text: craft, timestamp: now() });
    await simulateNaqshTyping('How many days did you work on this piece?', 'work_days');
  };

  const handleWorkDays = async () => {
    if (!workDays.trim()) return;
    addMessage({ from: 'artisan', text: workDays + ' days', timestamp: now() });
    await simulateNaqshTyping('What amount will you receive for this piece? (₹)', 'earnings');
    setWorkDays('');
  };

  const handleEarnings = async () => {
    if (!earnings.trim()) return;
    addMessage({ from: 'artisan', text: '₹' + earnings, timestamp: now() });
    await simulateNaqshTyping(
      'Please send a photo of the reverse side of the embroidery.\n(For this demo, we\'ll use a reference image.)',
      'photo'
    );
    setEarnings('');
  };

  const handlePhoto = async () => {
    addMessage({ from: 'artisan', text: '📷 [reverse side photo]', timestamp: now() });
    await simulateNaqshTyping(
      'Thank you. Now please send a photo of the front.',
      'photo'
    );
    await new Promise((r) => setTimeout(r, 800));
    addMessage({ from: 'artisan', text: '📷 [front photo]', timestamp: now() });
    await simulateNaqshTyping(
      'Would you like your name and story to appear on the buyer certificate?',
      'name_consent'
    );
  };

  const handleNameConsent = async (consent: boolean) => {
    setNameConsent(consent);
    addMessage({ from: 'artisan', text: consent ? 'Yes, please' : 'Not now', timestamp: now() });
    await simulateNaqshTyping('Your piece is being registered...\nNAQSH Vision is analyzing the embroidery.', 'registering');
    await new Promise((r) => setTimeout(r, 2500));
    const id = 'NQ-2026-' + Math.floor(Math.random() * 900 + 100);
    setRegisteredId(id);
    setIsTyping(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsTyping(false);
    addMessage({
      from: 'naqsh',
      text: `Registration complete! ✨\n\nGarment ID: ${id}\nAI status: High consistency with hand embroidery\n\nYour piece is now registered with NAQSH.`,
      timestamp: now(),
    });
    setStep('complete');
  };

  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />

      <main className="pt-20 pb-20 px-4">
        <div className="max-w-md mx-auto">

          {/* Header */}
          <div className="text-center mb-6">
            <p
              className="text-xs font-body font-medium tracking-widest uppercase text-rose mb-3"
              style={{ fontSize: '10px', letterSpacing: '0.18em' }}
            >
              Artisan Onboarding
            </p>
            <h1 className="font-serif text-3xl text-ink mb-2">Register Your Piece</h1>
            <p className="text-sm font-body text-ink-muted">
              WhatsApp-inspired cooperative-assisted onboarding
            </p>
          </div>

          {/* Chat window */}
          <div className="rounded-xl overflow-hidden border border-blush shadow-sm">
            {/* Chat header */}
            <div className="bg-wine px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <span className="font-serif text-white text-sm font-bold">N</span>
              </div>
              <div>
                <p className="text-white text-sm font-body font-medium">NAQSH</p>
                <p className="text-white/70 text-xs font-body">Craft registration assistant</p>
              </div>
            </div>

            {/* Messages */}
            <div
              className="bg-blush/20 p-4 space-y-3 min-h-[360px] max-h-[480px] overflow-y-auto"
              role="log"
              aria-live="polite"
              aria-label="Registration chat"
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.from === 'artisan' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 ${
                      msg.from === 'naqsh'
                        ? 'bg-white border border-blush text-ink'
                        : 'bg-wine text-white'
                    }`}
                  >
                    <p className="text-sm font-body whitespace-pre-line leading-relaxed">{msg.text}</p>
                    <p
                      className={`text-xs mt-1 ${msg.from === 'naqsh' ? 'text-ink-muted' : 'text-white/60'}`}
                      style={{ fontSize: '10px' }}
                    >
                      {msg.timestamp}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white border border-blush rounded-lg px-4 py-2">
                    <div className="flex gap-1 items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-ink-muted naqsh-pulse" />
                      <div className="w-1.5 h-1.5 rounded-full bg-ink-muted naqsh-pulse" style={{ animationDelay: '0.2s' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-ink-muted naqsh-pulse" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input area */}
            <div className="bg-white border-t border-blush p-3">
              {/* Craft selection */}
              {step === 'craft_type' && !isTyping && (
                <div className="flex flex-wrap gap-2">
                  {CRAFT_OPTIONS.map((craft) => (
                    <button
                      key={craft}
                      onClick={() => handleCraftSelect(craft)}
                      className="px-3 py-1.5 border border-wine text-wine rounded-full text-xs font-body hover:bg-wine hover:text-white transition-colors"
                    >
                      {craft}
                    </button>
                  ))}
                </div>
              )}

              {/* Work days input */}
              {step === 'work_days' && !isTyping && (
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={workDays}
                    onChange={(e) => setWorkDays(e.target.value)}
                    placeholder="Number of days..."
                    min="1"
                    max="365"
                    className="flex-1 border border-blush rounded-full px-4 py-2 text-sm font-body text-ink focus:outline-none focus:border-wine"
                    onKeyDown={(e) => e.key === 'Enter' && handleWorkDays()}
                  />
                  <button
                    onClick={handleWorkDays}
                    className="p-2 bg-wine text-white rounded-full hover:bg-burgundy transition-colors"
                    aria-label="Send"
                  >
                    <Send size={16} aria-hidden="true" />
                  </button>
                </div>
              )}

              {/* Earnings input */}
              {step === 'earnings' && !isTyping && (
                <div className="flex gap-2">
                  <div className="flex-1 flex items-center border border-blush rounded-full px-4 overflow-hidden focus-within:border-wine">
                    <span className="text-sm text-ink-muted font-body mr-1">₹</span>
                    <input
                      type="number"
                      value={earnings}
                      onChange={(e) => setEarnings(e.target.value)}
                      placeholder="Amount..."
                      min="0"
                      className="flex-1 py-2 text-sm font-body text-ink focus:outline-none"
                      onKeyDown={(e) => e.key === 'Enter' && handleEarnings()}
                    />
                  </div>
                  <button
                    onClick={handleEarnings}
                    className="p-2 bg-wine text-white rounded-full hover:bg-burgundy transition-colors"
                    aria-label="Send"
                  >
                    <Send size={16} aria-hidden="true" />
                  </button>
                </div>
              )}

              {/* Photo step */}
              {step === 'photo' && !isTyping && (
                <button
                  onClick={handlePhoto}
                  className="w-full flex items-center justify-center gap-2 py-2.5 border border-wine text-wine rounded-full text-sm font-body hover:bg-wine/5 transition-colors"
                >
                  📷 Send demo photos
                </button>
              )}

              {/* Name consent */}
              {step === 'name_consent' && !isTyping && (
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => handleNameConsent(true)}
                    className="flex-1 py-2 bg-wine text-white rounded-full text-sm font-body hover:bg-burgundy transition-colors"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => handleNameConsent(false)}
                    className="flex-1 py-2 border border-wine text-wine rounded-full text-sm font-body hover:bg-wine/5 transition-colors"
                  >
                    Not now
                  </button>
                </div>
              )}

              {/* Registering */}
              {step === 'registering' && (
                <div className="text-center py-1">
                  <p className="text-xs font-body text-ink-muted">Registering and analyzing...</p>
                </div>
              )}

              {/* Complete */}
              {step === 'complete' && (
                <div className="text-center">
                  <CheckCircle size={20} className="text-green-600 mx-auto mb-2" aria-hidden="true" />
                  <p className="text-sm font-body font-medium text-green-700 mb-2">Registration complete!</p>
                  <a
                    href={`/verify/${registeredId}`}
                    className="inline-flex items-center gap-1 text-xs font-body text-wine hover:text-burgundy font-medium"
                  >
                    View certificate <ChevronRight size={12} aria-hidden="true" />
                  </a>
                </div>
              )}

              {/* Welcome - start button */}
              {step === 'welcome' && !isTyping && (
                <button
                  onClick={async () => {
                    addMessage({ from: 'artisan', text: '🎙 [voice message]', type: 'voice', timestamp: now() });
                    await simulateNaqshTyping(
                      'Thank you. What kind of work is on this piece?',
                      'craft_type'
                    );
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 border border-wine text-wine rounded-full text-sm font-body hover:bg-wine/5 transition-colors"
                >
                  <Mic size={15} aria-hidden="true" /> Send voice message
                </button>
              )}
            </div>
          </div>

          {/* Context note */}
          <div className="mt-5 card-naqsh p-4">
            <p className="text-xs font-body text-ink-muted leading-relaxed" style={{ fontSize: '11px' }}>
              <strong>Product philosophy:</strong> NAQSH onboarding is designed to be
              WhatsApp and voice-first, cooperative-assisted. Artisans should not
              need to navigate a complicated dashboard. This is a simulated demonstration.
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
