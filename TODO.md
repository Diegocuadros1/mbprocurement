Admin should also have an option to delete an order that was requested.

New look for website that matches asthetic of presentations

Auth Policies

enforce that the row’s submitted_by is the logged-in user

```
create policy "orders_insert_own"
on public.orders
for insert
to authenticated
with check (submitted_by = auth.uid());
```

FIX ESTIMATED TOTAL WHEN VIEWING ORDER

Notes to ask for more clarification

- What are required inputs and what aren't when submitting a new order on Admin side and on client side.
