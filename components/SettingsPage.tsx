"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Building2,
  HelpCircle,
  Save,
  BriefcaseBusiness,
  Send,
  Coffee,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import {
  updateProfileAction,
  updateCompanyInfoAction,
} from "@/lib/settings/actions";
import { notifySlack } from "@/app/actions/slack";
import { createAdminNotificationAction } from "@/lib/notifications/actions";

type Props = {
  user: { id: string; email: string };
  profile: {
    username: string;
    out_of_office: boolean;
    out_of_office_message: string | null;
  };
  company: {
    id: string;
    name: string;
    contact_email: string | null;
    address: string | null;
    delivery_instructions: string | null;
  } | null;
  isAppAdmin: boolean;
  members: Array<{ id: string; username: string | null; email: string }>;
};

// ── Tabs ─────────────────────────────────────────────────────────────────────

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "company", label: "Company", icon: Building2 },
  { id: "help", label: "Help & Support", icon: HelpCircle },
] as const;

type TabId = (typeof TABS)[number]["id"];

// ── Toggle ───────────────────────────────────────────────────────────────────

function Toggle({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-50",
        checked ? "bg-accent" : "bg-muted"
      )}
    >
      <span
        className={cn(
          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform",
          checked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
      {children}
    </p>
  );
}

function ReadOnlyField({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="text-sm text-foreground">{value || "—"}</p>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function SettingsPage({
  user,
  profile,
  company,
  isAppAdmin,
  members,
}: Props) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<TabId>("profile");

  // ── Profile state ──
  const [username, setUsername] = useState(profile.username);
  const [ooo, setOoo] = useState(profile.out_of_office);
  const [oooMessage, setOooMessage] = useState(profile.out_of_office_message ?? "");
  const [profilePending, startProfileTransition] = useTransition();

  // ── Company state ──
  const [contactEmail, setContactEmail] = useState(company?.contact_email ?? "");
  const [address, setAddress] = useState(company?.address ?? "");
  const [deliveryInstructions, setDeliveryInstructions] = useState(
    company?.delivery_instructions ?? ""
  );
  const [companyPending, startCompanyTransition] = useTransition();

  // ── Contact form state ──
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: user.email,
    message: "",
  });
  const [contactPending, startContactTransition] = useTransition();

  // ── Handlers ──────────────────────────────────────────────────────────────

  function saveProfile() {
    startProfileTransition(async () => {
      try {
        await updateProfileAction({
          username: username.trim() || undefined,
          out_of_office: ooo,
          out_of_office_message: ooo ? oooMessage.trim() || null : null,
        });
        toast({ title: "Profile saved" });
      } catch (e) {
        toast({
          title: "Failed to save",
          description: e instanceof Error ? e.message : "Unknown error",
          variant: "destructive",
        });
      }
    });
  }

  function saveCompany() {
    startCompanyTransition(async () => {
      try {
        await updateCompanyInfoAction({
          contact_email: contactEmail.trim() || null,
          address: address.trim() || null,
          delivery_instructions: deliveryInstructions.trim() || null,
        });
        toast({ title: "Company info saved" });
      } catch (e) {
        toast({
          title: "Failed to save",
          description: e instanceof Error ? e.message : "Unknown error",
          variant: "destructive",
        });
      }
    });
  }

  function submitContact(e: React.FormEvent) {
    e.preventDefault();
    startContactTransition(async () => {
      try {
        await notifySlack(
          "contact-outreach",
          `*Support Request (Settings)*\nName: ${contact.firstName} ${contact.lastName}\nEmail: ${contact.email}\nMessage: ${contact.message}`
        );
        await createAdminNotificationAction(
          "contact",
          "New Support Message",
          `${contact.firstName} ${contact.lastName} (${contact.email}) sent a message.`
        );
        setContact({ firstName: "", lastName: "", email: user.email, message: "" });
        toast({
          title: "Message sent!",
          description: "We'll get back to you as soon as possible.",
        });
      } catch {
        toast({
          title: "Submission failed",
          description: "Please email us directly.",
          variant: "destructive",
        });
      }
    });
  }

  // ──────────────────────────────────────────────────────────────────────────

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.5)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.5)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_55%_at_50%_0%,#000_70%,transparent_115%)]" />
      <div className="absolute top-20 right-1/4 h-80 w-80 rounded-full bg-accent/8 blur-3xl" />

      <main className="relative z-10 mx-auto max-w-3xl px-4 pb-16 pt-8 sm:px-6">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mb-6 flex items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10">
            <BriefcaseBusiness className="h-4 w-4 text-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Settings
            </h1>
            {isAppAdmin && (
              <p className="text-xs text-muted-foreground mt-0.5">
                View-only — admin accounts cannot be edited here
              </p>
            )}
          </div>
        </motion.div>

        {/* Tab bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.35, ease: "easeOut" }}
          className="mb-6 flex gap-1 rounded-2xl border border-border bg-card/60 p-1 backdrop-blur"
        >
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all",
                  active
                    ? "bg-accent/15 text-accent shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="rounded-3xl border border-border bg-card/60 backdrop-blur overflow-hidden"
          >
            {/* ── Profile Tab ──────────────────────────────────────────────── */}
            {activeTab === "profile" && (
              <div className="divide-y divide-border">
                {/* Account info */}
                <div className="px-6 py-5 space-y-4">
                  <SectionLabel>Account</SectionLabel>

                  {isAppAdmin ? (
                    <div className="space-y-4">
                      <ReadOnlyField label="Username" value={profile.username} />
                      <ReadOnlyField label="Email" value={user.email} />
                      <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/30 px-4 py-3">
                        <ShieldCheck className="h-4 w-4 text-accent shrink-0" />
                        <span className="text-sm font-medium text-foreground">App Admin</span>
                        <span className="ml-1 text-xs text-muted-foreground">— full platform access</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Your display name"
                          className="max-w-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label>Email</Label>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Out of Office */}
                <div className="px-6 py-5 space-y-3">
                  <SectionLabel>Status</SectionLabel>

                  {isAppAdmin ? (
                    <div className="space-y-2">
                      <ReadOnlyField
                        label="Out of Office"
                        value={profile.out_of_office ? "Active" : "Inactive"}
                      />
                      {profile.out_of_office && (
                        <ReadOnlyField
                          label="Back on"
                          value={profile.out_of_office_message}
                        />
                      )}
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Coffee className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              Out of Office
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Let your team know you're away
                            </p>
                          </div>
                        </div>
                        <Toggle checked={ooo} onChange={setOoo} />
                      </div>

                      {ooo && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-1.5"
                        >
                          <Label htmlFor="ooo-message">Back on</Label>
                          <Textarea
                            id="ooo-message"
                            value={oooMessage}
                            onChange={(e) => setOooMessage(e.target.value)}
                            placeholder="e.g. Back on Monday Jan 27"
                            rows={2}
                            className="resize-none"
                          />
                        </motion.div>
                      )}
                    </>
                  )}
                </div>

                {/* Save button — only for non-admins */}
                {!isAppAdmin && (
                  <div className="px-6 py-5">
                    <Button
                      variant="accent"
                      className="rounded-2xl cursor-pointer"
                      disabled={profilePending}
                      onClick={saveProfile}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      {profilePending ? "Saving…" : "Save Profile"}
                    </Button>
                  </div>
                )}

                {/* Members — shown for regular users (company peers) and admins viewing a company */}
                {(!isAppAdmin || members.length > 0) && (
                  <div className="px-6 py-5">
                    <SectionLabel>Members</SectionLabel>
                    {members.length === 0 ? (
                      <p className="text-sm text-muted-foreground">
                        No members found.
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {members.map((m) => (
                          <div
                            key={m.id}
                            className="flex items-center gap-3 rounded-xl border border-border bg-background/60 px-4 py-3"
                          >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground uppercase">
                              {(m.username ?? m.email)[0]}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">
                                {m.username ?? "—"}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {m.email}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ── Company Tab ──────────────────────────────────────────────── */}
            {activeTab === "company" && (
              <div className="px-6 py-5 space-y-4">
                <SectionLabel>Company Information</SectionLabel>

                {!company ? (
                  <p className="text-sm text-muted-foreground">
                    No company found for your account.
                  </p>
                ) : isAppAdmin ? (
                  /* Admin: read-only view of the selected company */
                  <>
                    <ReadOnlyField label="Company Name" value={company.name} />
                    <ReadOnlyField label="Primary Contact Email" value={company.contact_email} />
                    <ReadOnlyField label="Address" value={company.address} />
                    <ReadOnlyField label="Delivery Instructions" value={company.delivery_instructions} />
                  </>
                ) : (
                  /* Regular user: editable */
                  <>
                    <ReadOnlyField label="Company Name" value={company.name} />

                    <div className="space-y-1.5">
                      <Label htmlFor="contact-email">Primary Contact Email</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="contact@yourcompany.com"
                        className="max-w-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="123 Main St, City, State, ZIP"
                        rows={2}
                        className="resize-none max-w-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="delivery">Delivery Instructions</Label>
                      <Textarea
                        id="delivery"
                        value={deliveryInstructions}
                        onChange={(e) => setDeliveryInstructions(e.target.value)}
                        placeholder="e.g. Deliver to loading dock B, call before arrival…"
                        rows={3}
                        className="resize-none"
                      />
                    </div>

                    <Button
                      variant="accent"
                      className="rounded-2xl cursor-pointer"
                      disabled={companyPending}
                      onClick={saveCompany}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      {companyPending ? "Saving…" : "Save Company Info"}
                    </Button>
                  </>
                )}
              </div>
            )}

            {/* ── Help Tab ─────────────────────────────────────────────────── */}
            {activeTab === "help" && (
              <div className="px-6 py-5">
                <SectionLabel>Get in touch</SectionLabel>
                <p className="mb-5 text-sm text-muted-foreground">
                  Have a question or need assistance? Send us a message and
                  we'll get back to you as soon as possible.
                </p>

                <form onSubmit={submitContact} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="first-name">First Name *</Label>
                      <Input
                        id="first-name"
                        value={contact.firstName}
                        onChange={(e) =>
                          setContact({ ...contact, firstName: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input
                        id="last-name"
                        value={contact.lastName}
                        onChange={(e) =>
                          setContact({ ...contact, lastName: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="help-email">Your Email *</Label>
                    <Input
                      id="help-email"
                      type="email"
                      value={contact.email}
                      onChange={(e) =>
                        setContact({ ...contact, email: e.target.value })
                      }
                      required
                      className="max-w-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="help-message">Message *</Label>
                    <Textarea
                      id="help-message"
                      value={contact.message}
                      onChange={(e) =>
                        setContact({ ...contact, message: e.target.value })
                      }
                      required
                      rows={4}
                      placeholder="Describe your issue or question…"
                      className="resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="accent"
                    className="rounded-2xl cursor-pointer"
                    disabled={contactPending}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {contactPending ? "Sending…" : "Send Message"}
                  </Button>
                </form>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
