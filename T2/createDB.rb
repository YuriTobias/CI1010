require 'rubygems'
require 'active_record'

ActiveRecord::Base.establish_connection :adapter => "sqlite3", :database => "Database.sqlite3"

if not ActiveRecord::Base.connection.table_exists? 'teams'
    ActiveRecord::Base.connection.create_table :teams do |team|
        team.string :name
        team.integer :num_titles
    end
end

if not ActiveRecord::Base.connection.table_exists? 'players'
    ActiveRecord::Base.connection.create_table :players do |player|
        player.string :name
        player.integer :age
        player.integer :career_time
        player.references :team, foreign_key: true
    end
end

if not ActiveRecord::Base.connection.table_exists? 'documents'
    ActiveRecord::Base.connection.create_table :documents do |document|
        document.integer :number
        document.string :emission
        document.references :player, foreign_key: true
    end
end

if not ActiveRecord::Base.connection.table_exists? 'tournaments'
    ActiveRecord::Base.connection.create_table :tournaments do |tournament|
        tournament.string :name
        tournament.string :country
        tournament.integer :foundation_year
    end
end

if not ActiveRecord::Base.connection.table_exists? 'players_tournaments'
    ActiveRecord::Base.connection.create_table :players_tournaments do |player_tournament|
        player_tournament.references :player
        player_tournament.references :tournament
    end
end