Sort vendors chronologically and group them up with the same vendor. --- DONE

When admin does an order, also add 3 new inputs, the order number, the link to tracking number, and link to sds. - DONE

Group up the order dates from the 21st of the last month to the 20th of the current month. And have a download button where it will download all of the orders done in that month period.

admin can see who was the one who placed the order. -- DONE

Slack notification system. When user submits an order, it is automatically sent to a slack group chat as well.

Admin should also have an option to add an order for a company, and also delete an order that was requested.

Auth Policies

enforce that the row’s submitted_by is the logged-in user

```
create policy "orders_insert_own"
on public.orders
for insert
to authenticated
with check (submitted_by = auth.uid());
```
