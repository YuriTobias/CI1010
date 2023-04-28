require 'active_record'

ActiveRecord::Base.establish_connection :adapter => "sqlite3", :database => "Database.sqlite3"

class Team < ActiveRecord::Base;
    has_many :player, dependent: :destroy
end