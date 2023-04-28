require 'active_record'

ActiveRecord::Base.establish_connection :adapter => "sqlite3", :database => "Database.sqlite3"

class PlayersTournaments < ActiveRecord::Base;
    belongs_to :player, required: true
    belongs_to :tournament, required: true
end