class CreateTournaments < ActiveRecord::Migration[7.0]
  def change
    create_table :tournaments do |t|
      t.string :name
      t.string :country
      t.integer :foundation_year

      t.timestamps
    end
  end
end
