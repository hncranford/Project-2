# Looking for a change? We're here to help. Use our site to find your next opportunity.
Project Description:
We aim to show correlation between city growth rate and the number of data analyst jobs available in each city. We believe that the faster the city is growing, the more data analyst jobs there will be.

In order to create this search engine we used csv files from 3 different data sources.  One csv file containing census data between 2010 and 2019, one containing Data Analysts job positions in the US (this file included factors such as: job description, company, company, rank, location, salary etc), and one csv that included coordinates for US cities that we combined to our census data.

To join the appropriate and fields get our data into a database we used python and Jupiter notebook to essentially clean our data and format it so loading the csv files into Postgres was possible. After doing additional cleaning and connecting in Postgres we used the database to join our files and create new tables so that actual querying in our final table would be possible.

BoootStrap and Leaflet were used to help build visuals such as a table to filter on location for jobs as well as an interactive map linked to a line graph that allows users to review population growth for selected cities.  
