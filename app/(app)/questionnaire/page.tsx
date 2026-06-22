// app/questionnaire/page.tsx
"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ClipboardList,
  ShieldCheck,
  Timer,
  Mail,
  ArrowRight,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { notifySlack } from "../../actions/slack";
import { createAdminNotificationAction } from "@/lib/notifications/actions";
import { formatSlackMessage, useQuestionnaireValidation } from "@/lib/helpers";
import { useToast } from "@/hooks/use-toast";

type Frequency = "weekly" | "monthly" | "rarely" | "never" | "";

const PAINS = [
  "Prices too high / inconsistent pricing",
  "Time spent ordering / too much admin",
  "Backorders & substitutions",
  "No visibility by categories of spend such as for project/grant",
  "Too many vendors / messy invoicing",
  "Compliance/approvals are painful",
] as const;

const CATEGORIES = [
  "Reagents/chemicals",
  "Plastics/consumables",
  "Antibodies/kits",
  "Lab services",
  "PPE/cleanroom",
  "Equipment",
  "Maintenance/service contracts",
] as const;

export default function QuestionnairePage() {
  const { toast } = useToast();
  const formRef = useRef<HTMLDivElement | null>(null);

  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  const [pains, setPains] = useState<string[]>([]);
  const [painOther, setPainOther] = useState("");
  const [orderingProcess, setOrderingProcess] = useState("");
  const [orderingPeople, setOrderingPeople] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [rushOrders, setRushOrders] = useState<Frequency>("");
  const [stockouts, setStockouts] = useState<Frequency>("");
  const [duplicates, setDuplicates] = useState<Frequency>("");

  const [legalName, setLegalName] = useState("");
  const [preferredStartDate, setPreferredStartDate] = useState("");
  const [monthlySpend, setMonthlySpend] = useState("");
  const [mailingAddress, setMailingAddress] = useState("");
  const [contacts, setContacts] = useState("");

  const { canSubmit, validateOrToast } = useQuestionnaireValidation({
    pains,
    painOther,
    orderingProcess,
    orderingPeople,
    categories,
    rushOrders,
    stockouts,
    duplicates,
    legalName,
    preferredStartDate,
    monthlySpend,
    mailingAddress,
    contacts,
  });

  const toggleInArray = (
    arr: string[],
    value: string,
    setArr: (next: string[]) => void,
  ) => {
    setArr(
      arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
    );
  };

  const onStart = () => {
    setStarted(true);
    setSubmitted(false);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving) return;

    const res = validateOrToast();
    if (!res.ok) return;

    setSaving(true);
    try {
      await notifySlack(
        "questionaire-responses",
        formatSlackMessage(res.payload),
      );
      await createAdminNotificationAction(
        "questionnaire",
        "New Questionnaire Submission",
        `${legalName || "A prospect"} completed the onboarding questionnaire.`
      );
      setSubmitted(true);
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (err) {
      console.error(err);
      toast({
        title:
          "Something went wrong submitting the questionnaire. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  const FrequencyRow = ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: Frequency;
    onChange: (v: Frequency) => void;
  }) => (
    <div className="rounded-2xl border border-border bg-background/40 p-5">
      <p className="text-sm font-semibold text-foreground mb-3">{label}</p>
      <div className="flex flex-col sm:flex-row gap-3">
        {(["weekly", "monthly", "rarely", "never"] as Frequency[]).map(
          (opt) => (
            <label
              key={opt}
              className={`group inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm transition-colors cursor-pointer
              ${
                value === opt
                  ? "border-accent/50 bg-accent/10"
                  : "border-border bg-card hover:border-accent/30"
              }`}
            >
              <input
                type="radio"
                name={label}
                value={opt}
                checked={value === opt}
                onChange={() => onChange(opt)}
                className="h-4 w-4 accent-[hsl(var(--accent))]"
              />
              <span className="capitalize text-muted-foreground group-hover:text-foreground transition-colors">
                {opt}
              </span>
            </label>
          ),
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
              <ClipboardList className="w-4 h-4" />
              Onboarding Questionnaire
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Help us tailor procurement support{" "}
              <span className="text-accent">to your team</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              This quick questionnaire helps us understand your current ordering
              workflow, pain points, and the categories that matter most. It
              typically takes ~2–3 minutes.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <button
                type="button"
                onClick={onStart}
                className="inline-flex cursor-pointer items-center justify-center px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-xl hover:bg-accent/90 transition-colors"
              >
                Start Questionnaire
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>

              <div className="rounded-xl border border-border bg-card px-5 py-4 text-left">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  Confidential + founder-friendly
                </div>
                <div className="mt-1 text-sm text-muted-foreground flex items-center gap-2">
                  <Timer className="w-4 h-4" />
                  Takes only a few minutes
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 lg:py-24 bg-card" ref={formRef}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {!started ? (
                <motion.div
                  key="not-started"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-2xl border border-border bg-background/40 p-8 shadow-soft"
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    Ready when you are.
                  </h2>
                  <p className="mt-3 text-muted-foreground">
                    Click{" "}
                    <span className="text-foreground font-semibold">
                      Start Questionnaire
                    </span>{" "}
                    to reveal the questions. You can submit once finished.
                  </p>
                </motion.div>
              ) : submitted ? (
                <motion.div
                  key="submitted"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-2xl border border-accent/20 bg-background/40 p-8 shadow-soft"
                >
                  <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-accent text-sm font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    Submitted
                  </div>

                  <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
                    Thank you — we’ve got your responses.
                  </h2>

                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    Next step: please send a copy of your company’s W-9 form for
                    federal compliance to{" "}
                    <a
                      className="text-accent font-semibold hover:underline underline-offset-4"
                      href="mailto:adarwish@mbprocurement.com"
                    >
                      adarwish@mbprocurement.com
                    </a>{" "}
                    or{" "}
                    <a
                      className="text-accent font-semibold hover:underline underline-offset-4"
                      href="mailto:dalcala@mbprocurement.com"
                    >
                      dalcala@mbprocurement.com
                    </a>
                    .
                  </p>

                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-colors"
                    >
                      Contact Us
                      <Mail className="ml-2 w-4 h-4" />
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setStarted(true);
                        setTimeout(
                          () =>
                            formRef.current?.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            }),
                          80,
                        );
                      }}
                      className="inline-flex items-center cursor-pointer justify-center px-6 py-3 rounded-xl border border-border bg-card text-foreground font-semibold hover:border-accent/30 transition-colors"
                    >
                      Edit / Resubmit
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-8"
                >
                  {/* Section: Pains */}
                  <div className="rounded-2xl border border-border bg-background/40 p-8 shadow-soft">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                      1) Your current procurement pains
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                      Which of these pains best describe your purchasing process
                      today? (Select all that apply.)
                    </p>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                      {PAINS.map((p) => {
                        const checked = pains.includes(p);
                        return (
                          <label
                            key={p}
                            className={`flex items-start gap-3 rounded-xl border px-4 py-3 cursor-pointer transition-colors
                              ${
                                checked
                                  ? "border-accent/40 bg-accent/10"
                                  : "border-border bg-card hover:border-accent/30"
                              }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleInArray(pains, p, setPains)}
                              className="mt-1 h-4 w-4 accent-[hsl(var(--accent))]"
                            />
                            <span className="text-sm text-muted-foreground leading-relaxed">
                              {p}
                            </span>
                          </label>
                        );
                      })}
                    </div>

                    <div className="mt-5">
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Other
                      </label>
                      <input
                        value={painOther}
                        onChange={(e) => setPainOther(e.target.value)}
                        placeholder="Describe any additional pain point..."
                        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30"
                      />
                    </div>
                  </div>

                  {/* Section: Process */}
                  <div className="rounded-2xl border border-border bg-background/40 p-8 shadow-soft">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                      2) How ordering works today
                    </h2>

                    <div className="mt-6">
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        In a few sentences explain your current ordering process
                      </label>
                      <textarea
                        value={orderingProcess}
                        onChange={(e) => setOrderingProcess(e.target.value)}
                        rows={5}
                        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30"
                      />
                    </div>

                    <div className="mt-5">
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Which person(s) are in charge of ordering?
                      </label>
                      <input
                        value={orderingPeople}
                        onChange={(e) => setOrderingPeople(e.target.value)}
                        placeholder="Names"
                        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30"
                      />
                    </div>
                  </div>

                  {/* Section: Categories */}
                  <div className="rounded-2xl border border-border bg-background/40 p-8 shadow-soft">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                      3) What you buy most
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                      What categories of orders are most important to you?
                    </p>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                      {CATEGORIES.map((c) => {
                        const checked = categories.includes(c);
                        return (
                          <label
                            key={c}
                            className={`flex items-start gap-3 rounded-xl border px-4 py-3 cursor-pointer transition-colors
                              ${
                                checked
                                  ? "border-accent/40 bg-accent/10"
                                  : "border-border bg-card hover:border-accent/30"
                              }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() =>
                                toggleInArray(categories, c, setCategories)
                              }
                              className="mt-1 h-4 w-4 accent-[hsl(var(--accent))]"
                            />
                            <span className="text-sm text-muted-foreground leading-relaxed">
                              {c}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Section: Frequency */}
                  <div className="rounded-2xl border border-border bg-background/40 p-8 shadow-soft">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                      4) How often issues happen
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                      Select the frequency that best matches your environment.
                    </p>

                    <div className="mt-6 grid grid-cols-1 gap-4">
                      <FrequencyRow
                        label="Rush orders / expedites"
                        value={rushOrders}
                        onChange={setRushOrders}
                      />
                      <FrequencyRow
                        label="Stockouts / backorders"
                        value={stockouts}
                        onChange={setStockouts}
                      />
                      <FrequencyRow
                        label="Duplicate purchases / wrong items"
                        value={duplicates}
                        onChange={setDuplicates}
                      />
                    </div>
                  </div>

                  {/* Section: Contract info */}
                  <div className="rounded-2xl border border-border bg-background/40 p-8 shadow-soft">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                      5) Contract essentials
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                      In order to fulfill, we’ll need a few key pieces of info.
                    </p>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Legal name of company
                        </label>
                        <input
                          value={legalName}
                          onChange={(e) => setLegalName(e.target.value)}
                          placeholder="Your company legal name"
                          className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Preferred start date
                        </label>
                        <input
                          value={preferredStartDate}
                          onChange={(e) =>
                            setPreferredStartDate(e.target.value)
                          }
                          placeholder="e.g., Feb 1, 2026"
                          className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Rough estimate of upcoming monthly spend (for security
                          deposit)
                        </label>
                        <input
                          value={monthlySpend}
                          onChange={(e) => setMonthlySpend(e.target.value)}
                          placeholder="e.g., $25,000"
                          className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Permanent mailing address
                        </label>
                        <input
                          value={mailingAddress}
                          onChange={(e) => setMailingAddress(e.target.value)}
                          placeholder="Street, City, State, ZIP"
                          className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30"
                        />
                      </div>
                    </div>

                    <div className="mt-5">
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Contact Person(s) & Contact Info
                      </label>
                      <textarea
                        value={contacts}
                        onChange={(e) => setContacts(e.target.value)}
                        rows={4}
                        placeholder="Name, role, email, phone (add multiple if needed)"
                        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30"
                      />
                    </div>

                    <div className="mt-6 rounded-2xl border border-primary/10 bg-primary/5 p-6">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                          <Mail className="w-5 h-5 text-accent" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-lg font-bold text-foreground">
                            W-9 for federal compliance
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                            Please provide a copy of your company’s W-9 form to{" "}
                            <a
                              className="text-accent font-semibold hover:underline underline-offset-4"
                              href="mailto:adarwish@mbprocurement.com"
                            >
                              adarwish@mbprocurement.com
                            </a>{" "}
                            or{" "}
                            <a
                              className="text-accent font-semibold hover:underline underline-offset-4"
                              href="mailto:dalcala@mbprocurement.com"
                            >
                              dalcala@mbprocurement.com
                            </a>
                            .
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        setStarted(false);
                        setSubmitted(false);
                      }}
                      className="inline-flex cursor-pointer items-center justify-center px-6 py-3 rounded-xl border border-border bg-card text-foreground font-semibold hover:border-accent/30 transition-colors"
                    >
                      Hide
                    </button>

                    <button
                      type="submit"
                      disabled={!canSubmit || saving}
                      className={`inline-flex items-center cursor-pointer justify-center px-8 py-4 rounded-xl font-semibold transition-colors
                        ${
                          !canSubmit || saving
                            ? "bg-muted text-muted-foreground cursor-not-allowed"
                            : "bg-accent text-accent-foreground hover:bg-accent/90"
                        }`}
                    >
                      {saving ? "Submitting..." : "Submit Responses"}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
