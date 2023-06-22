class Player < ApplicationRecord
  belongs_to :team, required: true
  has_one :document, :dependent => :destroy
  has_and_belongs_to_many :tournaments, :dependent => :destroy
end
