-- This trigger will call the update_district_rating function
create trigger trg_rating_insert
after INSERT on ratings for EACH row
execute FUNCTION update_district_rating ();

-- Those triggers will call the recalculate_district_rating function
create trigger trg_rating_update
after
update on ratings for EACH row
execute FUNCTION recalculate_district_rating ();

create trigger trg_rating_delete
after DELETE on ratings for EACH row
execute FUNCTION recalculate_district_rating ();