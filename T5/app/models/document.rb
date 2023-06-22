class Document < ApplicationRecord
  belongs_to :player, required: true
end
