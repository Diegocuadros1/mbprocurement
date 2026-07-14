"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { PW, SLDS_BLUE } from "@/lib/portal/pw";
import { PageHeader, SectionCard, AppButton, EmptyState, Icon, Toast } from "@/components/portal/kit";
import { money } from "@/lib/portal/pricing";
import { setActingCompanyAction, createAccountAction, updateAccountAction, mintSignupKeyAction, uploadAccountLogoAction, removeAccountLogoAction } from "@/lib/portal/actions";
import type { PwAccount } from "@/lib/portal/data";

function AccountAvatar({ account, size = 30 }: { account: PwAccount; size?: number }) {
  const [failed, setFailed] = React.useState(false);
  const initials = (account.name || "—").split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() || "").join("");
  if (account.logoUrl && !failed) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={account.logoUrl + "?v=" + account.id} alt="" onError={() => setFailed(true)}
      style={{ width: size, height: size, borderRadius: 6, objectFit: "cover", background: "#fff", border: `1px solid ${PW.line}`, flexShrink: 0 }} />;
  }
  return (
    <span style={{ width: size, height: size, borderRadius: 6, flexShrink: 0, background: "linear-gradient(135deg,#0E9560,#07112A)",
      display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: PW.sans, fontWeight: 700, fontSize: size * 0.36, color: "#fff" }}>
      {initials}
    </span>
  );
}

/** Read a chosen file as a data URL so it can go through the server action. */
function LogoUploader({ account, onChanged }: { account: PwAccount; onChanged: (fn: () => Promise<void>, ok: string) => void }) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <AccountAvatar account={account} size={48} />
      <div style={{ display: "flex", gap: 8 }}>
        <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            if (file.size > 2 * 1024 * 1024) { Toast.show("Image must be under 2 MB", { tone: "danger" }); return; }
            const reader = new FileReader();
            reader.onload = () => onChanged(async () => { await uploadAccountLogoAction(account.id, String(reader.result)); }, "Logo updated");
            reader.readAsDataURL(file);
          }} />
        <AppButton variant="secondary" size="sm" icon="upload" onClick={() => inputRef.current?.click()}>
          {account.logoUrl ? "Replace logo" : "Upload logo"}
        </AppButton>
        {account.logoUrl && (
          <AppButton variant="ghost" size="sm" onClick={() => onChanged(async () => { await removeAccountLogoAction(account.id); }, "Logo removed")}>Remove</AppButton>
        )}
      </div>
    </div>
  );
}

const field: React.CSSProperties = {
  width: "100%", padding: "9px 11px", fontFamily: PW.sans, fontSize: 13, color: PW.ink,
  background: PW.white, border: `1px solid ${PW.line2}`, borderRadius: 4, outline: "none", boxSizing: "border-box",
};
const lbl: React.CSSProperties = {
  display: "block", fontFamily: PW.sans, fontSize: 11, fontWeight: 700, color: PW.ink500,
  marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.04em",
};

const COLS = "1.6fr 70px 70px 80px 60px 110px 190px";

function Stat({ children }: { children: React.ReactNode }) {
  return <span style={{ fontFamily: PW.mono, fontSize: 12.5, color: PW.ink500, fontVariantNumeric: "tabular-nums" }}>{children}</span>;
}

function AccountForm({
  initial, submitLabel, onSubmit, onCancel, showKey,
}: {
  initial?: Partial<PwAccount>;
  submitLabel: string;
  onSubmit: (v: { name: string; contact_email: string; address: string; delivery_instructions: string; allowed_domains: string; signupKey: string }) => void;
  onCancel: () => void;
  showKey: boolean;
}) {
  const [v, setV] = React.useState({
    name: initial?.name || "",
    contact_email: initial?.contact_email || "",
    address: initial?.address || "",
    delivery_instructions: initial?.delivery_instructions || "",
    allowed_domains: (initial?.allowed_domains || []).join(", "),
    signupKey: "",
  });
  const set = (k: keyof typeof v, val: string) => setV((s) => ({ ...s, [k]: val }));

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit(v); }}
      style={{ display: "grid", gap: 12 }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 12 }}>
        <div>
          <label style={lbl}>Lab / account name</label>
          <input style={field} value={v.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Helio Bio, Inc." />
        </div>
        <div>
          <label style={lbl}>Contact email</label>
          <input style={field} value={v.contact_email} onChange={(e) => set("contact_email", e.target.value)} placeholder="lab@company.com" />
        </div>
      </div>
      <div>
        <label style={lbl}>Delivery address</label>
        <input style={field} value={v.address} onChange={(e) => set("address", e.target.value)} placeholder="Street, city, state, ZIP" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <label style={lbl}>Delivery instructions</label>
          <input style={field} value={v.delivery_instructions} onChange={(e) => set("delivery_instructions", e.target.value)} placeholder="Dock hours, cold-chain, suite #" />
        </div>
        <div>
          <label style={lbl}>Allowed email domains <span style={{ textTransform: "none", fontWeight: 500, color: PW.mute }}>(optional, comma separated)</span></label>
          <input style={field} value={v.allowed_domains} onChange={(e) => set("allowed_domains", e.target.value)} placeholder="heliobio.com" />
        </div>
      </div>
      {showKey && (
        <div>
          <label style={lbl}>Signup key <span style={{ textTransform: "none", fontWeight: 500, color: PW.mute }}>(their staff enter this at login to join)</span></label>
          <input style={field} value={v.signupKey} onChange={(e) => set("signupKey", e.target.value)} placeholder="e.g. HELIO-2026" />
        </div>
      )}
      <div style={{ display: "flex", gap: 8, marginTop: 2 }}>
        <AppButton variant="primary" size="sm" type="submit">{submitLabel}</AppButton>
        <AppButton variant="ghost" size="sm" onClick={onCancel}>Cancel</AppButton>
      </div>
    </form>
  );
}

export default function AccountsScreen({
  accounts, actingCompanyId, ownCompanyId,
}: {
  accounts: PwAccount[]; actingCompanyId: string | null; ownCompanyId: string | null;
}) {
  const router = useRouter();
  const [pending, startTransition] = React.useTransition();
  const [adding, setAdding] = React.useState(false);
  const [editing, setEditing] = React.useState<string | null>(null);
  const [keyFor, setKeyFor] = React.useState<string | null>(null);
  const [keyVal, setKeyVal] = React.useState("");

  const run = (fn: () => Promise<void>, ok: string) =>
    startTransition(async () => {
      try { await fn(); Toast.show(ok); router.refresh(); }
      catch (e) { Toast.show(e instanceof Error ? e.message : "Something went wrong", { tone: "danger" }); }
    });

  const open = (a: PwAccount) =>
    run(async () => { await setActingCompanyAction(a.id); router.push("/app"); }, `Now viewing ${a.name}`);

  const leave = () => run(async () => { await setActingCompanyAction(null); }, "Back to your own account");

  return (
    <div>
      <PageHeader icon="building" kicker="Admin" title="Client accounts">
        <AppButton variant="primary" icon="plus" onClick={() => { setAdding((s) => !s); setEditing(null); }}>
          {adding ? "Close" : "New account"}
        </AppButton>
      </PageHeader>

      <div style={{ padding: "18px 28px 60px", maxWidth: 1280, margin: "0 auto", opacity: pending ? 0.7 : 1 }}>
        {/* Which account am I in right now? */}
        {actingCompanyId && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, padding: "11px 14px", background: "#FFF6E8", border: "1px solid #E7C98A", borderRadius: 6 }}>
            <Icon name="lock" size={15} color="#8A6308" />
            <span style={{ fontFamily: PW.sans, fontSize: 13, color: "#6E4F12", fontWeight: 600, flex: 1 }}>
              You are working inside{" "}
              <b>{accounts.find((a) => a.id === actingCompanyId)?.name || "a client account"}</b>. Everything you
              view or change applies to them, not you.
            </span>
            <AppButton variant="secondary" size="sm" onClick={leave}>Exit to my account</AppButton>
          </div>
        )}

        {adding && (
          <SectionCard title="New client account" icon="building" padded style={{ marginBottom: 18 }}>
            <AccountForm
              submitLabel="Create account"
              showKey
              onCancel={() => setAdding(false)}
              onSubmit={(v) =>
                run(async () => {
                  await createAccountAction(v);
                  setAdding(false);
                }, `Created ${v.name}`)
              }
            />
          </SectionCard>
        )}

        <SectionCard>
          <div style={{ display: "grid", gridTemplateColumns: COLS, gap: 12, padding: "9px 16px", background: "#F4F6F9", borderBottom: `1px solid ${PW.line}`, fontFamily: PW.sans, fontSize: 10.5, fontWeight: 700, color: PW.mute, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            <span>Account</span><span>Members</span><span>Orders</span><span>Inventory</span><span>Cart</span><span>QTD spend</span><span style={{ textAlign: "right" }}>Actions</span>
          </div>

          {accounts.length === 0 ? (
            <EmptyState icon="building" title="No client accounts yet" sub="Create your first one with “New account”." />
          ) : (
            accounts.map((a) => {
              const isHere = a.id === actingCompanyId;
              const isMine = a.id === ownCompanyId;
              return (
                <div key={a.id}>
                  <div style={{ display: "grid", gridTemplateColumns: COLS, gap: 12, padding: "12px 16px", borderBottom: `1px solid ${PW.line}`, alignItems: "center", background: isHere ? "#FFFBF2" : "transparent" }}>
                    <div style={{ minWidth: 0, display: "flex", alignItems: "center", gap: 10 }}>
                      <AccountAvatar account={a} size={30} />
                      <div style={{ minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                        <span style={{ fontFamily: PW.sans, fontWeight: 700, fontSize: 13.5, color: PW.ink, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.name}</span>
                        {isHere && <span style={{ padding: "1px 6px", borderRadius: 10, background: "#FDF0D5", border: "1px solid #E7C98A", color: "#8A6308", fontSize: 10, fontWeight: 700 }}>VIEWING</span>}
                        {isMine && <span style={{ padding: "1px 6px", borderRadius: 10, background: "#EAF1FB", border: "1px solid #9EBEEC", color: "#1E4FB0", fontSize: 10, fontWeight: 700 }}>MINE</span>}
                      </div>
                      <div style={{ marginTop: 2, fontFamily: PW.sans, fontSize: 11.5, color: PW.mute, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {a.contact_email || "no contact"}{a.address ? " · " + a.address : ""}
                      </div>
                      </div>
                    </div>
                    <Stat>{a.members}</Stat>
                    <Stat>{a.orders}</Stat>
                    <Stat>{a.inventory}</Stat>
                    <Stat>{a.cart}</Stat>
                    <Stat>{a.spend ? money(a.spend) : "—"}</Stat>
                    <div style={{ display: "flex", gap: 6, justifyContent: "flex-end", flexWrap: "wrap" }}>
                      <AppButton variant={isHere ? "secondary" : "primary"} size="sm" onClick={() => open(a)}>
                        {isHere ? "Re-open" : "Open"}
                      </AppButton>
                      <AppButton variant="secondary" size="sm" onClick={() => { setEditing(editing === a.id ? null : a.id); setKeyFor(null); }}>Edit</AppButton>
                      <AppButton variant="ghost" size="sm" onClick={() => { setKeyFor(keyFor === a.id ? null : a.id); setEditing(null); setKeyVal(""); }}>Key</AppButton>
                    </div>
                  </div>

                  {editing === a.id && (
                    <div style={{ padding: "16px 16px 20px", background: "#FAFBF7", borderBottom: `1px solid ${PW.line}` }}>
                      <div style={{ marginBottom: 16, paddingBottom: 16, borderBottom: `1px solid ${PW.line}` }}>
                        <label style={lbl}>Company logo</label>
                        <LogoUploader account={a} onChanged={run} />
                        <p style={{ margin: "8px 0 0", fontFamily: PW.sans, fontSize: 11.5, color: PW.mute }}>PNG, JPG, WEBP or SVG · under 2 MB · shows in the sidebar and account list.</p>
                      </div>
                      <AccountForm
                        initial={a}
                        submitLabel="Save changes"
                        showKey={false}
                        onCancel={() => setEditing(null)}
                        onSubmit={(v) =>
                          run(async () => {
                            await updateAccountAction(a.id, v);
                            setEditing(null);
                          }, "Account updated")
                        }
                      />
                    </div>
                  )}

                  {keyFor === a.id && (
                    <div style={{ padding: "14px 16px 18px", background: "#FAFBF7", borderBottom: `1px solid ${PW.line}` }}>
                      <label style={lbl}>New signup key for {a.name}</label>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <input style={{ ...field, maxWidth: 320 }} value={keyVal} onChange={(e) => setKeyVal(e.target.value)} placeholder="e.g. HELIO-2026" />
                        <AppButton variant="primary" size="sm" onClick={() =>
                          run(async () => { await mintSignupKeyAction(a.id, keyVal); setKeyFor(null); }, "Signup key created")
                        }>Create key</AppButton>
                      </div>
                      <p style={{ margin: "8px 0 0", fontFamily: PW.sans, fontSize: 11.5, color: PW.mute }}>
                        Give this to the lab&apos;s staff — they enter it at login → “Create your account” to join {a.name}.
                        Only a hash is stored, so save it now.
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </SectionCard>

        <p style={{ marginTop: 14, fontFamily: PW.sans, fontSize: 12, color: PW.mute, display: "flex", alignItems: "center", gap: 6 }}>
          <Icon name="info" size={13} color={PW.mute} />
          <span><b>Open</b> puts you inside that lab&apos;s portal — catalog, cart, orders, inventory and documents all become theirs, and anything you change is saved to their account.</span>
        </p>
      </div>
    </div>
  );
}
