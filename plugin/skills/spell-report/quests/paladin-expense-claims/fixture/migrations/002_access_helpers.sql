-- Membership helpers for policies, plus the workspace policies that use them.

create schema if not exists private;

create function private.is_workspace_member(ws uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.workspace_members m
    where m.workspace_id = ws and m.user_id = (select auth.uid())
  );
$$;

create function private.is_workspace_admin(ws uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.workspace_members m
    where m.workspace_id = ws
      and m.user_id = (select auth.uid())
      and m.role in ('owner', 'admin')
  );
$$;

-- Supabase grants EXECUTE on new functions to anon and authenticated by default.
revoke execute on function private.is_workspace_member(uuid), private.is_workspace_admin(uuid) from public, anon;
grant usage on schema private to authenticated;
grant execute on function private.is_workspace_member(uuid), private.is_workspace_admin(uuid) to authenticated;

create policy "members read their workspaces" on public.workspaces
  for select to authenticated
  using ((select private.is_workspace_member(id)));

create policy "users create workspaces they own" on public.workspaces
  for insert to authenticated
  with check (created_by = (select auth.uid()));

create policy "admins rename workspaces" on public.workspaces
  for update to authenticated
  using ((select private.is_workspace_admin(id)))
  with check ((select private.is_workspace_admin(id)));

create policy "members see co-members" on public.workspace_members
  for select to authenticated
  using ((select private.is_workspace_member(workspace_id)));

create policy "admins remove members" on public.workspace_members
  for delete to authenticated
  using ((select private.is_workspace_admin(workspace_id)) and role <> 'owner');
