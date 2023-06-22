class CreateJoinTablePlayerTournament < ActiveRecord::Migration[7.0]
  def change
    create_join_table :players, :tournaments do |t|
      # t.index [:player_id, :tournament_id]
      # t.index [:tournament_id, :player_id]
    end
  end
end
