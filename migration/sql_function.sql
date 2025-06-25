--  This SQL function is designed to update the average rating of a district whenever a new rating is added
CREATE OR REPLACE FUNCTION update_district_rating()
RETURNS TRIGGER AS $$
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

--  This SQL function is designed to update the average rating of a district whenever a rating is updated or deleted
CREATE OR REPLACE FUNCTION recalculate_district_rating()
RETURNS TRIGGER AS $$

DECLARE
  district UUID;
  rating_count INTEGER;
BEGIN
  -- Get the relevant district ID
  IF (TG_OP = 'DELETE') THEN
    district := OLD.district_id;
  ELSE
    district := NEW.district_id;
  END IF;

  -- Check how many ratings are left
  SELECT COUNT(*) INTO rating_count FROM ratings WHERE district_id = district;

  IF rating_count = 0 THEN
    DELETE FROM district_ratings WHERE district_id = district;
  ELSE
    -- Full recalculation using subquery (safe with aggregate functions)
    UPDATE district_ratings
    SET
      average_rating = sub.avg_rating,
      safety_security = sub.avg_safety_security,
      cost_of_living = sub.avg_cost_of_living,
      healthcare_access = sub.avg_healthcare_access,
      transportation_mobility = sub.avg_transportation_mobility,
      environment_nature = sub.avg_environment_nature,
      education_schools = sub.avg_education_schools,
      shops_amenities = sub.avg_shops_amenities,
      sports_recreation = sub.avg_sports_recreation,
      rating_count = sub.rating_count,
      updated_at = NOW()
    FROM (
      SELECT
        AVG(average_rating)::numeric(4,2) AS avg_rating,
        AVG(safety_security)::numeric(4,2) AS avg_safety_security,
        AVG(cost_of_living)::numeric(4,2) AS avg_cost_of_living,
        AVG(healthcare_access)::numeric(4,2) AS avg_healthcare_access,
        AVG(transportation_mobility)::numeric(4,2) AS avg_transportation_mobility,
        AVG(environment_nature)::numeric(4,2) AS avg_environment_nature,
        AVG(education_schools)::numeric(4,2) AS avg_education_schools,
        AVG(shops_amenities)::numeric(4,2) AS avg_shops_amenities,
        AVG(sports_recreation)::numeric(4,2) AS avg_sports_recreation,
        COUNT(*) AS rating_count
      FROM ratings
      WHERE district_id = district
    ) AS sub
    WHERE district_ratings.district_id = district;
  END IF;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

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