--  This SQL function is designed to update the average rating of a district
--  whenever a new rating is added or an existing rating is updated.
CREATE OR REPLACE FUNCTION update_district_rating()
RETURNS TRIGGER AS $$
DECLARE
  new_avg NUMERIC(4,2);

BEGIN
  -- If district already exists, update its aggregated averages
  IF EXISTS (SELECT 1 FROM district_ratings WHERE district_id = NEW.district_id) THEN
    UPDATE district_ratings
    SET
      average_rating = ROUND(((average_rating * rating_count + NEW.average_rating)::numeric) / (rating_count + 1), 2),
      safety_security = ROUND(((safety_security * rating_count) + NEW.safety_security) / (rating_count + 1), 2),
      cost_of_living = ROUND(((cost_of_living * rating_count) + NEW.cost_of_living) / (rating_count + 1), 2),
      healthcare_access = ROUND(((healthcare_access * rating_count) + NEW.healthcare_access) / (rating_count + 1), 2),
      transportation_mobility = ROUND(((transportation_mobility * rating_count) + NEW.transportation_mobility) / (rating_count + 1), 2),
      environment_nature = ROUND(((environment_nature * rating_count) + NEW.environment_nature) / (rating_count + 1), 2),
      education_schools = ROUND(((education_schools * rating_count) + NEW.education_schools) / (rating_count + 1), 2),
      shops_amenities = ROUND(((shops_amenities * rating_count) + NEW.shops_amenities) / (rating_count + 1), 2),
      sports_recreation = ROUND(((sports_recreation * rating_count) + NEW.sports_recreation) / (rating_count + 1), 2),
      rating_count = rating_count + 1,
      updated_at = NOW()
    WHERE district_id = NEW.district_id;

  -- If no entry exists yet for this district, insert it
  ELSE
    INSERT INTO district_ratings (
      district_id,
      average_rating,
      safety_security,
      cost_of_living,
      healthcare_access,
      transportation_mobility,
      environment_nature,
      education_schools,
      shops_amenities,
      sports_recreation,
      rating_count,
      updated_at
    )
    VALUES (
      NEW.district_id,
      NEW.average_rating,
      NEW.safety_security,
      NEW.cost_of_living,
      NEW.healthcare_access,
      NEW.transportation_mobility,
      NEW.environment_nature,
      NEW.education_schools,
      NEW.shops_amenities,
      NEW.sports_recreation,
      1,
      NOW()
    );
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
  WHERE dr.district_id = r.district_id
  AND dr.rank IS DISTINCT FROM r.new_rank;
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