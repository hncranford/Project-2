SELECT "Census" FROM census;

ALTER TABLE census
DROP COLUMN "Census";

SELECT * FROM census;

ALTER TABLE census
DROP COLUMN "Estimates_Base";

ALTER TABLE analyst
DROP COLUMN "Competitors";

ALTER TABLE analyst
DROP COLUMN "Easy_Apply";

DELETE FROM analyst
WHERE "Salary_Estimate" = '-1' OR "Rating" = '-1' OR "Headquarters" = '-1' OR "Size" = '-1' OR "Founded" = '-1' OR "Type_of_ownership" = '-1' OR "Industry" = '-1' OR "Sector" = '-1' OR "Revenue" = '-1';

SELECT * FROM analyst;

CREATE VIEW newcensus AS
SELECT "ID",
	split_part("Geographic_Area", ' city, ',1) AS City,
	split_part("Geographic_Area", ' city, ',2) AS State,
	"Pop2010",
	"Pop2011",
	"Pop2012",
	"Pop2013",
	"Pop2014",
	"Pop2015",
	"Pop2016",
	"Pop2017",
	"Pop2018",
	"Pop2019"
FROM census;

SELECT * FROM census;

ALTER TABLE census 
RENAME COLUMN "Rank" TO "ID";

CREATE VIEW jobs AS
SELECT "Ranks",
	"Job_Title",
	"Salary_Estimate",
	"Job_Description",
	"Rating",
	"Company_Name",
	split_part("Location", ', ',1) AS City,
	split_part("Location", ', ',2) AS State,
	"Industry"
FROM analyst;

SELECT "state", "city"
FROM newcensus
WHERE "city" LIKE '%balance%';

DELETE FROM newcensus
WHERE "city" LIKE '%balance%';

SELECT * FROM newcensus;

DELETE FROM newcensus
WHERE "city" LIKE '%,%';

ALTER TABLE citystate
DROP COLUMN "city_ascii";

ALTER TABLE citystate
DROP COLUMN "county_fips";

ALTER TABLE citystate
DROP COLUMN "county_name", DROP COLUMN "population", DROP COLUMN "density", DROP COLUMN "source", DROP COLUMN "military", DROP COLUMN "incorporated", DROP COLUMN "timezone", DROP COLUMN "ranking";

SELECT * FROM citystate;

ALTER TABLE citystate
DROP COLUMN "zips";

SELECT * FROM analyst;

CREATE VIEW anothercensus AS
SELECT *, CONCAT(city, ', ', state) as "city_state"
FROM newcensus;

CREATE VIEW anothercitystate AS
SELECT *, CONCAT(city, ', ', state_id) as "city_state"
FROM citystate;

CREATE VIEW anotherjobs AS
SELECT *, CONCAT(city, ', ', state) as "city_state"
FROM jobs;

ALTER TABLE anothercensus
RENAME "ID" TO "IDcensus";

ALTER TABLE anothercensus
RENAME "city" TO "census_city";

ALTER TABLE anothercensus
RENAME "city_state" TO "citystate";

ALTER TABLE anotherjobs
RENAME "city_state" TO "location";

ALTER TABLE anotherjobs
RENAME "city" TO "jobscity";

ALTER TABLE anotherjobs
RENAME "state" TO "jobsstate";

CREATE VIEW censusandcitystate AS
SELECT *
FROM anothercensus
INNER JOIN anothercitystate ON anothercensus.citystate = anothercitystate.city_state;

CREATE VIEW coordinates AS
SELECT *, CONCAT(city, ', ', state_id) as "city_state"
FROM citystate;

CREATE VIEW finalTable AS
SELECT *
FROM coordinates
INNER JOIN anotherjobs ON coordinates.city_state = anotherjobs.location;

SELECT * 
INTO final_table
FROM finaltable;

SELECT * 
INTO censusandlocations
FROM censusandcitystate;

ALTER TABLE censusandlocations
ADD CONSTRAINT PK_my_table PRIMARY KEY ("IDcensus");

ALTER TABLE final_table
ADD CONSTRAINT PK_my_table2 PRIMARY KEY ("Ranks");


