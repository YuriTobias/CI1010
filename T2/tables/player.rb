require 'active_record'

ActiveRecord::Base.establish_connection :adapter => "sqlite3", :database => "Database.sqlite3"

class Player < ActiveRecord::Base;
    belongs_to :team, required: true
    has_one :document, dependent: :destroy
    has_and_belongs_to_many :tournament, dependent: :destroy
end