class CreateDocuments < ActiveRecord::Migration[7.0]
  def change
    create_table :documents do |t|
      t.integer :number
      t.string :emission
      t.belongs_to :player, null: false, foreign_key: true

      t.timestamps
    end
  end
end
