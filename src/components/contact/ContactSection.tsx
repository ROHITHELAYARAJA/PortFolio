import React, { useState } from 'react';
import { Mail, Copy, Check, ExternalLink, Github, Globe, Code2 } from 'lucide-react';
import { AUTHOR_INFO } from '../../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const emailAddress = AUTHOR_INFO.email;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-[24px] border border-hairline bg-surface p-5 sm:p-8 shadow-sm">
        <h3 className="font-cabinet text-[22px] sm:text-[26px] font-bold text-strong tracking-tight">
          Let's build something deterministic.
        </h3>
        <p className="mt-2 max-w-[60ch] font-cabinet text-[15px] leading-relaxed text-ink-soft sm:text-[16px]">
          Open to software engineering roles, high-impact backend systems, AI applications, and select technical consulting.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex items-center justify-between sm:justify-start gap-2 rounded-xl border border-hairline bg-subtle px-3.5 py-2.5">
            <div className="flex items-center gap-2 min-w-0">
              <Mail className="size-4 text-ink-soft shrink-0" />
              <span className="font-mono text-[13px] sm:text-[14px] text-strong truncate">{emailAddress}</span>
            </div>
            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label="Copy email address"
              className="ml-2 flex size-7 shrink-0 items-center justify-center rounded-lg border border-hairline bg-surface text-ink-soft transition-colors hover:text-strong hover:bg-subtle-strong"
            >
              {copied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
            </button>
          </div>

          <a
            href={`mailto:${emailAddress}?subject=Inquiry%20for%20Rohith%20E`}
            className="flex h-[44px] items-center justify-center gap-2 rounded-xl border border-strong bg-strong px-5 font-cabinet text-[14px] font-bold text-bg transition-opacity hover:opacity-90 shadow-sm"
          >
            <span>Send Email Directly</span>
            <ExternalLink className="size-3.5" />
          </a>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 border-t border-hairline/60 pt-6">
          <a
            href="https://github.com/ROHITHELAYARAJA"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-xl border border-hairline bg-subtle p-3.5 transition-all hover:border-btn-border hover:bg-surface"
          >
            <div className="flex items-center gap-2.5">
              <Github className="size-4 text-ink-soft group-hover:text-strong" />
              <span className="font-cabinet text-[14px] font-bold text-strong">GitHub</span>
            </div>
            <ExternalLink className="size-3.5 text-ink-soft group-hover:text-strong" />
          </a>

          <a
            href="https://rohith-digital-x-xi.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-xl border border-hairline bg-subtle p-3.5 transition-all hover:border-btn-border hover:bg-surface"
          >
            <div className="flex items-center gap-2.5">
              <Globe className="size-4 text-ink-soft group-hover:text-[#0070F3]" />
              <span className="font-cabinet text-[14px] font-bold text-strong">Rohith Digital X</span>
            </div>
            <ExternalLink className="size-3.5 text-ink-soft group-hover:text-[#0070F3]" />
          </a>

          <a
            href="https://leetcode.com/Shinchan_2007"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-xl border border-hairline bg-subtle p-3.5 transition-all hover:border-btn-border hover:bg-surface"
          >
            <div className="flex items-center gap-2.5">
              <Code2 className="size-4 text-ink-soft group-hover:text-[#FFA116]" />
              <span className="font-cabinet text-[14px] font-bold text-strong">LeetCode</span>
            </div>
            <ExternalLink className="size-3.5 text-ink-soft group-hover:text-[#FFA116]" />
          </a>
        </div>
      </div>
    </div>
  );
};
