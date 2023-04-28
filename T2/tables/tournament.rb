require 'active_record'

ActiveRecord::Base.establish_connection :adapter => "sqlite3", :database => "Database.sqlite3"

class Tournament < ActiveRecord::Base;
    has_and_belongs_to_many :player, dependent: :destroy
end