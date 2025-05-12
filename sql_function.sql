--  This SQL function is designed to update the average rating of a district
--  whenever a new rating is added or an existing rating is updated. 
CREATE OR REPLACE FUNCTION update_district_rating()
RETURNS TRIGGER AS $$
DECLARE
  new_avg NUMERIC(4,2);
BEGIN
  -- Calculate average of the new rating across all 9 criteria
  new_avg := ROUND((
    NEW.safety_security +
    NEW.cost_of_living +
    NEW.healthcare_access +
    NEW.transportation_mobility +
    NEW.environment_nature +
    NEW.education_schools +
    NEW.shops_amenities +
    NEW.sports_recreation +
    NEW.quality_of_life
  ) / 9.0, 2);

  -- Update or insert into district_ratings
  IF EXISTS (SELECT 1 FROM district_ratings WHERE district_id = NEW.district_id) THEN
    UPDATE district_ratings
    SET
      average_rating = ROUND(
        ((average_rating * rating_count) + new_avg) / (rating_count + 1), 2
      ),
      rating_count = rating_count + 1,
      updated_at = NOW()
    WHERE district_id = NEW.district_id;
  ELSE
    INSERT INTO district_ratings (district_id, average_rating, rating_count)
    VALUES (NEW.district_id, new_avg, 1);
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- This trigger will call the update_district_rating function
CREATE TRIGGER trg_update_district_rating
AFTER INSERT ON ratings
FOR EACH ROW
EXECUTE FUNCTION update_district_rating();

-- This SQL function is designed to update the rank of districts based on their average rating.
CREATE OR REPLACE FUNCTION update_district_ranks()
RETURNS VOID AS $$
BEGIN
  WITH ranked AS (
    SELECT
      district_id,
      RANK() OVER (ORDER BY average_rating DESC) AS new_rank
    FROM district_ratings
  )
  UPDATE district_ratings dr
  SET rank = r.new_rank
  FROM ranked r
  WHERE dr.district_id = r.district_id;
END;
$$ LANGUAGE plpgsql;

-- This trigger will call the update_district_ranks function
CREATE OR REPLACE FUNCTION trigger_update_district_ranks()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM update_district_ranks();
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- This trigger will call the update_district_ranks function
CREATE TRIGGER trg_update_district_ranks
AFTER INSERT OR UPDATE ON district_ratings
FOR EACH STATEMENT
EXECUTE FUNCTION trigger_update_district_ranks();




