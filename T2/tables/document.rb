require 'active_record'

ActiveRecord::Base.establish_connection :adapter => "sqlite3", :database => "Database.sqlite3"

class Document < ActiveRecord::Base;
    belongs_to :player, required: true
end