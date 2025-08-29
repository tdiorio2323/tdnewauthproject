insert into public.waitlist(email, vip_code, source) values ('test@x.io','X','ui');
update public.waitlist set vip_code='Y' where email='test@x.io';