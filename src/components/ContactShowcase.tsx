import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Copy,
  Check,
  ArrowUpRight,
  Sparkles,
  Radio,
  MapPin
} from "lucide-react";

export default function ContactShowcase() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (e: React.MouseEvent, value: string, field: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1800);
  };

  return (
    <div className="contact-showcase-container">
      <motion.div
        className="contact-card-shell"
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="contact-header-row">
          <span className="contact-sector-tag">
            <Sparkles size={12} /> SECTOR 04 // COMMUNICATIONS & TRANSMISSION
          </span>
          <span className="contact-index-pill">04 / 04</span>
        </div>

        <div className="contact-title-block">
          <h1 className="contact-main-title">Contact</h1>
          <p className="contact-main-intro">
            Open to full-time Unity & Gameplay Engineering roles, console porting work, and technical collaborations. Reach out directly through any channel below.
          </p>
        </div>

        {/* Status / Availability Bar */}
        <div className="contact-availability-bar">
          <div className="availability-item">
            <Radio size={15} className="availability-icon" />
            <span>Available for Full-Time Roles & Technical Contracts</span>
          </div>
          <div className="availability-item">
            <MapPin size={15} className="availability-icon" />
            <span>Kerala, India · Onsite / Relocation / Remote</span>
          </div>
        </div>

        {/* 2x2 Contact Channels Grid */}
        <div className="contact-channels-grid">
          {/* Email */}
          <a
            href="mailto:gdsdev455@gmail.com"
            className="contact-channel-card"
          >
            <div className="channel-icon-box icon-mail">
              <Mail size={20} />
            </div>
            <div className="channel-info">
              <span className="channel-label">EMAIL</span>
              <span className="channel-value">gdsdev455@gmail.com</span>
            </div>
            <button
              type="button"
              className="channel-copy-btn"
              onClick={(e) => handleCopy(e, "gdsdev455@gmail.com", "email")}
              title="Copy email address"
              aria-label="Copy email address"
            >
              {copiedField === "email" ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </a>

          {/* Phone */}
          <a
            href="tel:+919778784425"
            className="contact-channel-card"
          >
            <div className="channel-icon-box icon-phone">
              <Phone size={20} />
            </div>
            <div className="channel-info">
              <span className="channel-label">PHONE</span>
              <span className="channel-value">+91 9778784425</span>
            </div>
            <button
              type="button"
              className="channel-copy-btn"
              onClick={(e) => handleCopy(e, "9778784425", "phone")}
              title="Copy phone number"
              aria-label="Copy phone number"
            >
              {copiedField === "phone" ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/gouthamdevs"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-channel-card"
          >
            <div className="channel-icon-box icon-github">
              <Github size={20} />
            </div>
            <div className="channel-info">
              <span className="channel-label">GITHUB</span>
              <span className="channel-value">github.com/gouthamdevs</span>
            </div>
            <span className="channel-ext-icon">
              <ArrowUpRight size={16} />
            </span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/goutham-dev-s-gds/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-channel-card"
          >
            <div className="channel-icon-box icon-linkedin">
              <Linkedin size={20} />
            </div>
            <div className="channel-info">
              <span className="channel-label">LINKEDIN</span>
              <span className="channel-value">in/goutham-dev-s-gds</span>
            </div>
            <span className="channel-ext-icon">
              <ArrowUpRight size={16} />
            </span>
          </a>
        </div>

        {/* Footer CTA */}
        <div className="contact-footer-cta">
          <a
            href="mailto:gdsdev455@gmail.com"
            className="contact-primary-btn"
          >
            <span>SEND EMAIL TRANSMISSION</span>
            <ArrowUpRight size={15} />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
