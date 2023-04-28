#!/bin/bash
# Command to create the database and the tables
echo "Creating Database and Tables..."
ruby createDB.rb
# Commands to populate tables
echo "Populating the tables..."
ruby team_seeder.rb
ruby tournament._seeder.rb
ruby player_seeder.rb
ruby document_seeder.rb
echo "|---------|"
echo "| SUCCESS |"
echo "|---------|"