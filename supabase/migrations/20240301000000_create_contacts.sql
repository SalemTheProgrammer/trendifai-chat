-- Drop existing table if it exists
drop table if exists public.contacts;

-- Create contacts table
create table public.contacts (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    email text not null,
    phone text,
    company text,
    position text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.contacts enable row level security;

-- Create policies
create policy "Enable read access for authenticated users"
    on public.contacts for select
    using (auth.role() = 'authenticated');

create policy "Enable insert for authenticated users"
    on public.contacts for insert
    with check (auth.role() = 'authenticated');

create policy "Enable update for authenticated users"
    on public.contacts for update
    using (auth.role() = 'authenticated');

-- Create update trigger for updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger update_contacts_updated_at
    before update on public.contacts
    for each row
    execute function update_updated_at_column();

-- Insert some sample data
insert into public.contacts (name, email, company, position) values
    ('John Doe', 'john.doe@example.com', 'Tech Corp', 'CTO'),
    ('Jane Smith', 'jane.smith@example.com', 'Design Co', 'Creative Director'),
    ('Alice Johnson', 'alice@example.com', 'AI Solutions', 'Lead Engineer'); 